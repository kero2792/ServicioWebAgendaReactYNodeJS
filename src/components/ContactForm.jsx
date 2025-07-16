import { useState } from "react";

function ContactForm({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim() || !apellido.trim() || !telefono.trim()) {
      alert("Por favor complete todos los campos");
      return;
    }

    setLoading(true);

    const contacto = {
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      telefono: telefono.trim()
    };

    try {
      const res = await fetch("http://localhost:3001/api/contactos", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contacto),
      });

      const data = await res.json();

      console.log('Respuesta del servidor:', data);

      if (data.exito === true) {
        onAdd(contacto);
        setNombre("");
        setApellido("");
        setTelefono("");

        alert("Contacto agregado exitosamente");
      } else {
        alert(data.error || "Error al agregar el contacto");
      }

    } catch (error) {
      console.error('Error en el frontend:', error);
      alert("Error al agregar el contacto. Por favor intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Juan"
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Ej: Pérez"
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: 809-555-1234"
            disabled={loading}
          />
        </div>
        <div className="form-group full-width">
          <button type="submit" disabled={loading}>
            {loading ? "Agregando..." : "Agregar Contacto"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;