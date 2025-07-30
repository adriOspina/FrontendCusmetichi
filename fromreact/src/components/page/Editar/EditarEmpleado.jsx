import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarEmpleado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreEmpleado: '',
    apellidoEmpleado: '',
    emailEmpleado: '',
    identificacionEmpleado: '',
    telEmpleado: '',
  });

  useEffect(() => {
    const obtenerEmpleado = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/employee/${id}`);
        setFormData(response.data); // Actualiza los datos del formulario con los datos del Empleado
      } catch (error) {
        console.error('Error al obtener Empleado:', error);
      }
    };

    obtenerEmpleado();
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
      const { nombreEmpleado, apellidoEmpleado, emailEmpleado, identificacionEmpleado, telEmpleado } = formData;
      await axios.put(`http://localhost:8085/api/employee/update/${id}`, {
        nombreEmpleado,
        apellidoEmpleado,
        emailEmpleado,
        identificacionEmpleado,
        telEmpleado
      });
      alert('Empleado actualizado exitosamente');
     
    } catch (error) {
      console.error('Error al actualizar Empleado:', error);
      alert('Error al actualizar Empleado');
    }
  };

  return (
    <div className="contenedor-principal">
      <h2>Editar Empleado</h2>
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <fieldset>
          <legend>Información Personal</legend>
          <div className="formulario_grupo">
            <label htmlFor="nombreEmpleado">Nombre:</label>
            <input
              type="text"
              name="nombreEmpleado"
              id="nombreEmpleado"
              value={formData.nombreEmpleado}
              onChange={handleChange}
            />
          </div>

          <div className="formulario_grupo">
            <label htmlFor="apellidoEmpleado">Apellido:</label>
            <input
              type="text"
              name="apellidoEmpleado"
              id="apellidoEmpleado"
              value={formData.apellidoEmpleado}
              onChange={handleChange}
            />
          </div>

          <div className="formulario_grupo">
            <label htmlFor="emailEmpleado">Email:</label>
            <input
              type="text"
              name="emailEmpleado"
              id="emailEmpleado"
              value={formData.emailEmpleado}
              onChange={handleChange}
            />
          </div>

          <div className="formulario_grupo">
            <label htmlFor="identificacionEmpleado">Cedula:</label>
            <input
              type="text"
              name="identificacionEmpleado"
              id="identificacionEmpleado"
              value={formData.identificacionEmpleado}
              onChange={handleChange}
            />
          </div>

          <div className="formulario_grupo">
            <label htmlFor="telEmpleado">Telefono:</label>
            <input
              type="text"
              name="telEmpleado"
              id="telEmpleado"
              value={formData.telEmpleado}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarEmpleado;
