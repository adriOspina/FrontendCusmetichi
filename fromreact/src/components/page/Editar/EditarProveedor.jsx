import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Estilos/styleFormularios.css';
import Swal from 'sweetalert2';

const EditarProveedor = () => {
  const { id } = useParams(); // Obtener el ID del proveedor de los parámetros de la URL
  const navigate = useNavigate(); // Hook para redireccionar
  const [proveedor, setProveedor] = useState({
    apellidoProveedor: '',
    emailProveedor: '',
    identificacionProveedor: '',
    nombreProveedor: '',
    telefonoProveedor: '',
    empresaProveedor: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/supplier/${id}`);
        setProveedor(response.data.data); // Asegúrate de que la respuesta del backend tenga el proveedor en "data"
        
      } catch (error) {
        console.error('Error al cargar los datos del proveedor:', error);
        setError('Error al cargar los datos del proveedor. Inténtalo de nuevo más tarde.');
      }
    };
    fetchProveedor();
  }, [id]);

  const handleChange = (e) => {
    setProveedor({
      ...proveedor,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8085/api/supplier/update/${id}`, proveedor);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Proveedor actualizado correctamente',
      });
      navigate('/ListarProveedores'); // Redirige a la lista de proveedores
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error);
      setError('Error al actualizar el proveedor. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="contenedor-principal">
      <br /><br /><br /><br />
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <div className="titulo-recuadro">
          <h2>Editar Proveedor</h2>
        </div>
        {error && <p className="mensajeError">{error}</p>}
        <div className="formulario_grupo">
          <input
            type="text"
            className="formulario_grupo_input"
            name="nombreProveedor"
            placeholder="Nombre"
            value={proveedor.nombreProveedor}
            onChange={handleChange}
            required
          /><br />
          
          <input
            type="text"
            className="formulario_grupo_input"
            name="apellidoProveedor"
            placeholder="Apellido"
            value={proveedor.apellidoProveedor}
            onChange={handleChange}
            required
          /><br />
          
          <input
            type="email"
            className="formulario_grupo_input"
            name="emailProveedor"
            placeholder="Email"
            value={proveedor.emailProveedor}
            onChange={handleChange}
            required
          /><br />
          
          <input
            type="text"
            className="formulario_grupo_input"
            name="identificacionProveedor"
            placeholder="Identificación"
            value={proveedor.identificacionProveedor}
            onChange={handleChange}
            required
          /><br />
          
          <input
            type="text"
            className="formulario_grupo_input"
            name="telefonoProveedor"
            placeholder="Teléfono"
            value={proveedor.telefonoProveedor}
            onChange={handleChange}
            required
          /><br />
          
          <input
            type="text"
            className="formulario_grupo_input"
            name="empresaProveedor"
            placeholder="Empresa"
            value={proveedor.empresaProveedor}
            onChange={handleChange}
            required
          /><br />
          
          <button id="submitButton" type="submit">Actualizar</button>
          <Link to="/ListarProveedores">
            <button type="button">Regresar</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditarProveedor;
