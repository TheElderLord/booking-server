const query = require('../db/connect');

exports.getUsers = async (req, res) => {
    const sql = `SELECT u.*, IFNULL(GROUP_CONCAT(a.comments SEPARATOR ', '), '') AS all_comments
    FROM users u
    LEFT JOIN userAdditional a ON u.id = a.user_id
    GROUP BY u.id, u.name;`;
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
    const {name,surname,iin,phone,status} =req.body;
    

}

exports.updateUser = async(req,res)=>{
    
}

exports.createUser = async(req,res)=>{
    
}