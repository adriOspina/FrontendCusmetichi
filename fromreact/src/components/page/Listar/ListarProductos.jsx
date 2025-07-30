import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Estilos/ListadoProveedores.css';
import '../Estilos/styleGestionGerente.css';
import HeaderInventario from '../HeaderInventario';

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [eliminados, setEliminados] = useState(() => {
    const savedEliminados = localStorage.getItem('eliminados');
    return savedEliminados ? JSON.parse(savedEliminados) : [];
  });
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/product/all');
        setProductos(response.data.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        setError('Error al cargar los productos. Inténtalo de nuevo más tarde.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('eliminados', JSON.stringify(eliminados));
  }, [eliminados]);

  const eliminarProducto = (id) => {
    setEliminados([...eliminados, id]);
  };

  const handleBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  return (
    <div>
      <HeaderInventario /><br /><br /><br /><br />
      <div className="contenedor-principal">
        <div className="botones-titulo">
          <h2>Listado de Productos</h2>
          <div>
            <Link to="/RegistrarProductos"><button className="custom-button">Registrar Producto</button></Link>
            &nbsp;
            <Link to="/GestionGerente"><button className="custom-button-secondary">Regresar</button></Link>
          </div>
        </div>
        <div>
          <input 
            type="text"
            className="custom-search-bar"
            placeholder="Buscar por nombre"
            value={busqueda}
            onChange={handleBusqueda}
          />
        </div>
        {error && <p>{error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>IVA</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Subtotal</th>
              <th>Tamaño</th>
              <th>Imagen</th>
              <th>Nombre Proveedor</th>
              <th>Categoría</th>
              <th>Marca</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {productos
              .filter(producto => !eliminados.includes(producto.id))
              .filter(producto => producto.nombreProducto.toLowerCase().includes(busqueda.toLowerCase()))
              .map((producto) => (
                <tr key={producto.id} style={{ backgroundColor: producto.cantidadProducto < 5 ? "#FE8484" : 'transparent' }}>
                  <td>{producto.id}</td>
                  <td>{producto.cantidadProducto}</td>
                  <td>{producto.descripcionProducto}</td>
                  <td>{producto.ivaProducto}</td>
                  <td>{producto.nombreProducto}</td>
                  <td>{producto.precioProducto}</td>
                  <td>{producto.subtotal}</td>
                  <td>{producto.tamañoProducto}</td>
                  <td>
                    {producto.imagen ? (
                      <img src={producto.imagen} alt={producto.nombreProducto} width="100" />
                    ) : (
                      'No image'
                    )}
                  </td>
                  <td>{producto.fkidProveedor.nombreProveedor}</td>
                  <td>{producto.fkid_category ? producto.fkid_category.nombreCategoria : 'N/A'}</td>
                  <td>{producto.fkid_brand ? producto.fkid_brand.nombreMarca : 'N/A'}</td>
                  
                  <td>
                    <button className="custom-button" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarProductos;
