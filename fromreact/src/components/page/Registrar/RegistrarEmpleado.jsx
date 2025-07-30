import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderInventario from '../HeaderInventario';

const RegistrarEmpleados = () => {
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errorNombre, setErrorNombre] = useState('');
  const [errorApellido, setErrorApellido] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorIdentificacion, setErrorIdentificacion] = useState('');
  const [errorTelefono, setErrorTelefono] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errorNombre || errorApellido || errorEmail || errorIdentificacion || errorTelefono) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }
    const empleado = {
      apellidoEmpleado: apellido,
      emailEmpleado: email,
      nombreEmpleado: nombre,
      identificacionEmpleado: identificacion,
      telEmpleado: telefono
    };
    try {
      const response = await axios.post('http://localhost:8085/api/employee/create', empleado);
      console.log('Respuesta del servidor:', response.data);
      alert('Empleado registrado exitosamente');
      navigate('/ListarEmpleado');
      setNombre('');
      setApellido('');
      setIdentificacion('');
      setTelefono('');
      setEmail('');
    } catch (error) {
      console.error('Error al registrar empleado:', error);
      alert('Error al registrar empleado');
    }
  };

  const redireccionarPaginaPrincipal = () => {
    navigate('/GestionGerente');
  };

  const handleNombreChange = (event) => {
    const valor = event.target.value;
    setNombre(valor);
    setErrorNombre(!/^[a-zA-Záéíóú\s]{3,20}$/.test(valor) ? 'Nombre invalido' : '');
  };

  const handleApellidoChange = (event) => {
    const valor = event.target.value;
    setApellido(valor);
    setErrorApellido(!/^[a-zA-Záéíóú\s]{3,20}$/.test(valor) ? 'Apellido invalido' : '');
  };

  const handleEmailChange = (event) => {
    const valor = event.target.value;
    setEmail(valor);
    setErrorEmail(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.(com|es|co)$/.test(valor) ? 'Email invalido' : '');
  };

  const handleIdentificacionChange = (event) => {
    const valor = event.target.value;
    setIdentificacion(valor);
    setErrorIdentificacion(!/^[0-9]{8,10}$/.test(valor) ? 'Identificacion invalida' : '');
  };

  const handleTelefonoChange = (event) => {
    const valor = event.target.value;
    setTelefono(valor);
    setErrorTelefono(!/^(310|311|312|313|314|320|321|322|323|315|316|317|318|300|301|350|351)\d{7}$/.test(valor) ? 'Telefono invalido' : '');
  };

  return (
    <div>
      <HeaderInventario /><br /><br /><br /><br /><br /><br /><br /><br />
      <div className="contenedor-principal">
        <form onSubmit={handleSubmit} className="formulario" id="formulario">
          <div className="titulo-recuadro">
            <h2>Registro Empleado</h2>
          </div>
          <div className="imagen">
            <img src="https://proveedor.mercadopublico.cl/assets/img/steps/index-registro.svg" alt="Imagen Registrarse" />
          </div>
          <div className="formulario_grupo">
            <input
              type="text"
              className={`formulario_grupo_input ${errorNombre ? 'input-error' : ''}`}
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={handleNombreChange}
              required
            /><br /><br />

            {errorNombre && <span className="mensajeError">{errorNombre}</span>}

            <input
              type="text"
              className={`formulario_grupo_input ${errorApellido ? 'input-error' : ''}`}
              name="apellido"
              id="apellido"
              placeholder="Apellido"
              value={apellido}
              onChange={handleApellidoChange}
              required
            /><br /><br />

            {errorApellido && <span className="mensajeError">{errorApellido}</span>}

            <input
              type="email"
              className={`formulario_grupo_input ${errorEmail ? 'input-error' : ''}`}
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            /><br /><br />

            {errorEmail && <span className="mensajeError">{errorEmail}</span>}

            <input
              type="number"
              className={`formulario_grupo_input ${errorIdentificacion ? 'input-error' : ''}`}
              name="identificacion"
              id="identificacion"
              placeholder="Identificacion"
              value={identificacion}
              onChange={handleIdentificacionChange}
              required
            /><br /><br />

            {errorIdentificacion && <span className="mensajeError">{errorIdentificacion}</span>}

            <input
              type="number"
              className={`formulario_grupo_input ${errorTelefono ? 'input-error' : ''}`}
              name="telefono"
              id="telefono"
              placeholder="Telefono"
              value={telefono}
              onChange={handleTelefonoChange}
              required
            /><br /><br />

            {errorTelefono && <span className="mensajeError">{errorTelefono}</span>}

            <button id="submitButton" type="submit">Registrar</button>
          </div>
        </form>
        <div className="boton-volver">
          <button className="button" onClick={redireccionarPaginaPrincipal}>Volver a la página principal</button>
        </div>
      </div>
    </div>
  );
}

export default RegistrarEmpleados;
