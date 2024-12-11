const AktifitasService = require('../services/AktifitasService');

let response = {
    message: '',
    data: null,
    status: '',
}

exports.getAllAktifitas = async (req, res) => {
    try {
        const data = await AktifitasService.getAllAktifitas();
        if (data.length == 0) {
            response = {
                status: "success",
                message: "No Activity found",
                data: []
            }
        } else {
            response = {
                status: "success",
                message: "Activity found",
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

exports.getAktifitasById = async (req, res) => {
    try {
        const data = await ActifitasService.getAktifitasById(req.params.id);
        if (data.length === 0) {
            response = {
                status: "success",
                message: "No Actifity found",
                data: null
            }
        } else {
            response = {
                status: "success",
                message: "Activity found",
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

exports.createAktifitas = async (req, res) => {
    try {
        if (!req.body.status|| !req.body.activity_type || !req.body.detail ) {
            response = {
                status: "error",
                message: "Content are required",
                data: []
            }
            res.status(400).json(response);
            return;
        }
        const payload = {
            log_id: req.body.log_id,
            user_id: req.body.user_id,
            node_id: req.body.node_id,
            activity_type: req.body.activity_type,
            timestamp: new Date(),
            status: req.body.status,
            detail: req.body.detail
            
        }
        const data = await AktifitasService.createAktifitas(payload);
        response = {
            status: "success",
            message: "Aktifitas created",
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

exports.updateAktifitas = async (req, res) => {
    try {
        const data = await AktifitasService.updateAktifitas(req.params.id, req.body);
        response = {
            status: "success",
            message: "Aktifitas updated",
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

exports.deleteAktifitas = async (req, res) => {
    try {
        const data = await AktifitasService.deleteAktifitas(req.params.id);
        response = {
            status: "success",
            message: "Aktifitas deleted",
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