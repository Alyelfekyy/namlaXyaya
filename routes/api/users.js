const express =require("express");
const router =express.Router()
var users = [
    {  username: "OmarSherif",  password: "4", grades:[{courseName:"ALi",grade:"A",creditHours:4}]},
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

router.put("/addGrade/:username",(request,response) =>{
    const courseName=request.body.courseName;
    const grade=request.body.grade;
    const creditHours=request.body.creditHours
    for(let i =0;i< users.length;i++){
        if (users[i].username===request.params.username){
            users[i].grades.push({courseName:courseName, grade:grade, creditHours:creditHours})
            break;
           
        }
        
    }
   
    response.send({msg:"Course Added",data:users});
})

router.get('/calculateGpa/:username', (request, response) => {
    const userName=request.params.username;
    var x=0;
    var y=0;
    number=0;
    gpa=0.0;
    for(let i=0;i< users.length;i++){
        if(users[i].username===userName)
        for(let j=0;j<users[i].grades.length;j++){
            if(users[i].grades[j].grade== "A+")
			number = 0.7;
		else if(users[i].grades[j].grade== "A")
			number = 1.0;
		else if(users[i].grades[j].grade == "A-")
			number = 1.3;
		else if(users[i].grades[j].grade == "B+")
			number = 1.7;
		else if(users[i].grades[j].grade == "B")
			number = 2.0;
		else if(users[i].grades[j].grade == "B-")
			number = 2.3;
		else if(users[i].grades[j].grade == "C+")
			number = 2.7;
		else if(users[i].grades[j].grade == "C")
			number = 3.0;
		else if(users[i].grades[j].grade == "C-")
			number = 3.3;
		else if(users[i].grades[j].grade == "D+")
			number = 3.7;
		else if(users[i].grades[j].grade == "D")
			number = 4.0;
		else if(users[i].grades[j].grade == "F"){
            number = 0;
        }

            x=x+number;
            y=y+users[i].grades[j].creditHours;
            
        }
        gpa=y/x;

    }
    response.send({msg:"GPA Calculated",data:gpa});
})
module.exports=router;