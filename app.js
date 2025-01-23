const express = require('express')
const app = express();

require('dotenv').config()

const db = require('./database')

const bodyparser = require('body-parser')
app.use(bodyparser.json())

app.post("/add",(req,res)=>{
    let name = req.body.name
    let dept = req.body.dept
    let mail = req.body.mail

    if(((name!='')&&(name!==undefined))&&((dept!="")&&(dept!==undefined))&&(mail!="")&&(mail!==undefined))
    {
        let data = db.fun.add(name,mail,dept)
        data.then((resp)=>{

            let result = []
            result.push(resp)
            result.push({'Message':"User Added Successfully"})
            res.send(result)
            console.log(result);
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

    else
        res.err("Please enter valid user name,mail and department")

})

app.get('/viewAll',(req,res)=>{

    let data = db.fun.viewAll()
    data.then((resp)=>{
        let result = resp
        res.send(result)
    }).catch((err)=>{
        if(err)
            console.log(err);    
    })
})

app.put('/update',(req,res)=>{
    
    let id = req.query.id
    let name = req.query.name
    let mail = req.query.mail
    let dept = req.query.dept
    
    let data = db.fun.selectById(id)
    data.then((resp)=>{
        if(resp===null)
        {
            res.send("User not found can't update")
        }
        else
        {
            let data = db.fun.update(id,name,mail,dept)
            data.then((resp)=>{
            let result = []
            result.push(resp)
            result.push({'Message':"User Details Updated"})
            res.send(result)
            // console.log(result);
            }).catch((err)=>{
                if(err)
                    console.log(err);
            })
        }
        }).catch((err)=>{
        if(err)
            console.log(err);
            
    })        
})

app.delete('/delete',(req,res)=>{
    let id = req.query.id
    let data = db.fun.deleteUser(id)
    data.then((resp)=>{
        if(resp==0)
        {
            res.send("Data is already deleted or not present")
        }
        else{
            res.send(resp+" row deleted")
        }
    }).catch((err)=>{
        if(err)
            console.log(err);
            
    })
})

app.get('/viewById',(req,res)=>{
    let id = req.query.id
    let data = db.fun.selectById(id)
    data.then((resp)=>{
        res.send(resp)
    }).catch((err)=>{
        if(err)
            console.log(err);
            
    })
})
app.listen(process.env.port,(err)=>{
    if(err)
        console.log(err);
    else
    console.log(`Server is running on port ${process.env.port}`);
    
        
})