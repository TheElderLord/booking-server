const express = require('express');
const cors = require('cors');
const path = require('path')

const { appPort } = require('./constant/constants');

const adminRoomRoutes = require('./routes/admin/roomRoutes');
const adminRequestRoutes = require('./routes/admin/requestsRouter');
const adminUserRoutes = require('./routes/admin/userRoutes');

const userRoutes = require("./routes/user/userRoomRoutes");
const authRoutes = require("./routes/admin/authRoute")

const history = require('connect-history-api-fallback');

const app = express();
app.use(history());

// Invoke cors to get the middleware handler
app.use(cors());
app.use(express.json());

app.use('/api/v1/admin/rooms', adminRoomRoutes);

app.use('/api/v1/admin/requests', adminRequestRoutes);
app.use('/api/v1/admin/users',adminUserRoutes);

app.use('/api/v1/rooms',userRoutes);
app.use("/api/v1/login",authRoutes)



app.use(express.static("dist"));

app.use('/images', express.static('images'));

// Handle SPA
app.get('*', (req, res) => {
  // Exclude API routes from serving index.html
  if (req.originalUrl.startsWith('/api')) {
    res.sendStatus(404); // Not Found for API routes
  } else {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});


app.listen(appPort, () => {
  console.log(`Server listening on port ${appPort}`);
});
