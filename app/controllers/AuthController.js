const AuthServices = require('../services/AuthServices')
const UserServices = require('../services/UserService')

let response = {
    message: '',
    data: null,
    status: '',
}

exports.register = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        // Regex to validate email
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            response = {
                status: "error",
                message: "Invalid email",
                data: {}
            }
            return res.status(400).json(response);
        }
        if (!email || !password) {
            response = {
                status: "error",
                message: "Email and password are required",
                data: {}
            }
            return res.status(400).json(response);
        }
        const dataUser = await AuthServices.register(req.body.email, req.body.password);
        if (dataUser.error) throw new Error(dataUser.error.message);
        const dataResult = await UserServices.createUser(req.body.email, dataUser.user.id);
        response = {
            status: "success",
            message: "Registered successfully, please check your email to verify your account",
            data: dataResult
        }
        res.status(200).json(response);
    } catch (error) {
        response = {
            status: "error",
            message: error.message,
            data: {
                email: req.body.email,
                password: req.body.password
            }
        }
        res.status(500).json(response);
    }
}

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // Validate email and password
        if (!email || !password) {
            const response = {
                status: "error",
                message: "Email and password are required",
                data: {}
            };
            return res.status(400).json(response);
        }

        // Call the login service
        const data = await AuthServices.login(email, password);
        const response = {
            status: "success",
            message: "Logged in successfully",
            data: data.user
        };
        res.status(200).json(response);
    } catch (error) {
        const response = {
            status: "error",
            message: error.message,
            data: {
                email: req.body.email,
                password: req.body.password
            }
        };
        res.status(500).json(response);
    }
};

exports.logout = async (req, res) => {
    try{
        const data = await AuthServices.logout();
        const response = {
            status: "success",
            message: "Logged out successfully",
            data: data
        };
        res.status(200).json(response);
    }

    catch (error) {
        const response = {
            status: "error",
            message: error.message,
            data: {}
        };
        res.status(500).json(response);
    }
}