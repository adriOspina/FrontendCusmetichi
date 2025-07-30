import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import HeaderInventario from '../HeaderInventario';
import '../Estilos/ListadoProveedores.css';
import '../Estilos/styleGestionGerente.css';

const ListarVentas = () => {
  const [ventas, setVentas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/sale/all');
        setVentas(response.data.data);
      } catch (error) {
        console.error('Error al obtener ventas:', error);
      }
    };

    obtenerVentas();
  }, []);

  const handleEditarVentas = (id) => {
    const ventasSeleccionado = ventas.find(venta => venta.id === id);
    if (ventasSeleccionado) {
      localStorage.setItem('ventasSeleccionado', JSON.stringify(ventasSeleccionado));
      navigate(`/EditarVentas/${id}`);
    } else {
      console.error('Venta no encontrada');
    }
  };

  const handleRegistrarVenta = () => {
    navigate('/RegistrarVentas');
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Ventas', 14, 20);
    doc.autoTable({
      head: [['Id', 'Fecha', 'Cantidad', 'Iva Total', 'Total']],
      body: ventas.map((venta) => [
        venta.id,
        venta.fecha,
        venta.cantidad,
        venta.ivaTotal,
        venta.total,
      ]),
      startY: 30,
    });
    doc.save('Reporte_de_Ventas.pdf');
  };

  return (
    <div>
      <HeaderInventario /><br /><br /><br />
      <div className="contenedor-principal">
        <h2>Listado de Ventas</h2>
        <div className="botones-titulo">
          <button className="btn-registrar custom-button" onClick={handleRegistrarVenta}>
            Registrar Venta
          </button>
          &nbsp;
          <button className="btn-registrar custom-button" onClick={generarPDF}>
            Descargar Reporte PDF
          </button>
          &nbsp;
          <Link to="/GestionGerente">
            <button className="btn-regresar custom-button-secondary">Regresar</button>
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Fecha</th>
              <th>Cantidad</th>
              <th>Iva Total</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.fecha}</td>
                <td>{venta.cantidad}</td>
                <td>{venta.ivaTotal}</td>
                <td>{venta.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarVentas;
