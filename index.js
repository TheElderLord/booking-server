const express = require('express');
const cors = require('cors');

const { appPort } = require('./constants');
const roomRoutes = require('./routes/admin/roomRoutes');
const adminRoutes = require('./routes/adminRoutes');
const requestRoutes = require('./routes/admin/requestsRouter');
const userRoutes = require('./routes/userRoutes');
const roomListRoutes = require('./routes/roomListRoutes');

const app = express();

// Invoke cors to get the middleware handler
app.use(cors());
app.use(express.json());

app.use('/api/v1/rooms', roomRoutes);

app.use('/api/v1/requests', requestRoutes);
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/roomList',roomListRoutes)

app.use('/images', express.static('images'));

app.listen(appPort, () => {
  console.log(`Server listening on port ${appPort}`);
});
