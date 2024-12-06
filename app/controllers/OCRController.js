const OCRService = require('../services/OCRServices');
const fs = require('fs')

let response = {
    message: '',
    data: null,
    status: '',
}

exports.fileRecognize = async (req, res) => {
    try{
        const data = await OCRService.recognize(req.file);
        // await fs.unlinkSync(req.file.path)
        response = {
            status: 'success',
            message: 'File recognized successfully',
            data: data,
        }
        res.status(200).json(response);
    }catch(error){
        response = {
            status: 'error',
            message: error.message,
            data: null,
        }
        res.status(500).json(response);
    }
}
