require('dotenv').config()

const { Sequelize, DataTypes } = require('sequelize');

let init = async () => {
  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    //dialect: 'mariadb',
    host: 'localhost',
    //host: '10.217.138.124' ,
  });

  /* Si on veut tester la connexion */
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


  const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  }, {
    freezeTableName: true
  });

  // force: true will drop the table if it already exists
  await User.sync({force: true}).then(() => {
    // Table created
    return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  });

  return User;
}

init().then((User) => {
  User.findAll().then ( (users) => {
    console.log(users[0].dataValues);
  })
}).catch(function(error){
  console.log("error : " + error);
});
