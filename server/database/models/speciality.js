module.exports = (Sequelize, DataTypes) => {
    const speciality = Sequelize.define("speciality", {
    
     name : {
      type: DataTypes.STRING
     }
    });
    return speciality;
  };
  