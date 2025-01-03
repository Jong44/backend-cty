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

        if (!req.body.uuid_pengirim || !req.body.nama || !req.body.email || !req.body.alamat || !req.body.fingerprintSertificate) {
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
            nama_penerima: req.body.nama,
            email: req.body.email,
            alamat: req.body.alamat,
            nik: req.body.nik,
            fingerprint: req.body.fingerprintSertificate,
            status: false,
            created_at: new Date()
        }

        const data = await DraftTransactionServices.createDraftTransaction(payload);

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

exports.getDraftTransactionByEmailAddress = async (req, res) => {
    const email = req.body.email;
    try {
        const data = await DraftTransactionServices.getDraftByEmail(email);
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

