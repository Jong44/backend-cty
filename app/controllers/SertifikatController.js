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
        if(!req.body.nama || !req.body.email || !req.body.no_hp || !req.body.alamat || !req.body.nik || !req.files.sertifikat || !req.files.ktp || !req.body.uuid){
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
            uuid: req.body.uuid,
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

exports.getHistoryOwnershipCertificate = async (req, res) => {
    try {
        const {hash} = req.params;

        if (!hash) {
            return res.status(400).json({ error: 'Hash is required'});
        }

        const history = await sertifikatService.getHistoryOwnershipCertificate(hash);

        res.status(200).json({
            message: 'Certificate history retrieved successfully',
            data: history,
        });
    } catch (error){
        res.status(500).json({
            error: error.message,
        })

    }
}

exports.getAllSertifikatByUserId = async (req, res) => {
    try{
        if(!req.params.userId){
            response = {
                status: 'error',
                message: 'User ID is required',
            }
            return res.status(400).json(response);
        }
        const data = await sertifikatService.getAllSertifikatByUserId(req.params.userId);
        response = {
            status: 'success',
            message: 'Sertifikat fetched successfully',
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

exports.createTransactionCertificate = async (req, res) => {
    try {
        const { 
            nama,
            email, 
            nik,
            alamat,
            fingerprintSertificate, uuid} = req.body;

        if (!nama || !email || !nik || !alamat || !fingerprintSertificate || !uuid) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const result = await sertifikatService.createTransaksiSertifikat({
            nama,
            email,
            nik,
            alamat,
            uuid,
            fingerprintSertificate,
        });

        res.status(201).json({ message: 'Transaction certificate created successfully', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSertifikatByHash = async (req, res) => {
    try {
        const hash = req.params.hash;

        // Log untuk debugging

        if (!hash) {
            return res.status(400).json({ 
                status: 'error', 
                message: 'Hash is required' 
            });
        }

        const sertifikat = await sertifikatService.getSertifikatByHash(hash);

        res.status(200).json({
            status: 'success',
            message: 'Certificate retrieved successfully',
            data: sertifikat,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: `Error retrieving certificate by hash: ${error.message}`,
        });
    }
};







