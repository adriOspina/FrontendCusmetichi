import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const validationRules = {
  nombreCliente: {
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/,
    message: 'El nombre debe tener entre 3 y 50 caracteres y solo puede contener letras y espacios.'
  },
  apellidoCliente: {
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/,
    message: 'El apellido debe tener entre 3 y 50 caracteres y solo puede contener letras y espacios.'
  },
  identificacionClientes: {
    pattern: /^\d{8,10}$/,
    message: 'La identificación debe tener entre 8 y 10 dígitos.'
  },
  emailCliente: {
    pattern: /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/,
    message: 'El email debe ser una dirección válida de gmail, hotmail o yahoo.'
  },
  telCliente: {
    pattern: /^\d{10}$/,
    message: 'El teléfono debe tener 10 dígitos.'
  },
  direccionCliente: {
    pattern: /^.{3,100}$/,
    message: 'La dirección debe tener entre 3 y 100 caracteres.'
  }
};

const RegistrarClientes = () => {
  const [formData, setFormData] = useState({
    nombreCliente: '',
    apellidoCliente: '',
    identificacionClientes: '',
    emailCliente: '',
    telCliente: '',
    direccionCliente: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    for (const field in validationRules) {
      const rule = validationRules[field];
      if (!rule.pattern.test(formData[field])) {
        newErrors[field] = rule.message;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor, completa todos los campos correctamente.',
      });
      return;
    }

    const cliente = {
      ...formData,
      fkid_user: {
        id: 1, // Asumiendo que aquí asignarías el ID del usuario correspondiente desde tu lógica de frontend
      },
    };

    try {
      const response = await axios.post('http://localhost:8085/api/customer/create', cliente);
      console.log('Respuesta del servidor:', response.data);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Cliente registrado exitosamente',
      });
      resetForm();
    } catch (error) {
      console.error('Error al registrar Cliente:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar el cliente.',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      nombreCliente: '',
      apellidoCliente: '',
      identificacionClientes: '',
      emailCliente: '',
      telCliente: '',
      direccionCliente: ''
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="contenedor-principal">
      <br /><br /><br /><br />
      <form onSubmit={handleSubmit} className="formulario" id="formulario-cliente">
        <div className="titulo-recuadro">
          <h2>Registro de Clientes</h2>
        </div>

        <div className="formulario_grupo">
          <input
            type="text"
            className={`formulario_grupo_input ${errors.nombreCliente ? 'input-error' : ''}`}
            name="nombreCliente"
            placeholder="Nombre"
            value={formData.nombreCliente}
            onChange={handleChange}
            required
          /><br />
          {errors.nombreCliente && <span className="mensajeError">{errors.nombreCliente}</span>}

          <input
            type="text"
            className={`formulario_grupo_input ${errors.apellidoCliente ? 'input-error' : ''}`}
            name="apellidoCliente"
            placeholder="Apellido"
            value={formData.apellidoCliente}
            onChange={handleChange}
            required
          /><br />
          {errors.apellidoCliente && <span className="mensajeError">{errors.apellidoCliente}</span>}

          <input
            type="text"
            className={`formulario_grupo_input ${errors.identificacionClientes ? 'input-error' : ''}`}
            name="identificacionClientes"
            placeholder="Identificación"
            value={formData.identificacionClientes}
            onChange={handleChange}
            required
          /><br />
          {errors.identificacionClientes && <span className="mensajeError">{errors.identificacionClientes}</span>}

          <input
            type="email"
            className={`formulario_grupo_input ${errors.emailCliente ? 'input-error' : ''}`}
            name="emailCliente"
            placeholder="Email"
            value={formData.emailCliente}
            onChange={handleChange}
            required
          /><br />
          {errors.emailCliente && <span className="mensajeError">{errors.emailCliente}</span>}

          <input
            type="tel"
            className={`formulario_grupo_input ${errors.telCliente ? 'input-error' : ''}`}
            name="telCliente"
            placeholder="Teléfono"
            value={formData.telCliente}
            onChange={handleChange}
            required
          /><br />
          {errors.telCliente && <span className="mensajeError">{errors.telCliente}</span>}

          <input
            type="text"
            className={`formulario_grupo_input ${errors.direccionCliente ? 'input-error' : ''}`}
            name="direccionCliente"
            placeholder="Dirección"
            value={formData.direccionCliente}
            onChange={handleChange}
            required
          /><br />
          {errors.direccionCliente && <span className="mensajeError">{errors.direccionCliente}</span>}

          <button id="submitButton" type="submit">Registrar Cliente</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarClientes;
