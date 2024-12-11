const NodeRSA = require('node-rsa');
const supabase = require('../config/configSupabase');

const createUser = async (users) => {
    
    const {data, error} = await supabase.from('users').insert(users); // id_user is a
    if (error) throw new Error(error.message);
    return data;
}

const getAllUser = async () => {
    const {data, error} = await supabase.from('users').select('*');

    if (error) throw new Error(error.message);
    return data;
}

const getUserById = async (id) => {
    const {data, error} = await supabase.from('users').select('*').eq('user_id', id);

    if (error) throw new Error(error.message);
    return data;
}

const updateUser = async (id, user) => {
    const {data, error} = await supabase.from('users').update(user).eq('user_id', id);

    if (error) throw new Error(error.message);
    return data;
}

const deleteUser = async (id) => {
    const {data, error} = await supabase.from('users').delete().eq('user_id', id);

    if (error) throw new Error(error.message);
    return data;
}

module.exports = {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}