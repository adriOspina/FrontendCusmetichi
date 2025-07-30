import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderInventario from '../HeaderInventario';
import '../Estilos/styleFormularios.css'; // Asegúrate de importar tus estilos

const RegistrarRol = () => {
  const [nombre, setNombre] = useState('');
  const [errorNombre, setErrorNombre] = useState('');

  const navigate = useNavigate();

  const handleChangeNombre = (event) => {
    const valor = event.target.value;
    setNombre(valor);
    // Validar el nombre: solo letras y espacios, entre 3 y 15 caracteres
    if (!/^[a-zA-Z\s]{3,15}$/.test(valor)) {
      setErrorNombre('Nombre inválido. Solo letras y espacios, entre 3 y 15 caracteres.');
    } else {
      setErrorNombre('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!errorNombre) {
      const rol = { nombre };
      try {
        const response = await axios.post('http://localhost:8085/api/role/create', rol);
        console.log('Respuesta del servidor:', response.data);
        alert('Rol registrado exitosamente');
        navigate('/ListarRol');
        setNombre('');
      } catch (error) {
        console.error('Error al registrar rol:', error);
        alert('Error al registrar rol');
      }
    } else {
      alert('Por favor, corrige los errores en el formulario.');
    }
  };

  const redireccionarPaginaPrincipal = () => {
    navigate('/GestionGerente');
  };

  return (
    <div>
      <HeaderInventario /><br /><br /><br /><br /><br /><br /><br />
      <div className="contenedor-principal">
        <form onSubmit={handleSubmit} className="formulario" id="formulario">
          <div className="titulo-recuadro">
            <h2>Registro Rol</h2>
          </div>
          <div className="imagen">
            <img src="http://localhost:3000/static/media/RegistroRol.54fa62dbec25474c79e9.png" alt="Imagen Registrarse" />
          </div>
          <div className="formulario_grupo">
            <input
              type="text"
              className={`formulario_grupo_input ${errorNombre ? 'input-error' : ''}`}
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={handleChangeNombre}
              required
            />
            {errorNombre && <span className="mensajeError">{errorNombre}</span>}<br />
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

export default RegistrarRol;
