import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Body from './components/page/Body';
import Carrito from './components/page/Carrito';
import Contacto from './components/page/Contactanos';
import EditarCategorias from './components/page/Editar/EditarCategorias';
import EditarClientes from './components/page/Editar/EditarClientes';
import EditarCompraProveedor from './components/page/Editar/EditarCompraProveedor';
import EditarEmpleado from './components/page/Editar/EditarEmpleado';
import EditarEntradas from './components/page/Editar/EditarEntradas';
import EditarMarca from './components/page/Editar/EditarMarca';
import EditarProducto from './components/page/Editar/EditarProducto';
import EditarProveedor from './components/page/Editar/EditarProveedor';
import EditarRole from './components/page/Editar/EditarRole';
import EditarSalidas from './components/page/Editar/EditarSalidas';
import EditarUsuarios from './components/page/Editar/EditarUsuarios';
import EditarVentas from './components/page/Editar/EditarVentas';
import Footer from './components/page/Footer';
import GestionGerente from './components/page/GestionGerente';
import Header from './components/page/Header';
import IniciarSesion from './components/page/IniciarSesion';
import ListaCompraProveedor from './components/page/Listar/ListaCompraProveedor';
import ListarCategorias from './components/page/Listar/ListarCategorias';
import ListarClientes from './components/page/Listar/ListarClientes';
import ListarEmpleado from './components/page/Listar/ListarEmpleado';
import ListarEntradas from './components/page/Listar/ListarEntradas';
import ListarMarcas from './components/page/Listar/ListarMarcas';
import ListarProductos from './components/page/Listar/ListarProductos';
import ListarProveedores from './components/page/Listar/ListarProveedores';
import ListarRol from './components/page/Listar/ListarRol';
import ListarSalidas from './components/page/Listar/ListarSalidas';
import ListarUsuarios from './components/page/Listar/ListarUsuarios';
import ListarVentas from './components/page/Listar/ListarVentas';
import Productos from './components/page/Productos';
import QuienesSomos from './components/page/QuienesSomos';
import RegistrarCategorias from './components/page/Registrar/RegistrarCategorias';
import RegistrarClientes from './components/page/Registrar/RegistrarClientes';
import RegistrarEmpleado from './components/page/Registrar/RegistrarEmpleado';
import RegistrarEntradas from './components/page/Registrar/RegistrarEntradas';
import RegistrarMarcas from './components/page/Registrar/RegistrarMarcas';
import RegistrarProductos from './components/page/Registrar/RegistrarProductos';
import RegistrarProveedor from './components/page/Registrar/RegistrarProveedor';
import RegistrarRol from './components/page/Registrar/RegistrarRol';
import RegistrarSalidas from './components/page/Registrar/RegistrarSalidas';
import Registrarse from './components/page/Registrar/Registrarse';
import RegistrarUsuarios from './components/page/Registrar/RegistrarUsuarios';
import RegistrarVentas from './components/page/Registrar/RegistrarVentas';
import RegistroCompraProveedor from './components/page/Registrar/RegistroCompraproveedor';
import CuidadoPiel from './components/page/CuidadoPiel'; // Importa el componente para cuidado de piel
import CuidadoCabello from './components/page/CuidadoCabello'; // Importa el componente para cuidado del cabello
import Accesorios from './components/page/Accesorios'; 
import './App.css';

const App = () => {
  const [carrito, setCarrito] = useState([]);

  const addToCart = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
    setCarrito(nuevoCarrito);
  };

  const handleSearch = (searchTerm) => {
    // Lógica de búsqueda
  };

  return (
    <div>
      <Router>
        <Header onSearch={handleSearch} carrito={carrito} />
        <Routes>
          <Route path="/" element={<Body addToCart={addToCart} />} />
          <Route path="/QuienesSomos" element={<QuienesSomos />} />
          <Route path="/Carrito" element={<Carrito carrito={carrito} eliminarProducto={eliminarProducto} />} />
          <Route path="/Productos" element={<Productos />} />
          <Route path="/Contactanos" element={<Contacto />} />
          <Route path="/IniciarSesion" element={<IniciarSesion />} />
          <Route path="/GestionGerente" element={<GestionGerente />} />
          <Route path="/RegistrarProveedor" element={<RegistrarProveedor />} />
          <Route path="/RegistroCompraproveedor" element={<RegistroCompraProveedor />} />
          <Route path="/RegistrarProductos" element={<RegistrarProductos />} />
          <Route path="/RegistrarEntradas" element={<RegistrarEntradas />} />
          <Route path="/ListarProveedores" element={<ListarProveedores />} />
          <Route path="/ListarProductos" element={<ListarProductos />} />
          <Route path="/ListaCompraProveedor" element={<ListaCompraProveedor />} />
          <Route path="/EditarProveedor/:id" element={<EditarProveedor />} />
          <Route path="/Registrarse" element={<Registrarse />} />
          <Route path="/ListarClientes" element={<ListarClientes />} />
          <Route path="/RegistrarClientes" element={<RegistrarClientes />} />
          <Route path="/RegistrarEmpleado" element={<RegistrarEmpleado />} />
          <Route path="/RegistrarRol" element={<RegistrarRol />} />
          <Route path="/RegistrarCategorias" element={<RegistrarCategorias />} />
          <Route path="/ListarEntradas" element={<ListarEntradas />} />
          <Route path="/RegistrarMarcas" element={<RegistrarMarcas />} />
          <Route path="/ListarMarcas" element={<ListarMarcas />} />
          <Route path="/ListarCategorias" element={<ListarCategorias />} />
          <Route path="/ListarEmpleado" element={<ListarEmpleado />} />
  <Route path="/ListarEmpleado" element={<ListarEmpleado />} />
  <Route path="/ListarRol" element={<ListarRol />} />
  <Route path="/RegistrarUsuarios" element={<RegistrarUsuarios />} />
  <Route path="/ListarUsuarios" element={<ListarUsuarios />} />

                    <Route path="/ListarUsuarios" element={<ListarUsuarios />} />
                    <Route path="/RegistrarSalidas" element={<RegistrarSalidas />} />
                    <Route path="/ListarSalidas" element={<ListarSalidas />} />
                    <Route path="/RegistrarVentas" element={<RegistrarVentas />} />
                    <Route path="/ListarVentas" element={<ListarVentas />} />
                    <Route path="/EditarCompraProveedor/:id" element={<EditarCompraProveedor />} />
                    <Route path="/EditarClientes/:id" element={<EditarClientes />} />
                    <Route path="/EditarProducto/:id" element={<EditarProducto />} />
                    <Route path="/EditarEmpleado/:id" element={<EditarEmpleado />} />
                    <Route path="/EditarRole/:id" element={<EditarRole />} />
                    <Route path="/EditarCategorias/:id" element={<EditarCategorias />} />
                    <Route path="/EditarEntradas/:id" element={<EditarEntradas />} />
                    <Route path="/EditarMarca/:id" element={<EditarMarca />} />
                    <Route path="/EditarUsuarios/:id" element={<EditarUsuarios />} />
                    <Route path="/EditarSalidas/:id" element={<EditarSalidas />} />
                    <Route path="/EditarVentas/:id" element={<EditarVentas />} />
                    <Route path="/cuidadoPiel" element={<CuidadoPiel addToCart={addToCart} />} />
                    <Route path="/cuidadoCabello" element={<CuidadoCabello addToCart={addToCart} />} />
                    <Route path="/Accesorios" element={<Accesorios addToCart={addToCart} />} />
                  
                  </Routes>
                  <Footer />
                </Router>
              </div>
            );
          
          };
          
          export default App;
          
