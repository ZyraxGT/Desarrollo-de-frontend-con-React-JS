import './Usuarios.css';
import React, { useEffect, useState } from 'react';
import { obtenerUsuarios } from '../services/api';
import UsuarioCard from '../components/UsuarioCard';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 5;

  const [nuevoUsuario, setNuevoUsuario] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Cargar desde LocalStorage
  useEffect(() => {
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
      setUsuarios(JSON.parse(usuariosGuardados));
    } else {
      obtenerUsuarios().then(data => {
        setUsuarios(data);
        localStorage.setItem('usuarios', JSON.stringify(data));
      });
    }
  }, []);

  // Guardar en LocalStorage al cambiar
  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.name.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);
  const indiceInicio = (paginaActual - 1) * usuariosPorPagina;
  const usuariosPaginados = usuariosFiltrados.slice(indiceInicio, indiceInicio + usuariosPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const handleGuardarUsuario = (e) => {
    e.preventDefault();
    const nuevo = {
      id: Date.now(),
      ...nuevoUsuario
    };
    setUsuarios([...usuarios, nuevo]);
    setNuevoUsuario({ name: '', email: '', phone: '' });
  };

  const eliminarUsuario = (id) => {
    const actualizados = usuarios.filter(u => u.id !== id);
    setUsuarios(actualizados);
  };

  return (
    <div className="usuarios-container">
      <h2>Usuarios del sistema</h2>

      <input
        type="text"
        placeholder="Buscar por nombre o correo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador-input"
      />

      <form onSubmit={handleGuardarUsuario} className="formulario-usuario">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoUsuario.name}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={nuevoUsuario.email}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={nuevoUsuario.phone}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, phone: e.target.value })}
        />
        <button type="submit">Agregar Usuario</button>
      </form>

      {usuariosPaginados.map(usuario => (
        <UsuarioCard key={usuario.id} usuario={usuario} onDelete={eliminarUsuario} />
      ))}

      <div className="paginacion">
        <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>Anterior</button>
        <span>Página {paginaActual} de {totalPaginas}</span>
        <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>Siguiente</button>
      </div>
    </div>
  );
};

export default Usuarios;
