const query = require("../../db/connect");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../images"));
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
      console.error("Error uploading images:", error);
      res.status(500).json({ error: "Failed to upload images" });
    } else {
      next();
    }
  });
};

exports.createRoom = async (req, res) => {
  try {
    const { title, location, price, floor, complex, amount, square, kitchen_square, conditions, coordinates, people_num, bed_num, description,short_name } = req.body;
    const images = req.files ? req.files.map((file) => file.originalname).join(",") : "Not specified";

    const insertQuery = `
      INSERT INTO rooms 
      (title, location, price, floor, complex, amount, square, kitchen_square, conditions, coordinates, people_num, bed_num, description, small_images,short_name) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const dataToInsert = [title, location, price, floor, complex, amount, square, kitchen_square, conditions, coordinates, people_num, bed_num, description, images,short_name];
    const result = await query(insertQuery, dataToInsert);

    if (result.affectedRows > 0) {
      const roomId = result.insertId.toString();
      res.status(204).json({ message: "Room created successfully", roomId });
    } else {
      res.status(500).json({ error: "Failed to create room" });
    }
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id; // Extract room id from request params
    const { title, location, price, floor, complex, amount, square, kitchen_square, conditions, coordinates, people_num, bed_num, description, short_name } = req.body;
    const images = req.files ? req.files.map((file) => file.originalname).join(",") : "Not specified";

    const updateQuery = `
      UPDATE rooms 
      SET title = ?, location = ?, price = ?, floor = ?, complex = ?, amount = ?, square = ?, kitchen_square = ?, conditions = ?, coordinates = ?, people_num = ?, bed_num = ?, description = ?, small_images = ?, short_name = ?
      WHERE id = ?
    `;

    

    const dataToUpdate = [title, location, price, floor, complex, amount, square, kitchen_square, conditions, coordinates, people_num, bed_num, description, images, short_name, roomId];
    const result = await query(updateQuery, dataToUpdate);
    console.log(result);
    if (result.affectedRows > 0) {
      res.status(204).json({ message: "Room updated successfully" });
    } else {
      res.status(404).json({ error: "Room not found" });
    }
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getRooms = async (req, res) => {
  try {
    const sql = "SELECT * FROM rooms";
    const results = await query(sql);
    res.status(200).json({ message: "Success", items: results });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getRoom = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM rooms WHERE id = ?";
  try {
    const results = await query(sql, [id]);
    res.status(200).json({ message: "Success", items: results });
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.bookRoom = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, start, end } = req.body;
  const sql = `
    INSERT INTO bookhistory (firstname, lastname, startDate, endDate, roomId, created_at) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  try {
    const result = await query(sql, [firstname, lastname, start, end, id, new Date().toLocaleString("ru-RU")]);
    res.status(200).json({ message: "Room booked successfully", items: result });
  } catch (error) {
    console.error("Error booking room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteRoom = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM rooms WHERE id = ?";
  try {
    const result = await query(sql, [id]);
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Book history

exports.getBookHistoryById = async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM bookhistory WHERE roomId = ?";
  try {
    const results = await query(sql, [id]);
    res.status(200).json({ message: "Success", items: results });
  } catch (error) {
    console.error("Error fetching booking history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBookHistory = async (req, res) => {
  const { paid, completed } = req.query;
  let sql;
  if (paid === "true") {
    sql = `SELECT * FROM bookhistory WHERE isPaid = 1 ORDER BY id DESC`;
  } else if (paid === "false") {
    sql = `SELECT * FROM bookhistory WHERE isPaid = 0 ORDER BY id DESC`;
  } else if (completed === "false") {
    sql = `SELECT * FROM bookhistory WHERE status = 0 ORDER BY id DESC`;
  } else {
    sql = `SELECT * FROM bookhistory ORDER BY id DESC`;
  }
  try {
    const results = await query(sql);
    res.status(200).json({ message: "Success", items: results });
  } catch (error) {
    console.error("Error fetching booking history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



exports.deleteHistory = async (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM bookhistory WHERE id = ?";
  try {
    const result = await query(sql, [id]);
    res.status(200).json({ message: "Booking history deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.setPaid = async (req, res) => {
  const id = req.params.id;
  const { isPaid } = req.body;
  const sql = "UPDATE bookhistory SET isPaid = ? WHERE id = ?";
  try {
    await query(sql, [isPaid, id]);
    res.status(200).json({ message: "Payment status updated successfully" });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.setGiven = async (req, res) => {
  const id = req.params.id;
  const { amount } = req.body;
  const sql = "UPDATE bookhistory SET given = ? WHERE id = ?";
  try {
    await query(sql, [amount, id]);
    res.status(200).json({ message: "Given amount updated successfully" });
  } catch (error) {
    console.error("Error updating given amount:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = exports;
