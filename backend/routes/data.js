const express = require('express');
const router = express.Router();
const Student = require('../models/data');
const jwt = require('jsonwebtoken');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const filter = {};

    if (req.query.gender) filter.gender = req.query.gender;
    if (req.query.ethnicity) filter.ethnicity = req.query.ethnicity;
    if (req.query.parentEducation) filter.parentEducation = req.query.parentEducation;
    if (req.query.lunch) filter.lunch = req.query.lunch;

    const result = await Student.find(filter);

    // Send the result as JSON
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, 'access_token', (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}