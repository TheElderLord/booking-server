const query = require("../../db/connect");

exports.getUsers = async (req, res) => {
  try {
    const sql = `SELECT u.*, IFNULL(GROUP_CONCAT(a.comments SEPARATOR ', '), '') AS all_comments
                     FROM users u
                     LEFT JOIN userAdditional a ON u.id = a.user_id
                     GROUP BY u.id, u.name;`;
    const results = await query(sql);
    res.status(200).json({
      message: "Success",
      items: results,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.createUser = async (req, res) => {
  const dateTime = new Date().toLocaleString("ru-RU");
  const formatted = dateTime.split(",");

  const { name, surname, phone, status } = req.body;
  const insertSql = `INSERT INTO users (name, surname, number, status, date_created) VALUES (?, ?, ?, ?, ?)`;
  try {
    await query(insertSql, [name, surname, phone, status, formatted[0]]);
    res.status(201).json({
      message: "Success",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { name, surname, phone, status, all_comments } = req.body;
  const userId = req.params.id;

  const updateSql = `
        UPDATE users 
        SET name = ?, surname = ?, number = ?, status = ?, all_comments = ?
        WHERE id = ?;
    `;
  try {
    const results = await query(updateSql, [
      name,
      surname,
      phone,
      status,
      all_comments,
      userId,
    ]);
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Update Successful",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  const deleteSql = `
        DELETE FROM users
        WHERE id = ?;
    `;
  try {
    const results = await query(deleteSql, [userId]);
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Delete Successful",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
exports.toBlackList = async (req, res) => {
  const userId = req.params.id;
  const { status } = req.body;
  // console.log(userId,status)
  const patchSql = `Update users set blacklist = ${status} where id = ${userId}`;
  try {
    const results = await query(patchSql, [userId]);
    if (results.affectedRows > 0) {
      res.status(200).json({
        message: "Update Successful",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
