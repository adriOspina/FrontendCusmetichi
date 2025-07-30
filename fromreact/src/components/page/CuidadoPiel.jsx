import React from 'react';
import Producto1 from './imagenes/cuidadopiel1.jpg'; // Importa la imagen del producto 1
import Producto2 from './imagenes/cuidadopiel2.jpeg'; // Importa la imagen del producto 2
import Producto3 from './imagenes/cuidadopiel3.jpg'; // Importa la imagen del producto 3
import './Estilos/styleCategorias.css'; // Importa los estilos CSS

const CuidadoPiel = ({ addToCart }) => {
  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    addToCart(producto);
    alert(`"${producto.nombreProducto}" agregado al carrito`);
  };

  return (
    <div className="cuidado-piel-container"><br></br><br></br><br></br><br></br><br></br><br></br>
      <h2>Cuidado de la piel</h2>

      <div className="productos-container">
        <div className="producto">
          <img src={Producto1} alt="Producto 1" />
          <p>Crema facial rejuvenecedora</p>
          <p>Esta crema ayuda a reducir las arrugas y mejorar la elasticidad de la piel.</p>
          <button onClick={() => agregarAlCarrito({
            id: 1,
            nombreProducto: 'Crema facial rejuvenecedora',
            precioProducto: 25.99,
            cantidad: 1
          })}>Agregar al Carrito</button>
        </div>

        <div className="producto">
          <img src={Producto2} alt="Producto 2" />
          <p>Sérum anti-manchas</p>
          <p>Un sérum diseñado para eliminar manchas oscuras y unificar el tono de la piel.</p>
          <button onClick={() => agregarAlCarrito({
            id: 2,
            nombreProducto: 'Sérum anti-manchas',
            precioProducto: 19.99,
            cantidad: 1
          })}>Agregar al Carrito</button>
        </div>

        <div className="producto">
          <img src={Producto3} alt="Producto 3" />
          <p>Mascarilla purificante</p>
          <p>Elimina impurezas y deja la piel suave y fresca después de cada uso.</p>
          <button onClick={() => agregarAlCarrito({
            id: 3,
            nombreProducto: 'Mascarilla purificante',
            precioProducto: 12.99,
            cantidad: 1
          })}>Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
};

export default CuidadoPiel;
