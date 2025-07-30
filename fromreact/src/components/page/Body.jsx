import React, { useEffect, useState } from 'react';
import './Estilos/styleBanner.css';
import './Estilos/styleProductos.css';
import axios from 'axios';
import slide1 from './imagenes/slide1.jfif';
import slide2 from './imagenes/Rejuvenecete.png';
import slide3 from './imagenes/slide3.jfif';

const Body = ({ addToCart }) => {
  const [diapositivaActual, setDiapositivaActual] = useState(0);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

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
        setProductos(response.data.data || []);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    // Obtener datos del carrito desde localStorage al inicializar el componente
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
  }, []);

  const handleCantidadChange = (id, cantidad) => {
    const nuevoCarrito = carrito.map((item) => {
      if (item.id === id) {
        return { ...item, cantidad };
      }
      return item;
    });

    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const handleAddToCart = (producto) => {
    const cantidad = carrito.find((item) => item.id === producto.id)?.cantidad || 0;
    const nuevaCantidad = cantidad + 1;
    const nuevoCarrito = [
      ...carrito.filter((item) => item.id !== producto.id),
      { ...producto, cantidad: nuevaCantidad },
    ];

    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    addToCart({ ...producto, cantidad: nuevaCantidad });
  };

  return (
    <div className="slide" style={{ marginTop: '100px' }}>
      {/* Slider code */}
      <input
        className="slide-open"
        type="radio"
        id="slide-1"
        name="slide"
        aria-hidden="true"
        hidden=""
        checked={diapositivaActual === 0}
        readOnly
      />
      <div className="slide-item">
        <img src={slide1} alt="Slide 1" />
      </div>

      <input
        className="slide-open"
        type="radio"
        id="slide-2"
        name="slide"
        aria-hidden="true"
        hidden=""
        checked={diapositivaActual === 1}
        readOnly
      />
      <div className="slide-item">
        <img src={slide2} alt="Slide 2" />
      </div>

      <input
        className="slide-open"
        type="radio"
        id="slide-3"
        name="slide"
        aria-hidden="true"
        hidden=""
        checked={diapositivaActual === 2}
        readOnly
      />
      <div className="slide-item">
        <img src={slide3} alt="Slide 3" />
      </div>

      <h1>LO MÁS VENDIDO</h1>

      <div className="container">
        {productos.map((producto) => (
          <div key={producto.id} className="card">
            <img src={producto.imagen} alt={producto.nombreProducto} />
            <h4>{producto.nombreProducto}</h4>
            <p>{producto.descripcionProducto}</p>
            <p>Precio: ${producto.precioProducto}</p>
            <input
              type="number"
              min="1"
              max={producto.stockProducto}
              value={(carrito.find((item) => item.id === producto.id)?.cantidad) || 0}
              onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value))}
            />
            <button
              className="send-button"
              onClick={() => handleAddToCart(producto)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
