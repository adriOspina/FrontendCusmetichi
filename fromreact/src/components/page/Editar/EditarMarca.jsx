/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarMarca = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cantidadEntrada: '',
    fechaEntrada: ''

  });

  useEffect(() => {
    const obtenerMarca= async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/brand/${id}`);
        setFormData(response.data); // Actualiza los datos del formulario con los datos del Marca
      } catch (error) {
        console.error('Error al obtener Marca:', error);
      }
    };

    obtenerMarca();
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
      const { cantidadEntrada, fechaEntrada } = formData;
      await axios.put(`http://localhost:8085/api/brand/update/${id}`, {
        cantidadEntrada,
        fechaEntrada,
       
      });
      alert('Marca actualizado exitosamente');
      
    } catch (error) {
      console.error('Error al actualizar Marca:', error);
      alert('Error al actualizar Marca');
    }
  };

  return (
    <div className="contenedor-principal">
      <h2>Editar Marca</h2>
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <fieldset>
          <legend>Información</legend>
          <div className="formulario_grupo">
            <label htmlFor="cantidadEntrada">Cantidad Entrada:</label>
            <input
              type="text"
              name="cantidadEntrada"
              id="cantidadEntrada"
              value={formData.cantidadEntrada}
              onChange={handleChange}
            />
          </div>
          <div className="formulario_grupo">
            <label htmlFor="apellidoProveedor">Fecha Entrada:</label>
            <input
              type="date"
              name="fechaEntrada"
              id="fechaEntrada"
              value={formData.fechaEntrada}
              onChange={handleChange}
            />
          </div>
         
        </fieldset>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarMarca;
