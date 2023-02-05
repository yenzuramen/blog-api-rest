const express = require('express')
const router = express.Router()

const postController = require('../controllers/post')

//Routas de prueba
//(Ruta que se asignará, metodo asignado a la ruta cargarlo desde el controlador )
router.get("/test", postController.test)

router.get("/curso", postController.test2)

//Para crear y guardar y enviar algo se usa post
router.post("/save", postController.save)

//get posts
router.get("/getPosts/:ultimos?", postController.get)  //ultimos opcional

//get posts
router.get("/Post/:id", postController.getOnePost)  //ultimos opcional

//get delete
router.delete("/Post/:id", postController.deleteOne)  //ultimos opcional

//edit posts
router.put("/Post/:id", postController.edit)  //ultimos opcional





module.exports = router;