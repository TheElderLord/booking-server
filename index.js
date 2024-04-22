const express = require('express');
const cors = require('cors');

const { appPort } = require('./constants');

const adminRoomRoutes = require('./routes/admin/roomRoutes');
const adminRequestRoutes = require('./routes/admin/requestsRouter');
const adminUserRoutes = require('./routes/admin/userRoutes');

const userRoutes = require("./routes/user/userRoomRoutes");


const app = express();

// Invoke cors to get the middleware handler
app.use(cors());
app.use(express.json());

app.use('/api/v1/admin/rooms', adminRoomRoutes);

app.use('/api/v1/admin/requests', adminRequestRoutes);
app.use('/api/v1/admin/users',adminUserRoutes);

app.use('/api/v1/rooms',userRoutes);



app.use('/images', express.static('images'));

app.listen(appPort, () => {
  console.log(`Server listening on port ${appPort}`);
});
