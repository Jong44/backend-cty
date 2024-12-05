const supabase = require('../config/configSupabase');

const createUser = async (user) => {
    const {data, error} = await supabase.from('user').insert(user);

    if (error) throw new Error(error.message);
    return data;
}

const getAllUser = async () => {
    const {data, error} = await supabase.from('user').select('*');

    if (error) throw new Error(error.message);
    return data;
}

const getUserById = async (id) => {
    const {data, error} = await supabase.from('user').select('*').eq('id_user', id);

    if (error) throw new Error(error.message);
    return data;
}

const updateUser = async (id, user) => {
    const {data, error} = await supabase.from('user').update(user).eq('id_user', id);

    if (error) throw new Error(error.message);
    return data;
}

const deleteUser = async (id) => {
    const {data, error} = await supabase.from('user').delete().eq('id_user', id);

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