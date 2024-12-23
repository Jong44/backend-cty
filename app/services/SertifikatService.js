
const supabase = require('../config/configSupabase');
const OCRService = require('./OCRServices');
const crypto = require('crypto');

const createSertifikat = async (sertifikat) => {

    const iv = crypto.randomBytes(16);
    const key = crypto.randomBytes(32).toString('hex');
    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(key, 'hex'), iv);


    const resultSertifikat = await OCRService.recognizeSertifikat(sertifikat.sertifikat[0]);
    const resultKTP = await OCRService.recoginzeKTP(sertifikat.ktp[0]);

    if (!resultSertifikat || !resultKTP) {
        throw new Error('Failed to recognize sertifikat or KTP');
    }



    // encode resultSertifikat to string
    const resultSertifikatString = JSON.stringify(resultSertifikat);
    const fingerprintSertificate = crypto.createHash('sha256').update(resultSertifikatString).digest('hex');

    // check if sertificate already exist in database
    const {data: sertificate, error} = await supabase.from('node').select('*').eq('fingerprint', fingerprintSertificate);
    if (error) throw new Error(error.message);

    if (sertificate.length > 0) {
        throw new Error('Sertifikat already exist');
    }
    
    if(sertifikat.nik != resultKTP.nik){
        throw new Error('NIK on KTP is not match with input');
    }

    //lowercase all the data
    if(sertifikat.nama.toLowerCase() != resultKTP.nama.toLowerCase()){
        throw new Error('Nama on KTP is not match with input');
    }
    
        const sertifikatName = `sertifikat-${Date.now()}-${sertifikat.sertifikat[0].originalname}`
        const ktpName = `ktp-${Date.now()}-${sertifikat.ktp[0].originalname}`

        const {data: resultStorage, error: errorStorage} = await supabase.storage.from('sertifikat').upload(sertifikatName, sertifikat.sertifikat[0].buffer, {
            contentType: sertifikat.sertifikat[0].mimetype,
            cacheControl: '3600',
        });

        if (errorStorage) throw new Error('Failed to upload sertifikat image : ' + errorStorage.message);

        const {data: resultStorageKTP, error: errorStorageKTP} = await supabase.storage.from('ktp').upload(ktpName, sertifikat.ktp[0].buffer, {
            contentType: sertifikat.ktp[0].mimetype,
            cacheControl: '3600',
        });

        if (errorStorageKTP) throw new Error('Failed to upload KTP image : ' + errorStorageKTP.message);
        

        const file_ktp = supabase.storage.from('ktp').getPublicUrl(resultStorageKTP.path);
        const file_sertifikat = supabase.storage.from('sertifikat').getPublicUrl(resultStorage.path);


    const data = {
        nama: sertifikat.nama,
        email: sertifikat.email,
        no_hp: sertifikat.no_hp,
        alamat: sertifikat.alamat,
        nik: sertifikat.nik,    
        sertifikat: resultSertifikat,
        // get url image from resultStorage
        file_sertifikat: file_sertifikat,
        file_ktp: file_ktp,
    }

    const dataString = JSON.stringify(data);

    const encryptedData = Buffer.concat([cipher.update(dataString), cipher.final()]);
    const encryptedDataString = iv.toString('hex') + ':' + encryptedData.toString('hex');

    const hash = crypto.createHash('sha256').update(encryptedDataString).digest('hex');

    const node = {
        hash_prev: null,
        fingerprint: fingerprintSertificate,
        data_encrypted: encryptedDataString,
        encrypted_key: key,
        hash: hash,
        user_id: sertifikat.user_id,
        created_at: new Date().toISOString(),
    }

    
    const {data: result, error: errorInsert} = await supabase.from('node').insert([node]);
    if (errorInsert) throw new Error(errorInsert.message);

    return result;
}

const getCountSertifikatByUserId = async (userId) => {
    const {data, error} = await supabase.from('node').select('fingerprint').eq('uuid', userId);
    if (error) throw new Error(error.message);

    return data.length;
}

const getHistoryOwnershipCertificate = async (fingerprint) => {
    try {
        //FETCHING CURRENT CERTIFICATE AND LINKED PREV CERTIFICATE
        const { data : currentCertificate, error} = await supabase
            .from('node')            
            .select('*')
            .eq('fingerprint', fingerprint)
            .single();
        
        if ( error || !currentCertificate) {
            throw new Error('Certificate not found');
        }
        // BUILD HISTORY LINKEDLIST
        let history = [];
        let currentHash = currentCertificate.hash_prev;
        while (currentHash) {
            const { data: previousCertificate, error: prevError} = await supabase
                .from('node')            
                .select('*')
                .eq('hash', currentHash)
                .single();
                if (prevError || !previousCertificate) break;
                history.push(previousCertificate);
                currentHash = previousCertificate.hash_prev;
        }
        return {
            currentCertificate,
            history,
            
        }
    } catch (err) {
        throw new Error(`Error retrieving certificate history: ${err.message}`)
    }
        
        
}

// membuat fungsi untuk mendapatkan semua sertifikat berdasarkan user_id
const getAllSertifikatByUserId = async (userId) => {
    const algorithm = 'aes-256-ctr';
    // mengambil data dari table node berdasarkan user_id
    const {data, error} = await supabase.from('node').select('*').eq('uuid', userId);

    // jika terjadi error, maka akan melempar error
    if (error) throw new Error(error.message);


    //buat dekripsi
    

    const finalData = data.map((row) => {
        if (row.data_encrypted) {
            const key = Buffer.from(row.encrypted_key, 'hex');
            const [ivHex, encryptedDataHex] = row.data_encrypted.split(':');
            const iv = Buffer.from(ivHex, 'hex');
            const encryptedData = Buffer.from(encryptedDataHex, 'hex');
            
            const decipher = crypto.createDecipheriv(algorithm, key, iv);
            let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
            decrypted += decipher.final('utf-8');
            row.data_decrypted= JSON.parse(decrypted);
            row.data_encrypted = "hidden";
            row.encrypted_key = "hidden";
        }
        return row;
    });

    return finalData;
}

module.exports = {
    createSertifikat,
    getCountSertifikatByUserId,
    getAllSertifikatByUserId,
    getHistoryOwnershipCertificate,
}
