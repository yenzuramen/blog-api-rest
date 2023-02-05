
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
    console.log('post object ---');
    console.log(post);
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

module.exports = {
    test,
    test2,
    save
}