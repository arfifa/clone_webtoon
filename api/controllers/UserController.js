const Models = require('../models');
const Users = Models.users;

module.exports = {
  profile: (req, res) => {
    let { user_id } = req.params
    console.log(user_id);
    Users.findOne({
      where: { id: user_id }
    }).then(user => {
      res.status(200).send({ user })
    }).catch(err => {
      res.status(503).send({
        message: "Network no available"
      })
    })
  }
}