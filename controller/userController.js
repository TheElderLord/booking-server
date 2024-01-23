const query = require('../db/connect');

exports.getUsers = async (req, res) => {
    const sql = "Select * from users";
    try {
        const results = await query(sql);
        res.status(200).json({
            message: "Success",
            items: results
        })
    } catch {
        res.status(500).json({
            message: "Bad request",
        })
    }
}

exports.createUser = async(req,res)=>{

}

exports.updateUser = async(req,res)=>{
    
}

exports.createUser = async(req,res)=>{
    
}