import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Estilos/styleGestionGerente.css';
import '../Estilos/ListadoProveedores.css';
import HeaderInventario from '../HeaderInventario';

const ListarCompras = () => {
  const [compras, setCompras] = useState([]);
  const [comprasOriginales, setComprasOriginales] = useState([]);
  const [error, setError] = useState(null);
  const [filtroFecha, setFiltroFecha] = useState(''); // Estado para el término de búsqueda por fecha
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/purchaseSupplier/all');
      let compras = response.data.data;

      const comprasEliminadas = JSON.parse(localStorage.getItem('comprasEliminadas')) || [];
      compras = compras.filter(compra => !comprasEliminadas.includes(compra.id));

      setCompras(compras);
      setComprasOriginales(compras); // Guardar la lista original sin filtros
    } catch (error) {
      console.error('Error al cargar las compras:', error);
      setError('Error al cargar las compras. Inténtalo de nuevo más tarde.');
    }
  };

  // Función para aplicar el filtro por fecha
  const filtrarPorFecha = () => {
    const comprasFiltradas = comprasOriginales.filter(compra => {
      const fechaCompra = new Date(compra.fechaPedido);
      const fechaFiltro = new Date(filtroFecha);
      return fechaCompra.toDateString() === fechaFiltro.toDateString();
    });
    setCompras(comprasFiltradas);
  };

  const handleEliminarCompras = (id) => {
    try {
      const nuevasCompras = compras.filter(compra => compra.id !== id);
      setCompras(nuevasCompras);

      const comprasEliminadas = JSON.parse(localStorage.getItem('comprasEliminadas')) || [];
      comprasEliminadas.push(id);
      localStorage.setItem('comprasEliminadas', JSON.stringify(comprasEliminadas));
    } catch (error) {
      console.error('Error al eliminar la compra:', error);
      setError('Error al eliminar la compra. Inténtalo de nuevo más tarde.');
    }
  };



  return (
    <div>
      <HeaderInventario /><br /><br /><br /><br /><br /><br />
      <div className="contenedor-principal">
        <div>
          <Link to="/RegistroCompraproveedor"><button>Registrar Compra</button></Link>
          &nbsp;
          <Link to="/GestionGerente"><button>Regresar</button></Link>
        </div>
        <h2>Listado de compras a Proveedores</h2>
        {error && <p>{error}</p>}
        <div className="filtro-fechas">
          <label htmlFor="fecha">Filtrar por fecha:</label>
          <input
            type="date"
            id="fecha"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />
          <button onClick={filtrarPorFecha}>Filtrar</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cantidad</th>
              <th>Costo</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Nombre Proveedor</th>
              <th>Acciones</th>
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
                <td>{compra.fkidProveedor.nombreProveedor}</td>
                <td>
                
                  <button onClick={() => handleEliminarCompras(compra.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarCompras;
