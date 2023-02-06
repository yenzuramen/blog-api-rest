
const fs = require('fs')
const path = require('path')//Let's us get a file and send it with res.sendFile

const validator = require('validator');
const Post = require('../models/Post'); //Controlador del post 

const { validatePost } = require('../helpers/validatePost')

const test = (req, res) => {
    return res.status(200).json({
        mensaje: 'accion de prueba'
    })
}

const test2 = (req, res) => {
    return res.status(200).json(
        [{
            course: 'React Master',
            student: 'Yen GM',
            url: 'https://www.udemy.com/course/master-en-react-aprender-reactjs-hooks-mern-nodejs-jwt/learn/lecture/33022258#questions'
        },
        {
            course: 'React Master',
            student: 'Yen GM',
            url: 'https://www.udemy.com/course/master-en-react-aprender-reactjs-hooks-mern-nodejs-jwt/learn/lecture/33022258#questions'
        }]
    )
}

const save = (req, res) => {

    //Get params from user by post 
    let params = req.body

    console.log(params);

    //validate data
    try {

        validatePost(params)
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'faltan datos: ' + error
        })
    }


    //Create object with model (automatic)
    const post = new Post(params);
    // //manual-----
    // // const post = new Post();
    // //post.title: params.title

    //Save post on database
    post.save((error, savedItem) => {

        console.log('---------------------------------');
        //si hay un error
        if (error || !savedItem) {
            throw new Error("Couldnt save info in database")
        }

        //si todo sale bien
        return res.status(200).json({
            status: 'succes',
            post: savedItem
        })
    });

}

const get = (req, res) => {

    //consulta y callback
    let query = Post.find({})
    if (req.params.ultimos) {
        query.limit(2)
    }


    query.sort({ date: -1 }) ///desc (newer first)
        .exec((error, posts) => {
            if (error || !posts) {

                return res.status(404).json({
                    status: 'error',
                    mensaje: 'No se han encontrado posts'
                })

            }

            return res.status(200).send({
                status: 'succes',
                length: posts.length,
                ultimos: req.params.ultimos,
                posts
            })
        })


}

const getOnePost = (req, res) => {
    //Get id by URL
    let id = req.params.id;
    //search Post
    Post.findById(id, (error, post) => {
        //Si no existe error
        if (error || !post) {

            return res.status(404).json({
                status: 'error',
                mensaje: 'No se han encontrado el post'
            })

        }
        //Si existe resultado
        return res.status(200).send({
            status: 'succes',
            post
        })
    })
    //Si no existe devolver error

    //Si existe devolver resultado

}

const deleteOne = (req, res) => {

    let id = req.params.id;


    Post.findOneAndDelete({ _id: id }, (error, deletedItem) => {
        if (error) {
            return res.status(400).json({
                status: 'error',
                mensaje: 'couldnt delete'
            })

        }

        //Si existe resultado
        return res.status(200).send({
            status: 'succes',
            deletedItem
        })
    })

}

const edit = (req, res) => {
    let id = req.params.id

    let data = req.body
    try {

        validatePost(data)
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'faltan datos: ' + error
        })
    }

    //params (id, datos a actualizar)
    Post.findOneAndUpdate({ _id: id }, data, { new: true }, (error, updatedItem) => {


        if (error) {
            return res.status(400).json({
                status: 'error',
                mensaje: 'couldnt update'
            })
        }

        //Si existe resultado
        return res.status(200).send({
            status: 'succes',
            updatedItem
        })
    })


}

const upload = (req, res) => {

    //Configurar multer --en rutas

    if (!req.file && !req.files) {
        return res.status(400).json({
            status: 'error',
            message: 'Peticion invalida'
        })
    }

    //conseguir el nombre del archivo
    let filename = req.file.originalname;

    //conseguir la extension
    let nameSplit = filename.split('\.')
    let ext = nameSplit[1]


    let allowedExtensions = ['PNG', "GIF", "JPG", "JPEG"]
    //comprobar la extension correcta
    if (!allowedExtensions.includes(ext.toUpperCase())) {
        //Deleting the file
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid file type'
            })
        })
    } else {
        let id = req.params.id


        //params (id, datos a actualizar)
        Post.findOneAndUpdate({ _id: id }, { image: req.file.filename }, { new: true },
            (error, updatedItem) => {

                if (error) {
                    return res.status(400).json({
                        status: 'error',
                        mensaje: error
                    })
                }

                //Si existe resultado
                return res.status(200).send({
                    status: 'succes',
                    updatedItem,
                    uploadedItem: req.file
                })
            })

    }

}

const image = (req, res) => {
    let filename = req.params.filename
    console.log(filename);
    let realPath = './images/posts/' + filename

    fs.stat(realPath, (error, exists) => {
        console.log(exists);
        if (exists) {
            return res.sendFile(path.resolve(realPath)) //se retorna el archivo
        } else {
            return res.status(400).json({
                status: 'error',
                message: 'Image doesnt exist'
            })
        }
    })
}

const search = (req, res) => {

    //get search string

    let search = req.params.search
    console.log(search);

    //find OR  
    Post.find({
        '$or': [
            { 'title': { "$regex": search, "$options": "i" } },
            { 'content': { "$regex": search, "$options": "i" } }
        ]
    })
        .sort({ date: -1 })
            .exec((error, foundItems) => {

                if (error || foundItems.length==0) {
                    return res.status(400).json({
                        status: 'error',
                        message: 'No se encontraron posts'
                    })
                }


                return res.status(200).send({
                    status: 'succes',
                    foundItems,
                })

            })


        

}

module.exports = {
    test,
    test2,
    save,
    get,
    getOnePost,
    deleteOne,
    edit,
    upload,
    image,
    search
}