const NotifServices = require('../services/NotifServices');

let response = {
    message: '',
    data: null,
    status: '',
}

exports.getAllNotif = async (req, res) => {
    try {
        const data = await NotifServices.getAllNotif();
        if (data.length == 0) {
            response = {
                status: "success",
                message: "No notification found",
                data: []
            }
        } else {
            response = {
                status: "success",
                message: "Notification found",
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

exports.getNotifById = async (req, res) => {
    try {
        const data = await NotifServices.getNotifById(req.params.id);
        if (data.length === 0) {
            response = {
                status: "success",
                message: "No notification found",
                data: null
            }
        } else {
            response = {
                status: "success",
                message: "Notification found",
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

exports.createNotif = async (req, res) => {
    try {
        if (!req.body.message || !req.body.is_read) {
            response = {
                status: "error",
                message: "Content are required",
                data: []
            }
            res.status(400).json(response);
            return;
        }
        const payload = {
            message: req.body.message,
            is_read: req.body.is_read,
            created_at: new Date()
        }
        const data = await NotifServices.createNotif(payload);
        response = {
            status: "success",
            message: "Notification created",
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

exports.updateNotif = async (req, res) => {
    try {
        const data = await NotifServices.updateNotif(req.params.id, req.body);
        response = {
            status: "success",
            message: "Notification updated",
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

exports.deleteNotif = async (req, res) => {
    try {
        const data = await NotifServices.deleteNotif(req.params.id);
        response = {
            status: "success",
            message: "Notification deleted",
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

exports.getNotifByIdUser = async (req, res) => {
    try {
        const data = await NotifServices.getNotifByIdUser(req.params.idUser)
        if (data.length === 0) {
            response = {
                status: "success",
                message: "No notification found",
                data: null
            }
        } else {
            response = {
                status: "success",
                message: "Notification found",
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

exports.readAllNotifikasi = async (req, res) => {
    try {
        const data = await NotifServices.readAllNotifikasi(req.params.idUser)
        if (data.length === 0) {
            response = {
                status: "success",
                message: "No notification found",
                data: null
            }
        } else {
            response = {
                status: "success",
                message: "Notification found",
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

exports.deleteAllNotifikasi = async (req, res) => {
    try {
        const data = await NotifServices.deleteAllNotifikasi(req.params.idUser)
        if (data.length === 0) {
            response = {
                status: "success",
                message: "No notification found",
                data: null
            }
        } else {
            response = {
                status: "success",
                message: "Notification found",
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