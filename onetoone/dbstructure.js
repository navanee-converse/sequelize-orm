const {Sequelize,DataTypes} = require('sequelize')
require('dotenv').config({path:'../.env'})

const host = process.env.host
const password = process.env.password
const db = process.env.dbname
const user = process.env.user
const dialect = process.env.dialect

const sequelize = new Sequelize(db,user,password,{
    host:host,
    dialect:dialect
})

const Person = sequelize.define('Person',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,

    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
    }
},{
    paranoid:true,
    freezeTableName:true
})

const License = sequelize.define('License',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    twowheeler:
    {
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    }
},
{
    freezeTableName:true,
    paranoid:true
})

Person.hasOne(License,{onDelete:'CASCADE'});
License.belongsTo(Person,{onDelete:'CASCADE'});
sequelize.sync({alter:true})
module.exports.sequelize = sequelize