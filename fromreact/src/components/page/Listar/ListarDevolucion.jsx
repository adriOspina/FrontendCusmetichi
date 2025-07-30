import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Estilos/ListadoProveedores.css';
import '../Estilos/styleGestionGerente.css';
import HeaderInventario from '../HeaderInventario';

const ListarCompras = () => {
  const [compras, setCompras] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cantidadProducto, setCantidadProducto] = useState('');
  const [costoProducto, setCostoProducto] = useState('');
  const [estadoPedido, setEstadoPedido] = useState('');
  const [fechaPedido, setFechaPedido] = useState('');
  const [idEmpleado, setIdEmpleado] = useState('');
  const [idProveedor, setIdProveedor] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/purchaseSupplier/all');
        setCompras(response.data.data);
      } catch (error) {
        console.error('Error al cargar las compras:', error);
      }
    };
    fetchData();
  }, []);

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8085/api/purchaseSupplier/create', {
        cantidadProducto,
        costoProducto,
        estadoPedido,
        fechaPedido,
        fkidEmpleado: { id: idEmpleado },
        fkidProveedor: { id: idProveedor }
      });
      setCantidadProducto('');
      setCostoProducto('');
      setEstadoPedido('');
      setFechaPedido('');
      setIdEmpleado('');
      setIdProveedor('');
      alert('Compra registrada exitosamente');
      // Actualizar la lista de compras después de agregar una nueva compra
      const response = await axios.get('http://localhost:8085/api/purchaseSupplier/all');
      setCompras(response.data.data);
    } catch (error) {
      console.error('Error al agregar la compra:', error);
      alert('Error al agregar la compra');
    }
  };

  return (
    <div>
      <HeaderInventario />
      <h1>Listado de Compras a Proveedores</h1>
      <button onClick={toggleFormulario} style={{ marginBottom: '1rem', padding: '0.5rem 1rem', backgroundColor: 'lightblue', border: 'none', borderRadius: '5px' }}>Crear nueva compra</button>
      {mostrarFormulario && (
        <div>
          <h2 style={{ marginBottom: '1rem' }}>Registrar nueva compra</h2>
          <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Cantidad:
              <input type="text" value={cantidadProducto} onChange={(e) => setCantidadProducto(e.target.value)} style={{ marginLeft: '0.5rem' }} />
            </label>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Costo:
              <input type="text" value={costoProducto} onChange={(e) => setCostoProducto(e.target.value)} style={{ marginLeft: '0.5rem' }} />
            </label>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Estado:
              <input type="text" value={estadoPedido} onChange={(e) => setEstadoPedido(e.target.value)} style={{ marginLeft: '0.5rem' }} />
            </label>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Fecha:
              <input type="text" value={fechaPedido} onChange={(e) => setFechaPedido(e.target.value)} style={{ marginLeft: '0.5rem' }} />
            </label>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              ID Empleado:
              <input type="text" value={idEmpleado} onChange={(e) => setIdEmpleado(e.target.value)} style={{ marginLeft: '0.5rem' }} />
            </label>
            <label style={{ display: 'block', marginBottom: '1rem' }}>
              ID Proveedor:
              <input type="text" value={idProveedor} onChange={(e) => setIdProveedor(e.target.value)} style={{ marginLeft: '0.5rem' }} />
            </label>
            <button type="submit" style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', backgroundColor: 'lightblue', border: 'none', borderRadius: '5px' }}>Guardar compra</button>
          </form>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cantidad</th>
            <th>Costo</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>ID Empleado</th>
            <th>ID Proveedor</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={compra.id}>
              <td>{compra.id}</td>
              <td>{compra.cantidadProducto}</td>
              <td>{compra.costoProducto}</td>
              <td>{compra.estadoPedido}</td>
              <td>{compra.fechaPedido}</td>
              <td>{compra.fkidEmpleado.id}</td>
              <td>{compra.fkidProveedor.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarCompras;
