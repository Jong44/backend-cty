const SertifikatService = require('../services/SertifikatService');

let response = {
    message: '',
    data: null,
    status: '',
}


exports.createSertifikat = async (req, res) => {
    try {
        if (!req.body.file || !req.body.key || !req.body.id_user) {
            response = {
                status: "error",
                message: "Content are required",
                data: []
            }
            res.status(400).json(response);
            return;
        }
        const payload = {
            file: req.body.file,
            key: req.body.key,
            id_user: req.body.id_user,
            created_at: new Date(),
            updated_at: new Date(),
        }
        const data = await SertifikatService.createSertifikat(payload);
        response = {
            status: "success",
            message: "Sertifikat created",
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

exports.getAllSertifikat = async (req, res) => {
    try {
        const data = await SertifikatService.getAllSertifikat();
        if (data.length == 0) {
            response = {
                status: "success",
                message: "No Sertifikat found",
                data: []
            }
        } else {
            response = {
                status: "success",
                message: "Sertifikat found",
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

exports.getSertifikatById = async (req, res) => {
    try {
        const data = await SertifikatService.getSertifikatById(req.params.id);
        if (data.length === 0) {
            response = {
                status: "success",
                message: "No Sertifikat found",
                data: null
            }
        } else {
            response = {
                status: "success",
                message: "Sertifikat found",
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

exports.getAllSertifikat = async (req, res) => {
    try {
        const data = await SertifikatService.getAllSertifikat();
        if (data.length == 0) {
            response = {
                status: "success",
                message: "No Sertifikat found",
                data: []
            }
        } else {
            response = {
                status: "success",
                message: "Sertifikat found",
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

exports.getSertifikatById = async (req, res) => {
    try {
        const data = await SertifikatService.getSertifikatById(req.params.id);
        if (data.length === 0) {
            response = {
                status: "success",
                message: "No Sertifikat found",
                data: null
            }
        } else {
            response = {
                status: "success",
                message: "Sertifikat found",
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

exports.updateSertifikat = async (req, res) => {
    try {
        const data = await SertifikatService.updateSertifikat(req.params.id, req.body);
        response = {
            status: "success",
            message: "Sertifikat updated",
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

exports.deleteSertifikat = async (req, res) => {
    try {
        const data = await SertifikatService.deleteSertifikat(req.params.id);
        response = {
            status: "success",
            message: "Sertifikat deleted",
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