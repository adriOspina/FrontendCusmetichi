import React from 'react';
import { Link } from 'react-router-dom';
import empleadoImagen3 from './imagenes/compra a proveedor.jpg';
import empleadoImagen4 from './imagenes/registrar productos.jpg';
import empleadoImagen2 from './imagenes/registrar proveedor.jpg';
import empleadoImagen8 from './imagenes/RegistroCategoria.png';
import empleadoImagen6 from './imagenes/RegistroClientes.png';
import empleadoImagen7 from './imagenes/RegistroEmpleado.png';
import empleadoImagen9 from './imagenes/RegistroEntradas.png';
import empleadoImagen11 from './imagenes/RegistroMarcas.png';
import empleadoImagen10 from './imagenes/RegistroRol.png';
import empleadoImagen13 from './imagenes/RegistroSalidas.png';
import empleadoImagen12 from './imagenes/RegistroUsuarios.png';
import empleadoImagen14 from './imagenes/RegistroVentas.png';
import './Estilos/styleGestionGerente.css';
import './Estilos/styleBotones.css';
import fotoPerfil from './imagenes/adriana.jfif'; 
const GestionGerente = () => {
  const redireccionarPagina = () => {
    // Aquí puedes redirigir a la página principal
  };

  return (
    <div>
      <header className="header">
        <nav id="menu">
          <li>
            <div className="usuario">
            <img src={fotoPerfil} alt="Foto de perfil" /><br />
            <span>Adriana Ospina</span><br />
            </div>
          </li>
        </nav>
      </header><br></br><br></br><br></br><br></br><br></br><br></br>
      <div>
        <Link to="/IniciarSesion"><button>Salir</button></Link>
        <h1>Bienvenido a la página del Gerente</h1>
        <br /><br /><br /><br />
        <div className="container">

          <Link to="/ListarProveedores">
            <img src={empleadoImagen2} alt="Registrar proveedor" />
            <figcaption>Proveedor</figcaption>
          </Link>

          <Link to="/ListaCompraProveedor">
            <img src={empleadoImagen3} alt="Registro compra" />
            <figcaption> Compra a Proveedor</figcaption>
          </Link>

          <Link to="/ListarProductos">
            <img src={empleadoImagen4} alt="Registrar productos" />
            <figcaption>Productos</figcaption>
          </Link>

          <Link to="/ListarCategorias">
            <img src={empleadoImagen8} alt="Registrar Categorias" />
            <figcaption>Categorias</figcaption>
          </Link>

          <Link to="/ListarEntradas">
            <img src={empleadoImagen9} alt="Registrar Entradas" />
            <figcaption>Entradas</figcaption>
          </Link>

          <Link to="/ListarMarcas">
            <img src={empleadoImagen11} alt="Registrar Marcas" />
            <figcaption>Marcas</figcaption>
          </Link>

          <Link to="/ListarSalidas">
            <img src={empleadoImagen13} alt="Registrar Salidas" />
            <figcaption>Salidas </figcaption>
          </Link>

          <Link to="/ListarVentas">
            <img src={empleadoImagen14} alt="Registrar Ventas" />
            <figcaption>Ventas </figcaption>
          </Link>
          <Link to="/ListarClientes">
            <img src={empleadoImagen6} alt="Registrar Clientes" />
            <figcaption>Clientes</figcaption>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default GestionGerente;
