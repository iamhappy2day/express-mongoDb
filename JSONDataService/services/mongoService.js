
const mongoose = require('mongoose');
const UserSchema = require('./../models/user');

class MongoDBService {

    getAllUsers() {
        return UserSchema.find()   
    }

    createUser(user){
        user.save() // возвращает promise
    }
    
    updateUser(id, user){
    
    return  UserSchema.updateOne(
            {_id: id},
            {$set: {
                name: user.name,
                age: user.age,
                sex: user.sex
            }}
        ); 
    };

    deleteUser(id) {
       return UserSchema.deleteOne({ _id: id})
    }
    
}

module.exports = MongoDBService;