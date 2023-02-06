const validator = require('validator')

const validatePost = (data) => {


    let validateTitle = !validator.isEmpty(data.title) && validator.isLength(data.title, { min: 0, max: 50 })
    let validateContent = !validator.isEmpty(data.content)

    if (!validateTitle || !validateContent) {
        throw new Error("input not valid")
    }


}

module.exports = {
    validatePost
}