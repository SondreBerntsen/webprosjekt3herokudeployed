const express = require('express')
var db = require('./db')
const home = express.Router()

//Gets all home in a given year
home.get("/", (req, res) => {
  const HOME_QUERY = `
    SELECT 
      general.pitch, 
      general.dateHeader_txt, 
      general.inactiveHeader_txt, 
      status.anniversary, 
      status.status 
    FROM general, status 
    WHERE general.id = status.id`;

  db.query(HOME_QUERY, (err, results) => {
    if (err) {
      return res.send(err)
    }
    else{
      return res.json({
        data: results
      })
    }
  })
})

module.exports = home