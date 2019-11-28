
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
const Dishes = require('../models/dishes');


// why we use the next() parameter in the
// middle ware
// because it gives you ability to move on the next middleware
//other wise the operation will pause

//***** Very Very important
/* next will tell you that if this route does not match
/* go and search the next middleware just dont
/* stop the searching and dont pause
*/



dishRouter.route('/')
.get((req,res,next) => {
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
        //if there is an error they will be passed to the next
        // cause we pass it so at the end if there is
        // a final error handler we will catch it and
        // do waterever it happend
    }, (err) => next(err)).catch((err)=>next(err));
    // everytime we get error we just pass it
})
.post((req,res,next)=>{
    Dishes.create(req.body)
    .then((dish)=>{
        console.log("Dish is created",dish);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err)=>next(err)).catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation is nnot supported on /Dishes');
}).delete((req,res,next)=>{
    Dishes.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err)).catch((err)=>next(err));
})

dishRouter.route('/:dishId')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err)=>next(err)).catch((err)=>next(err));
})
.post((req,res,next)=>{
    res.setHeader = 403;
    res.end('POST request is not supported');
})
.put((req,res,next)=>{
    Dishes.findByIdAndUpdate(req.params.dishId,{
        $set:req.body
        // new:true will send the result afte update it
        // and we catch it by a function
    },{new:true}).then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);

    },(err)=>next(err)).catch((err)=>next(err));
})
.delete((req,res,next)=>{
    Dishes.findByIdAndDelete(req.params.dishId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err)).catch((err)=>next(err));
});


// adding functionality for the comments section
// adding functionality for the comment section
// start the mongodb with the data folder and start working


dishRouter.route('/:dishId/comments') // fetch all the comments in a 
                                        // single dish object
.get((req,res,next)=>{
    // first you have to find the dish
    // then get the comments
    Dishes.findById(req.params.dishId)
    // we get the dish
    .then((dish)=>{
        // if there is no dish then just stop but if not null then precees
        if(dish !=null){
            /// send the status code
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(dish.comments);
        }
    })
})
.post((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    //if you find one
    .then((dish)=>{
            // you have to post the comment of a specfic dish
            if(dish!=null){
                dish.comments.push(req.body)//because dish is added as an array
                dish.save()
                .then((dish)=>{
                    // send the staus code that we got it
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                })
            }else{
                err = new Error("Dish not found");
                err.status = 404;
                return next(err);
            }
    })
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.send('PUT operation is not supported');
})

.delete((req,res,next)=>{
        // find if there is a dishes
        Dishes.findById((req.params.dishId))
        .then((dish)=>{
            // check if it null or not
            if(dish!=null){
                // then delete every comments in that dish id
                // you have to delete it through  a loop
                for(var i = (dish.comments.length -1);i>=0;i--){
                    // print all the comments id first    
                    //console.log(dish.comments[i]._id)
                    // just print a comment for testing purpose
                    //console.log(dish.comments.id(dish.comments[i]._id));
                    // we successfully get the comment id just delete it
                    dish.comments.id(dish.comments[i]._id).remove();
                }
                dish.save()
                .then((dish)=>{
                    res.statusCode = 200;
                    res.setHeader('Content=-Type','appliation/json');
                    res.json(dish);
                    // if everything goes right
                    // if you test with the get requuest
                    // yoiu wont get any comments
                    // only empty array

                },(err)=>{
                    next(err);
                });
            }
        })  
})

dishRouter.route('/:dishId/comments/:commentId')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null && dish.comments.id(req.params.commentId)!=null){
            // if there is an dish and that dissh has a comment
            // then get it
            res.statusCode = 200;
            res.setHeader('Content-type','application/json');
            res.json(dish.comments.id(req.params.commentId));
        }else if (dish = null){
            err = new Error("Not found");
            res.status = 404;
            return next(err);
            
        }else{
            err = new Error("Not found");
            res.status = 404;
            return next(err);
        }

    },(err)=>{
        next(err);
    }).catch((err)=>{
        next(err);
    })
})

.post((req,res,next0)=>{
    res.statusCode = 403;
    res.end('Not allowed');
})
.put((req,res,next)=>{
    // find the dish first
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        // there can be multiple options
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(dish);
            },(err)=>next(err));
        } else if(dish==null){
            res.end("not found");
        }else{
            res.end("Comment not found");
        }
    },(err)=>next(err)).catch((err)=>next(err));
})
.delete((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish!=null && dish.comments.id(req.params.commentId)!=null){
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish)=>{
                res.statusCode = 200;
                res.setHeader('Content-type','application/json');
                res.json(dish);
            },(err)=>next(err));
        }else if(dish==null){
            err = new Error('not found');
            err.status = 404;
            return next(err);
        }else{
            err = new Error("Not found");
            err.status = 404;
            return next(err);
        }
    },(err)=>next(err)).catch((err)=>next(err));
})

// operation for individual comment in a individual dish




module.exports = dishRouter;



















// with parameter



// dishrouter.route('/:dishID')
// .all((req,res,next)=>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type','text/plain')
//     next();


// })

// .get((req,res,next)=>{
//     res.end("will send all the dishes to you " +req.params.dishID + " to you ");
// })


// .post((req,res,next)=>{
//     //we will fetch data in this post request
//     //but for now we just send and text
//     res.end("will add the dishes " +req.body.name + " with details "+req.body.description);
//     // we wills end it with postman
// })

// .put((req,res,next)=>{

//     res.write("updating the dishes....")
//     res.end("will update the dish "+req.params.dishID + "with details "+req.body.description);
// })
// .delete((req,res,next)=>{
//     res.end("Delete all the "+req.params.dishID+" dishes");
// });







// module.exports = dishrouter;
