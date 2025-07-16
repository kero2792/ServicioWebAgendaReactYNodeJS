function ContactList({ contactos, loading }) {
    return (
      <div id="listaContactos">
        <h2>Contactos Existentes</h2>
        {loading ? (
          <div id="cargando">Cargando contactos...</div>
        ) : (
          <ul id="contactos">
            {contactos.length > 0 ? (
              contactos.map((c, i) => (
                <li key={i}>
                  <b>{c.nombre}</b> {c.apellido} <i>{c.telefono}</i>
                </li>
              ))
            ) : (
              <li>No hay contactos registrados</li>
            )}
          </ul>
        )}
      </div>
    );
  }
  
  export default ContactList;