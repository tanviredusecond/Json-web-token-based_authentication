
const express = require('express');
const bodyParser = require('body-parser');
const promorouter = express.Router(); 
const mongoose = require('mongoose');
promorouter.use(bodyParser.json());
const Promotions = require('../models/promotions');



promorouter.route('/')
.get((req,res,next)=>{
    Promotions.find({})
    .then((promotions)=>{
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
        // sending the promotions
    },(err)=>{
        next(err)
    }).catch((err)=>{
        next(err);
    })
})

// this is all the get method for promotions
.post((req,res,next)=>{
    Promotions.create(req.body)
    .then((promotion)=>{
        console.log("Promotion is made",promotion);
        res.statusCode200;
        res.setHeader('Content-Type','applications/json');
        //sending the result to configrm
        res.json(promotion);
    },(err)=>{
        next(err)
    }).catch((err)=>{
        next(err);
    })
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end("PUT operation is not supported");
})
.delete((req,res,next)=>{
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>{
        next(err);
    }).catch((err)=>{
        next(err);
    });
});
/// 

promorouter.route('/:promoId')
.get((req,res,next)=>{
    // first find the if the promotions exist
    Promotions.findById(req.params.promoId)
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err)=>{
        next(err);
    }).catch((err)=>{
        next(err);
    })
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end("POST operation is not supported");
})
.put((req,res,next)=>{
    //first find if there is a promotions
    Promotions.findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    },{new:true}).then((promotion)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err)=>{
        next(err);
    }).catch((err)=>{
        next(err);
    })
})
.delete((req,res,next)=>{
    Promotions.findByIdAndDelete(req.params.promoId)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','appliation/json');
        res.json(resp);

    },(err)=>{
        next(err);
    }).catch((err)=>{
        next(err);
    })
})



module.exports = promorouter;