const OCRService = require('../services/OCRServices');
const fs = require('fs')

let response = {
    message: '',
    data: null,
    status: '',
}

exports.fileRecognizeSertifikat = async (req, res) => {
    try{
        const data = await OCRService.recognizeSertifikat(req.file);
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

exports.fileRecognizeKTP = async (req, res) => {
    try{
        const data = await OCRService.recoginzeKTP(req.file);
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

