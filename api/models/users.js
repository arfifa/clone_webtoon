'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    avatarURI: DataTypes.STRING
  }, {});
  Users.associate = function (models) {
  };
  return Users;
};