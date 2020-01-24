const express = require('express');
const app = express();
app.use(express.json())
// get,post,put,delete
const users = [
    {  username: "OmarSherif",  password: "4", grades:[]},
    {  username: "Alimohamed",  password:"4", grades:[]},
    {  username: "yahiabadr",  password:"4", grades:[]},
    {  username: "3ebsooooo",  password:"4", grades:[]}
];
// users[1].username="king";
// users.push({username:"asadyalaa", password:"4", grades:[]});



app.get('/', (request, response) => {
    response.send("Welcome");
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

app.post("/api/users",(request,response) =>{
    
    if(request.body.username===undefined)
        response.send({error:"Missing username"});

    if(request.body.password===undefined)
        response.send({error:"Missing password"});
     const username=request.body.username;
     const password=request.body.password;
    users.push({username:username, password:password,grades:[]});
    response.send({msg:"User created",data:users});
    

     
})
const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));