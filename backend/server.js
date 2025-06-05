require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const pool = require('./db');
const { Pool } = require('pg');
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const JWT_SECRET = process.env.JWT_SECRET || 'supersecreto';

app.use(cors()); 
app.use(express.json());

// Conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'inicioSesion',
  password: '@3581321', 
  port: 5432,
});

// Ruta para registrar usuarios
app.post('/register', async (req, res) => {
  const { nombre_completo, correo_electronico, contrasena } = req.body;
  try {
    const userExist = await pool.query('SELECT * FROM usuarios WHERE correo_electronico = $1', [correo_electronico]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const newUser = await pool.query(
      'INSERT INTO usuarios (nombre_completo, correo_electronico, contrasena) VALUES ($1, $2) RETURNING id, nombre_completo, correo_electronico',
      [nombre_completo, correo_electronico, hashedPassword]
    );

    const token = jwt.sign({ userId: newUser.rows[0].id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { correo_electronico, contrasena} = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo_electronico = $1', [correo_electronico]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(contrasena, user.contrasena))) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });


    res.json({ token, user: { id: user.id,  nombre_completo: user.nombre_completo, correo_electronico: user.correo_electronico  } });
  } catch (err) {
        console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'clp', // moneda Chile
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

/*const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
*/

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});

