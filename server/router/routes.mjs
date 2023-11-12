import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of entries
router.get("/", async (req, res) => {
  let collection = await db.collection("mongo-express-connect");

  try {
    let results = await collection.find({}).limit(50).toArray();
    res.send(results).status(200);
  } catch (err) {
    console.error(err);
    res.send({ msg: "Error database accessing" }).status(500);
  }
});

// Fill DB In from file
router.patch("/fill", async (req, res) => {
  let collection = await db.collection("mongo-express-connect");

  const posts = req.body;
  // console.log(posts);

  try {
    const results = await collection.insertMany(posts);
    console.log(`${results.insertedCount} posts added to the collection.`);
    res.send(results).status(204);
  } catch (err) {
    console.error(err);
    res.send({ msg: "Error database accessing" }).status(500);
  }
});

// Get a single post
router.get("/:id", async (req, res) => {
  let collection = await db.collection("mongo-express-connect");

  try {
    let query = { _id: ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send({ msg: "Item not found" }).status(404);
    else res.send(result).status(200);
  } catch (error) {
    console.error(err);
    res.send({ msg: "Error database accessing" }).status(500);
  }
});

// Add a new post
router.post("/", async (req, res) => {
  let collection = await db.collection("mongo-express-connect");

  let newDocument = req.body;
  newDocument.date = new Date();
  newDocument.userId = (Math.random() * 100) | 0;

  console.log(newDocument);

  try {
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (error) {
    console.error(err);
    res.send({ msg: "Error database accessing" }).status(500);
  }
});

// Update the post with a new comment
router.patch("/comment/:postId", async (req, res) => {
  const { postId } = req.params;

  const query = { _id: ObjectId(postId) };

  const newComment = {
    _id: new ObjectId(),
    date: new Date(),
    author: req.body.author,
    body: req.body.body,
  };

  const updates = { $push: { comments: newComment } };

  try {
    let collection = await db.collection("mongo-express-connect");

    let result = await collection.updateOne(query, updates);

    if (result.modifiedCount === 0) {
      return res.send({ msg: "Error while adding comment" }).status(500);
    }

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.send({ msg: "Error database accessing" }).status(500);
  }
});

//  Delete comment
router.delete("/comment/:postId/:commentId", async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    let collection = await db.collection("mongo-express-connect");

    const result = await collection.updateOne(
      { _id: ObjectId(postId) },
      { $pull: { comments: { _id: ObjectId(commentId) } } }
    );

    if (result.modifiedCount === 0) {
      return res.send({ msg: "Comment not found" }).status(404);
    }

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.send({ msg: "Error database accessing" }).status(500);
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  try {
    const collection = db.collection("mongo-express-connect");

    let result = await collection.deleteOne(query);
    res.send(result).status(200);
  } catch (error) {
    console.error(err);
    res.send({ msg: "Error database accessing" }).status(500);
  }
});

export default router;
