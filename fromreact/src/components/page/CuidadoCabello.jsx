import React from 'react';
import Producto1 from './imagenes/cuidadocabello1.jpg'; // Importa la imagen del producto 1
import Producto2 from './imagenes/cuidadocabello2.jpg'; // Importa la imagen del producto 2
import Producto3 from './imagenes/cuidadocabello3.jpg'; // Importa la imagen del producto 3
import './Estilos/styleCategorias.css'; // Importa los estilos CSS

const CuidadoCabello = ({ addToCart }) => {
  const agregarAlCarrito = (producto) => {
    addToCart(producto);
    alert(`¡${producto.nombre} agregado al carrito!`);
  };

  return (
    <div><br></br><br></br><br></br><br></br><br></br><br></br>
      <h2>Cuidado del cabello</h2>

      <div className="productos-container">
        <div className="producto">
          <img src={Producto1} alt="Producto 1" />
          <p>Crema facial rejuvenecedora</p>
          <p>Esta crema ayuda a reducir las arrugas y mejorar la elasticidad de la piel.</p>
          <button onClick={() => agregarAlCarrito({ id: 1, nombre: 'Crema facial rejuvenecedora' })}>
            Agregar al carrito
          </button>
        </div>

        <div className="producto">
          <img src={Producto2} alt="Producto 2" />
          <p>Sérum anti-manchas</p>
          <p>Un sérum diseñado para eliminar manchas oscuras y unificar el tono de la piel.</p>
          <button onClick={() => agregarAlCarrito({ id: 2, nombre: 'Sérum anti-manchas' })}>
            Agregar al carrito
          </button>
        </div>

        <div className="producto">
          <img src={Producto3} alt="Producto 3" />
          <p>Mascarilla purificante</p>
          <p>Elimina impurezas y deja la piel suave y fresca después de cada uso.</p>
          <button onClick={() => agregarAlCarrito({ id: 3, nombre: 'Mascarilla purificante' })}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default CuidadoCabello;
