const express = require('express'); 
const playerRouter = express.Router();
const mongoose = require('mongoose');
const Player = mongoose.model("Player");


playerRouter.post('/player', (req, res) => {

    console.log(req.body)
      
     let {name} = req.body;

     if(!name){
         return res.status(400).json({success: true , msg: "", data: {}, error: "Please provide a name"})
     }

     // roll the dice: 

     let score=  1 + parseInt(Math.random()*6)

     let newPlayer = new Player({name, score})
     newPlayer.save()
        .then((player) => {
            res.status(200).json({success: true, msg: "Player added", data: {player}, error: null})
        })
        .catch((err) => {
             res.status(500).json({success: false, msg: "", data: {}, error: err})
        })

})

playerRouter.get('/winner', (req, res) => {
    let winnerArray = []
      
    Player.find({}).sort({score:-1}).limit(1)
        .then((player) => {
              let highestScore = player[0].score;
                Player.find({score: highestScore})
                    .then((winners) => {
                           winners.forEach(winner => {
                                winnerArray.push(winner.name)
                           });
                            res.status(200).json({success: true, msg: "Winner", data: {winnerArray, highestScore}, error: null})
                    })
        })
        .catch((err) => {
                res.status(500).json({success: false, msg: "", data: {}, error: err})
        })
})

playerRouter.delete('/reset', (req, res) => {
    Player.deleteMany({})
        .then((player) => {
            res.status(200).json({success: true, msg: "Players deleted", data: {}, error: null})
        })
        .catch((err) => {
            res.status(500).json({success: false, msg: "", data: {}, error: err})
        })
})

module.exports = playerRouter;