import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Estilos/styleFormularios.css';

const EditarClientes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    apellidoCliente: '',
    direccionCliente: '',
    emailCliente: '',
    identificacionClientes: '',
    nombreCliente: '',
    telCliente: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/api/customer/edit/${id}`);
        setCliente(response.data.data);
      } catch (error) {
        console.error('Error al cargar los datos del cliente:', error);
        setError('Error al cargar los datos del cliente. Inténtalo de nuevo más tarde.');
      }
    };
    fetchCliente();
  }, [id]);

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8085/api/customer/update/${id}`, cliente);
      alert('Cliente actualizado correctamente');
      navigate('/ListarClientes');
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      setError('Error al actualizar el cliente. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="contenedor-principal">
      <br /><br /><br />
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <div className="titulo-recuadro">
          <h2>Editar Cliente</h2>
        </div>
        {error && <p className="mensajeError">{error}</p>}
        <div className="formulario_grupo">
          <input
            type="text"
            className="formulario_grupo_input"
            name="nombreCliente"
            placeholder="Nombre"
            value={cliente.nombreCliente}
            onChange={handleChange}
            required
          /><br />
          <input
            type="text"
            className="formulario_grupo_input"
            name="apellidoCliente"
            placeholder="Apellido"
            value={cliente.apellidoCliente}
            onChange={handleChange}
            required
          /><br />
          <input
            type="email"
            className="formulario_grupo_input"
            name="emailCliente"
            placeholder="Email"
            value={cliente.emailCliente}
            onChange={handleChange}
            required
          /><br />
          <input
            type="text"
            className="formulario_grupo_input"
            name="identificacionClientes"
            placeholder="Identificación"
            value={cliente.identificacionClientes}
            onChange={handleChange}
            required
          /><br />
          <input
            type="text"
            className="formulario_grupo_input"
            name="telCliente"
            placeholder="Teléfono"
            value={cliente.telCliente}
            onChange={handleChange}
            required
          /><br />
          <textarea
            className="formulario_grupo_input"
            name="direccionCliente"
            placeholder="Dirección"
            value={cliente.direccionCliente}
            onChange={handleChange}
            required
          /><br />
          <button id="submitButton" type="submit">Actualizar</button>
          <Link to="/ListarClientes">
            <button type="button">Regresar</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditarClientes;
