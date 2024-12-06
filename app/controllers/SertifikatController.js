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

