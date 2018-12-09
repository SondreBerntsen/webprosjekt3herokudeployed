const express = require('express');
var db = require('./db');
const event = express.Router();
const fileUpload = require('express-fileupload');
var fs = require('fs');

event.use(fileUpload());

event.get("/", (req, res) => {
    const { id } = req.query;
    const SELECT_EVENTDATA_QUERY = `SELECT events.id, events.title, events.text, events.time, events.price, DATE_FORMAT(events.date, '%d-%m-%y') AS date, venues.address, events.payment_link, events.youtube_link FROM events, venues where venues.id=events.v_id AND events.id='${id}' `;
    db.query(SELECT_EVENTDATA_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {
            return res.json(results);
        }
    });
});

event.post("/add", (req, res) => {
    console.log('hallo add event express');
    let imgFile = req.files.img;
    const INSERT_QUERY = `
      INSERT INTO events (title, text, time, date, price, youtube_link, payment_link, v_id, livestream) 
      VALUES ('${req.body.title}', '${req.body.text}', '${req.body.time}', '${req.body.date}', ${req.body.price}, '${req.body.youtube_link}', '${req.body.payment_link}', '${req.body.venue}', '${req.body.livestream}' )`
    db.query(INSERT_QUERY, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).send("Database not updated");
        } else {
            imgFile.mv(`${__dirname}/../react-app/src/uploadedImg/eventImg/${results.insertId}`, function (err) {
                if (err) {
                    return res.status(500).send(err);
                }

                return res.json(results);

            });
        }
    });
});
//deletes event from database, and the event image in the folder
event.post("/delete", (req, res) => {
    console.log('hallo delete event');
    const { id } = req.body

    const DELETE_QUERY = `DELETE FROM events WHERE id = ${id}`
    db.query(DELETE_QUERY, (err, results) => {
        if (err) {
            return res.send(err);
        } else {//delete the image from the folder
            fs.unlink('../react-app/src/uploadedImg/eventImg/' + req.body.id, (err) => {
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

module.exports = event