import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderInventario from '../HeaderInventario';
import '../Estilos/ListadoProveedores.css';
import '../Estilos/styleGestionGerente.css';


const ListaEntradas = () => {
  const [entradas, setEntradas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerEntradas = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/input/all');
        const entradas = response.data.data.filter(entrada => {
          // Filtrar las entradas eliminadas del localStorage
          const eliminada = localStorage.getItem(`entradaEliminada_${entrada.id}`);
          return !eliminada;
        });
        setEntradas(entradas);
      } catch (error) {
        console.error('Error al obtener entradas:', error);
      }
    };

    obtenerEntradas();
  }, []);

  const handleEditarEntradas = (id) => {
    const entradaSeleccionada = entradas.find(entrada => entrada.id === id);
    if (entradaSeleccionada) {
      localStorage.setItem('entradaSeleccionada', JSON.stringify(entradaSeleccionada));
      navigate(`/EditarEntradas/${id}`);
    } else {
      console.error('Entrada no encontrada');
    }
  };

  const handleEliminarEntrada = (id) => {
    // Marcar la entrada como eliminada en el localStorage
    localStorage.setItem(`entradaEliminada_${id}`, 'true');

    // Actualizar el estado para ocultar la entrada eliminada
    const nuevasEntradas = entradas.filter(entrada => entrada.id !== id);
    setEntradas(nuevasEntradas);
  };

  return (
    <div>
      <HeaderInventario /><br /><br /><br /><br /><br /><br />
      <div className="contenedor-principal">
        <div>
          <Link to="/RegistrarEntradas"><button>Registrar Entradas</button></Link>
          &nbsp;
          <Link to="/GestionGerente"><button>Regresar</button></Link>
        </div>
        <h2>Listado de Entradas</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Cantidad Entradas</th>
              <th>Fecha</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {entradas.map((entrada) => (
              <tr key={entrada.id}>
                <td>{entrada.id}</td>
                <td>{entrada.cantidadEntrada}</td>
                <td>{entrada.fechaEntrada}</td>
                <td>
                  <button onClick={() => handleEliminarEntrada(entrada.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaEntradas;
