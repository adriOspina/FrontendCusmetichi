import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa Link en lugar de useHistory
import '../Estilos/ListadoProveedores.css';
import '../Estilos/styleGestionGerente.css'; // Asegúrate de importar los estilos del encabezado
import HeaderInventario from '../HeaderInventario';


const ListaRol = () => {
  const [rol, setRol] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerRol = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/role/all');
        setRol(response.data.data);
      } catch (error) {
        console.error('Error al obtener rol:', error);
      }
    };

    obtenerRol();
  }, []);

  const handleEditarRol = (id) => {
    const rolSeleccionado = rol.find(rol => rol.id === id);
    if (rolSeleccionado) {
      localStorage.setItem('rolSeleccionado', JSON.stringify(rolSeleccionado));
      navigate(`/EditarRole/${id}`);
    } else {
      console.error('Rol no encontrado');
    }
  };

  return (
    <div>
    <HeaderInventario /><br></br><br></br><br></br><br></br><br></br><br></br>
    <div className="contenedor-principal">
      <div>
  <Link to="/RegistrarROL"><button>Registrar Rol</button></Link>
  &nbsp; {/* Espacio horizontal */}
  <Link to="/GestionGerente"><button>Regresar</button></Link>
</div>
      <h2>Listado de Roles</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {rol.map((rol) => (
            <tr key={rol.id}>
              <td>{rol.id}</td>
              <td>{rol.nombre}</td>
              
              <td>
                <button onClick={() => handleEditarRol(rol.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
};

export default ListaRol;
