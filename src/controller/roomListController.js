const query = require('../db/connect');

const ExcelJS = require('exceljs');


//TRASH
exports.getList = async (req, res) => {
    const { isPaid,completed } = req.query;
    // console.log(isPaid);
    let sql = `SELECT roomList.id, users.id as user_id, users.name, users.surname,rooms.id as room_id, rooms.title, roomList.status,roomList.isPaid,roomList.created_at
    FROM roomList
    INNER JOIN users ON roomList.user_id = users.id
    INNER JOIN rooms ON roomList.room_id = rooms.id;`;
    try {
        if (isPaid === "true") {
            sql = `SELECT roomList.id, users.id as user_id, users.name, users.surname,rooms.id as room_id, rooms.title, roomList.status,roomList.isPaid,roomList.created_at
            FROM roomList
            INNER JOIN users ON roomList.user_id = users.id
            INNER JOIN rooms ON roomList.room_id = rooms.id where roomList.isPaid = 1`;
        }
        if(completed === "false"){
            sql = `SELECT roomList.id, users.id as user_id, users.name, users.surname,rooms.id as room_id, rooms.title, roomList.status,roomList.isPaid,roomList.created_at
            FROM roomList
            INNER JOIN users ON roomList.user_id = users.id
            INNER JOIN rooms ON roomList.room_id = rooms.id where roomList.isPaid = 1`;
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
};

exports.createRoomList = async (req, res) => {
    // console.log("create")
    const { user_id, room_id } = req.body;
    const dateTime = new Date().toLocaleString("ru-RU");
    const formatted = dateTime.split(",");
    const sql = `Insert into roomList(user_id,room_id,created_at) values(?,?,?)`;
    try {
        const result = await query(sql, [user_id, room_id, formatted[0]]);
        res.status(200).json({
            message: "Success",

        })
    } catch (err) {
        console.log(err);
    }
}

exports.getRooms = async (req, res) => {
    const sql = `Select * from rooms`;
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



exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    const sql = `delete from roomList where id = ${id}`;
    // console.log(sql);
    try {
        const results = await query(sql);
        res.status(200).json({
            message: "Success",
            items: results
        })
    } catch (err) {
        res.status(500).json({
            message: "Bad request",
        })
        console.log(err)
    }
}
exports.setPaid = async (req, res) => {
    // console.log("dasdasd")
    const id = req.params.id;
    const { isPaid } = req.body;
    const sql = `Update roomList set isPaid = ${isPaid} where id = ${id}`;
    // console.log(sql);
    try {
        const results = await query(sql);
        res.status(200).json({
            message: "Success",
            items: results
        })
    } catch (err) {
        res.status(500).json({
            message: "Bad request",
        })
        console.log(err);
    }
}



exports.downloadExcel = async (req, res) => {
    let sql = `
        SELECT 
            roomList.id, 
            users.id AS user_id, 
            users.name, 
            users.surname,
            rooms.id AS room_id, 
            rooms.title, 
            roomList.status,
            roomList.isPaid,
            roomList.created_at
        FROM 
            roomList
        INNER JOIN 
            users ON roomList.user_id = users.id
        INNER JOIN 
            rooms ON roomList.room_id = rooms.id;
    `;
    
    try {
        // Fetch data from the database
        const data = await query(sql);

        // Create a new workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Define columns
        worksheet.columns = [
            { header: 'ID', key: 'id' },
            // { header: 'User ID', key: 'user_id' },
            { header: 'Имя', key: 'name' },
            { header: 'Фамилия', key: 'surname' },
            // { header: 'Room ID', key: 'room_id' },
            { header: 'Квартира', key: 'title' },
            // { header: 'Status', key: 'status' },
            { header: 'Оплачено', key: 'isPaid' },
            { header: 'Дата', key: 'created_at' }
        ];
        data.map(e=>{
            e.isPaid = e.isPaid === 1 ?'Оплачено' :'Нет оплаты'
        });
        // console.log(data)

        // Add data to the worksheet
        worksheet.addRows(data);

        // Generate Excel file buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Send the buffer as response
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('Content-Disposition', 'attachment; filename=generated_data.xlsx');
        res.send(buffer);
    } catch (error) {
        console.error('Error downloading Excel:', error);
        res.status(500).send('Error downloading Excel');
    }
}
