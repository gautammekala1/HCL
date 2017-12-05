'use strict';
module.exports = (sequelize, DataTypes) => {
  var ToDo = sequelize.define('ToDo', {
    userid: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.STRING,
    targetDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  //ToDo.sync();
  return ToDo;
};