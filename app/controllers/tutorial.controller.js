const db = require("../models");
const Tutorial = db.tutorial;

const response = require("../middlewares/response");
const verify = require("../middlewares/authJwt");

// Create and Save a new Tutorial
exports.create = (req, res) => {

  // Validate request
  if (!req.body.title) {
    res.status(400).send(response.format(0, "Content can not be empty!", null));
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    content: req.body.content,
    category: req.body.categoryId,
    author: req.userId
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(response.format(1, "Success", data));
    })
    .catch(err => {
      res.status(500).send(response.format(0, err.message || "Some error occurred while creating the Tutorial.", null));
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Tutorial.find(condition)
      .then(data => {
        res.send(response.format(1, "Success", data));
      })
      .catch(err => {
        res.status(500).send(response.format(0, err.message || "Some error occurred while retrieving tutorials.", null));
      });
};

exports.findAllByUser = (req, res) => {
    const authorId = req.userId;
  
    Tutorial.find({author: authorId})
      .then(data => {
        res.send(response.format(1, "Success", data));
      })
      .catch(err => {
        res.status(500).send(response.format(0, err.message || "Some error occurred while retrieving tutorials.", null));
      });
};

exports.findAllByCategory = (req, res) => {
    const categoryId = req.params.categoryId;
  
    Tutorial.find({category: categoryId})
      .then(data => {
        res.send(response.format(1, "Success", data));
      })
      .catch(err => {
        res.status(500).send(response.format(0, err.message || "Some error occurred while retrieving tutorials.", null));
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send(response.format(0, "Not found Tutorial with id " + id, null));
        else res.send(response.format(1, "Success", data));;
      })
      .catch(err => {
        res
          .status(500)
          .send(response.format(0, "Error retrieving Tutorial with id=" + id, null));
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send(esponse.format(0, "Data to update can not be empty!", null));
      }
    
      const id = req.params.id;

      Tutorial.findById(id)
      .then(tutorial => {
        if (!tutorial) {
            res.status(404).send(response.format(0, "Not found Tutorial with id " + id, null));
        } else {
            if (tutorial.author != req.userId) {
                res.send(response.format(0, "Can not update tutorial was not created by you!", null));
            } else {
                if (req.body.title) {
                    tutorial.title = req.body.title;
                }

                if (req.body.content) {
                    tutorial.content = req.body.content;
                }
                
                tutorial.save(tutorial)
                    .then(data => {
                    res.send(response.format(1, "Success", data));
                    })
                    .catch(err => {
                    res.status(500).send(response.format(0, err.message || "Some error occurred while update the Tutorial.", null));
                    });
            }
        }
          
      })
      .catch(err => {
        res
          .status(500)
          .send(response.format(0, "Error retrieving Tutorial with id=" + id, null));
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
      .then(tutorial => {
        if (!tutorial) {
            res.status(404).send(response.format(0, "Not found Tutorial with id " + id, null));
        } else {
            if (tutorial.author != req.userId) {
                res.send(response.format(0, "Can not delete tutorial was not created by you!", null));
            } else {
                
                tutorial.deleteOne()
                    .then(data => {
                    res.send(response.format(1, "Success", null));
                    })
                    .catch(err => {
                    res.status(500).send(response.format(0, err.message || "Some error occurred while delete the Tutorial.", null));
                    });
            }
        }
          
      })
      .catch(err => {
        res
          .status(500)
          .send(response.format(0, "Error retrieving Tutorial with id=" + id, null));
      });
};
