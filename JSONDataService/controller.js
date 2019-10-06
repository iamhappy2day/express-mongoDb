
const Joi = require('@hapi/joi');
const UserSchema = require('./models/user');
const jsonDBService = require('./services/JSONservice');
const mongoDBService = require('./services/mongoService');


const service = new mongoDBService;

const controller = class Controller {
    
    //GET ALL users method
    async getAllUsers(req,res) {
        return res.status(200).send(await service.getAllUsers());
    }

    //GET user method
    async getUser(req,res) {
        const userList = await service.getAllUsers();
        const targetUser = userList.find((user) => user._id == req.params.id);
        if(!targetUser) {
            res.status(404).send('Error! There is no such user ...')
            return;
        };
        res.send(targetUser)
    }

    //ADD user method
    async addUser(req,res) {
        
        //validation of req
        const result = validation(req);
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        };
        // user shema 
        const user = new UserSchema({
            name: req.body.name,
            age: req.body.age,
            sex: req.body.sex
        });

        await service.createUser(user);
        res.send('User was created!');
    }

    //UPDATE user method
    async updateUser(req,res) {

        //validation of request
        const result = validation(req);
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        };
    
        const userList = await service.getAllUsers();
        const updUser = await service.updateUser(req.params.id, req.body, userList)
        if (updUser) {
        res.send('User was updated!')
        }
    }

    //DELETE user method
    async deleteUser(req,res) {

        const userList = await service.getAllUsers();
        const id = req.params.id
        res.send(await service.deleteUser(id, userList))

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