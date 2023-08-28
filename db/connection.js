const mongoose=require('mongoose')

const db=process.env.database
mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("data base connnected successfully");
}).catch((error)=>{
    console.log(error);
})