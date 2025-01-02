const DraftTransactionServices = require('../services/TransaksiService');

let response = {
    message: '',
    data: null,
    status: '',
}

exports.getAllDraftTransaction = async (req, res) => {
    try {
        const data = await DraftTransactionServices.getAllDraftTransaction();
        if (data.length == 0) {
            response = {
                status: "success",
                message: "No Draft Transaction found",
                data: []
            }
        } else {
            response = {
                status: "success",
                message: "Draft Transaction found",
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

exports.getDraftTransactionById = async (req, res) => {
    try {
        const data = await DraftTransactionServices.getDraftTransactionById(req.params.id);
        if (data.length === 0) {
            response = {
                status: "success",
                message: "No Draft Transaction found",
                data: null
            }
        } else {
            response = {
                status: "success",
                message: "Draft Transaction found",
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

exports.getDraftTransactionByUserId = async (req, res) => {
    try {
        const data = await DraftTransactionServices.getDraftTransactionByUserId(req.params.idUser)
        if (data.length === 0) {
            response = {
                status: "success",
                message: "No Draft Transaction found",
                data: null
            }
        } else {
            response = {
                status: "success",
                message: "Draft Transaction found",
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

exports.createDraftTransaction = async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        if (!req.body.uuid_pengirim || !req.body.uuid_penerima) {
            console.error('Validation failed:', req.body);
            response = {
                status: "error",
                message: "Content are required",
                data: []
            }
            res.status(400).json(response);
            return;
        }

        const payload = {
            uuid_pengirim: req.body.uuid_pengirim,
            uuid_penerima: req.body.uuid_penerima,
            status: false,
            created_at: new Date()
        }
        console.log('Payload:', payload);

        const data = await DraftTransactionServices.createDraftTransaction(payload);
        console.log('Service Response:', data);

        response = {
            status: "success",
            message: "Draft Transaction created"
        }
        res.status(201).json(response);
    } catch (error) {
        console.error('Error:', error.message);

        response = {
            status: "error",
            message: error.message
        }
        res.status(500).json(response);
    }
}

exports.deleteDraftTransaction = async (req, res) => {
    try {
        const data = await DraftTransactionServices.deleteDraftTransaction(req.params.id);
        response = {
            status: "success",
            message: "Draft Transaction deleted",
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