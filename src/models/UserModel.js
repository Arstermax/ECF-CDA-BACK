const outils = require('../utils/outils.js')

const userSchema = new outils.mongoose.Schema({
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    projet: { type: Array, require:false},
    role: { type: String, require: true },
})

const User = outils.mongoose.model('User', userSchema)

module.exports = User;