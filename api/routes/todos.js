const express = require("express");
const db = require("../db/index");
const { codeAndJson } = require("./utils");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allTodos = await db.query("SELECT * FROM todos;");
    codeAndJson(res, 200, allTodos.rows);
  } catch (err) {
    codeAndJson(res, 404);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todos WHERE id = $1;", [
      req.params.id,
    ]);
    codeAndJson(res, 200, result.rows[0]);
  } catch (err) {
    codeAndJson(res, 404);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await db.query(
      "INSERT INTO todos(description) VALUES ($1) RETURNING *;",
      [res.body.description]
    );
    codeAndJson(res, 201, result.rows[0]);
  } catch (err) {
    codeAndJson(res, 404);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await db.query("UPDATE todos SET description = $1 WHERE id = $2", [
      req.body.description,
      req.params.id,
    ]);
    codeAndJson(res, 204);
  } catch (err) {
    codeAndJson(res, 404);
  }
});

module.exports = router;
