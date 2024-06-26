const query = require("../../db/connect");

exports.getRequests = async (req, res) => {
  try {
    // const sqlBlackList = `Select * from users where `
    let sql = `SELECT r.* ,CASE WHEN u.blacklist = 1 THEN 1 ELSE 0 END AS is_black FROM requests r
    LEFT JOIN 
    users u ON r.number = u.number;`;
    if (req.query.hide) {
      sql = `SELECT r.* ,CASE WHEN u.blacklist = 1 THEN 1 ELSE 0 END AS is_black FROM requests r
      LEFT JOIN 
      users u ON r.number = u.number where r.status = 0;`;
    } else if (req.query.completed) {
      sql = `SELECT r.* ,CASE WHEN u.blacklist = 1 THEN 1 ELSE 0 END AS is_black FROM requests r
      LEFT JOIN 
      users u ON r.number = u.number where r.status = 1;`;
    }
    const results = await query(sql);
    res.status(200).json({
      message: "Success",
      items: results,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.createRequest = async (req, res) => {
  try {
    const { name, lastname, number } = req.body;
    const dateTime = new Date().toLocaleString("ru-RU");
    const [date, time] = dateTime.split(", ");
    const sql =
      "INSERT INTO requests (name, lastname, number, day, time) VALUES (?, ?, ?, ?, ?)";
    await query(sql, [name, lastname, number, date, time]);
    res.status(201).json({
      message: "Request created successfully",
    });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const sql = "DELETE FROM requests WHERE id = ?";
    await query(sql, [req.params.id]);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.setStatus = async (req, res) => {
  try {
    const sql = "UPDATE requests SET status = 1 WHERE id = ?";
    await query(sql, [req.params.id]);
    res.status(204).end();
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
