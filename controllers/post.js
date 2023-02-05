
const validator = require('validator');
const Post = require('../models/Post'); //Controlador del post 

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

        let validateTitle = !validator.isEmpty(params.title) && validator.isLength(params.title, { min: 0, max: 50 })
        let validateContent = !validator.isEmpty(params.content)

        if (!validateTitle || !validateContent) {
            throw new Error("input not valid")
        }

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

        let validateTitle = !validator.isEmpty(data.title) && validator.isLength(data.title, { min: 0, max: 50 })
        let validateContent = !validator.isEmpty(data.content)

        if (!validateTitle || !validateContent) {
            throw new Error("input not valid")
        }

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'faltan datos: ' + error
        })
    }
    //params (id, datos a actualizar)
    Post.findOneAndUpdate({ _id: id }, data,{new:true},(error, updatedItem) => {


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

module.exports = {
    test,
    test2,
    save,
    get,
    getOnePost,
    deleteOne,
    edit
}