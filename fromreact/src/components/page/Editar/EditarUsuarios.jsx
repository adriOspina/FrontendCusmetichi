/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarUsuarios = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contraseña: '',
    email: '',
    nombre: ''
  });

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/user/${id}`);
        setFormData(response.data); // Actualiza los datos del formulario con los datos del Usuarios
      } catch (error) {
        console.error('Error al obtener Usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { contraseña, email, nombre } = formData;
      await axios.put(`http://localhost:8085/api/user/update/${id}`, {
        contraseña,
        email,
        nombre
      });
      alert('Usuario actualizado exitosamente');
      
    } catch (error) {
      console.error('Error al actualizar Usuario:', error);
      alert('Error al actualizar Usuario');
    }
  };

  return (
    <div className="contenedor-principal">
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <fieldset>
          <legend>Información Personal</legend>
          <div className="formulario_grupo">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="formulario_grupo">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="formulario_grupo">
            <label htmlFor="contraseña">Contraseña:</label>
            <input
              type="text"
              name="contraseña"
              id="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
            />
          </div>

       
        </fieldset>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarUsuarios;
