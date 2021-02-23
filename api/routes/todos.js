const express = require("express");
const db = require("../db/index");
const { codeAndJson } = require("./utils");
const router = express.Router();

// params appending for all :id paths
router.param("id", (req, res, next, id) => {
  req.id = id;
  next();
});

router.get("/", async (req, res) => {
  try {
    const allTodos = await db.query("SELECT * FROM todos;");
    codeAndJson(res, 200, allTodos.rows);
  } catch (err) {
    codeAndJson(res, 500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todos WHERE id = $1;", [
      req.id,
    ]);
    if (result.rowCount > 0) {
      codeAndJson(res, 200, result.rows[0]);
    } else {
      codeAndJson(res, 404);
    }
  } catch (err) {
    codeAndJson(res, 500);
  }
});

router.post("/", async (req, res) => {
  try {
    const { description, author_id } = req.body;
    const foundAuthor = await db.query("SELECT * FROM users WHERE id = $1;", [
      author_id,
    ]);
    console.log(foundAuthor);
    if (foundAuthor.rowCount == 0) {
      codeAndJson(res, 400); // author_id screwed up
    }
    const result = await db.query(
      "INSERT INTO todos (description, author_id) VALUES ($1, $2) RETURNING *;",
      [description, author_id]
    );
    if (result.rowCount > 0) {
      codeAndJson(res, 201, result.rows[0]);
    } else {
      codeAndJson(res, 500);
    }
  } catch (err) {
    codeAndJson(res, 500);
  }
});

router.put("/:id", async (req, res) => {
  const { description } = req.body;
  try {
    const result = await db.query(
      "UPDATE todos SET description = $1 WHERE id = $2 RETURNING *",
      [description, id]
    );
    if (result.rowCount > 0) {
      codeAndJson(res, 204);
    } else {
      codeAndJson(res, 404);
    }
  } catch (err) {
    codeAndJson(res, 500);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await db.query("DELETE FROM todos WHERE id = $1;", [
      id,
    ]);
    console.log(deletedTodo);
    if (deletedTodo.rowCount > 0) {
      codeAndJson(res, 204);
    } else {
      codeAndJson(res, 404);
    }
  } catch (err) {
    codeAndJson(res, 500);
  }
});

module.exports = router;
