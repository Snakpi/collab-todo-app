const express = require("express");
const db = require("../db/index");
const { codeAndJson } = require("./utils");
const router = express.Router();

router.param("id", (req, res, next, id) => {
  req.id = id;
  next();
});

router.get("/", async (req, res) => {
  try {
    const allUsers = await db.query("SELECT * FROM users;");
    codeAndJson(res, 200, allUsers.rows);
  } catch (err) {
    console.log(err.message);
    codeAndJson(res, 500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1;", [
      req.id,
    ]);
    if (result.rowCount > 0) {
      codeAndJson(res, 200, result.rows[0]);
    } else {
      codeAndJson(res, 404);
    }
  } catch (err) {
    console.log(err.message);
    codeAndJson(res, 500);
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, password, bio, age } = req.body;
    const foundUser = await db.query(
      "SELECT * FROM users WHERE username = $1;",
      [username]
    );
    if (foundUser.rowCount > 0) {
      codeAndJson(res, 409);
    }

    if (username && password) {
      const result = await db.query(
        "INSERT INTO users (username, password, bio, age) VALUES ($1, $2, $3, $4) RETURNING *;",
        [username, password, bio, age]
      );
      codeAndJson(res, 201, result.rows[0]);
    } else {
      codeAndJson(res, 404);
    }
  } catch (err) {
    console.log(err.message);
    codeAndJson(res, 500);
  }
});

router.put("/:id", async (req, res) => {
  const { username, password, bio, age } = req.body;
  const bodyObject = { username, password, bio, age };
  try {
    for (let attr in bodyObject) {
      if (bodyObject[attr] != undefined) {
        const result = await db.query(
          `UPDATE users SET ${attr} = $1 WHERE id = $2;`,
          [bodyObject[attr], req.id]
        );
        console.log(result);
      }
    }
    const updatedUser = await db.query("SELECT * FROM users WHERE id = $1", [
      req.id,
    ]);
    if (updatedUser.rowCount > 0) {
      codeAndJson(res, 204);
    } else {
      codeAndJson(res, 404);
    }
  } catch (err) {
    console.log(err.message);
    codeAndJson(res, 500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await db.query("DELETE FROM users WHERE id = $1;", [
      req.id,
    ]);
    console.log(deletedUser);
    if (deletedUser.rowCount > 0) {
      codeAndJson(res, 204);
    } else {
      codeAndJson(res, 404);
    }
  } catch (err) {
    console.log(err.message);
    codeAndJson(res, 500);
  }
});

module.exports = router;
