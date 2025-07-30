import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderInventario from '../HeaderInventario';
import Swal from 'sweetalert2';

const RegistrarMarcas = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [errorNombre, setErrorNombre] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre || !/^[a-zA-ZáéíóúÁÉÍÓÚ\s]{3,20}$/.test(nombre)) {
      setErrorNombre('Nombre de marca inválido (debe contener entre 3 y 20 caracteres alfabéticos)');
      return;
    } else {
      setErrorNombre('');
    }

    const marca = {
      nombreMarca: nombre,
    };

    try {
      const response = await axios.post('http://localhost:8085/api/brand/create', marca);
      console.log('Respuesta del servidor:', response.data);
      Swal.fire({
        icon: 'success',
        title: '¡Marca registrada!',
        text: 'La marca se ha registrado exitosamente.',
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          resetForm();
          navigate('/ListarMarcas'); 
        }
      });
    } catch (error) {
      console.error('Error al registrar marca:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar la marca. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  };

  const redireccionarPaginaPrincipal = () => {
    navigate('/GestionGerente');
  };

  const resetForm = () => {
    setNombre('');
  };

  const handleChangeNombre = (e) => {
    const value = e.target.value;
    if (!value || /^[a-zA-ZáéíóúÁÉÍÓÚ\s]{3,20}$/.test(value)) {
      setNombre(value);
      setErrorNombre('');
    } else {
      setErrorNombre('Nombre de marca inválido (debe contener entre 3 y 20 caracteres alfabéticos)');
    }
  };

  return (
    <div>
      <HeaderInventario /><br/><br/><br/><br/><br/><br/>
      <div className="contenedor-principal">
        <form onSubmit={handleSubmit} className="formulario" id="formulario">
          <div className="titulo-recuadro">
            <h2>Registro Marca</h2>
          </div><br/><br/>
          <div className="imagen">
            <img src="http://localhost:3000/static/media/RegistroEntradas.ae838081219e95ed9ff1.png" alt="Imagen Registro" />
          </div>
          <div className="formulario_grupo">
            <input
              type="text"
              className={`formulario_grupo_input ${errorNombre ? 'input-error' : ''}`}
              name="nombre"
              id="nombre"
              placeholder="Nombre de la Marca"
              value={nombre}
              onChange={handleChangeNombre}
              required
            />
            {errorNombre && <span className="mensajeError">{errorNombre}</span>}
            <br/>
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

export default RegistrarMarcas;
