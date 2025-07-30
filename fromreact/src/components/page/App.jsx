// App.js
import React, { useState } from 'react';
import Body from './components/page/Body';
import Carrito from './components/Carrito';

const App = () => {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
    setCarrito(nuevoCarrito);
  };

  return (
    <div>
      <Body addToCart={addToCart} />
      {carrito.length > 0 && <Carrito productos={carrito} eliminarProducto={eliminarProducto} />}
    </div>
  );
};

export default App;
