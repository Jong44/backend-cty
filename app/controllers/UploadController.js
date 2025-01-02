const UploadService = require('../services/UploadService');

exports.uploadPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const result = await UploadService.uploadPhoto(req.file);
        res.status(200).json({ message: 'File uploaded successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
