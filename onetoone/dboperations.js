const db= require('./dbstructure')
let sequelize = db.sequelize
const Person = sequelize.models.Person
const License = sequelize.models.License

async function add(id,name,twowheeler,address)
{
    let person,license
    try
    {
        person = await Person.create({
            name:name,
            address:address
        })
        license = await License.create({
            id:id,
            name:name,
            twowheeler:twowheeler
        })
        return license.setPerson(person)
    }  
    catch(err)
    {
        if(err)
            console.log(err);
            
    }      
}

async function viewAll()
    {
        try{
            let result = await Person.findAll()
            return result
        }
        catch(err)
        {
            if (err) {
                console.log(err);
                
            }
        }
    }

async function del(name)
{
    let result = await Person.destroy({where:{name:name}} )
        return result
   
}
module.exports.oper = {add,viewAll,del}