const User = require('../models/UserModel.js')
const dotenv = require('dotenv')
dotenv.config();


const ProjectController = {
    FindProject: async (req, res) => {
        try {
            const { id, id_project } = req.params;
            const userdb = await User.findOne({ _id: id })
            if (userdb) {
                try {
                    const { projet } = userdb;
                    console.log(id_project);
                    const obj = projet.find(({ id }) => id == id_project)
                    console.log(obj);
                    return res.status(201).json(obj)
                } catch (error) {
                    console.error(error);
                    res.status(400).json({ error: "Aucun project exist \¯\\_(ツ)_//¯" });
                }
            }
            res.status(400).json({ error: 'Utilisateur introuvable' })
        } catch (error) {
            res.status(500).json({ error: "Projet introuvable" })
        }
    },
    FindAllProject: async (req, res) => {
        try {
            const { id, id_project } = req.params;
            const userdb = await User.findOne({ _id: id })
            if (userdb) {
                try {
                    const { projet } = userdb;
                    return res.status(201).json(projet)
                } catch (error) {
                    console.error(error);
                    res.status(400).json({ error: "Aucun project exist \¯\\_(ツ)_//¯" });
                }
            }
            res.status(400).json({ error: 'Utilisateur introuvable' })
        } catch (error) {
            res.status(500).json({ error: "Projet introuvable" })
        }
    },
    AddProject: async (req, res) => {
        try {
            const { id } = req.params
            const userdb = await User.findOne({ _id: id })
            if (userdb) {
                const { description, name } = req.body

                const newProject = {
                    id: Date.now(),
                    description,
                    name,
                    tache: []
                }

                const addProject = await User.findByIdAndUpdate(
                    { _id: id },
                    { $push: { projet: newProject } }
                )
                if (!addProject) { return res.status(404).json({ error: "Votre Projet ne sait pas enregister correctement" }) }

                return res.status(201).json({ message: `votre projet ${name} à été ajouter` })
            }
            res.status(404).json({ error: "Utilisateur introuvable" })

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "l'Ajout ne sait pas fait" })
        }
    },
    UpdateProject: async (req, res) => {
        try {
            const { id, id_project } = req.params;
            const { name, description } = req.body
            const userdb = await User.findOne({ _id: id })
            if (userdb) {
                const projet = userdb.projet.find(({ id }) => id == id_project)
                const projetIndex = userdb.projet.findIndex(({ id }) => id == id_project)

                console.log(projetIndex);

                if (name != "") { projet.name = name }
                if (description != "") { projet.description = description }

                const updateProject = await User.findOneAndUpdate(
                    { _id : id  },
                    { $set: { [`projet.${projetIndex}`]: projet } }
                    
                )
                if (updateProject) {
                    return res.status(201).json({ message: "Votre projet à été modifier" })
                }
                return res.status(404).json({ error: "Projet introuvable" })
            }
            return res.status(404).json({ error: "Utilisateur non trouvé" })

        } catch (error) {
            console.error(error);
            return res.status(505).json({ error: "Erreur serveur" })

        }
    },

    ProjetDelete: async (req, res) => {
        try {
            const { id, id_project } = req.params;
            const userdb = await User.findOne({ _id: id })
            if (userdb) {
                const findElement = userdb.projet.find(({ id }) => id == id_project)
                const deleteProject = await User.updateOne(
                    { _id: id },
                    { $pull: { projet: findElement } }
                )
                if (deleteProject) {
                    return res.status(201).json({ message: 'Votre Projet à été Supprier avec succées' })
                }
                return res.status(404).json({ error: "projet not found" })
            }
            res.status(400).json({ error: 'Utilisateur introuvable' })
        } catch (error) {
            res.status(500).json({ error: "Projet introuvable" })
        }
    }
}

module.exports = ProjectController