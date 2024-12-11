const supabase = require('../config/configSupabase');

const createNotif = async (notifikasi) => {
    const {data, error} = await supabase.from('notifikasi').insert(notifikasi);

    if (error) throw new Error(error.message);
    return data;
}

const getAllNotif = async () => {
    const {data, error} = await supabase.from('notifikasi').select('*');

    if (error) throw new Error(error.message);
    return data;
}

const getNotifById = async (id) => {
    const {data, error} = await supabase.from('notifikasi').select('*').eq('notification_id', id);

    if (error) throw new Error(error.message);
    return data;
}

const updateNotif = async (id, notifikasi) => {
    const {data, error} = await supabase.from('notifikasi').update(notifikasi).eq('notification_id', id);

    if (error) throw new Error(error.message);
    return data;
}

const deleteNotif = async (id) => {
    const {data, error} = await supabase.from('notifikasi').delete().eq('notification_id', id);

    if (error) throw new Error(error.message);
    return data;
}

module.exports = {
    getAllNotif,
    getNotifById,
    createNotif,
    updateNotif,
    deleteNotif
}