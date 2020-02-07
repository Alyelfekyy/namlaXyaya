const express =require("express");
const router =express.Router()
var users = [
    {  username: "OmarSherif",  password: "4", grades:[{courseName:"Cs",grades:"C",creditHourse:4}]},
    {  username: "Alimohamed",  password:"4", grades:[]},
    {  username: "yahiabadr",  password:"4", grades:[]},
    {  username: "3ebsooooo",  password:"4", grades:[]}
];

router.get('/', (request, response) => {
    
    response.send({data:users});
});

router.get('/:username', (request, response) => {
    var data = "";
    for(let i =0;i< users.length;i++){
        if (users[i].username===request.params.username){
            data= users[i];
            break;
        }
        
    }
    response.send({data:data || 'No student matches the requested id'});
});

router.post("/",(request,response) =>{
 
    if(request.body.username===undefined)
        response.send({error:"Missing username"});

    if(request.body.password===undefined)
        response.send({error:"Missing password"});
     const username=request.body.username;
     const password=request.body.password;
    users.push({username:username, password:password,grades:[]});
    response.send({msg:"User created",data:users});
        
})
router.put("/:username",(request,response) =>{
    for(let i =0;i< users.length;i++){
        if (users[i].username===request.params.username){
             users[i].username=request.body.username;
            break;
        }
        
    }
    response.send({msg:"User updated",data:users});
})

 router.delete("/:username",(request,response) =>{
    var newdata=[];
     for(let i =0;i< users.length;i++){
         if (users[i].username!==request.params.username){
              newdata.push(users[i])
             
         }
        
     }
     users=newdata;
     response.send({msg:"User deleted",data:newdata});
})

router.put("/addTempGrade/:username",(request,response) =>{
    var tempData=[];
    const courseName=request.body.courseName;
    const grade=request.body.grade;
    const creditHours=request.body.creditHours
    for(let i =0;i< users.length;i++){
        if (users[i].username===request.params.username){
               tempData=(users[i].grades[j]);
            tempData.push({courseName:courseName, grade:grade, creditHours:creditHours});
            break;
           
        }
        
    }
  
    response.send({msg:"temp Grade Added",data:tempData});
})  

module.exports=router;