const Contact = require('../models/Contact');

// Crear un contacto (POST /api/contacts)
const createContact = async (req, res) => {
  try {
    const { nombre, email } = req.body;

    // Check if a contact with this email already exists
    const existingContact = await Contact.findOne({ where: { email } });
    if (existingContact) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    }

    const newContact = await Contact.create({ nombre, email });
    return res.status(201).json(newContact);
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear contacto', error: error.message });
  }
};

// Listar todos los contactos (GET /api/contacts)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener contactos', error: error.message });
  }
};

// Eliminar un contacto por su ID (DELETE /api/contacts/:id)
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Contact.destroy({
      where: { id }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    return res.status(200).json({ message: 'Contacto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar contacto', error: error.message });
  }
};

module.exports = {
  createContact,
  getContacts,
  deleteContact
};
