module.exports = (Sequelize, DataTypes) => {
    const Records = Sequelize.define("Record", {
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false
      },
     name : {
      type: DataTypes.STRING,
     }
    });
    return Records;
  };
  