const mongoose = require('mongoose')

const conexion = async() => {

    try {
       await  mongoose.connect('mongodb://localhost:27017/blog')


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