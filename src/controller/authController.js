

exports.auth = async (req, res) => {
    // console.log("create")
    const { username, password } = req.body;
    // console.log(username,password)
    try {
        if(username === "admin" && password==="zaqer1323f")
        res.status(200).json({
            message: "Success",

        })
    } catch (err) {
        console.log(err);
    }
}