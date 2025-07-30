import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegistrarMarcas = () => {
  const [nombre, setNombre] = useState('');
  const navigate = useNavigate(); // Obtener la función navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    const marca = {
      nombreMarca: nombre
    };
    try {
      const response = await axios.post('http://localhost:8085/api/brand/create', marca);
      console.log('Respuesta del servidor:', response.data);
      Swal.fire({
        icon: 'success',
        title: '¡Marca registrada!',
        text: 'La marca se ha registrado exitosamente.'
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          setNombre('');
          navigate('/GestionGerente'); // Redirigir a la página principal de gestión
        }
      });
    } catch (error) {
      console.error('Error al registrar marca:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar la marca. Por favor, inténtalo de nuevo más tarde.'
      });
    }
  };

  const redireccionarPaginaPrincipal = () => {
    navigate('/GestionGerente');
  };

  return (
    <div className="contenedor-principal">
      <div className="formulario-con-imagen">
        <form onSubmit={handleSubmit} className="formulario" id="formulario">
          <h2>Registro Marcas</h2>
          <div className="formulario_grupo">
            <input 
              type="text" 
              className="formulario_grupo_input" 
              name="nombre" 
              id="nombre" 
              placeholder="Nombre Marca" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required 
            /><br /><br />
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

export default RegistrarMarcas;
