module.exports = (Sequelize, DataTypes) => {
    const Availability = Sequelize.define("Availability", {
      hour: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });
    return Availability;
  };
  