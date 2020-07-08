const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tinhvv application." });
});

const db = require("./app/models");
const Role = db.role;
const Category = db.category;
console.log(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`);
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/tutorial.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });

  Category.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      // Add swift
      new Category({
        title: "Swift",
        description: "For development iOS application"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Swift' to category collection");
      });

      // Add swift
      new Category({
        title: "Kotlin",
        description: "For development Android application"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Kotlin' to category collection");
      });

      // Add swift
      new Category({
        title: "Java",
        description: "For development Android application or BE side"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Java' to category collection");
      });

      // Add swift
      new Category({
        title: "Node",
        description: "For development Nodejs application"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'Node' to category collection");
      });
    }
  });
}