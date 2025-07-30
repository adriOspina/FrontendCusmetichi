/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarEntradas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cantidadEntrada: '',
    fechaEntrada: ''

  });

  useEffect(() => {
    const obtenerEntradas = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/input/${id}`);
        setFormData(response.data); // Actualiza los datos del formulario con los datos del Entradas
      } catch (error) {
        console.error('Error al obtener Entradas:', error);
      }
    };

    obtenerEntradas();
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
      const {cantidadEntrada, fechaEntrada } = formData;
      await axios.put(`http://localhost:8085/api/input/update/${id}`, {
        cantidadEntrada,
        fechaEntrada
      });
      alert('Entrada actualizado exitosamente');
      
    } catch (error) {
      console.error('Error al actualizar Entrada:', error);
      alert('Error al actualizar Entrada');
    }
  };

  return (
    <div className="contenedor-principal">
      <h2>Editar Entrada</h2>
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <fieldset>
          <legend>Información Entrada</legend>
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
            <label htmlFor="fechaEntrada">Fecha Entrada:</label>
            <input
              type="text"
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

export default EditarEntradas;
