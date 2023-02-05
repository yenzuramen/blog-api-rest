
const test = (req, res) => {
    return res.status(200).json({
        mensaje: 'accion de prueba'
    })
}

module.exports = {
    test
}