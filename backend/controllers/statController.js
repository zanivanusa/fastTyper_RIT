import Stat from "../models/statModel.js";
import mongoose from 'mongoose';

// get latest stat
function showLatest(req, res) {
    Stat.findOne({ userId: req.session.userId })
      .sort({ createdAt: -1 }).then((stats) => {
          return res.json(stats);
      }).catch((err) => {
          return res.status(500).json({
              message: 'Error getting all stats.',
              error: err
          });
      });
}


// gets all stats
function listAll(req, res) {
    Stat.find({ userId: req.session.userId })
      .then((stats) => {
          return res.json(stats);
      }).catch((err) => {
          return res.status(500).json({
              message: 'Error getting all stats.',
              error: err
          });
      });
}

// removes one
function remove(req, res) {
    var id = req.body.statId;

    Stat.findByIdAndRemove({id}).then((stat) => {
        return res.sendStatus(200);
    }).catch((err) => {
        return res.status(500).json({
            message: 'Error when deleting stat.',
            error: err
        });
    });
}

// creates one
async function create(req, res) {
    var stat = new Stat({
        userId : req.session.userId,
        accuracy: req.body.accuracy,
        wpm: req.body.wpm,
        timeArray: req.body.timeArray 
    });

    await stat.save().then(() => {
        return res.sendStatus(200);
    }).catch((err) => {
        return res.status(500).json({
                message: 'Error creating stat',
                error: err
        });
    });
}

export const statController = {
    showLatest,
    listAll,
    create,
    remove
};
