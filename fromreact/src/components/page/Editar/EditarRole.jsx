import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarRol = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    
  });

  useEffect(() => {
    const obtenerRol = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/role/${id}`);
        const { nombre } = response.data;
        setFormData({
          nombre,
        
        });
      } catch (error) {
        console.error('Error al obtener Rol:', error);
      }
    };

    obtenerRol();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8085/api/supplier/update/${id}`, formData);
      alert('Rol actualizado exitosamente');
      // Redireccionar después de actualizar
      navigate('/ListarRol');
    } catch (error) {
      console.error('Error al actualizar Rol:', error);
      alert('Error al actualizar ');
    }
  };

  return (
    <div className="contenedor-principal">
      <h2>Editar Proveedor</h2>
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <fieldset>
          <legend>Información Personal</legend>
          <div className="formulario_grupo">
            <label htmlFor="nombreProveedor">Nombre:</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarRol;
