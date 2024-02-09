const dotenv = require('dotenv')
dotenv.config();

const outils = require(process.env.OUTILS)

outils.mongoose.connect(`mongodb://${process.env.DB_HOST_MONGODB}:${process.env.DB_PORT_MONGODB}/${process.env.DB_DATABASE_MONGODB}`)

const db_mongodb = outils.mongoose.connection;
db_mongodb
    .on('err', console.error.bind(console,'Erreur de connexion à MongoDB'))
    .once('open',()=>{
        console.log('Connecté à mongoDB');
    })

const userRouteur = require('./src/routes/UsersRouteur.js')
const projectRouter = require('./src/routes/ProjectRouter.js')

outils.app
    .use(outils.express.json())
    .use('/user',userRouteur)
    .use('/project',projectRouter)


outils.app.listen(process.env.PORT_APP || 3001, () => {
    console.log(`Serveur en écoute sur le port ${process.env.PORT_APP}`)
});