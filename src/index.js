const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const intialData = require('./InitialData')
const port = 8080
app.use(express.urlencoded());


app.use(express.json());
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

let students = intialData
app.get('/api/student',(req,res)=>{
    res.json(students)
})

app.get('/api/student/:id',(req,res)=>{
let id = parseInt(req.params.id)
let found = students.find((s)=>s.id==id)
if(found){
    res.json(found)
}else{
    res.status(404).json({error:"Student not found"})
}
})

app.post('/api/student',(req,res)=>{
    let {name, currentClass,division} = req.body
    if(name && currentClass && division){
        let newStud = {
            id:students.length+1,
            name,
            currentClass,
            division
        }
        students.push(newStud)
        res.json({students})
    }else{
        res.status(400).json({error:"Incomplete details"})
    }
})

app.put('/api/student/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    let {name} = req.body;
    let putstud = students.find((s) => s.id == id);
    if (putstud) {
        if(name){

        putstud.name=name
        res.json({ message: 'Student details updated successfully',data:putstud });}
        else{
            res.status(400).json({error:'Invalid update'})
        }
    
    }else{
        res.status(400).json({error:"not found"})
    }

})

app.delete('/api/student/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    let index = students.findIndex((s)=>s.id == id)
    if(index!=-1){
        students.splice(index, 1);
    res.json({ message: 'Student record deleted successfully' });
  } else {
    res.status(404).json({ error: 'Student not found' });
  }

    }
);



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   