import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './Body';
import './Body.css'; // Asegúrate de importar el archivo CSS con los estilos

export const Body = ({ addToCart }) => {
  const [diapositivaActual, setDiapositivaActual] = useState(0);
  const [productos, setProductos] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const intervalo = setInterval(() => {
      setDiapositivaActual((diapositivaPrevia) => (diapositivaPrevia + 1) % 3);
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/product/all');
        console.log('Respuesta de la solicitud HTTP:', response.data);

        // Obtener las URLs de las imágenes de Firebase Storage
        const productosConUrls = await Promise.all(
          response.data.data.map(async (producto) => {
            const imageUrl = await getDownloadURL(ref(storage, `images/${producto.imagen}`));
            return { ...producto, imageUrl };
          })
        );

        setProductos(productosConUrls || []);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleCantidadChange = (id, cantidad) => {
    setCantidades({ ...cantidades, [id]: cantidad });
  };

  const handleAddToCart = (producto) => {
    const cantidad = cantidades[producto.id] || 1; // Default to 1 if no quantity set
    addToCart({ ...producto, cantidad });
  };

  const handleBusquedaChange = (event) => {
    setBusqueda(event.target.value);
  };

  // Function to filter products based on search term
  const filteredProductos = productos.filter((producto) =>
    producto.nombreProducto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="slide" style={{ marginTop: '100px' }}>
      {/* Slider code */}
      {/* Resto del código para el slider omitido para mayor claridad */}

      <h1>LO MÁS VENDIDO</h1>

      <div className="container">
        {/* Input for search */}
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={handleBusquedaChange}
        />

        {/* Render filtered products */}
        {filteredProductos.map((producto) => (
          <div key={producto.id} className="card">
            <img src={producto.imageUrl} alt={producto.nombre} className="original-image" />
            <h4>{producto.nombreProducto}</h4>
            <p>{producto.descripcionProducto}</p>
            <p>Precio: ${producto.precioProducto}</p>
            <input
              type="number"
              min="1"
              max={producto.stockProducto}
              value={cantidades[producto.id] || 1}
              onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value))}
            />
            <button className="send-button" onClick={() => handleAddToCart(producto)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
