require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Main Route
app.get('/', (req, res) => {
  res.send('API Node.js/Express funcionando correctamente.');
});

// Routes
app.use('/api/contacts', contactRoutes);

// Sincronizar la base de datos y arrancar el servidor
sequelize.sync() // Sincroniza los modelos con la base de datos
  .then(() => {
    console.log('Base de datos SQLite sincronizada correctamente.');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
