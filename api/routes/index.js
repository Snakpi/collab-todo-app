const todosRouter = require("./todos");
const usersRouter = require("./users");

module.exports = {
  mountRouters: (app) => {
    app.use("/todos", todosRouter);
    app.use("/users", usersRouter);
  },
};
