const express = require('express')
const router = express.Router()

const postController = require('../controllers/post')

//Routas de prueba
//(Ruta que se asignará, metodo asignado a la ruta cargarlo desde el controlador )
router.get("/test", postController.test)

router.get("/curso", postController.test2)


module.exports = router;