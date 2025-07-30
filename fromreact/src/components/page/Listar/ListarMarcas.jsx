import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderInventario from '../HeaderInventario';
import '../Estilos/ListadoProveedores.css';
import '../Estilos/styleGestionGerente.css';


const ListarMarca = () => {
  const [marca, setMarca] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/brand/all');
        const marcas = response.data.data.filter(marca => {
          // Filtrar las marcas eliminadas del localStorage
          const eliminada = localStorage.getItem(`marcaEliminada_${marca.id}`);
          return !eliminada;
        });
        setMarca(marcas);
      } catch (error) {
        console.error('Error al obtener marca:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditarMarca = (id) => {
    const marcaSeleccionado = marca.find(marca => marca.id === id);
    if (marcaSeleccionado) {
      localStorage.setItem('marcaSeleccionado', JSON.stringify(marcaSeleccionado));
      navigate(`/EditarMarca/${id}`);
    } else {
      console.error('Marca no encontrada');
    }
  };

  const handleEliminarMarca = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/api/brand/${id}`);
      setMarca(marca.filter(marca => marca.id !== id));
      // Marcar la marca como eliminada en el localStorage
      localStorage.setItem(`marcaEliminada_${id}`, 'true');
    } catch (error) {
      console.error('Error al eliminar marca:', error);
    }
  };

  return (
    <div>
      <HeaderInventario /><br /><br /><br /><br /><br /><br />
      <div className="contenedor-principal">
        <div>
          <Link to="/RegistrarMarcas"><button>Registrar Marca</button></Link>
          &nbsp; {/* Espacio horizontal */}
          <Link to="/GestionGerente"><button>Regresar</button></Link>
        </div>
        <h2>Listado de Marcas</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {marca.map((marca) => (
              <tr key={marca.id}>
                <td>{marca.id}</td>
                <td>{marca.nombreMarca}</td>
            
                <td>
                  <button onClick={() => handleEliminarMarca(marca.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarMarca;
