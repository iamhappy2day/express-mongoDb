const fs = require('fs');
  
class UsersService {

  //get all users
  getAllUsers() {
   return new Promise((res, rej) => {
     fs.readFile('./data.json', (err, data) => {
       if(err) {
         return res(false);
       }
       return res(JSON.parse(data))
     })
   })
 }
  //create user
  createUser(user) {
      return new Promise((res, rej) => {

        fs.readFile('./data.json', function (err, data) {
          const json = JSON.parse(data)
          json.push(user)

        fs.writeFile('./data.json', JSON.stringify(json), (err, response) => {
          if(err)
          return res(false);
  
          return res(user);
        })
      })
    })
  }
  // update user
  updateUser(id, user, userList) {
      return new Promise((res, rej) => {
    
        const targetUser = userList.find((user) => user._id == id);
        console.log(targetUser)
        if(!targetUser) {
          res.status(404).send('Error! There is no such user ...')
          return;
      };

      //update user in JSON
      targetUser.name = user.name;
      targetUser.age = user.age;
      targetUser.sex = user.sex;

        fs.writeFile('./data.json', JSON.stringify(userList), (err, response) => {
          if(err)
          return res(false);
          return res('user was updated')
      })
    })
  }

  // delete user
  deleteUser(id, userList) {
    return new Promise((res, rej) => {
      console.log(userList)
      const targetUser = userList.find((user) => user._id == id);

      if(!targetUser) {
          res.status(404).send('Error! There is no such user ...')
          return;
      };

      const index = userList.indexOf(targetUser);
      userList.splice(index,1)
      fs.writeFile('./data.json', JSON.stringify(userList), (err, response) => {
        if(err)
        return res(false);
        return res('user was deleted')
      })
    })
  }
};

module.exports = UsersService;