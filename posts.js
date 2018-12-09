const express = require('express');
var db = require('./db');
const posts = express.Router();
const fileUpload = require('express-fileupload');
var fs = require('fs');

posts.use(fileUpload());

posts.get("/", (req, res) => {
    const { year } = req.query;
    let SELECT_ALL_POSTS_QUERY;
    //If year is specified, get the posts from that year
    if (year) {
        SELECT_ALL_POSTS_QUERY = `SELECT id, title, text, date FROM posts WHERE year(date)='${year}' ORDER BY date DESC`;
    } else {//If year is not specified get the posts from the most recent year
        SELECT_ALL_POSTS_QUERY = `SELECT id, title, text, date FROM posts WHERE year(date)=(SELECT MAX(year(date)) FROM posts) ORDER BY date DESC`;
    }

    db.query(SELECT_ALL_POSTS_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json(results);
        }
    });
});
posts.post("/add", (req, res) => {
    console.log('hallo add post express');
    let imgFile = req.files.img;

    const INSERT_QUERY = `
      INSERT INTO posts (title, text, date) 
      VALUES ('${req.body.title}', '${req.body.text}', CURDATE())`;

    db.query(INSERT_QUERY, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).send("Database not updated");
        } else {
            imgFile.mv(`${__dirname}/../react-app/src/uploadedImg/postImg/${results.insertId}`, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.json(results);
            });
        }
    });
});
posts.post("/delete", (req, res) => {
    console.log('hallo delete post');
    const { id } = req.body
    const DELETE_QUERY = `DELETE FROM posts WHERE id = ${id}`
    db.query(DELETE_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {//delete the image from the folder
            fs.unlink('../react-app/src/uploadedImg/postImg/' + req.body.id, (err) => {
                if (err) {
                    console.log('image was not deleted');
                } else {
                    console.log('image was deleted');
                }
            });
            return res.json(results);
        }
    });
});
module.exports = posts