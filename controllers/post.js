
const test = (req, res) => {
    return res.status(200).json({
        mensaje: 'accion de prueba'
    })
}

const test2 = (req,res) => { 
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

module.exports = {
    test,
    test2
}