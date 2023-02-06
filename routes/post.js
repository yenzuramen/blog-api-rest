const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')

const multer = require('multer')

const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {//Donde se van a guardar los archivos

        //CB es donde se encuentra el directorio
        cb(null, './images/posts')
    },
    filename: (req, file, cb) => {
        cb(null, "post" + Date.now() + file.originalname)
    }
})

//middleware - metodo que se ejecuta antes de la accion del controlador
const upload = multer({storage:imgStorage})

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

router.post('/upload-img/:id',[upload.single("file0")] ,postController.upload)

//get posts
router.get("/image/:filename", postController.image)  //ultimos opcional

//get posts
router.get("/search/:search", postController.search)  //ultimos opcional


module.exports = router;