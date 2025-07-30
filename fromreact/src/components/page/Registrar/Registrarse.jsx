import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from 'sweetalert2';
import HeaderInventario from '../HeaderInventario';

const RegistrarUsuarios = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [idRol, setIdRol] = useState(''); // Estado para almacenar el ID del rol seleccionado
  const [roles, setRoles] = useState([]);
  const [errorNombre, setErrorNombre] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorContraseña, setErrorContraseña] = useState('');
  const [errorRol, setErrorRol] = useState(''); // Estado para gestionar el error del rol seleccionado
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    // Buscar el ID del rol 'Cliente' cuando se cargan los roles
    const clienteRole = roles.find(role => role.nombre.toLowerCase() === 'cliente');
    if (clienteRole) {
      setIdRol(clienteRole.id.toString()); // Establecer el ID del rol cliente como string
    }
  }, [roles]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/role/all');
      setRoles(response.data.data);
    } catch (error) {
      console.error('Error al obtener los roles:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al obtener los roles',
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const usuario = {
      nombre,
      email,
      contraseña,
      fkid_rol: parseInt(idRol, 10),
    };

    try {
      const response = await axios.post('http://localhost:8085/api/user/create', usuario);
      console.log('Respuesta del servidor:', response.data);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Usuario registrado exitosamente',
      });
      resetForm();
    } catch (error) {
      console.error('Error al registrar Usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar el usuario.',
      });
    }
  };

  const resetForm = () => {
    setNombre('');
    setEmail('');
    setContraseña('');
    setIdRol(''); // Limpiar el estado del ID del rol
    setCaptchaToken(null);
    recaptchaRef.current.reset();
  };

  const validateForm = () => {
    let isValid = true;

    if (nombre.trim().length === 0) {
      setErrorNombre('El nombre es requerido');
      isValid = false;
    } else if (!/^[a-zA-Záéíóú\s]{3,50}$/.test(nombre)) {
      setErrorNombre('Nombre inválido');
      isValid = false;
    } else {
      setErrorNombre('');
    }

    if (email.trim().length === 0) {
      setErrorEmail('El email es requerido');
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setErrorEmail('Email inválido');
      isValid = false;
    } else {
      setErrorEmail('');
    }

    if (contraseña.trim().length === 0) {
      setErrorContraseña('La contraseña es requerida');
      isValid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(contraseña)) {
      setErrorContraseña('Contraseña debe tener al menos 8 caracteres y contener letras y números');
      isValid = false;
    } else {
      setErrorContraseña('');
    }

    if (!idRol) {
      setErrorRol('Debe seleccionar un rol');
      isValid = false;
    } else {
      setErrorRol('');
    }

    if (!captchaToken) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa la verificación reCAPTCHA.',
      });
      isValid = false;
    }

    return isValid;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNombreChange = (event) => {
    const valor = event.target.value;
    setNombre(valor);
    if (valor.length > 50) {
      setErrorNombre('El nombre no puede tener más de 50 caracteres');
    } else if (!/^[a-zA-Záéíóú\s]{3,50}$/.test(valor)) {
      setErrorNombre('Nombre inválido');
    } else {
      setErrorNombre('');
    }
  };

  const handleEmailChange = (event) => {
    const valor = event.target.value;
    setEmail(valor);
    setErrorEmail(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor) ? 'Email inválido' : '');
  };

  const handleContraseñaChange = (event) => {
    const valor = event.target.value;
    setContraseña(valor);
    setErrorContraseña(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valor) ? 'Contraseña debe tener al menos 8 caracteres y contener letras y números' : '');
  };

  const handleRolChange = (event) => {
    setIdRol(event.target.value);
    setErrorRol('');
  };

  const onChangeCaptcha = (token) => {
    setCaptchaToken(token);
  };

  return (
    <div className="contenedor-principal">
      <br /><br /><br /><br />
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <div className="titulo-recuadro">
          <h2>Registro Usuarios</h2>
        </div>
        <div className="imagen">
          <img src="https://www.servnet.mx/hubfs/Interfaz-de-usuario.jpg" alt="Imagen Registrarse" />
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
            maxLength="50"
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

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              className={`formulario_grupo_input ${errorContraseña ? 'input-error' : ''}`}
              name="contraseña"
              id="contraseña"
              placeholder="Contraseña"
              value={contraseña}
              onChange={handleContraseñaChange}
              required
            />
            <button type="button" onClick={toggleShowPassword}>
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errorContraseña && <span className="mensajeError">{errorContraseña}</span>}<br />

         

          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Lf2OPspAAAAAI-smQgzWoo6f34ZUU-45CiYqYKf"
            onChange={onChangeCaptcha}
          />

          <button id="submitButton" type="submit">Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarUsuarios;
