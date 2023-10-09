import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

// boilerplate express app
app.use(cors()); //enable CORS requests
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// return list of users
const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

//get by name & job: ex - http://localhost:8000/users?name=Mac?job=Bouncer
const findUserByNameByJob = (name, job) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name)
        .filter( (user) => user['job'] === job);
}
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameByJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

//get by name: ex - http://localhost:8000/users?name=Mac
const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}
app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

//get by id: ex - http://localhost:8000/users/zap555
const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id); 
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

// using POST (boomerang extension)
const addUser = (user) => {
    const idBank = 'abcdefghijklmnopqrstuvwxyz0123456789'
    // generating random six digit mix of integers and letters for id - source: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    user['id'] = '';
    let counter = 0;
    while (counter < 6) {
        user['id'] += idBank.charAt(Math.floor(Math.random() * idBank.length));
        counter += 1;
    }
    console.log(users['users_list'])
    users['users_list'].push(user);
    console.log(users['users_list'])
    return user;
}
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    let result = addUser(userToAdd);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.status(201).send(result);
    }
});

// using DELETE (ex - http://localhost:8000/users/zap555 with boomerang extension)
const deleteUserById = (id) => { 
    let index = users['users_list']
        .indexOf(users['users_list']
        .find((user) => user['id']  === id));
    if (index !== -1) {
        users['users_list'].splice(index, 1);
        return users['users_list'];
    }
    return null;
}
app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = deleteUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        console.log(result)
        res.status(204).send(result);
    }
});

app.get('/users', (req, res) => {
    res.send(users);
});

