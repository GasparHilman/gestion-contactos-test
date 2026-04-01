import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import './App.css';

const API_URL = 'http://localhost:5000/api/contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  const fetchContacts = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nombre || !email) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email })
      });

      if (response.ok) {
        setNombre('');
        setEmail('');
        fetchContacts();
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Error al agregar el contacto');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      alert('Error de conexión con el servidor');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Gestión de Contactos</h1>

      <form className="contact-form" onSubmit={handleAdd}>
        <div className="form-group">
          <input
            type="text"
            className="input-field"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-add">Agregar</button>
      </form>

      <div className="contacts-table-container">
        <table className="contacts-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="3" className="empty-state">No hay contactos guardados.</td>
              </tr>
            ) : (
              contacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.nombre}</td>
                  <td>{contact.email}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(contact.id)}
                      title="Eliminar contacto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
