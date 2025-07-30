import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Estilos/styleGestionGerente.css';
import HeaderInventario from '../HeaderInventario';

const ListarEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerEmpleados = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/employee/all');
        setEmpleados(response.data.data);
      } catch (error) {
        console.error('Error al obtener Empleado:', error);
      }
    };

    obtenerEmpleados();
  }, []);

  const handleEditarEmpleado = (id) => {
    const empleadoSeleccionado = empleados.find(empleado => empleado.id === id);
    if (empleadoSeleccionado) {
      localStorage.setItem('empleadoSeleccionado', JSON.stringify(empleadoSeleccionado));
      navigate(`/EditarEmpleado/${id}`);
    } else {
      console.error('Empleado no encontrado');
    }
  };

  const handleEliminarEmpleado = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/api/employee/delete/${id}`);
      setEmpleados(empleados.filter(empleado => empleado.id !== id));
      alert('Empleado eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
      alert('Error al eliminar empleado');
    }
  };

  return (
    <div>
      <HeaderInventario /><br /><br /><br /><br /><br /><br />
      <div className="contenedor-principal">
        <div>
          <Link to="/RegistrarEmpleado"><button>Registrar Empleado</button></Link>
          &nbsp;
          <Link to="/GestionGerente"><button>Regresar</button></Link>
        </div>
        <h2>Listado de Empleados</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Identificacion</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td>{empleado.id}</td>
                <td>{empleado.nombreEmpleado}</td>
                <td>{empleado.apellidoEmpleado}</td>
                <td>{empleado.identificacionEmpleado}</td>
                <td>{empleado.emailEmpleado}</td>
                <td>{empleado.telEmpleado}</td>
                <td>
                  <button onClick={() => handleEditarEmpleado(empleado.id)}>Editar</button>
                  &nbsp;
                  <button onClick={() => handleEliminarEmpleado(empleado.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarEmpleados;
