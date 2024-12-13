const { console } = require('inspector')
const sertifikatService = require('../services/SertifikatService')
const fs = require('fs')

let response = {
    message: '',
    data: null,
    status: '',
}

exports.createSertifikat = async (req, res) => {
    try{
        if(!req.body.nama || !req.body.email || !req.body.no_hp || !req.body.alamat || !req.body.nik || !req.files.sertifikat || !req.files.ktp){
            response = {
                status: 'error',
                message: 'All fields are required',
            }
            return res.status(400).json(response);
        }
        const payload = {
            nama: req.body.nama,
            email: req.body.email,
            no_hp: req.body.no_hp,
            alamat: req.body.alamat,
            nik: req.body.nik,    
            sertifikat: req.files.sertifikat,
            ktp: req.files.ktp,
            user_id: req.body.user_id,
        }
        const data = await sertifikatService.createSertifikat(payload);
        response = {
            status: 'success',
            message: 'Sertifikat created successfully',
            data: data,
        }
        res.status(201).json(response);
    }catch(error){
        response = {
            status: 'error',
            message: error.message,
            data: null,
        }
        res.status(500).json(response);
    }
}

exports.getCountSertifikatByUserId = async (req, res) => {
    try{
        if(!req.params.userId){
            response = {
                status: 'error',
                message: 'User ID is required',
            }
            return res.status(400).json(response);
        }
        const data = await sertifikatService.getCountSertifikatByUserId(req.params.userId);
        response = {
            status: 'success',
            message: 'Sertifikat count fetched successfully',
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

