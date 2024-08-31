const express = require("express");
const mainRouter = require("../backend/routes/index")
//create an express server
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());



app.use('api/v1',mainRouter )
//app.use create or run middlewares ,also for routing


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})



