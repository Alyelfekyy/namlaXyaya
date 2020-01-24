const express = require('express');
const app = express();
// get,post,put,delete
const users = [
    {  username: "OmarSherif",  password: "4"},
    {  username: "Alimohamed",  password:"4"},
    {  username: "yahiabadr",  password:"4"},
    {  username: "3ebsooooo",  password:"4"}
];

app.get('/', (request, response) => {
    response.send(`<a href="/api/users">Namla</a>`);
});

app.get('/api/users', (request, response) => {
   
    response.send({data:users});
});

app.get('/api/users/:username', (request, response) => {
    var data = "";
    for(let i =0;i< users.length;i++){
        if (users[i].username===request.params.username){
            data= users[i];
            break;
        }
        
    }
    response.send({data:data || 'No student matches the requested id'});
});

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));