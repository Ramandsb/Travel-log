const { Router } = require('express');

const router = Router();
const LogEntry = require('../models/LogEntry');

router.get('/', async (req, res, next)=>{
    try {
        const entries = await LogEntry.find();
        res.json(entries)
    }catch (error){
        next(error)
    }
})
router.post('/', async (req, res, next)=>{
    try {
        const logsEntry = new LogEntry(req.body);
        const createdEntry = await logsEntry.save();
        res.json(createdEntry)
    }catch(err){
        if(err.name === 'ValidationError'){
            res.status(422);
        }
        next(err)
    }
})

module.exports = router