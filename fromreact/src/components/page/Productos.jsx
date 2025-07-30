import React from 'react';
import { Link } from 'react-router-dom';
import './Estilos/styleProductos.css'; // Estilos generales de productos
import './Estilos/styleBanner.css'; // Estilos del banner
import './Estilos/styleMenu.css'; // Estilos del menú
import './Estilos/styleCategorias.css'; // Estilos de las categorías

// Importa las imágenes específicas para cada categoría
import cuidadoPielImage from './imagenes/cuidadopiel.png';
import cuidadoCabelloImage from './imagenes/cuidadocabello.jpg';
import accesoriosImage from './imagenes/accesoros.jpg';

// Importa la imagen del banner
import bannerImage from './imagenes/banner.jpg';

const Productos = () => {
  return (
    <div>
      {/* Banner de imagen */}
      <img src={bannerImage} alt="Banner" className="banner-img" />

      <div className="menu-container">
        <h5 className="title">CATEGORIAS</h5>

        <div className="container">
          <Link to="/cuidadopiel" className="card">
            <img src={cuidadoPielImage} alt="Cuidado de la piel" />
            <p>Cuidado de la piel</p>
          </Link>
          <Link to="/cuidadocabello" className="card">
            <img src={cuidadoCabelloImage} alt="Cuidado del cabello" />
            <p>Cuidado del cabello</p>
          </Link>
          <Link to="/accesorios" className="card">
            <img src={accesoriosImage} alt="Accesorios y herramientas" />
            <p>Accesorios y herramientas</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Productos;
