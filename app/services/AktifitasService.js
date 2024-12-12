const supabase = require('../config/configSupabase');


const createAktifitas = async (aktifitas) => {
    const {data, error} = await supabase.from('aktifitas').insert(aktifitas);

    if (error) throw new Error(error.message);
    return data;
}

const getAllAktifitas = async () => {
    const {data, error} = await supabase.from('aktifitas').select('*');
    if (error) throw new Error(error.message);
    return data;
}

const updateAktifitas = async (id, aktifitas) => {
    const {data, error} = await supabase.from('aktifitas').update(aktifitas).eq('log_id', id);

    if (error) throw new Error(error.message);
    return data;
}

const getAktifitasById = async (id) => {
    const {data, error} = await supabase.from('aktifitas').select('*').eq('log_id', id);
    if (error) throw new Error(error.message);
    return data;
}

const deleteAktifitas = async (id) => {
    const {data, error} = await supabase.from('aktifitas').delete().eq('log_id', id);

    if (error) throw new Error(error.message);
    return data;
}

module.exports = {
    createAktifitas,
    getAllAktifitas,
    getAktifitasById,
    updateAktifitas,
    deleteAktifitas
}