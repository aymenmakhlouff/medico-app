module.exports = (Sequelize, DataTypes) => {
    const Review = Sequelize.define("Review", {
        review: {
            type: DataTypes.STRING,
            allowNull:false
          },
          rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
    })
    return Review
}