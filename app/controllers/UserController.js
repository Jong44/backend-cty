const UserService = require('../services/UserService');

let response = {
    message: '',
    data: null,
    status: '',
}

exports.getAllUser = async (req, res) => {
    try {
        const data = await UserService.getAllUser();
        if (data.length == 0) {
            response = {
                status: "success",
                message: "No users found",
                data: []
            }
        } else {
            response = {
                status: "success",
                message: "Users found",
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

exports.getUserById = async (req, res) => {
    try {
        const data = await UserService.getUserById(req.params.id);
        if (data.length === 0) {
            response = {
                status: "success",
                message: "No users found",
                data: null
            }
        } else {
            response = {
                status: "success",
                message: "Users found",
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

exports.createUser = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email) {
            response = {
                status: "error",
                message: "Content are required",
                data: []
            }
            res.status(400).json(response);
            return;
        }
        const payload = {
            name: req.body.name,
            email: req.body.email,
            photo_profile: req.body.photo_profile,
            created_at: new Date(),
            updated_at: new Date(),
        }
        const data = await UserService.createUser(payload);
        response = {
            status: "success",
            message: "User created",
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

exports.updateUser = async (req, res) => {
    try {
        const data = await UserService.updateUser(req.params.id, req.body);
        response = {
            status: "success",
            message: "User updated",
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

exports.deleteUser = async (req, res) => {
    try {
        const data = await UserService.deleteUser(req.params.id);
        response = {
            status: "success",
            message: "User deleted",
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