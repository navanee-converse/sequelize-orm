const {Sequelize,DataTypes} = require('sequelize')
require('dotenv').config({path:'../.env'})
let db = process.env.dbname
let user = process.env.user
let password = process.env.password
let host = process.env.host
let dialect = process.env.dialect

const sequelize = new Sequelize(db,user,password,{
    host:host,
    dialect:dialect
})

const Person = sequelize.define('User',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{
    freezeTableName:true,
    paranoid:true
})

const Account = sequelize.define('Account',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    bankname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    balance:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            isNumeric:true
        }
    }
},
{
    freezeTableName:true,
    paranoid:true
})

Person.hasMany(Account,{onDelete:'CASCADE'})
Account.belongsTo(Person,{onDelete:'CASCADE'})
sequelize.sync()

module.exports.dbstruct = sequelize