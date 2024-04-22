const query = require("../../db/connect");

const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");

// Set up Multer for file uploads
// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

exports.uploadImages = (req, res, next) => {
  upload.array("images", 10)(req, res, (error) => {
    if (error) {
      // Handle the error
      console.error(error);
      // You can choose to return an error response or call `next(error)` to pass the error to the next middleware
    }
    next(); // Call next() to proceed to the next middleware
  });
};

exports.createRoom = async (req, res) => {
  try {
    const {
      title,
      location,
      price,
      floor,
      complex,
      amount,
      square,
      kitchen_square,
      conditions,
      coordinates,
      people_num,
      bed_num,
      description,
    } = req.body;

    let image = null;
    if (Array.isArray(req.files)) {
      image = req.files.map((file) => file.originalname);
      image = image.join(",");
    } else image = "Not specified";

    console.log(image);
    const insertQuery = `INSERT INTO rooms 
            (title, location, price, floor, complex, amount, square, kitchen_square, conditions, coordinates, people_num, bed_num, description,small_images) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

    const dataToInsert = [
      title,
      location,
      price,
      floor,
      complex,
      amount,
      square,
      kitchen_square,
      conditions,
      coordinates,
      people_num,
      bed_num,
      description,
      image,
    ];

    // Assuming you have a 'query' function that executes SQL queries
    const result = await query(insertQuery, dataToInsert);

    // Check if the insertion was successful
    if (result.affectedRows > 0) {
      // Store the path to the folder in a variable
      const roomId = result.insertId.toString(); // Assuming the inserted ID is used as the room ID

      console.log(roomId);

      res.status(200).json({ message: "Room created successfully" });
    } else {
      res.status(500).json({ error: "Failed to create room" });
    }
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// exports.getRooms = async (req, res) => {
//   const { amount, squareMin, squareMax, bookdate, priceMin, priceMax } =
//     req.query;

//   // Modify the SQL query to include the filter conditions
//   const sql = `
//       WITH RankedBookHistory AS (
//         SELECT
//           bookHistory.*,
//           ROW_NUMBER() OVER (PARTITION BY bookHistory.roomId ORDER BY bookHistory.id DESC) AS row_num
//         FROM
//           bookHistory
//       )
//       SELECT
//         rooms.*,
//         COALESCE(rbh.status, 1) AS status
//       FROM
//         rooms
//       LEFT JOIN
//         RankedBookHistory rbh ON rooms.id = rbh.roomId AND rbh.row_num = 1

//     `;
//   //  WHERE
//   // -- Filter conditions
//   // (:amount IS NULL OR rooms.amount = :amount)
//   // AND (:squareMin IS NULL OR rooms.square >= :squareMin)
//   // AND (:squareMax IS NULL OR rooms.square <= :squareMax)
//   // AND (:bookdate IS NULL OR :bookdate BETWEEN rooms.booked_date_start AND rooms.booked_date_end)
//   // AND (:priceMin IS NULL OR rooms.price >= :priceMin)
//   // AND (:priceMax IS NULL OR rooms.price <= :priceMax)
//   if (amount || squareMin || squareMax || bookdate || priceMin || priceMax){
//     sql += ' where ';
//   }
//   if(amount){
//     if(squareMin || squareMax || bookdate || priceMin || priceMax){
//       sql
//     }
//     sql += ` amount = ${amount}`;

//   }
//   if(amount)
//     try {
//       const results = await query(sql, {});
//       res.status(200).json({
//         message: "Success",
//         items: results,
//       });
//     } catch (error) {
//       console.error("Error executing SQL query:", error);
//       res.status(500).json({
//         message: "Internal Server Error",
//       });
//     }
// };

exports.getRooms = async (req, res) => {
  // Modify the SQL query to include the filter conditions
  let sql = `Select * from rooms`;

  // console.log(sql);

  try {
    const results = await query(sql, {});
    res.status(200).json({
      message: "Success",
      items: results,
    });
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.getRoom = async (req, res) => {
  const id = req.params.id;
  //   const sql = `WITH RankedBookHistory AS (
  //   SELECT
  //     bookHistory.*,
  //     ROW_NUMBER() OVER (PARTITION BY bookHistory.roomId ORDER BY bookHistory.id DESC) AS row_num
  //   FROM
  //     bookHistory
  // )
  // SELECT
  //   rooms.*,
  //   COALESCE(rbh.status, 1) AS status
  // FROM
  //   rooms
  // LEFT JOIN
  //   RankedBookHistory rbh ON rooms.id = rbh.roomId AND rbh.row_num = 1 where  rooms.id = ${id}`;
  const sql = `Select * from rooms where id = ${id}`;
  try {
    const results = await query(sql);
    res.status(200).json({
      message: "Success",
      items: results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Bad request",
    });
  }
};

exports.bookRoom = async (req, res) => {
  const id = req.params.id;
  const { firstname, lastname, iin, start, end } = req.body;

  // Query to check if the room is already booked for the specified date range
  const checkBook = `
    SELECT * 
    FROM bookHistory 
    WHERE status = 0 
      AND roomId = ${id} 
      AND startDate <= ? 
      AND endDate >= ?
  `;

  // SQL query to insert the booking if the room is available
  const sql = `
    INSERT INTO bookHistory (firstname, lastname, iin, startDate, endDate, roomId,created_at) 
    VALUES (?, ?, ?, ?, ?, ?,?)
  `;

  try {
    // Check if the room is available for the specified date range
    const ch = await query(checkBook, [end, start]);

    if (ch.length === 0) {
      // Room is available, proceed with booking
      const results = await query(sql, [
        firstname,
        lastname,
        iin,
        start,
        end,
        id,
        new Date().toLocaleString("ru-RU"),
      ]);
      res.status(200).json({
        message: "Success",
        items: results,
      });
    } else {
      // Room is already booked for the specified date range
      res.status(400).json({
        message: "The room is already booked for the specified date range",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.setFree = async (req, res) => {
  const id = req.params.id;
  // const book = req.body.bookDate;
  const sql = `Update bookHistory set status = 1 where roomId = ${id}`;
  try {
    const results = await query(sql);
    res.status(200).json({
      message: "Success",
      items: results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Bad request",
    });
  }
};
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
    });
  }
};

exports.getBookHistoryById = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * from bookHistory where roomId = ${id} `;
  try {
    const results = await query(sql);
    res.status(200).json({
      message: "Success",
      items: results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Bad request",
    });
  }
};
exports.getBookHistory = async (req, res) => {
  const paid = req.query.paid;
  let sql;
  if (paid) {
    if (paid === "true") {
      sql = `SELECT h.*,r.title FROM bookhistory h
      left join rooms r
      on h.roomId = r.id where h.isPaid = 1 ORDER BY h.id DESC;`;
    } else
      sql = `SELECT h.*,r.title FROM bookhistory h
      left join rooms r
      on h.roomId = r.id where h.isPaid = 0 ORDER BY h.id DESC;`;
  } else
    sql = `SELECT h.*, r.title 
    FROM bookhistory h
    LEFT JOIN rooms r ON h.roomId = r.id
    ORDER BY h.id DESC;
    `;
  try {
    const results = await query(sql);
    res.status(200).json({
      message: "Success",
      items: results,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Bad request",
    });
  }
};

exports.deleteHistory = async (req, res) => {
  const id = req.params.id;
  const sql = `Delete from bookHistory where id = ?`;
  try {
    const result = await query(sql, id);
    res.status(200).json({
      message: "Room is deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Bad request",
    });
  }
};

exports.setPaid = async (req, res) => {
  // console.log("dasdasd")
  const id = req.params.id;
  const { isPaid } = req.body;
  const sql = `Update bookHistory set isPaid = ${isPaid} where id = ${id}`;
  // console.log(sql);
  try {
    const results = await query(sql);
    res.status(200).json({
      message: "Success",
      items: results,
    });
  } catch (err) {
    res.status(500).json({
      message: "Bad request",
    });
    console.log(err);
  }
};
