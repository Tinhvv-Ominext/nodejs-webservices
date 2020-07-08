const { authJwt } = require("../middlewares");
const controller = require("../controllers/tutorial.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/tutorial",
    [
      authJwt.verifyToken
    ],
    controller.create
  );

  // Find all tutorial
  app.get("/api/tutorial/all", controller.findAll);

  // Find all tutorial by category
  app.get("/api/tutorial", controller.findAllByCategory);

  // Find all tutorial by user
  app.get("/api/tutorial/user", authJwt.verifyToken, controller.findAllByUser);

  // Find one tutorial
  app.get("/api/tutorial/:id", controller.findOne);

  // Update tutorial
  app.put("/api/tutorial/:id", authJwt.verifyToken, controller.update);

  // Delete tutorial
  app.delete("/api/tutorial/:id", authJwt.verifyToken, controller.delete);
};