const db= require('./dbstructure')
const sequelize = db.dbstruct
const Person = sequelize.models.User
const Account = sequelize.models.Account

async function addData(name,address,bankname,balance)
{
    let per,acc
    try{
        
    per = await Person.create({
        name:name,
        address:address
    })
    acc = await Account.create({
        bankname:bankname,
        balance:balance
    })
   return per.addAccounts(acc)
    }
    catch(err)
    {
        console.log(err);
        
    }
}

async function addBank(bankname,balance,id) 
{
    let per,acc
    try{
        per = await Person.findByPk(id)
        acc = await Account.create({
            bankname:bankname,
            balance:balance
        })
        if(per!==null)
        {
            return per.addAccounts(acc)
            
        }
        else
        {
            return 'User not found'
        }
    }    
    catch(err)
    {
        console.log(err);
        
    }
}

async function removeBank(id,name)
{
    let acc,per
    try{
        per = await Person.findByPk(id)
    acc =await Account.findOne({where:{bankname:name}})
    
    return per.removeAccount(acc)
    }
    catch(err)
    {
        console.log(err);
        
    }
}

async function deletePerson(id)
{
    try{
        let result = await Person.destroy({where:{id:id}})
        return result;
    }
    catch(err)
    {
        console.log(err);
        
    }
}

module.exports.dboper = {addData,addBank,removeBank,deletePerson}