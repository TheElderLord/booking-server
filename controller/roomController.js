const query = require('../db/connect');


const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');

// Set up Multer for file uploads
// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../images'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage
});

exports.uploadImages = (req, res, next) => {
    upload.array('images', 10)(req, res, (error) => {
        if (error) {
            // Handle the error
            console.error(error);
            // You can choose to return an error response or call `next(error)` to pass the error to the next middleware
        }
        next(); // Call next() to proceed to the next middleware
    });
};

exports.createRoom =  async (req, res) => {
    try {
        const { title, location, price, floor, complex, amount, square,
            kitchen_square, conditions, coordinates, people_num, bed_num,
            description } = req.body;


        let image = null;
        if (Array.isArray(req.files)) {
            image = req.files.map(file => file.originalname);
            image = image.join(',');
        } else
            image = "Not specified";


        console.log(image);
        const insertQuery = `INSERT INTO rooms 
            (title, location, price, floor, complex, amount, square, kitchen_square, conditions, coordinates, people_num, bed_num, description,small_images) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

        const dataToInsert = [title, location, price, floor, complex, amount, square, kitchen_square, conditions, coordinates, people_num, bed_num, description,image];

        // Assuming you have a 'query' function that executes SQL queries
        const result = await query(insertQuery, dataToInsert);


        // Check if the insertion was successful
        if (result.affectedRows > 0) {
            // Store the path to the folder in a variable
            const roomId = result.insertId.toString(); // Assuming the inserted ID is used as the room ID
            
            console.log(roomId);

            res.status(200).json({ message: 'Room created successfully' });
        } else {
            res.status(500).json({ error: 'Failed to create room' });
        }
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getRooms = async (req, res) => {
    const { amouht, square, date, price } = req.query;

    const sql = `WITH RankedBookHistory AS (
  SELECT
    bookHistory.*,
    ROW_NUMBER() OVER (PARTITION BY bookHistory.roomId ORDER BY bookHistory.id DESC) AS row_num
  FROM
    bookHistory
)
SELECT
  rooms.*,
  COALESCE(rbh.status, 1) AS status
FROM
  rooms
LEFT JOIN
  RankedBookHistory rbh ON rooms.id = rbh.roomId AND rbh.row_num = 1;
`;
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


exports.getRoom = async (req, res) => {
    const id = req.params.id;
    const sql = `WITH RankedBookHistory AS (
  SELECT
    bookHistory.*,
    ROW_NUMBER() OVER (PARTITION BY bookHistory.roomId ORDER BY bookHistory.id DESC) AS row_num
  FROM
    bookHistory
)
SELECT
  rooms.*,
  COALESCE(rbh.status, 1) AS status
FROM
  rooms
LEFT JOIN
  RankedBookHistory rbh ON rooms.id = rbh.roomId AND rbh.row_num = 1 where  rooms.id = ${id}`;
    try {
        const results = await query(sql);
        res.status(200).json({
            message: "Success",
            items: results
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Bad request",
        })
    }
}
exports.getBookHistory = async (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * from bookHistory where roomId = ${id} `;
    try {
        const results = await query(sql);
        res.status(200).json({
            message: "Success",
            items: results
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Bad request",
        })
    }
}
exports.bookRoom = async (req, res) => {
    const id = req.params.id;
    const { fullname, iin, start, end } = req.body;
    const checkBook = `Select * from bookHistory where status = 0 and roomId = ${id}`;

    const sql = `Insert into bookHistory(fullname,iin,startDate,endDate,roomId) values(?,?,?,?,?)`;
    try {
        const ch = await query(checkBook);
        // console.log(ch.length === 0)
        if (ch.length === 0) {
            const results = await query(sql, [fullname, iin, start, end, id]);
            res.status(200).json({
                message: "Success",
                items: results
            })
        }
        else {
            res.status(400).json({
                message: "The room is already booked"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Bad request",
        })
    }
}

exports.setFree = async (req, res) => {
    const id = req.params.id;
    // const book = req.body.bookDate;
    const sql = `Update bookHistory set status = 1 where roomId = ${id}`;
    try {
        const results = await query(sql);
        res.status(200).json({
            message: "Success",
            items: results
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Bad request",
        })
    }

}
exports.deleteRoom = async (req, res) => {
    const id = req.params.id;
    const sql = `Delete from rooms where id = ?`;
    try {
        const result = await query(sql, id);
        res.status(200).json({
            message: "Room is deleted",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Bad request",
        })
    }
}

