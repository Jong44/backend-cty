const NodeRSA = require('node-rsa');
const supabase = require('../config/configSupabase');

const createUser = async (email, uuid) => {
    const key = new NodeRSA({b: 2048});
    const publicKey = key.exportKey('public');
    const privateKey = key.exportKey('private');
    
    const {data, error} = await supabase.from('users').insert({email: email, uuid_user: uuid, public_key: publicKey, private_key: privateKey}); // id_user is a
    
    if (error) throw new Error(error.message);
    return data;
}

const getAllUser = async () => {
    const {data, error} = await supabase.from('users').select('*');

    if (error) throw new Error(error.message);
    return data;
}

const getUserById = async (id) => {
    const {data, error} = await supabase.from('users').select('*').eq('id_user', id);

    if (error) throw new Error(error.message);
    return data;
}

const updateUser = async (id, user) => {
    const {data, error} = await supabase.from('users').update(user).eq('id_user', id);

    if (error) throw new Error(error.message);
    return data;
}

const deleteUser = async (id) => {
    const {data, error} = await supabase.from('users').delete().eq('id_user', id);

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