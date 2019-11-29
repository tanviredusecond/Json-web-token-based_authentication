
const express = require('express');
const bodyParser = require('body-parser');
const leaderrouter = express.Router(); 
leaderrouter.use(bodyParser.json());
const Leaders = require('../models/leaders');


leaderrouter.route('/')
.get((req,res,next)=>{
    Leaders.find({})
    .then((leaders)=>{
        res.statusCode =200;
        res.setHeader('Content-Type','application/json');
        res.json(leaders);
        // sending the leaders
    },(err)=>{
        next(err)
    }).catch((err)=>{
        next(err);
    })
})

// this is all the get method for leaders
.post((req,res,next)=>{
    Leaders.create(req.body)
    .then((leader)=>{
        console.log("Leader is made",leader);
        res.statusCode200;
        res.setHeader('Content-Type','applications/json');
        //sending the result to configrm
        res.json(leader);
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
    Leaders.remove({})
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

leaderrouter.route('/:leaderId')
.get((req,res,next)=>{
    // first find the if the leaders exist
    Leaders.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
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
    //first find if there is a leaders
    Leaders.findByIdAndUpdate(req.params.leaderId,{
        $set:req.body
    },{new:true}).then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>{
        next(err);
    }).catch((err)=>{
        next(err);
    })
})
.delete((req,res,next)=>{
    Leaders.findByIdAndDelete(req.params.leaderId)
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





module.exports = leaderrouter;