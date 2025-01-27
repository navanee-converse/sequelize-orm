const {Sequelize,DataTypes} = require('sequelize')
require('dotenv').config({path:'../.env'})
let user = process.env.user
let password = process.env.password
let host = process.env.host
let db = process.env.dbname
let dialect = process.env.dialect

const sequelize = new Sequelize(db,user,password,{
    host:host,
    dialect:dialect
})

const Employee = sequelize.define('Employee',{
    id :{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    empName:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true,
    paranoid:true,
    timestamps:false
})

const Assect = sequelize.define('Assect',{
    id :{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    assect:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true,
    paranoid:true,
    timestamps:false
})

const EmployeeAssect = sequelize.define('EmployeeAssect',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }
},{
    freezeTableName:true,
    paranoid:true,
    timestamps:false
})

Employee.belongsToMany(Assect,{through:EmployeeAssect})
Assect.belongsToMany(Employee,{through:EmployeeAssect})
sequelize.sync()
module.exports.seq = sequelize