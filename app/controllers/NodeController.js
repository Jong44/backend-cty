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
            name: req.body.name,
            email: req.body.email,
            photo_profile: req.body.photo_profile,
            created_at: new Date(),
            updated_at: new Date(),
            uuid: req.body.uuid,
            alamat: req.body.alamat,
            nik: req.body.nik,
            file_sertifikat: req.body.file_sertifikat,
            file_ktp: req.body.file_ktp
        }
        const data = await UserService.createUser(payload);
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