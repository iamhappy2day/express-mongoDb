
const userList = require('./data.json');
const Joi = require('@hapi/joi');

const controller = class Controller {

    //get all users method
    getAllUsers(req,res) {
        res.send(userList)
    }

    //get user method
    getUser(req,res) {
        const targetUser = userList.find((user) => user.id == req.params.id);
        if(!targetUser) {
            res.status(404).send('Error! There is no such user ...')
            return;
        };
        res.send(targetUser)
    }

    //add user method
    addUser(req,res) {
        const result = validation(req);
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        };

        const newUser = {
            "id": userList.length + 1,
            "name": req.body.name,
            "age": req.body.age,
            "sex": req.body.sex
        };
     
        userList.push(newUser);
        res.send(newUser);
    }

    //update user method
    updateUser(req,res) {
        const targetUser = userList.find((user) => user.id == req.params.id);

        if(!targetUser) {
            res.status(404).send('Error! There is no such user ...')
            return;
        };

        const result = validation(req);
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        };

        targetUser.name = req.body.name;
        targetUser.age = req.body.age;
        targetUser.sex = req.body.sex;

        res.send(targetUser)
    }
    //delete user method
    deleteUser(req,res) {
        const targetUser = userList.find((user) => user.id == req.params.id);

        if(!targetUser) {
            res.status(404).send('Error! There is no such user ...')
            return;
        };

        const index = userList.indexOf(targetUser);
        userList.splice(index,1)
        res.send(targetUser)
    }
};

// Joi validation function
function validation(req) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        age: Joi.number().integer().min(10).required(),
        sex: Joi.string().min(4).required()
    });

    return schema.validate(req.body)
}

module.exports = controller;