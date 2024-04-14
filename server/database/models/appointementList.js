module.exports = (Sequelize, DataTypes) => {
    const appointementList = Sequelize.define("appointementList", {
      status: {
        type: DataTypes.STRING,
        allowNull: false,     
        defaultValue:"pending"
    }
    });
    return appointementList;
  };
  