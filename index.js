const express = require('express');
const app = express();
const users = require("./routes/api/users")

app.use(express.json())

app.use("/api/users", users);
// get,post,put,delete

// users[1].username="king";
// users.push({username:"asadyalaa", password:"4", grades:[]});



app.get('/', (request, response) => {
    response.send("Welcome");
});


const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));