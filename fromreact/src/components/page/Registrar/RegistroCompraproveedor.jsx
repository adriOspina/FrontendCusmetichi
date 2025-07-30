import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderInventario from '../HeaderInventario';
import '../Estilos/styleFormularios.css';

const RegistroCompra = () => {
  const navigate = useNavigate();
  const [proveedores, setProveedores] = useState([]);
  const [formData, setFormData] = useState({
    cantidadProducto: '',
    costoProducto: '',
    estadoPedido: '',
    fechaPedido: '',
    fkidProveedor: ''
  });
  const [errors, setErrors] = useState({
    cantidadProducto: '',
    fechaPedido: '',
    estadoPedido: '',
    costoProducto: ''
  });

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/supplier/all');
        setProveedores(response.data.data);
      } catch (error) {
        console.error('Error al cargar los proveedores:', error);
      }
    };

    fetchProveedores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate({ ...formData, [name]: value }); // Validar al cambiar cada campo
  };

  const validate = (data) => {
    const newErrors = { ...errors };
    const today = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'

    if (data.cantidadProducto < 1 || data.cantidadProducto > 1000) {
      newErrors.cantidadProducto = 'La cantidad debe ser entre 1 y 1000.';
    } else {
      newErrors.cantidadProducto = '';
    }

    if (data.fechaPedido > today) {
      newErrors.fechaPedido = 'La fecha no puede ser posterior a la actual.';
    } else {
      newErrors.fechaPedido = '';
    }

    if (data.estadoPedido.length < 3 || data.estadoPedido.length > 20) {
      newErrors.estadoPedido = 'El estado del pedido debe tener entre 3 y 20 caracteres.';
    } else {
      newErrors.estadoPedido = '';
    }

    if (data.costoProducto.toString().length > 9) {
      newErrors.costoProducto = 'El costo no debe exceder los 9 dígitos.';
    } else {
      newErrors.costoProducto = '';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === ''); // Devolver true si no hay errores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(formData)) {
      return;
    }

    try {
      const formattedData = {
        ...formData,
        fkidProveedor: parseInt(formData.fkidProveedor)
      };

      await axios.post('http://localhost:8085/api/purchaseSupplier/create', formattedData);
      alert('Compra registrada exitosamente');
      setFormData({
        cantidadProducto: '',
        costoProducto: '',
        estadoPedido: '',
        fechaPedido: '',
        fkidProveedor: ''
      });
      setErrors({
        cantidadProducto: '',
        fechaPedido: '',
        estadoPedido: '',
        costoProducto: ''
      });
    } catch (error) {
      console.error('Error al registrar la compra:', error);
      alert('Error al registrar la compra');
    }
  };

  const redireccionarPaginaPrincipal = () => {
    navigate('/GestionGerente');
  };

  return (
    <div>
      <HeaderInventario /><br/><br/><br/><br/><br/><br/>
      <div className="contenedor-principal">
        <div className="titulo-recuadro">
          <h2>Registrar Compra</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="formulario" id="formulario">
          <div className="formulario_grupo">
            <input 
              type="number" 
              id="cantidadProducto" 
              name="cantidadProducto" 
              placeholder="Cantidad Producto"
              value={formData.cantidadProducto} 
              onChange={handleChange} 
              className={`formulario_grupo_input ${errors.cantidadProducto ? 'input-error' : ''}`}
              required 
            />
            {errors.cantidadProducto && <span className="mensajeError">{errors.cantidadProducto}</span>}
            <br />

            <input 
              type="number" 
              id="costoProducto" 
              name="costoProducto" 
              placeholder="Costo Producto"
              value={formData.costoProducto} 
              onChange={handleChange} 
              className={`formulario_grupo_input ${errors.costoProducto ? 'input-error' : ''}`}
              required 
            />
            {errors.costoProducto && <span className="mensajeError">{errors.costoProducto}</span>}
            <br />

            <input 
              type="text" 
              id="estadoPedido" 
              name="estadoPedido" 
              placeholder="Estado Pedido"
              value={formData.estadoPedido} 
              onChange={handleChange} 
              className={`formulario_grupo_input ${errors.estadoPedido ? 'input-error' : ''}`}
              required 
            />
            {errors.estadoPedido && <span className="mensajeError">{errors.estadoPedido}</span>}
            <br />

            <input 
              type="date" 
              id="fechaPedido" 
              name="fechaPedido" 
              placeholder="Fecha Pedido"
              value={formData.fechaPedido} 
              onChange={handleChange} 
              className={`formulario_grupo_input ${errors.fechaPedido ? 'input-error' : ''}`}
              required 
            />
            {errors.fechaPedido && <span className="mensajeError">{errors.fechaPedido}</span>}
            <br />

            <select 
              id="fkidProveedor" 
              name="fkidProveedor" 
              value={formData.fkidProveedor} 
              onChange={handleChange} 
              className="formulario_grupo_input"
              required
            >
              <option value="">Seleccionar Proveedor</option>
              {proveedores.map(proveedor => (
                <option key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombreProveedor}
                </option>
              ))}
            </select>
            <br />
          </div>
          <button type="submit" className="confirmar-button">Registrar Compra</button>
        </form>
        <br/>
        <div className="boton-volver">
          <button className="button" onClick={redireccionarPaginaPrincipal}>Volver a la página principal</button>
        </div>
      </div>
    </div>
  );
};

export default RegistroCompra;
