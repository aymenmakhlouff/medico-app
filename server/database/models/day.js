module.exports = (Sequelize, DataTypes) => {
    const Day = Sequelize.define("Day", {
      day: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Day;
  };
  