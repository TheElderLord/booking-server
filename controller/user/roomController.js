const query = require("../../db/connect");

exports.getRooms = async (req, res) => {
  const { amount, squareMin, squareMax, bookdate, priceMin, priceMax, free } =
    req.query;
  // console.log(req.query);

  // Modify the SQL query to include the filter conditions
  let sql = `Select * from rooms`;

  const conditions = [];
  // console.log(typeof squareMin)
  if (amount) {
    if (amount === "2") {
      conditions.push(`amount = 1 or amount = 2`);
    } else if (amount === "3") {
      conditions.push(`amount = 2`);
    } else conditions.push(`amount = ${amount}`);
  }
  if (free) {
    conditions.push(`free = 1`);
  }
  if (squareMin) {
    conditions.push(`rooms.square >= ${squareMin}`);
  }
  if (squareMax) {
    conditions.push(`rooms.square <= ${squareMax}`);
  }
  // if (bookdate) {
  //     const startDate = bookdate.split("-")[0];
  // const endDate = bookdate.split("-")[1];
  //   conditions.push(`${bookdate} BETWEEN rooms.booked_date_start AND rooms.booked_date_end`);
  // }
  if (priceMin) {
    conditions.push(`rooms.price >= ${priceMin}`);
  }
  if (priceMax) {
    conditions.push(`rooms.price <= ${priceMax}`);
  }

  // Add the WHERE clause if there are conditions
  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }
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

exports.getRoomById = async (req, res) => {
  const id = req.params.id;
  const sql = `Select * from rooms where id = ${id}`;
  try {
    const result = await query(sql);
    res.status(200).json({
      message: "Success",
      items: result,
    });
  } catch (err) {
    console.log(err);
    console.error("Error executing SQL query:", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

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
};

exports.getBookHistory = async (req, res) => {
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


