module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define("User", {
          username: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          type: {
            type: DataTypes.ENUM('doctor', 'user' , "pharmacy"),
              defaultValue: "user"
          },
          imgUrl: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          createdAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          updatedAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          longitude: {
            type: DataTypes.DOUBLE, 
            defaultValue:0

          },
          latitude: {
            type: DataTypes.DOUBLE, 
            defaultValue:0
          },
          // phoneNumber: {
          //   type: DataTypes.INTEGER,
          //   allowNull: false
          // },
          // address: {
          //   type: DataTypes.STRING,
          //   allowNull: false
          //   }
    })
    return User
}
