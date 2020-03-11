const db = require('./conn');
const bcrypt = require('bcryptjs');

class User {
    constructor (id, username, email, password){
        this.id = id; 
        this.username = username; 
        this.email = email; 
        this.password = password
    }

//     async addUser(){
//         try {
//             const response = 
//             return response; 

//         }catch(e){
//             return e 
//         }
//     }
}