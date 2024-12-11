const NodeServices = require('../services/NodeServices');

let response = {
    message: '',
    data: null,
    status: '',
}

exports.getAllNode = async (req, res) => {
    try {
        const data = await NodeServices.getAllNode();
        if (data.length == 0) {
            response = {
                status: "success",
                message: "No node found",
                data: []
            }
        } else {
            response = {
                status: "success",
                message: "Node found",
                data: data
            }
        }
        res.status(200).json(response);
    } catch (error) {
        response = {
            status: "error",
            message: error.message,
            data: []
        }
        res.status(500).json(response);
    }
}

exports.getNodeById = async (req, res) => {
    try {
        const data = await NodeServices.getNodeById(req.params.id);
        if (data.length === 0) {
            response = {
                status: "success",
                message: "No node found",
                data: null
            }
        } else {
            response = {
                status: "success",
                message: "Node found",
                data: data?.[0]
            }
        }
        res.status(200).json(response);
    } catch (error) {
        response = {
            status: "error",
            message: error.message,
            data: []
        }
        res.status(500).json(response);
    }
}

exports.createNode = async (req, res) => {
    try {
        if (!req.body.hash_prev || !req.body.data_encrypted || !req.body.encrypted_key || !req.body.hash) {
            response = {
                status: "error",
                message: "Content are required",
                data: []
            }
            res.status(400).json(response);
            return;
        }
        const payload = {
            hash_prev: req.body.hash_prev,
            data_encrypted: req.body.data_encrypted,
            encrypted_key: req.body.encrypted_key,
            created_at: new Date(),
            hash: req.body.hash
        }
        const data = await NodeServices.createNode(payload);
        response = {
            status: "success",
            message: "Node created",
            data: data
        }
        res.status(201).json(response);
    } catch (error) {
        response = {
            status: "error",
            message: error.message,
            data: []
        }
        res.status(500).json(response);
    }
}

exports.updateNode = async (req, res) => {
    try {
        const data = await NodeServices.updateNode(req.params.id, req.body);
        response = {
            status: "success",
            message: "Node updated",
            data: data
        }
        res.status(200).json(response);
    } catch (error) {
        response = {
            status: "error",
            message: error.message,
            data: []
        }
        res.status(500).json(response);
    }
}

exports.deleteNode = async (req, res) => {
    try {
        const data = await NodeServices.deleteNode(req.params.id);
        response = {
            status: "success",
            message: "Node deleted",
            data: data
        }
        res.status(200).json(response);
    } catch (error) {
        response = {
            status: "error",
            message: error.message,
            data: []
        }
        res.status(500).json(response);
    }
}