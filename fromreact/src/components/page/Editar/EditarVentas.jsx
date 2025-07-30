/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarVentas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ivaTotal: '',
    metodoPago: ''
    
  });

  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/sale/${id}`);
        setFormData(response.data); // Actualiza los datos del formulario con los datos del Ventas
      } catch (error) {
        console.error('Error al obtener Ventas:', error);
      }
    };

    obtenerVentas();
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
      const { ivaTotal, metodoPago } = formData;
      await axios.put(`http://localhost:8085/api/sale/update/${id}`, {
        ivaTotal,
        metodoPago
        
      });
      alert('Venta actualizado exitosamente');
     
    } catch (error) {
      console.error('Error al actualizar Venta:', error);
      alert('Error al actualizar Venta');
    }
  };

  return (
    <div className="contenedor-principal">
      <h2>Editar Venta</h2>
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <fieldset>
          <legend>Información</legend>
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
            <label htmlFor="metodoPago">Metodo De Pago:</label>
            <input
              type="text"
              name="metodoPago"
              id="metodoPago"
              value={formData.metodoPago}
              onChange={handleChange}
            />
          </div>
          
        </fieldset>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarVentas;
