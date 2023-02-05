const { conexion } = require('./database/connection') //importando metodo de conexion 
const express = require('express') //Para el servidor 
const cors = require('cors')

// Conectando a la bd
conexion();

//Create node server
const app = express();
const puerto = 3900;

//Configurar cors
app.use(cors());


//Leer y convertir body a objeto js
//Parsear peticiones a objetos de js
app.use(express.json())


//Rutas desde el archivo de routas;
const postRoutes = require('./routes/post')
//Se cargan las rutas
app.use('/api',postRoutes) //se cargan todas las rutas que se tengan en el archivo


//Routas hardcoded ---------------------
// app.get('/', (req, res) => {

//     return res.status(200).send(
//         '<h1> Testing index </h1>'
//     )
// })


//Crear servidor y escuchar peticiones 
app.listen(puerto, () => {
    console.log('Server running and listening');
})
