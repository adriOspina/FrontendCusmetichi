import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaUser, FaPhone, FaUsers, FaUserPlus } from 'react-icons/fa';
import imagen from './imagenes/Logo.png';
import './Estilos/styleMenu.css';

const Header = ({ onSearch, carrito }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };


  return (
    <header className="header">
      <div className="logo-header">
        <Link to="/"><img src={imagen} alt="Logo" /></Link>
      </div>
      <nav className="nav-">
        <label htmlFor="check" className="checkbtn">
        <img src="../imagenes/hamburguesa.png" alt="Menu" className="menu-icon" />

        </label>
        <div className="nav-menu">
          <ul>
            <li><Link to="/"><FaHome /> Inicio</Link></li>
            <li><Link to="/QuienesSomos"><FaUsers /> Quiénes somos</Link></li>
            <li><Link to="/Productos"><FaShoppingCart /> Productos</Link></li>
            <li><Link to="/Contactanos"><FaPhone /> Contáctanos</Link></li>
            <li><Link to="/Registrarse"><FaUserPlus /> Registrarse</Link></li>
            <li><Link to="/IniciarSesion"><FaUser /> Iniciar sesión</Link></li>
            <li>
              <Link to="/Carrito">
                <FaShoppingCart /> Carrito ({carrito.reduce((total, producto) => total + producto.cantidad, 0)})
              </Link>
              
            </li>
          </ul>
          <div className="buscar-btn">
            <input
              type="search"
              name="Buscar"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearch} className="buscar-btn">Buscar</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
