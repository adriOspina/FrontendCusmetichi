import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Estilos/ListadoProveedores.css'; // Ajusta la ruta según sea necesario
import '../Estilos/styleGestionGerente.css'; // Ajusta la ruta según sea necesario
import HeaderInventario from '../HeaderInventario';

const ListaProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState(''); // Estado para el término de búsqueda
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/supplier/all');
        let proveedores = response.data.data;

        // Obtener proveedores eliminados de localStorage
        const proveedoresEliminados = JSON.parse(localStorage.getItem('proveedoresEliminados')) || [];

        // Filtrar proveedores eliminados
        proveedores = proveedores.filter(proveedor => !proveedoresEliminados.includes(proveedor.id));

        setProveedores(proveedores);
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
        setError('Error al obtener proveedores. Inténtalo de nuevo más tarde.');
      }
    };

    obtenerProveedores();
  }, []);

  const handleEditarProveedor = (id) => {
    const proveedorSeleccionado = proveedores.find(proveedor => proveedor.id === id);
    if (proveedorSeleccionado) {
      localStorage.setItem('proveedorSeleccionado', JSON.stringify(proveedorSeleccionado));
      navigate(`/EditarProveedor/${id}`);
    } else {
      console.error('Proveedor no encontrado');
    }
  };

  const handleEliminarProveedor = (id) => {
    try {
      // Actualizar la lista de proveedores después de eliminar
      const nuevosProveedores = proveedores.filter(proveedor => proveedor.id !== id);
      setProveedores(nuevosProveedores);

      // Guardar el ID del proveedor eliminado en localStorage
      const proveedoresEliminados = JSON.parse(localStorage.getItem('proveedoresEliminados')) || [];
      proveedoresEliminados.push(id);
      localStorage.setItem('proveedoresEliminados', JSON.stringify(proveedoresEliminados));
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
      setError('Error al eliminar proveedor. Inténtalo de nuevo más tarde.');
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
          <h2>Listado de Proveedores</h2>
          <div>
            <Link to="/RegistrarProveedor">
              <button className="custom-button">Registrar Proveedor</button>
            </Link>
            <Link to="/GestionGerente">
              <button className="custom-button-secondary">Regresar</button>
            </Link>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="custom-search-bar" // Aplica la nueva clase CSS aquí
            placeholder="Buscar por nombre"
            value={busqueda}
            onChange={handleBusqueda}
          />
        </div>
        {error && <p className="mensaje-error">{error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Documento</th>
              <th>Email</th>
              <th>Celular</th>
              <th>Nombre de la Empresa</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {proveedores
              .filter(proveedor => {
                // Check if proveedor.nombreProveedor is truthy before applying toLowerCase()
                return proveedor.nombreProveedor && proveedor.nombreProveedor.toLowerCase().includes(busqueda.toLowerCase());
              })
              .map((proveedor) => (
                <tr key={proveedor.id}>
                  <td>{proveedor.id}</td>
                  <td>{proveedor.nombreProveedor}</td>
                  <td>{proveedor.apellidoProveedor}</td>
                  <td>{proveedor.identificacionProveedor}</td>
                  <td>{proveedor.emailProveedor}</td>
                  <td>{proveedor.telefonoProveedor}</td>
                  <td>{proveedor.empresaProveedor}</td>
                  <td>
                    <button className="custom-button" onClick={() => handleEditarProveedor(proveedor.id)}>
                      Editar
                    </button>
                  </td>
                  <td>
                    <button className="custom-button" onClick={() => handleEliminarProveedor(proveedor.id)}>
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

export default ListaProveedores;
