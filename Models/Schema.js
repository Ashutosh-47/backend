const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ( {

    email: {
        type: String ,
        required: true
    } ,

    password: {
        type: String ,
        required: true
    }
} )

const user = mongoose.model ( "user" , userSchema )

const detailSchema = new mongoose.Schema ( {
   
    title: {
        type: String
    },
   
    color: {
        type: String
    },
   
    available: {
        type: String
    },
   
    model: {
        type: String
    },
   
    price: {
        type: String
    },
   
    date: {
        type: String
    }
})

const detail = mongoose.model ( "detail" , detailSchema )

module.exports = { user , detail }