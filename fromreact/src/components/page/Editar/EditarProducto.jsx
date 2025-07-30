/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cantidadProducto: '',
    descripcionProducto: '',
    ivaProducto: '',
    nombreProducto: '',
    precioProducto: '',
    stockProducto: '',
    subTotalProducto: '',
    tamañoProducto: '',
  });

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/product/${id}`);
        setFormData(response.data); // Actualiza los datos del formulario con los datos del Producto
      } catch (error) {
        console.error('Error al obtener Producto:', error);
      }
    };

    obtenerProducto();
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
      const { cantidadProducto, descripcionProducto, ivaProducto, nombreProducto, precioProducto, stockProducto, subTotalProducto, tamañoProducto } = formData;
      await axios.put(`http://localhost:8085/api/supplier/update/${id}`, {
        cantidadProducto,
        descripcionProducto,
        ivaProducto,
        nombreProducto,
        precioProducto,
        stockProducto,
        subTotalProducto,
        tamañoProducto
      });
      alert('Producto actualizado exitosamente');
      
    } catch (error) {
      console.error('Error al actualizar Producto:', error);
      alert('Error al actualizar Producto');
    }
  };

  return (
    <div className="contenedor-principal">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <fieldset>
          <legend>Información Producto</legend>

          <div className="formulario_grupo">
            <label htmlFor="nombreProducto">Nombre Producto:</label>
            <input
              type="text"
              name="nombreProducto"
              id="nombreProducto"
              value={formData.nombreProducto}
              onChange={handleChange}
            />
          </div>


          <div className="formulario_grupo">
            <label htmlFor="descripcionProducto">Descripcion Producto:</label>
            <input
              type="text"
              name="descripcionProducto"
              id="descripcionProducto"
              value={formData.descripcionProducto}
              onChange={handleChange}
            />
          </div>


          <div className="formulario_grupo">
            <label htmlFor="cantidadProducto">Cantidad Producto:</label>
            <input
              type="number"
              name="cantidadProducto"
              id="cantidadProducto"
              value={formData.cantidadProducto}
              onChange={handleChange}
            />
          </div>

         
          <div className="formulario_grupo">
            <label htmlFor="precioProducto">Precio Producto:</label>
            <input
              type="number"
              name="precioProducto"
              id="precioProducto"
              value={formData.precioProducto}
              onChange={handleChange}
            />
          </div>


          <div className="formulario_grupo">
            <label htmlFor=" tamañoProducto">Tamaño Producto:</label>
            <input
              type="text"
              name=" tamañoProducto"
              id=" tamañoProducto"
              value={formData.tamañoProducto}
              onChange={handleChange}
            />
          </div>


          <div className="formulario_grupo">
            <label htmlFor=" subTotalProducto">SubTotal Producto:</label>
            <input
              type="text"
              name=" subTotalProducto"
              id=" subTotalProducto"
              value={formData.subTotalProducto}
              onChange={handleChange}
            />
          </div>
                   

          <div className="formulario_grupo">
            <label htmlFor=" stockProducto">Stock Producto:</label>
            <input
              type="number"
              name=" stockProducto"
              id=" stockProducto"
              value={formData.stockProducto}
              onChange={handleChange}
            />
          </div>


          <div className="formulario_grupo">
            <label htmlFor="ivaProducto">Iva Producto:</label>
            <input
              type="text"
              name="ivaProducto"
              id="ivaProducto"
              value={formData.ivaProducto}
              onChange={handleChange}
            />
          </div>

          

          


        </fieldset>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarProducto;
