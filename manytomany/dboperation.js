const db = require('./dbstructure')
let sequelize = db.seq
let Employee = sequelize.models.Employee
let Assect = sequelize.models.Assect

async function add(empname,assect) 
{
    let employee, assects
    try
    {
        employee = await Employee.create({
            empName:empname
        })
        assects = await Assect.create({
            assect:assect
        })
        return employee.addAssects(assects)
    }
    catch(err)
    {
        console.log(err);
        
    }
}
async function deleteAssect(name)
{
    try
    {
        let result = await Assect.destroy({where:{assect:name}})
        return result
    }   
    catch(err)
    {
        console.log(err);
        
    } 
}
module.exports = {add,deleteAssect}