const {Sequelize,DataTypes,Op, where} = require("sequelize")
const { Where } = require("sequelize/lib/utils")
require('dotenv').config()

const dbname = process.env.dbname
const host = process.env.host
const password = process.env.password
const dialect = process.env.dialect
const user = process.env.user

const sequelize = new Sequelize(dbname,user,password,{
    host:host,
    dialect:dialect
})

const employee = sequelize.define('Employee',{
    id :{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mail:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    dept:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{freezeTableName:true})

const User = sequelize.models.Employee

async function add(name,mail,dept)
{
        const user =  await User.create({
            name:name,
            mail:mail,
            dept:dept
        })
        return user
}

async function viewAll()
{
    const user = await User.findAll();
    return user
}

async function update(id,name,mail,dept)
{
    const user = await User.findByPk(id)
    if((name!="")&&(name!==undefined))
        user.name = name
    if((mail!="")&&(mail!==undefined))
        user.mail = mail
    if((dept!="")&&(dept!==undefined))
        user.dept = dept
    console.log(name+mail+dept);
    user.save()
    return user
}

async function deleteUser(id)
{
    const user = await User.destroy(
        { 
            where:{id:id}
        }
    )
    return user
}

async function selectById(id)
{
    const user = await User.findByPk(id)
    return user
}
sequelize.sync()

module.exports.fun= {add,viewAll,update,selectById,deleteUser}