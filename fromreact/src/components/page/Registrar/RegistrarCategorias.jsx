import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import HeaderInventario from '../HeaderInventario';
import imagenRegistro from '../imagenes/RegistroCategoria.png'; // Reemplaza 'ruta/de/la/imagen.jpg' con la ruta correcta de tu imagen

const RegistrarCategorias = () => {
  const navigate = useNavigate();
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [idProducto, setIdProducto] = useState('');
  const [productos, setProductos] = useState([]);
  const [errorNombreCategoria, setErrorNombreCategoria] = useState('');
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;

    // Validación del campo nombreCategoria
    if (!nombreCategoria || !/^[a-zA-ZáéíóúÁÉÍÓÚ\s]{3,20}$/.test(nombreCategoria)) {
      setErrorNombreCategoria('Nombre de categoría inválido');
      isValid = false;
    } else {
      setErrorNombreCategoria('');
    }


    const categoria = {
      nombreCategoria: nombreCategoria,
     
    };
    try {
      const response = await axios.post('http://localhost:8085/api/category/create', categoria);
      console.log('Respuesta del servidor:', response.data);
      Swal.fire({
        icon: 'success',
        title: '¡Categoría registrada!',
        text: 'La categoría se ha registrado exitosamente.',
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          resetForm();
          navigate('/ListarCategorias'); // Navegar a la página que muestra la lista de categorías
        }
      });
    } catch (error) {
      console.error('Error al registrar categoría:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar la categoría. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  };

  const redireccionarPaginaPrincipal = () => {
    navigate('/GestionGerente');
  };

  const resetForm = () => {
    setNombreCategoria('');
    setErrorNombreCategoria('');
    
  };

  return (
    <div>
      <HeaderInventario /><br/>
      <div className="contenedor-principal">
        <h2>Registro Categorías</h2><br/>

        <div className="formulario-con-imagen">
          <form onSubmit={handleSubmit} className="formulario" id="formulario">
            <div className="titulo-recuadro">
              <h2>Registro Categoría</h2>
            </div>
            <div className="imagen">
              <img src={imagenRegistro} alt="Imagen Registrarse" />
            </div>
            {errorNombreCategoria && <span className="mensajeError">{errorNombreCategoria}</span>}
            <br />
            <div className="formulario_grupo">
              <input
                type="text"
                className={`formulario_grupo_input ${errorNombreCategoria ? 'input-error' : ''}`}
                name="nombre"
                id="nombre"
                placeholder="Nombre Categoría"
                value={nombreCategoria}
                onChange={(e) => setNombreCategoria(e.target.value)}
                required
              />
              <br />

              <br/>
              <button id="submitButton" type="submit">Registrar</button>
            </div>
          </form>
        </div>
        <div className="boton-volver">
          <button className="button" onClick={redireccionarPaginaPrincipal}>Volver a la página principal</button>
        </div>
      </div>
    </div>
  );
}

export default RegistrarCategorias;
