var express= require('express')
var cors=require('cors')
var bcrypt=require('bcryptjs')
var router=express.Router()
const  Post=require('../models/Post')
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const jwt = require('jsonwebtoken');


router.post('/New',(req,res)=>{
    // console.log(req.body,Date())
    Post.find({$and:[{email:req.body.email},{content:req.body.content}]},(err,result)=>{
        if(err){
            return res.send({'error':err});
        }
        else{
            if(result.length==0) {
                req.body.time=Date()
                     Post.create(req.body, (err, Post) => {
                        if (err) {
                            return res.send({'error': err});
                        }
                        else {
                            Post.save()
                            return res.send({'Post':Post});
                        }
                    })
            }
            else{
                return res.send("Post alredy present");
            }

        }
    })
})

router.put('/Update',(req , res)=>{
Post.updateOne({_id:req.body.did},{$set:{content:req.body.content}},{upsert:true},(err,result)=>{
    console.log(result,err)
})
})

router.get('/like/:id',(req,res)=>{
    Post.updateOne({_id:req.params.id},{$inc:{likes:1}},(err,result)=>{
        if(result){
            Post.find({},(err,result)=>{
                console.log(result)
                return res.send(result)
            })
        }
        else{
            console.log(err)
            return res.send(false)
        }
    })
})
router.get('/dislike/:id',(req,res)=>{
    Post.updateOne({_id:req.params.id},{$inc:{dislikes:1}},(err,result)=>{
        if(result){
            console.log(result)
            Post.find({},(err,result)=>{
                console.log(result)
                return res.send(result)
            })
        }
        else{
            console.log(err)
            return res.send(false)
        }
    })
})

router.delete('/Delete/:id',(req,res)=>{
    Post.deleteOne({_id:req.params.id},(err,result)=>{
        if(err) {
            return res.send('comment not found')
        }
        else{
            console.log(result)
            return res.send(true)
        }
    })

})

router.get('/Myposts/:email',(req,res)=>{
    Post.find({email:req.params.email},(err,Post)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send(Post)
        }
    })
})

router.get('/Posts',(req,res)=>{
    Post.find({} ,(err,Post)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send(Post)
        }
    })
})

module.exports=router;