// UsuarioCard.jsx - Componente que muestra un usuario individual

import React from 'react';

const UsuarioCard = ({ usuario, onEliminar }) => {
  return (
    <div className="usuario-card">
      <h3>{usuario.name}</h3>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Teléfono:</strong> {usuario.phone || 'No registrado'}</p>
      <button onClick={onEliminar}>Eliminar</button>
    </div>
  );
};

export default UsuarioCard;

