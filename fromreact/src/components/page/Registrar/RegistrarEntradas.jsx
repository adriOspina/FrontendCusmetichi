import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderInventario from '../HeaderInventario';
import Swal from 'sweetalert2';

const RegistrarEntradas = () => {
  const [cantidadEntrada, setCantidadEntrada] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const navigate = useNavigate(); // Obtener la función navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    const entradas = {
      cantidadEntrada: cantidadEntrada,
      fechaEntrada: fechaEntrada,
    };

    try {
      const response = await axios.post('http://localhost:8085/api/input/create', entradas);
      console.log('Respuesta del servidor:', response.data);
      Swal.fire({
        icon: 'success',
        title: '¡Entrada registrada!',
        text: 'La entrada se ha registrado exitosamente.',
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          navigate('/ListarEntradas');
          setCantidadEntrada('');
          setFechaEntrada('');
        }
      });
    } catch (error) {
      console.error('Error al registrar entrada:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar la entrada. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  };

  const redireccionarPaginaPrincipal = () => {
    navigate('/GestionGerente');
  };

  return (
    <div>
      <HeaderInventario /><br /><br /><br /><br /><br /><br /><br /><br />
      <div className="contenedor-principal">
        <form onSubmit={handleSubmit} className="formulario" id="formulario">
          <div className="titulo-recuadro">
            <h2>Registro Entradas</h2>
          </div>
          <div className="imagen">
            <img src="fromreact/src/components/page/imagenes/RegistroEntradas.png" alt="Imagen Registrarse" />
          </div>
          <div className="formulario_grupo">
            <input
              type="number"
              className="formulario_grupo_input"
              name="cantidad"
              id="cantidad"
              placeholder="Cantidad Entradas"
              value={cantidadEntrada}
              onChange={(e) => setCantidadEntrada(e.target.value)}
              required
            /><br /><br />
            <input
              type="date"
              className="formulario_grupo_input"
              name="fecha"
              id="fecha"
              placeholder="Fecha Entrada"
              value={fechaEntrada}
              onChange={(e) => setFechaEntrada(e.target.value)}
              required
            />
            <button id="submitButton" type="submit">Registrar</button>
            <span className="mensajeError" id="mensajeError"></span>
          </div>
        </form>
        <div className="boton-volver">
          <button className="button" onClick={redireccionarPaginaPrincipal}>Volver a la página principal</button>
        </div>
      </div>
    </div>
  );
}

export default RegistrarEntradas;
