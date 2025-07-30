import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderInventario from '../HeaderInventario';
import Swal from 'sweetalert2';

const RegistrarProveedor = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [documento, setDocumento] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [errorNombre, setErrorNombre] = useState('');
  const [errorApellido, setErrorApellido] = useState('');
  const [errorDocumento, setErrorDocumento] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorCelular, setErrorCelular] = useState('');
  const [errorNombreEmpresa, setErrorNombreEmpresa] = useState('');
  const [errorNombreMaxLength, setErrorNombreMaxLength] = useState('');
  const [errorApellidoMaxLength, setErrorApellidoMaxLength] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      errorNombre ||
      errorApellido ||
      errorDocumento ||
      errorEmail ||
      errorCelular ||
      errorNombreEmpresa ||
      errorNombreMaxLength ||
      errorApellidoMaxLength
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos correctamente.',
      });
      return;
    }
    const proveedor = {
      nombreProveedor: nombre,
      apellidoProveedor: apellido,
      identificacionProveedor: documento,
      emailProveedor: email,
      telefonoProveedor: celular,
      empresaProveedor: nombreEmpresa
    };
    try {
      const response = await axios.post('http://localhost:8085/api/supplier/create', proveedor);
      console.log('Respuesta del servidor:', response.data);
      Swal.fire({
        icon: 'success',
        title: '¡Proveedor registrado!',
        text: 'El proveedor se ha registrado exitosamente.',
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          navigate('/ListarProveedores');
          // Limpiar el formulario después de enviarlo
          setNombre('');
          setApellido('');
          setDocumento('');
          setEmail('');
          setCelular('');
          setNombreEmpresa('');
        }
      });
    } catch (error) {
      console.error('Error al registrar proveedor:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar el proveedor. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  };

  const redireccionarPaginaPrincipal = () => {
    navigate('/GestionGerente'); 
  };

  const handleNombreChange = (event) => {
    const valor = event.target.value;
    setNombre(valor);
    setErrorNombre(!/^[a-zA-Záéíóú\s]{3,50}$/.test(valor) ? 'Nombre inválido' : '');
    setErrorNombreMaxLength(valor.length > 50 ? 'El nombre no debe exceder los 50 caracteres' : '');
  };

  const handleApellidoChange = (event) => {
    const valor = event.target.value;
    setApellido(valor);
    setErrorApellido(!/^[a-zA-Záéíóú\s]{3,50}$/.test(valor) ? 'Apellido inválido' : '');
    setErrorApellidoMaxLength(valor.length > 50 ? 'El apellido no debe exceder los 50 caracteres' : '');
  };

  const handleDocumentoChange = (event) => {
    const valor = event.target.value;
    setDocumento(valor);
    setErrorDocumento(!/^[0-9]{8,10}$/.test(valor) ? 'Documento inválido' : '');
  };

  const handleEmailChange = (event) => {
    const valor = event.target.value;
    setEmail(valor);
    setErrorEmail(!/^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/.test(valor) ? 'Email inválido, debe contener un @' : '');
  };

  const handleCelularChange = (event) => {
    const valor = event.target.value;
    setCelular(valor);
    setErrorCelular(!/^(310|311|312|313|314|320|321|322|323|315|316|317|318|300|301|350|351)\d{7}$/.test(valor) ? 'Número de celular inválido, debe contener máximo 10 dígitos' : '');
  };

  const handleNombreEmpresaChange = (event) => {
    const valor = event.target.value;
    setNombreEmpresa(valor);
    setErrorNombreEmpresa(!/^[a-zA-Záéíóú\s]{3,50}$/.test(valor) ? 'Nombre de empresa inválido' : '');
  };

  return (
    <div>
      <HeaderInventario /><br></br><br></br><br></br><br></br>
      <div className="contenedor-principal">
        <form onSubmit={handleSubmit} className="formulario" id="formulario">
          <div className="titulo-recuadro">
            <h2>Registro Proveedor</h2>
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
            />
            {errorNombre && <span className="mensajeError">{errorNombre}</span>}
            {errorNombreMaxLength && <span className="mensajeError">{errorNombreMaxLength}</span>}
            <input 
              type="text" 
              className={`formulario_grupo_input ${errorApellido ? 'input-error' : ''}`} 
              name="apellido" 
              id="apellido" 
              placeholder="Apellido" 
              value={apellido}
              onChange={handleApellidoChange}
              required 
            />
            {errorApellido && <span className="mensajeError">{errorApellido}</span>}
            {errorApellidoMaxLength && <span className="mensajeError">{errorApellidoMaxLength}</span>}
            <input 
              type="number" 
              className={`formulario_grupo_input ${errorDocumento ? 'input-error' : ''}`} 
              name="documento" 
              id="documento" 
              placeholder="Documento" 
              value={documento}
              onChange={handleDocumentoChange}
              required 
            />
            {errorDocumento && <span className="mensajeError">{errorDocumento}</span>}
            <input 
              type="email" 
              className={`formulario_grupo_input ${errorEmail ? 'input-error' : ''}`} 
              name="email" 
              id="email" 
              placeholder="Email" 
              value={email}
              onChange={handleEmailChange}
              required 
            />
            {errorEmail && <span className="mensajeError">{errorEmail}</span>}
            <input 
              type="number" 
              className={`formulario_grupo_input ${errorCelular ? 'input-error' : ''}`} 
              name="celular" 
              id="celular" 
              placeholder="Celular" 
              value={celular}
              onChange={handleCelularChange}
              required 
            />
            {errorCelular && <span className="mensajeError">{errorCelular}</span>}
            <input 
              type="text" 
              className={`formulario_grupo_input ${errorNombreEmpresa ? 'input-error' : ''}`} 
              name="NombreEmpresa" 
              id="NombreEmpresa" 
              placeholder="Nombre Empresa" 
              value={nombreEmpresa}
              onChange={handleNombreEmpresaChange}
              required 
            />
            {errorNombreEmpresa && <span className="mensajeError">{errorNombreEmpresa}</span>}
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

export default RegistrarProveedor;
