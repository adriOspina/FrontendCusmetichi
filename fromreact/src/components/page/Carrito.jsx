import React, { useEffect, useState } from 'react';
import './Estilos/styleCarrito.css'; // Archivo CSS para estilos del carrito
import axios from 'axios'; // Importa axios para hacer la solicitud al servidor

const Carrito = ({ eliminarProducto }) => {
  // Estado local para el carrito de compras
  const [carrito, setCarrito] = useState([]);
  // Estado local para la cantidad de cada producto
  const [cantidades, setCantidades] = useState([]);
  // Estado local para controlar si se ha confirmado la venta
  const [ventaConfirmada, setVentaConfirmada] = useState(false);

  useEffect(() => {
    // Obtener datos del carrito desde localStorage al inicializar el componente
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    if (Array.isArray(carritoGuardado)) {
      setCarrito(carritoGuardado);
      setCantidades(carritoGuardado.map((producto) => producto.cantidad));
    }
  }, []);

  useEffect(() => {
    // Actualizar el localStorage cuando el carrito o las cantidades cambien
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito, cantidades]);

  // Función para calcular el total
  const calcularTotal = () => {
    return carrito.reduce((total, producto, index) => total + (producto.precioProducto * cantidades[index]), 0);
  };

  // Función para confirmar la venta y enviar la factura por correo
const confirmarVenta = async (event) => {
  event.preventDefault();
  try {
    const total = calcularTotal();
    const ivaTotal = total * 0.19; // Suponiendo un IVA del 19%
    const fecha = new Date().toISOString().slice(0, 10); // Fecha actual

    const newsale = {
      cantidad: carrito.reduce((sum, producto, index) => sum + cantidades[index], 0),
      fecha: fecha,
      ivaTotal: ivaTotal,
      total: total, // Asegúrate de incluir el campo total aquí
    };


    const saleresponse = await axios.post("http://localhost:8085/api/sale/create", newsale);
    const sale = saleresponse.data.data;

    localStorage.removeItem('carrito');

    // Envío de la factura por correo electrónico
    const factura = {
      items: carrito.map((producto, index) => ({
        nombre: producto.nombreProducto,
        precio: producto.precioProducto,
        cantidad: cantidades[index],
        total: producto.precioProducto * cantidades[index],
      })),
      total: total,
    };

    setVentaConfirmada(true);
  } catch (error) {
    console.log("Error" + error);
  }
};


  // Función para actualizar la cantidad de un producto
  const actualizarCantidad = (index, nuevaCantidad) => {
    const nuevasCantidades = [...cantidades];
    nuevasCantidades[index] = nuevaCantidad;
    setCantidades(nuevasCantidades);

    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad = nuevaCantidad;
    setCarrito(nuevoCarrito);
  };

  return (
    <div className="carrito-container"><br /><br /><br /><br />
      <h2>Carrito de compras</h2>
      {ventaConfirmada ? (
        <div>
          <p>¡Compra exitosa!</p>
          <p>¿Desea enviar la factura por correo electrónico?</p>
          <button onClick={confirmarVenta}>Enviar factura por correo</button>
          <p>Factura:</p>
          <ul className="factura-list">
            {carrito.map((producto, index) => (
              <li key={producto.id} className="factura-item">
                <span className="producto-nombre">{producto.nombreProducto}</span>
                <span className="producto-precio">{producto.precioProducto.toFixed(2)}</span>
                <span className="producto-cantidad">{cantidades[index]}</span>
                <span className="producto-total">{(producto.precioProducto * cantidades[index]).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="factura-total">Total: ${calcularTotal().toFixed(2)}</p>
        </div>
      ) : (
        <>
          {carrito.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <>
              <ul>
                {carrito.map((producto, index) => (
                  <li key={producto.id} className="carrito-item">
                    {producto.nombreProducto} - ${producto.precioProducto.toFixed(2)}
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={cantidades[index]}
                      onChange={(e) => actualizarCantidad(index, parseInt(e.target.value))}
                    />
                    <button className="eliminar-button" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                  </li>
                ))}
              </ul>
              <div className="carrito-total">
                <h3>Total: ${calcularTotal().toFixed(2)}</h3>
              </div>
              <button className="confirmar-button" onClick={confirmarVenta}>Confirmar compra</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Carrito;
