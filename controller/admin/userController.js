const query = require('../../db/connect');

exports.getUsers = async (req, res) => {
    // const sql = `SELECT u.*, IFNULL(GROUP_CONCAT(a.comments SEPARATOR ', '), '') AS all_comments
    // FROM users u
    // LEFT JOIN userAdditional a ON u.id = a.user_id
    // GROUP BY u.id, u.name;`;
    const sql = `Select * from users`;
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
};

exports.createUser = async (req, res) => {
    const dateTime = new Date().toLocaleString("ru-RU");

    const formatted = dateTime.split(",");

    const { name, surname, iin, phone, status } = req.body;
    const insertSql = `Insert into users(name,surname,iin,number,status,date_created) values(?,?,?,?,?,?)`;
    try {
        const results = await query(insertSql, [name, surname, iin, phone, status, formatted[0]]);
        // console.log(results);
        res.status(201).json({
            message: "Success",
            // items: results
        })
    } catch (err) {
        res.status(500).json({
            message: "Error",

        })
        console.log(err)
    }


};

exports.updateUser = async (req, res) => {
    const { name, surname, iin, phone, status, all_comments } = req.body;
    const userId = req.params.id; // Assuming you have the user ID in the request parameters
    console.log(req.body);
    const updateSql = `
        UPDATE users 
        SET name = ?, surname = ?, iin = ?, number = ?, status = ?, all_comments = ?
        WHERE id = ?; `;

    try {
        const results = await query(updateSql, [name, surname, iin, phone, status, all_comments, userId]);
        console.log(updateSql);
        if (results.affectedRows > 0) {
            res.status(200).json({
                message: "Update Successful",
            });
        } else {
            res.status(404).json({
                message: "User not found",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error",
        });
        console.error(err);
    }
};
exports.deleteUser = async (req, res) => {
    const userId = req.params.id; // Assuming you have the user ID in the request parameters

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
    } catch (err) {
        res.status(500).json({
            message: "Error",
        });
        console.error(err);
    }
};



// exports.createUser = async (req, res) => {

// }