import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderInventario from '../HeaderInventario';
import imagenRegistro from '../imagenes/RegistroSalidas.png';
import Swal from 'sweetalert2';

const RegistrarSalidas = () => {
  const navigate = useNavigate();

  const [cantidad, setCantidad] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [ivaTotal, setIvaTotal] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [tipoSalida, setTipoSalida] = useState('');
  const [errorCantidad, setErrorCantidad] = useState('');
  const [errorFechaSalida, setErrorFechaSalida] = useState('');
  const [errorMetodoPago, setErrorMetodoPago] = useState('');
  const [errorTipoSalida, setErrorTipoSalida] = useState('');

  useEffect(() => {
    // Aquí podrías realizar alguna carga inicial si es necesario
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación de cantidad
    if (!cantidad || isNaN(cantidad) || cantidad <= 0 || cantidad > 1000) {
      setErrorCantidad('La cantidad debe ser un número entre 1 y 1000');
      return;
    } else {
      setErrorCantidad('');
    }

    // Validación de fecha
    const today = new Date();
    const selectedDate = new Date(fechaSalida);
    if (!fechaSalida || selectedDate > today) {
      setErrorFechaSalida('La fecha de salida no puede ser mayor a la fecha actual');
      return;
    } else {
      setErrorFechaSalida('');
    }

    // Validación de método de pago
    if (!metodoPago || metodoPago.trim().length < 2) {
      setErrorMetodoPago('El método de pago debe tener al menos 2 caracteres');
      return;
    } else {
      setErrorMetodoPago('');
    }

    const salidaData = {
      cantidadSalidas: cantidad,
      tipoSalida: tipoSalida,
      fechaSalida: fechaSalida,
      ivaTotal: ivaTotal,
      metodoPago: metodoPago,
    };

    try {
      const response = await axios.post('http://localhost:8085/api/output/create', salidaData);
      console.log('Respuesta del servidor:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Salida registrada exitosamente',
      });
      resetForm();
    } catch (error) {
      console.error('Error al registrar salida:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al registrar salida',
      });
    }
  };

  const resetForm = () => {
    setCantidad('');
    setFechaSalida('');
    setIvaTotal('');
    setMetodoPago('');
    setTipoSalida('');
    setErrorCantidad('');
    setErrorFechaSalida('');
    setErrorMetodoPago('');
    setErrorTipoSalida('');
  };

  const redireccionarPaginaPrincipal = () => {
    navigate('/GestionGerente');
  };

  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
    if (!e.target.value || isNaN(e.target.value) || e.target.value <= 0 || e.target.value > 1000) {
      setErrorCantidad('La cantidad debe ser un número entre 1 y 1000');
    } else {
      setErrorCantidad('');
    }
  };

  const handleFechaSalidaChange = (e) => {
    setFechaSalida(e.target.value);
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    if (!e.target.value || selectedDate > today) {
      setErrorFechaSalida('La fecha de salida no puede ser mayor a la fecha actual');
    } else {
      setErrorFechaSalida('');
    }
  };

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
    if (!e.target.value || e.target.value.trim().length < 2) {
      setErrorMetodoPago('El método de pago debe tener al menos 2 caracteres');
    } else {
      setErrorMetodoPago('');
    }
  };

  return (
    <div>
      <HeaderInventario /><br /><br /><br /><br />
      <div className="contenedor-principal">
        <form onSubmit={handleSubmit} className="formulario" id="formulario">
          <div className="titulo-recuadro">
            <h2>Registro Salidas</h2>
          </div>
          <div className="imagen">
            <img src={imagenRegistro} alt="Imagen Registrarse" />
          </div>
          <div className="formulario_grupo">
            <input
              type="number"
              className="formulario_grupo_input"
              name="cantidadSalida"
              id="cantidadSalida"
              placeholder="Cantidad Salida"
              value={cantidad}
              onChange={handleCantidadChange}
              required
            />
            {errorCantidad && <span className="mensajeError">{errorCantidad}</span>}
            <br /><br />

            <input
              type="date"
              className="formulario_grupo_input"
              name="fechaSalida"
              id="fechaSalida"
              placeholder="Fecha Salida"
              value={fechaSalida}
              onChange={handleFechaSalidaChange}
              required
            />
            {errorFechaSalida && <span className="mensajeError">{errorFechaSalida}</span>}
            <br /><br />

            <input
              type="text"
              className="formulario_grupo_input"
              name="ivaTotal"
              id="ivaTotal"
              placeholder="Iva Total"
              value={ivaTotal}
              onChange={(e) => setIvaTotal(e.target.value)}
              required
            /><br /><br />

            <input
              type="text"
              className="formulario_grupo_input"
              name="metodoPago"
              id="metodoPago"
              placeholder="Método Pago"
              value={metodoPago}
              onChange={handleMetodoPagoChange}
              required
            />
            {errorMetodoPago && <span className="mensajeError">{errorMetodoPago}</span>}
            <br /><br />

            <input
              type="text"
              className="formulario_grupo_input"
              name="tipoSalida"
              id="tipoSalida"
              placeholder="Tipo Salida"
              value={tipoSalida}
              onChange={(e) => setTipoSalida(e.target.value)}
              required
            /><br /><br />
          </div>
          <button id="submitButton" type="submit">Registrar</button>
        </form>
        <div className="boton-volver">
          <button className="button" onClick={redireccionarPaginaPrincipal}>Volver a la página principal</button>
        </div>
      </div>
    </div>
  );
}

export default RegistrarSalidas;
