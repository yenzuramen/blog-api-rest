const mongoose = require('mongoose')
require('dotenv').config()

const conexion = async () => {

    try {
        const DB_URI = process.env.DB_URI
        await mongoose.connect(DB_URI)


        console.log('CONNECTED SUCCESFULLY');
        //Parametros a pasar dentro de objeto
        //useNewUrlParser:true

    } catch (error) {
        console.log(error)
        throw new Error('Cant connect to the db rn bud')
    }

}

module.exports = {
    conexion
}