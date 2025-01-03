const supabase = require('../config/configSupabase');

const createDraftTransaction = async (transaksi_draft) => {
    const {data, error} = await supabase.from('transaksi_draft').insert(transaksi_draft);
    if (error) throw new Error(error.message);
    return data;
}

const getAllDraftTransaction = async () => {
    const {data, error} = await supabase.from('transaksi_draft').select('*');

    if (error) throw new Error(error.message);
    return data;
}

const getDraftTransactionById = async (id) => {
    const {data, error} = await supabase.from('transaksi_draft').select('*').eq('transaksi_id', id);

    if (error) throw new Error(error.message);
    return data;
}

const getDraftTransactionByUserId = async (idUser) => {
    const {data, error} = await supabase.from('transaksi_draft').select('*').eq('uuid_penerima', idUser);

    if (error) throw new Error(error.message);
    return data;
}

const getDraftByEmail = async (email) => {
    const {data, error} = await supabase.from('transaksi_draft').select('*').eq('email', email);

    if (error) throw new Error(error.message);
    return data;
}


const deleteDraftTransaction = async (id) => {
    const {data, error} = await supabase.from('transaksi_draft').delete().eq('transaksi_id', id);

    if (error) throw new Error(error.message);
    return data;
}

const deleteDraftTransactionByUserId = async (idUser) => {
    const {data, error} = await supabase.from('transaksi_draft').delete().eq('uuid_pengirim' || 'uuid_penerima', idUser);

    if (error) throw new Error(error.message);
    return data;
}

const readAllDraftTransaction = async(idUser) => {
    const {data, error} = await supabase.from('transaksi_draft').update({'status':true}).eq('uuid_pengirim' || 'uuid_penerima', idUser).select();

    if (error) throw new Error(error.message);
    return data;
}

const deleteAllDraftTransaction = async (idUser) => {
    const {data, error} = await supabase.from('transaksi_draft').delete().eq('uuid', idUser);

    if (error) throw new Error(error.message);
    return data;
}

module.exports = {
    createDraftTransaction,
    getAllDraftTransaction,
    getDraftTransactionById,
    getDraftTransactionByUserId,
    deleteDraftTransaction,
    getDraftByEmail,
}

