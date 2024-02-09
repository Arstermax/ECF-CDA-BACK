const User = require('../models/UserModel.js')
const outils = require("../utils/outils.js")
const dotenv = require('dotenv')
dotenv.config();

const UserController = {
    Register: async (req, res) => {
        try {
            const { firstname, lastname, email, password } = req.body;
            const userdb = await User.findOne({ email })
            if (!userdb) {
                const hashedPassword = await outils.bcrypt.hash(password, 10)
                const newUser = new User({ firstname, lastname, email, password: hashedPassword, role: 'Users', projet: [] })
                await newUser.save();
            } else {
                return res.status(404).json({ error: "Cette email existe déjà merci d'en prendre une autre" })
            }
        } catch (error) {
            return res.status(500).json({ error: "Une erreur est survenue lors de la création de votre compte" })
        }
    },
    Update: async (req, res) => {
        try {
            const { firstname, email, lastname } = req.body
            const userdb = await User.find({ email })
            if (userdb) {
                userdb.firstname =  firstname;
                userdb.lastname = lastname;
                
            } else {
                return res.status(404).json({ error: "Cette email existe déjà merci d'en prendre une autre" })
            }
        } catch (error) {
            return res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de votre compte" })
        }
    },
    Delete: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ message: "Une erreur est survenue lors de la suppression de votre compte" })
        }
    },
    GetUserById: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ message: "Une erreur est survenue lors de la création de votre compte" })
        }
    },
    Login: async (req, res) => {
        try {

        } catch (error) {
            return res.status(500).json({ message: "Une erreur est survenue lors de la suppression de votre compte" })
        }
    }
}

module.exports = UserController