const jwt = require('jsonwebtoken');
const bcyrpt = require('bcrypt');
const Sequelize = require('sequelize');
const Models = require('../models');
const Users = Models.users;
const saltRounds = 10

module.exports = {
  register: (req, res) => {
    let { name, email, password } = req.body
    bcyrpt.genSalt(saltRounds, (err, salt) => {
      bcyrpt.hash(password, salt, (err, hash) => {
        Users.create({
          name,
          email,
          password: hash
        }).then(user => {
          const token = jwt.sign({ user_id: user.id }, 'my-secret-key')
          res.send({
            message: 'Account successfully created',
            token
          })
        }).catch(Sequelize.ValidationError, err => {
          return res.status(406).send({ message: "Email already in registered" });
        })
          .catch(err => {
            return res.status(400).send({
              message: err.message
            });
          });
      })
    })
  },

  login: (req, res) => {
    let { email, password } = req.body
    Users.findOne({
      where: {
        email: email,
      }
    }).then(user => {
      if (!user) {
        res.status(401).send({
          message: "This email has not been registered"
        })
      } else {
        bcyrpt.compare(password, user.password).then(result => {
          if (result) {
            const token = jwt.sign({ user_id: user.id }, 'my-secret-key')
            res.status(200).send({
              username: user.name,
              user_id: user.id,
              token
            })
          } else {
            res.status(401).send({
              message: 'Wrong password'
            })
          }
        })
      }
    })
  }
}