module.exports = (Sequelize, DataTypes) => {
    const Categories = Sequelize.define("Categories", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Categories;
  };
  