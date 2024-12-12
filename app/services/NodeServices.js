const supabase = require('../config/configSupabase');

const createNode = async (node) => {
    const {data, error} = await supabase.from('node').insert(node);

    if (error) throw new Error(error.message);
    return data;
}

const getAllNode = async () => {
    const {data, error} = await supabase.from('node').select('*');

    if (error) throw new Error(error.message);
    return data;
}

const getNodeById = async (id) => {
    const {data, error} = await supabase.from('node').select('*').eq('node_id', id);

    if (error) throw new Error(error.message);
    return data;
}

const updateNode = async (id, node) => {
    const {data, error} = await supabase.from('node').update(node).eq('node_id', id);

    if (error) throw new Error(error.message);
    return data;
}

const deleteNode = async (id) => {
    const {data, error} = await supabase.from('node').delete().eq('node_id', id);

    if (error) throw new Error(error.message);
    return data;
}

module.exports = {
    getAllNode,
    getNodeById,
    createNode,
    updateNode,
    deleteNode
}