const query = require("../../db/connect");

exports.getRooms = async (req, res) => {
  const { amount, squareMin, squareMax, bookdate, priceMin, priceMax, free } = req.query;

  // Initialize the SQL query with the base SELECT statement
  let sql = `SELECT * FROM rooms`;

  // Initialize an array to store the conditions
  const conditions = [];

  // Add conditions based on query parameters
  if (amount) {
    if (amount === "2") {
      conditions.push(`amount IN (1, 2)`);
    } else if (amount === "3") {
      conditions.push(`amount = 2`);
    } else {
      conditions.push(`amount = ?`);
    }
  }
  if (free) {
    conditions.push(`free = 1`);
  }
  if (squareMin) {
    conditions.push(`square >= ?`);
  }
  if (squareMax) {
    conditions.push(`square <= ?`);
  }
  if (priceMin) {
    conditions.push(`price >= ?`);
  }
  if (priceMax) {
    conditions.push(`price <= ?`);
  }

  // Add the WHERE clause if there are conditions
  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  try {
    // Execute the SQL query with parameters
    const results = await query(sql, [amount, squareMin, squareMax, priceMin, priceMax]);
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

exports.getRoomById = async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM rooms WHERE id = ?`;
  try {
    const result = await query(sql, [id]);
    res.status(200).json({
      message: "Success",
      items: result,
    });
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.createRequest = async (req, res) => {
  const dateTime = new Date().toLocaleString("ru-RU");
  const { name, lastname, iin, number } = req.body;
  const formatted = dateTime.split(",");
  const sql = `INSERT INTO requests (name, lastname, iin, number, day, time) VALUES (?, ?, ?, ?, ?, ?)`;
  try {
    await query(sql, [name, lastname, iin, number, formatted[0], formatted[1]]);
    res.status(201).json({
      message: "Success",
    });
  } catch (error) {
    console.error("Error executing SQL query:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.getBookHistory = async (req, res) => {
  const id = req.params.id;
  
  // Get today's date in the format 'dd.mm.yyyy'
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').reverse().join('.');
  
  // Construct the SQL query with the dynamic date
  const sql = `SELECT * FROM bookhistory WHERE roomId = ? AND STR_TO_DATE(endDate, '%d.%m.%Y') > STR_TO_DATE('${today}', '%d.%m.%Y')`;
  
  try {
    const results = await query(sql, [id]);
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

