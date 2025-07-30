import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderInventario from '../HeaderInventario';

const RegistrarUsuarios = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [clientes, setClientes] = useState([]);
  const [idEmployee, setIdEmployee] = useState('');
  const [empleados, setEmpleados] = useState([]);
  const [idRole, setIdRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [errorNombre, setErrorNombre] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorContraseña, setErrorContraseña] = useState('');
  const [errorCliente, setErrorCliente] = useState('');
  const [errorEmpleado, setErrorEmpleado] = useState('');
  const [errorRol, setErrorRol] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClientes();
    fetchEmpleados();
    fetchRoles();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/customer/all');
      setClientes(response.data.data);
    } catch (error) {
      setError('Error al obtener los clientes');
    }
  };

  const fetchEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/employee/all');
      setEmpleados(response.data.data);
    } catch (error) {
      setError('Error al obtener los empleados');
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/role/all');
      setRoles(response.data.data);
    } catch (error) {
      setError('Error al obtener los roles');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errorNombre || errorEmail || errorContraseña || errorCliente || errorEmpleado || errorRol) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }
    const usuario = {
      nombre: nombre,
      email: email,
      contraseña: contraseña,
      fkidCliente: { id: idCliente },
      fkidEmployee: { id: idEmployee },
      fkidRole: { id: idRole },
    };

    try {
      const response = await axios.post('http://localhost:8085/api/user/create', usuario);
      console.log('Respuesta del servidor:', response.data);
      alert('Usuario registrado exitosamente');
      navigate('/ListarUsuarios');
      resetForm();
    } catch (error) {
      console.error('Error al registrar Usuario:', error);
      alert('Error al registrar Usuario');
    }
  };

  const redireccionarPaginaPrincipal = () => {
    navigate('/GestionGerente');
  };

  const resetForm = () => {
    setNombre('');
    setEmail('');
    setContraseña('');
    setIdCliente('');
    setIdEmployee('');
    setIdRole('');
  };

  const handleNombreChange = (event) => {
    const valor = event.target.value;
    setNombre(valor);
    setErrorNombre(!/[a-zA-Záéíóú\s]{3,20}/.test(valor) ? 'Nombre invalido' : '');
  };

  const handleEmailChange = (event) => {
    const valor = event.target.value;
    setEmail(valor);
    setErrorEmail(!/^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/.test(valor) ? 'Email Invalido' : '');
  };

  const handleContraseñaChange = (event) => {
    const valor = event.target.value;
    setContraseña(valor);
    setErrorContraseña(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valor) ? 'Contraseña debe tener al menos 8 caracteres y contener letras y números' : '');
  };

  const handleClienteChange = (event) => {
    const valor = event.target.value;
    setIdCliente(valor);
    setErrorCliente(!valor ? 'Seleccione un Cliente' : '');
  };

  const handleEmpleadoChange = (event) => {
    const valor = event.target.value;
    setIdEmployee(valor);
    setErrorEmpleado(!valor ? 'Seleccione un Empleado' : '');
  };

  const handleRolChange = (event) => {
    const valor = event.target.value;
    setIdRole(valor);
    setErrorRol(!valor ? 'Seleccione un Rol' : '');
  };

  return (
    <div>
      <HeaderInventario /><br></br><br></br><br></br><br></br><br></br><br></br>
      <div className="contenedor-principal">
        <form onSubmit={handleSubmit} className="formulario" id="formulario">
          <div className="titulo-recuadro">
            <h2>Registro Usuarios</h2>
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
              {errorNombre && <span className="mensajeError">{errorNombre}</span>}<br />

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
              {errorEmail && <span className="mensajeError">{errorEmail}</span>}<br />

              <input
                type="password"
                className={`formulario_grupo_input ${errorContraseña ? 'input-error' : ''}`}
                name="contraseña"
                id="contraseña"
                placeholder="Contraseña"
                value={contraseña}
                onChange={handleContraseñaChange}
                required
              />
              {errorContraseña && <span className="mensajeError">{errorContraseña}</span>}<br />

              <div className='mb-3'>
                <select
                  className={`form-select ${errorCliente ? 'input-error' : ''}`}
                  name='cliente.id'
                  value={idCliente}
                  onChange={handleClienteChange}
                  required
                >
                  <option value="">Seleccione un Cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nombreCliente}
                    </option>
                  ))}
                </select>
                {errorCliente && <span className="mensajeError">{errorCliente}</span>}
              </div>

              <div className='mb-3'>
                <select
                  className={`form-select ${errorEmpleado ? 'input-error' : ''}`}
                  name='empleado.id'
                  value={idEmployee}
                  onChange={handleEmpleadoChange}
                  required
                >
                  <option value="">Seleccione un empleado</option>
                  {empleados.map((empleado) => (
                    <option key={empleado.id} value={empleado.id}>
                      {empleado.nombreEmpleado}
                    </option>
                  ))}
                </select>
                {errorEmpleado && <span className="mensajeError">{errorEmpleado}</span>}
              </div>

              <div className='mb-3'>
                <select
                  className={`form-select ${errorRol ? 'input-error' : ''}`}
                  name='rol.id'
                  value={idRole}
                  onChange={handleRolChange}
                  required
                >
                  <option value="">Seleccione un Rol</option>
                  {roles.map((rol) => (
                    <option key={rol.id} value={rol.id}>
                      {rol.nombre}
                    </option>
                  ))}
                </select>
                {errorRol && <span className="mensajeError">{errorRol}</span>}
              </div>

            </div>
            <br />
            <button id="submitButton" type="submit">Registrar</button>
          </form>

          
        </div>
        <div className="boton-volver">
          <button className="button" onClick={redireccionarPaginaPrincipal}>Volver a la página principal</button>
        </div>
      </div>
    
  );
}

export default RegistrarUsuarios;
