const supabase = require('../config/configSupabase');


const createSertifikat = async (sertifikat) => {
    const {data, error} = await supabase.from('sertifikat').insert(sertifikat);

    if (error) throw new Error(error.message);
    return data;
}

const getAllSertifikat = async () => {
    const {data, error} = await supabase.from('sertifikat').select('*');
    if (error) throw new Error(error.message);
    return data;
}

const updateSertifikat = async (id, user) => {
    const {data, error} = await supabase.from('sertifikat').update(sertifikat).eq('id_sertifikat', id);

    if (error) throw new Error(error.message);
    return data;
}

const getSertifikatById = async (id) => {
    const {data, error} = await supabase.from('sertifikat').select('*').eq('id_sertifikat', id);
    if (error) throw new Error(error.message);
    return data;
}

const deleteSertifikat = async (id) => {
    const {data, error} = await supabase.from('sertifikat').delete().eq('id_sertifikat', id);

    if (error) throw new Error(error.message);
    return data;
}

module.exports = {
    createSertifikat,
    getAllSertifikat,
    getSertifikatById,
    updateSertifikat,
    deleteSertifikat
}