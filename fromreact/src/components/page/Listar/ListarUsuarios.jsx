import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../Estilos/ListadoProveedores.css';
import '../Estilos/styleGestionGerente.css';
import HeaderInventario from '../HeaderInventario';

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosEliminados, setUsuariosEliminados] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/user/all');
        const usuariosFiltrados = response.data.data.filter(usuario => !usuariosEliminados.includes(usuario.id));
        setUsuarios(usuariosFiltrados);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    obtenerUsuarios();
  }, [usuariosEliminados]);

  useEffect(() => {
    const usuariosEliminadosLocalStorage = localStorage.getItem('usuariosEliminados');
    if (usuariosEliminadosLocalStorage) {
      setUsuariosEliminados(JSON.parse(usuariosEliminadosLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('usuariosEliminados', JSON.stringify(usuariosEliminados));
  }, [usuariosEliminados]);

  const handleEditarUsuarios = (id) => {
    console.log('Editar usuario con ID:', id);
    // Implementa la lógica para editar un usuario
  };

  const handleEliminarUsuarios = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/api/user/${id}`);
      setUsuariosEliminados([...usuariosEliminados, id]);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div>
      <HeaderInventario /><br /><br /><br /><br /><br /><br />
      <div className="contenedor-principal">
        <div>
          <Link to="/RegistrarUsuarios"><button>Registrar Usuario</button></Link>
          &nbsp; {/* Espacio horizontal */}
          <Link to="/GestionGerente"><button>Regresar</button></Link>
        </div>
        <h2>Listado de Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Contraseña</th>
              <th>Rol</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.contraseña}</td>
                <td>{usuario.fkidRole.nombre}</td>
                <td>
                  <button onClick={() => handleEditarUsuarios(usuario.id)}>Editar</button>
                </td>
                <td>
                  <button onClick={() => handleEliminarUsuarios(usuario.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarUsuarios;
