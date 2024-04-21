const query = require('../../db/connect');

exports.getRequests = async (req, res) => {
    let sql = "Select * from requests";
    const hideCompleted = req.query.hide;
    const completed = req.query.completed;
    try {
        if(hideCompleted){
            sql = `Select * from requests where status = 0`;
        }
        else if(completed){
            sql = `Select * from requests where status = 1`;
        }
        
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
    const dateTime = new Date().toLocaleString("ru-RU");
    const {name,lastname,iin,number} = req.body;
    const formatted = dateTime.split(",");
    console.log(formatted)
    const sql = `Insert into requests(name,lastname,iin,number,day,time) values('${name}','${lastname}','${iin}','${number}','${formatted[0]}','${formatted[1]}')`;
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