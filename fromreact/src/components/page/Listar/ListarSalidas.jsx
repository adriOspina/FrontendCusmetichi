import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Estilos/ListadoProveedores.css';
import '../Estilos/styleGestionGerente.css';
import HeaderInventario from '../HeaderInventario';

const ListarSalidas = () => {
  const [salidasActivas, setSalidasActivas] = useState([]);
  const [salidasEliminadas, setSalidasEliminadas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerSalidas = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/output/all');
        const salidas = response.data.data;
        const salidasActivas = salidas.filter(salida => !salidasEliminadas.includes(salida.id));
        setSalidasActivas(salidasActivas);
      } catch (error) {
        console.error('Error al obtener salidas:', error);
      }
    };

    obtenerSalidas();
  }, [salidasEliminadas]);

  useEffect(() => {
    const salidasEliminadasLocalStorage = localStorage.getItem('salidasEliminadas');
    if (salidasEliminadasLocalStorage) {
      setSalidasEliminadas(JSON.parse(salidasEliminadasLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('salidasEliminadas', JSON.stringify(salidasEliminadas));
  }, [salidasEliminadas]);

  const handleEditarSalidas = (id) => {
    const salidaSeleccionada = salidasActivas.find(salida => salida.id === id);
    if (salidaSeleccionada) {
      localStorage.setItem('salidaSeleccionada', JSON.stringify(salidaSeleccionada));
      navigate(`/EditarSalidas/${id}`);
    } else {
      console.error('Salida no encontrada');
    }
  };

  const handleEliminarSalida = (id) => {
    if (!salidasEliminadas.includes(id)) {
      setSalidasEliminadas([...salidasEliminadas, id]);
    }
  };

  return (
    <div>
      <HeaderInventario /><br></br><br></br><br></br><br></br>
      <div className="contenedor-principal">
        <div>
          <Link to="/RegistrarSalidas"><button>Registrar Salida</button></Link>
          <Link to="/GestionGerente"><button>Regresar</button></Link>
        </div>
        <h2>Listado de Salidas</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Cantidad Salidas</th>
              <th>Fecha Salida</th>
              <th>Iva Total</th>
              <th>Método De Pago</th>
              <th>Tipo Salida</th>
              
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {salidasActivas.map((salida) => (
              <tr key={salida.id}>
                <td>{salida.id}</td>
                <td>{salida.cantidadSalidas}</td>
                <td>{salida.fechaSalida}</td>
                <td>{salida.ivaTotal}</td>
                <td>{salida.metodoPago}</td>
                <td>{salida.tipoSalida}</td>
               
            
                <td>
                  <button onClick={() => handleEliminarSalida(salida.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarSalidas;
