/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarCompraProveedor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cantidadProductoCompraProveedor: '',
    costoProductoCompraProveedor: '',
    estadoPedidoCompraProveedor: '',
    fechaPedidoCompraProveedor: '',
    
  });

  useEffect(() => {
    const obtenerCompraProveedor = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/purchaseSupplier/${id}`);
        setFormData(response.data); // Actualiza los datos del formulario con los datos del CompraProveedor
      } catch (error) {
        console.error('Error al obtener compraProveedor:', error);
      }
    };

    obtenerCompraProveedor();
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
      const { cantidadProductoCompraProveedor, costoProductoCompraProveedor, estadoPedidoCompraProveedor, fechaPedidoCompraProveedor } = formData;
      await axios.put(`http://localhost:8085/api/purchaseSupplier/update/${id}`, {
        cantidadProductoCompraProveedor,
        costoProductoCompraProveedor,
        estadoPedidoCompraProveedor,
        fechaPedidoCompraProveedor,
       
      });
      alert('CompraProveedor actualizado exitosamente');
      
    } catch (error) {
      console.error('Error al actualizar CompraProveedor:', error);
      alert('Error al actualizar CompraProveedor');
    }
  };

  return (
    <div className="contenedor-principal">
      <h2>Editar CompraProveedor</h2>

      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <fieldset>
          <legend>Información Producto</legend>
          <div className="formulario_grupo">
            <label htmlFor="cantidadProducto">Cantidad Producto:</label>
            <input
              type="text"
              name="cantidadProducto"
              id="cantidadProducto"
              value={formData.cantidadProducto}
              onChange={handleChange}
            />
          </div>


          <div className="formulario_grupo">
            <label htmlFor="costoProducto">Costo Producto:</label>
            <input
              type="text"
              name="costoProducto"
              id="costoProducto"
              value={formData.costoProducto}
              onChange={handleChange}
            />
          </div>


        </fieldset>
        <fieldset>
          <legend>Información Pedido</legend>
        
          <div className="formulario_grupo">
            <label htmlFor="estadoPedido">Estado Pedido:</label>
            <input
              type="text"
              name="estadoPedido"
              id="estadoPedido"
              value={formData.estadoPedido}
              onChange={handleChange}
            />
          </div>

          <div className="formulario_grupo">
            <label htmlFor="fechaPedido">Fecha Pedido:</label>
            <input
              type="date"
              name="fechaPedido"
              id="fechaPedido"
              value={formData.fechaPedido}
              onChange={handleChange}
            />
          </div>

        </fieldset>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarCompraProveedor;
