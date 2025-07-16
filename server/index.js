const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/contactos', async (req, res) => {
  try {
    const response = await axios.get('http://www.raydelto.org/agenda.php');
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener contactos:', error.message);
    res.status(500).json({ error: 'Error al obtener los contactos' });
  }
});

app.post('/api/contactos', async (req, res) => {
  try {
    const { nombre, apellido, telefono } = req.body;

    if (!nombre || !apellido || !telefono) {
      return res.status(400).json({
        exito: false,
        error: 'Faltan campos requeridos'
      });
    }
    const params = new URLSearchParams();
    params.append('nombre', nombre.trim());
    params.append('apellido', apellido.trim());
    params.append('telefono', telefono.trim());

    console.log('Enviando datos:', { nombre, apellido, telefono });
    const response = await axios.post('http://www.raydelto.org/agenda.php',
      {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        telefono: telefono.trim()
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
      }
    );

    console.log('Respuesta del servidor:', response.data);

    res.json({
      exito: true,
      mensaje: 'Contacto almacenado correctamente',
      data: response.data
    });

  } catch (error) {
    console.error('Error al almacenar contacto:', error.message);

    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response data:', error.response.data);

      res.status(500).json({
        exito: false,
        error: 'Error al almacenar el contacto',
        details: error.response.data
      });
    } else {
      res.status(500).json({
        exito: false,
        error: 'Error de conexión al almacenar el contacto'
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
})