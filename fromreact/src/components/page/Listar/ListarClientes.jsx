import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Estilos/ListadoProveedores.css'; // Ajusta la ruta según sea necesario
import '../Estilos/styleGestionGerente.css'; // Ajusta la ruta según sea necesario
import HeaderInventario from '../HeaderInventario';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]); // Estado inicializado como un array vacío
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState(''); // Estado para el término de búsqueda
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/customer/all');
        const { data, status } = response.data;

        // Verificar que la respuesta del servidor sea exitosa y que data sea un array
        if (status === 'success' && Array.isArray(data)) {
          setClientes(data);
        } else {
          console.error('La respuesta del servidor no es válida:', response.data);
          setError('Error al obtener clientes. La respuesta del servidor es incorrecta.');
        }
      } catch (error) {
        console.error('Error al obtener clientes:', error);
        setError('Error al obtener clientes. Inténtalo de nuevo más tarde.');
      }
    };

    obtenerClientes();
  }, []);

  const handleEditarCliente = (id) => {
    navigate(`/EditarCliente/${id}`);
  };

  const handleEliminarCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/api/customer/${id}`);
      const nuevosClientes = clientes.filter(cliente => cliente.id !== id);
      setClientes(nuevosClientes);
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      setError('Error al eliminar cliente. Inténtalo de nuevo más tarde.');
    }
  };

  const handleBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  return (
    <div>
      <HeaderInventario /><br></br><br></br><br></br><br></br>
      <div className="contenedor-principal">
        <div className="botones-titulo d-flex justify-content-between align-items-center">
          <h2>Listado de Clientes</h2>
          <div>
            <Link to="/RegistrarClientes">
              <button className="custom-button">Registrar Cliente</button>
            </Link>
            <Link to="/GestionGerente">
              <button className="custom-button-secondary">Regresar</button>
            </Link>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="custom-search-bar"
            placeholder="Buscar por nombre"
            value={busqueda}
            onChange={handleBusqueda}
          />
        </div>
        {error && <p className="mensaje-error">{error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Identificación</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {clientes
              .filter(cliente => cliente.nombreCliente.toLowerCase().includes(busqueda.toLowerCase()))
              .map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombreCliente}</td>
                  <td>{cliente.apellidoCliente}</td>
                  <td>{cliente.identificacionClientes}</td>
                  <td>{cliente.emailCliente}</td>
                  <td>{cliente.telCliente}</td>
                  <td>{cliente.direccionCliente}</td>
                  <td>
                    <button className="custom-button" onClick={() => handleEditarCliente(cliente.id)}>
                      Editar
                    </button>
                  </td>
                  <td>
                    <button className="custom-button" onClick={() => handleEliminarCliente(cliente.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaClientes;
