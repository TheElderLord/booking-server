const query = require('../db/connect');

exports.getRequests = async (req, res) => {
    const sql = "Select * from requests";
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
exports.createRequest = async (req, res) => {
    // console.log(req.body)
    const {name,iin,number} = req.body;
    const sql = `Insert into requests(name,iin,number) values('${name}','${iin}','${number}')`;
    try {
        const results = await query(sql);
        res.status(200).json({
            message: "Success",
            items: results
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: "Bad request",
        })
    }
}
exports.setStatus = async (req,res) =>{
    const sql = `Update requests set status = 1 where id = ${req.params.id}`;
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