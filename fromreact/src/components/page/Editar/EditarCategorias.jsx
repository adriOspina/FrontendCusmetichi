
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderInventario from '../HeaderInventario';
import imagenRegistro from '../imagenes/RegistroCategoria.png'; // Reemplaza 'ruta/de/la/imagen.jpg' con la ruta correcta de tu imagen

const EditarCategorias = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreCategoria: '',
  });
  const [loading, setLoading] = useState(false); // Estado para mostrar la carga
  const [updateSuccess, setUpdateSuccess] = useState(false); // Estado para mostrar el mensaje de éxito

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/category/${id}`);
        setFormData(response.data); // Actualiza los datos del formulario con los datos del Categoría
      } catch (error) {
        console.error('Error al obtener Categoría:', error);
      }
    };

    obtenerCategorias();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar el estado de carga
    try {
      const { nombreCategoria } = formData;
      await axios.put(`http://localhost:8085/api/category/update/${id}`, {
        nombreCategoria
      });
      setUpdateSuccess(true); // Actualizar el estado de éxito
      setTimeout(() => {
        navigate('/ListarCategorias'); // Navegar a la página que muestra la lista después de un breve retraso
      }, 1000); // Retraso de 1 segundo para mostrar el mensaje de éxito
    } catch (error) {
      console.error('Error al actualizar Categoría:', error);
      alert('Error al actualizar Categoría');
    } finally {
      setLoading(false); // Desactivar el estado de carga una vez que se complete la solicitud
    }
  };

  return (
    <div className="contenedor-principal">
      <br /><br /><br />
      <h2>Editar Categoría</h2>
      {loading && <p>Cargando...</p>} {/* Mostrar un mensaje de carga si está cargando */}
      {updateSuccess && <p>Categoría actualizada exitosamente</p>} {/* Mostrar un mensaje de éxito si se ha actualizado */}
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <div className="imagen">
          <img src={imagenRegistro} alt="Imagen Editar Categoría" />
        </div>
        <div className="formulario_grupo">
          <input
            type="text"
            className="formulario_grupo_input"
            id="nombreCategoria"
            name="nombreCategoria"
            placeholder="Categoría"
            value={formData.nombreCategoria}
            onChange={handleChange}
          />
          <br />
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}

export default EditarCategorias;
