import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderInventario from '../HeaderInventario';


const RegistrarVentas = () => {
  const [ivaTotal, setIvaTotal] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [total, setTotal] = useState('');

 
  const navigate = useNavigate(); // Obtener la función navigate

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ventas = {
      ivaTotal: ivaTotal,
      cantidad: cantidad,
      fecha:fecha,
      Total:total
    };
    try {
      const response = await axios.post('http://localhost:8085/api/sale/create', ventas);  //aqui va la url del backten para la accion crear
      console.log('Respuesta del servidor:', response.data);
      alert('Venta registrada exitosamente');
      // Acontinuacion se limpian los campos del formulario
      setIvaTotal('');
      setCantidad('');
      setFecha('')
      setTotal('')


    } catch (error) {
      console.error('Error al registrar venta:', error);
      alert('Error al registrar venta');
    }
  };

  const redireccionarPaginaPrincipal = () => {
    navigate('/GestionGerente'); 
  };

  return (
    <div>
    <HeaderInventario /><br/><br/><br/><br/><br/><br/><br></br>
    <div className="contenedor-principal">
      <div className="titulo-recuadro">
        <h2>Registrar Venta</h2>
      </div>
        <form onSubmit={handleSubmit} className="formulario" id="formulario">

          <div className="formulario_grupo">

          <input
              type="text" 
              className="formulario_grupo_input" 
              name="cantidad" 
              id="cantidad" 
              placeholder="Cantidad" 
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required 
            /><br /><br />

            <input
              type="date" 
              className="formulario_grupo_input" 
              name="fecha" 
              id="fecha" 
              placeholder="Fecha" 
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required 
            /><br /><br />

            <input
              type="number" 
              className="formulario_grupo_input" 
              name="ivaTotal" 
              id="ivaTotal" 
              placeholder="Iva Total" 
              value={ivaTotal}
              onChange={(e) => setIvaTotal(e.target.value)}
              required 
            /><br /><br />



            <input
              type="number" 
              className="formulario_grupo_input" 
              name="total" 
              id="total" 
              placeholder="Total" 
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              required 
            /><br /><br />



            <span className="mensajeError" id="mensajeError"></span><br />
       
          </div>
          <button id="submitButton" type="submit">Registrar</button>
        </form>
        <div className="imagen">
          <img src="https://proveedor.mercadopublico.cl/assets/img/steps/index-registro.svg" alt="Imagen Registrarse" />
        </div>
      </div>
      <div className="boton-volver">
        <button className="button" onClick={redireccionarPaginaPrincipal}>Volver a la página principal</button>
      </div>
    </div>
  );
}

export default RegistrarVentas;