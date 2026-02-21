const Profile = require('../models/profile')

exports.testRouting = (req, res, next) => {
    console.log('req.body -- ', req.body)
    const url = req.protocol + "://" + req.get("host");
    const profile = new Profile({
      title: req.body.title,
      imagePath: url + "/images/" + req.file.filename
    });
        res.status(201).json({
          message: "Post added successfully"
        });
  };
exports.testRouting2 = (req, res, next) => {  
    console.log('req.body -- ', req.body)
    const url = req.protocol + "://" + req.get("host");
    let imagePath =  url + "/videos/" + req.file.filename
    const data = req.data;
    res.status(200).json({
        message: 'made it !!'
    })
    }
