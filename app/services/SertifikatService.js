const supabase = require('../config/configSupabase');


const createSertifikat = async (sertifikat) => {
    const {data, error} = await supabase.from('sertifikat').insert(sertifikat);

    if (error) throw new Error(error.message);
    return data;
}

module.exports = {
    createSertifikat
}