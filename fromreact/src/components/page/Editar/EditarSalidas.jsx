/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarSalidas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cantidadSalidas: '',
    fechaSalida: '',
    ivaTotal: '',
    metodoPago: '',
    tipoSalida: ''
  });

  useEffect(() => {
    const obtenerSalidas = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/output/${id}`);
        setFormData(response.data); // Actualiza los datos del formulario con los datos del Salidas
      } catch (error) {
        console.error('Error al obtener Salidas:', error);
      }
    };

    obtenerSalidas();
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
      const { cantidadSalidas, fechaSalida, ivaTotal, metodoPago, tipoSalida  } = formData;
      await axios.put(`http://localhost:8085/api/output/update/${id}`, {
        cantidadSalidas,
        fechaSalida,
        ivaTotal,
        metodoPago,
        tipoSalida
      });
      alert('Salida actualizado exitosamente');
   
    } catch (error) {
      console.error('Error al actualizar Salida:', error);
      alert('Error al actualizar Salida');
    }
  };

  return (
    <div className="contenedor-principal">
      <h2>Editar Salida</h2>
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <fieldset>
          <legend>Información Personal</legend>
          <div className="formulario_grupo">
            <label htmlFor="cantidadSalidas">Cantidad Salidas:</label>
            <input
              type="text"
              name="cantidadSalidas"
              id="cantidadSalidas"
              value={formData.cantidadSalidas}
              onChange={handleChange}
            />
          </div>

          <div className="formulario_grupo">
            <label htmlFor="apellidoProveedor">Fecha Salida:</label>
            <input
              type="date"
              name="fechaSalida"
              id="fechaSalida"
              value={formData.fechaSalida}
              onChange={handleChange}
            />
          </div>

          <div className="formulario_grupo">
            <label htmlFor="ivaTotal">Iva Total:</label>
            <input
              type="text"
              name="ivaTotal"
              id="ivaTotal"
              value={formData.ivaTotal}
              onChange={handleChange}
            />
          </div>

          <div className="formulario_grupo">
            <label htmlFor="metodoPago">Metodo Pago:</label>
            <input
              type="text"
              name="metodoPago"
              id="metodoPago"
              value={formData.metodoPago}
              onChange={handleChange}
            />
          </div>

          <div className="formulario_grupo">
            <label htmlFor="tipoSalida">Tipo Salida:</label>
            <input
              type="text"
              name="tipoSalida"
              id="tipoSalida"
              value={formData.tipoSalida}
              onChange={handleChange}
            />
          </div>
          
        
        </fieldset>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarSalidas;
