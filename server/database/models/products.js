module.exports = (Sequelize, DataTypes) => {
  const Products = Sequelize.define("Products", {
    productName: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    description: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    activeIngredients: DataTypes.STRING,
    dosageForm: DataTypes.STRING,
    strength: DataTypes.STRING,
    packaging: DataTypes.STRING,
    expiryDate: DataTypes.DATE,
    imageURL: DataTypes.STRING,
    sideEffect: DataTypes.STRING,
    codebar: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },  
  });
  return Products;
};
