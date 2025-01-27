const {Sequelize,DataTypes} = require('sequelize')
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


const Country = sequelize.define('Country',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},{
    timestamps:false,
    freezeTableName:true
})

const Capital = sequelize.define('Capital',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    }
})

Country.hasOne(Capital);
Capital.belongsTo(Country)
let cou,cap


const country = sequelize.models.Country
const capital = sequelize.models.Capital
// country.create({name:'Japan'}).then((data)=>{
//     console.log(data);
// }).catch((err)=>{if(err) console.log(err);
// })
// capital.create({name:'taiwan'}).then((data)=>{
//     let cap = data
//     cap.setCountry(country)
//     console.log(data);
    
// }).catch((err)=>{if(err) console.log(err);
// })
sequelize.sync({alter:true}).then(()=>{
    return country.findOne({where:{name:'Japan'}}).then((data)=>{
        cou = data
       return capital.findOne({where:{name:'taiwan'}}).then((data)=>{
            cap = data
            return cap.setCountry(cou)
           
        }).then((data)=>{
            console.log(data);
            
        })
    })
}).catch((err)=>{ 
    console.log(err);
    
})