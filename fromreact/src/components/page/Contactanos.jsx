import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Estilos/styleFormularios.css';
import Swal from 'sweetalert2';

const Contactanos = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errorNombre, setErrorNombre] = useState('');
  const [errorApellido, setErrorApellido] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorAsunto, setErrorAsunto] = useState('');
  const [errorMensaje, setErrorMensaje] = useState('');

  const handleChangeNombre = (event) => {
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

  const handleChangeApellido = (event) => {
    const valor = event.target.value;
    setApellido(valor);
    if (valor.length > 50) {
      setErrorApellido('El apellido no puede tener más de 50 caracteres');
    } else if (!/^[a-zA-Záéíóú\s]{3,50}$/.test(valor)) {
      setErrorApellido('Apellido inválido');
    } else {
      setErrorApellido('');
    }
  };

  const handleChangeEmail = (event) => {
    const valor = event.target.value;
    setEmail(valor);
    setErrorEmail(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor) ? 'Email inválido' : '');
  };

  const handleChangeAsunto = (event) => {
    const valor = event.target.value;
    setAsunto(valor);
    if (valor.length > 100) {
      setErrorAsunto('El asunto no puede tener más de 100 caracteres');
    } else {
      setErrorAsunto('');
    }
  };

  const handleChangeMensaje = (event) => {
    const valor = event.target.value;
    setMensaje(valor);
    if (valor.length > 200) {
      setErrorMensaje('El mensaje no puede tener más de 200 caracteres');
    } else {
      setErrorMensaje('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (errorNombre || errorApellido || errorEmail || errorAsunto || errorMensaje) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    emailjs.send('service_0b2miho', 'template_f1bvjw4', {
      from_name: `${nombre} ${apellido}`,
      from_email: email,
      subject: asunto,
      message: mensaje,
    }, 'v2enfeO7C4u3O7olF')
      .then((response) => {
        console.log('Correo enviado correctamente', response.status, response.text);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Correo enviado correctamente',
        });
      }, (error) => {
        console.error('Hubo un error al enviar el correo', error);
        alert('Hubo un error al enviar el correo');
      });

    setNombre('');
    setApellido('');
    setEmail('');
    setAsunto('');
    setMensaje('');
  };

  return (
    <div className="contenedor-principal" style={{ marginTop: '150px' }}>
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <div className="titulo-recuadro">
          <h2>Contactános</h2>
        </div>
        <div className="imagen">
          <img src="https://corponet.com/wp-content/uploads/2021/12/contactanos.jpg" alt="Imagen Registro" />
        </div>
        <div className="formulario_grupo">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nombre}
            onChange={handleChangeNombre}
            required
            className={`formulario_grupo_input ${errorNombre ? 'input-error' : ''}`}
          />
          {errorNombre && <span className="mensajeError">{errorNombre}</span>}<br />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={apellido}
            onChange={handleChangeApellido}
            required
            className={`formulario_grupo_input ${errorApellido ? 'input-error' : ''}`}
          />
          {errorApellido && <span className="mensajeError">{errorApellido}</span>}<br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
            required
            className={`formulario_grupo_input ${errorEmail ? 'input-error' : ''}`}
          />
          {errorEmail && <span className="mensajeError">{errorEmail}</span>}<br />
          <input
            type="text"
            name="asunto"
            placeholder="Asunto"
            value={asunto}
            onChange={handleChangeAsunto}
            required
            className={`formulario_grupo_input ${errorAsunto ? 'input-error' : ''}`}
          />
          {errorAsunto && <span className="mensajeError">{errorAsunto}</span>}<br />
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            value={mensaje}
            onChange={handleChangeMensaje}
            required
            className={`formulario_grupo_input ${errorMensaje ? 'input-error' : ''}`}
          />
          {errorMensaje && <span className="mensajeError">{errorMensaje}</span>}<br />
          <button type="submit" className="btn-enviar">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Contactanos;
