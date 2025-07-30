import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert2';
import imagenRegistro from '../imagenes/registrar productos.jpg';

import HeaderInventario from '../HeaderInventario';
import firebaseConfig from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

const RegistrarProductos = () => {
  const navigate = useNavigate();
  const [nombreProducto, setNombreProducto] = useState('');
  const [tamañoProducto, setTamañoProducto] = useState('');
  
  
const [descripcionProducto, setDescripcionProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');
  const [ivaProducto, setIvaProducto] = useState('');
  const [cantidadProducto, setCantidadProducto] = useState('');
  const [subtotal, setSubtotal] = useState('');
const [idInventario, setIdInventario] = useState('');
  const [inventario, setInventario] = useState([]);
  const [idProveedor, setIdProveedor] = useState('');
  const [proveedor, setProveedor] = useState([]);
  const [idCategoria, setIdCategoria] = useState('');
  const [categoria, setCategoria] = useState([]);
const [idMarca, setIdMarca] = useState('');
  const [marca, setMarca] = useState([]);
  const [error, setError] = useState('');
  const [imagenProducto, setImagenProducto] = useState(null);


useEffect(() => {
    fetchProveedor();
    
    
fetchInventario();
    fetchCategoria();
    fetchMarca();
  }, []);

  const fetchProveedor = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/supplier/all');
      setProveedor(response.data.data);
    } catch (error) {
      setError('Error al obtener los proveedores');
    }
  };

  const fetchInventario = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/inventory/all');
      setInventario(response.data.data);
    } catch (error) {
      console.error('Error al cargar los inventarios:', error);
    }
  };

  const fetchCategoria = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/category/all');
      setCategoria(response.data.data);
    } catch (error) {
      console.error('Error al cargar las categorías:', error);
    }
  };

  const fetchMarca = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/brand/all');
      setMarca(response.data.data);
    } catch (error) {
      console.error('Error al cargar las marcas:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImagenProducto(file);
    } else {
      setError('Por favor, selecciona un archivo de imagen.');
    }
  };

  const handleImageUpload = async () => {
    if (imagenProducto) {
      const storageRef = ref(storage, `images/${imagenProducto.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imagenProducto);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error('Error al subir la imagen:', error);
            setError('Error al subir la imagen.');
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(storageRef);
              console.log('Imagen subida correctamente');
              resolve(downloadURL);
            } catch (error) {
              console.error('Error al obtener la URL de la imagen:', error);
              setError('Error al obtener la URL de la imagen.');
              reject(error);
            }
          }
        );
      });
    }
    return null;
  };

  const calcularIvaYSubtotal = (precio, cantidad) => {
    const precioNumero = parseFloat(precio);
    const cantidadNumero = parseInt(cantidad, 10);
    if (!isNaN(precioNumero) && !isNaN(cantidadNumero)) {
      const iva = precioNumero * 0.19;
      const subtotal = (precioNumero + iva) * cantidadNumero;
      setIvaProducto(iva.toFixed(2));
      setSubtotal(subtotal.toFixed(2));
    } else {
      setIvaProducto('');
      setSubtotal('');
    }
  };

  const handlePrecioChange = (e) => {
    const newPrecio = e.target.value;
    setPrecioProducto(newPrecio);
    calcularIvaYSubtotal(newPrecio, cantidadProducto);
  };

  const handleCantidadChange = (e) => {
    const newCantidad = e.target.value;
    setCantidadProducto(newCantidad);
    calcularIvaYSubtotal(precioProducto, newCantidad);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Validate inputs before submission
      if (!validateInputs()) {
        return;
      }

      const imageUrl = await handleImageUpload();

      const producto = {
        id: 0, // Assuming id is auto-generated
        nombreProducto,
        tamañoProducto,
        descripcionProducto,
        precioProducto: parseFloat(precioProducto),
        ivaProducto: parseFloat(ivaProducto),
        cantidadProducto: parseInt(cantidadProducto, 10),
        subtotal: parseFloat(subtotal),
        imagen: imageUrl,
        fkidInventario: { id: parseInt(idInventario, 10) },
        fkidProveedor: { id: parseInt(idProveedor, 10) },
        fkid_category: { id: parseInt(idCategoria, 10) },
        fkid_brand: { id: parseInt(idMarca, 10) },
      };

      const response = await axios.post('http://localhost:8085/api/product/create', producto);
      console.log('Respuesta del servidor:', response.data);
      Swal.fire({
        icon: 'success',
        title: '¡Producto registrado!',
        text: 'El producto se ha registrado exitosamente.',
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          resetForm();
          navigate('/ListarProductos');
        }
      });
    } catch (error) {
      console.error('Error al registrar producto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar el producto. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  };

  const validateInputs = () => {
    // Validate cantidad no mayor a mil
    const cantidadNumero = parseInt(cantidadProducto, 10);
    if (cantidadNumero > 1000) {
      setError('La cantidad no puede ser mayor a 1000.');
      return false;
    }

    // Validate nombreProducto length
    if (nombreProducto.length < 3 || nombreProducto.length > 50) {
      setError('El nombre del producto debe tener entre 3 y 50 caracteres.');
      return false;
    }

    // Validate descripcionProducto length
    if (descripcionProducto.length > 200) {
      setError('La descripción del producto no puede tener más de 200 caracteres.');
      return false;
    }

    // Optionally, add validation for tamañoProducto if required

    // Clear error if all validations pass
    setError('');
    return true;
  };

  const redireccionarPaginaPrincipal = () => {
    navigate('/GestionGerente');
  };

  const resetForm = () => {
    setNombreProducto('');
    setTamañoProducto('');
    setDescripcionProducto('');
    setPrecioProducto('');
    setIvaProducto('');
    setCantidadProducto('');
    setSubtotal('');
    setIdInventario('');
    setIdProveedor('');
    setIdCategoria('');
    setIdMarca('');
    setImagenProducto(null);
    setError('');
  };

  return (
    <div>
      <HeaderInventario /><br></br><br></br><br></br><br></br>
      <div className="contenedor-principal">
        <form onSubmit={handleSubmit} className="formulario" id="formulario">
          <div className="titulo-recuadro">
            <h2>Registro Proveedor</h2>
          </div>
          <div className="imagen">
              <img src={imagenRegistro} alt="Imagen Registrarse" />
            </div>
          <div className="formulario_grupo">
            <input
              type="file"
              className="formulario_grupo_input"
              name="imagenProducto"
              id="imagenProducto"
              onChange={handleImageChange}
              required
            /><br />
            {imagenProducto && <img src={URL.createObjectURL(imagenProducto)} alt="Vista previa de la imagen" />}
            <input
              type="text"
              className="formulario_grupo_input"
              name="nombreProducto"
              id="nombreProducto"
              placeholder="Nombre Producto"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
              required
            /><br />
            <input
              type="text"
              className="formulario_grupo_input"
              name="tamañoProducto"
              id="tamañoProducto"
              placeholder="Tamaño Producto"
              value={tamañoProducto}
              onChange={(e) => setTamañoProducto(e.target.value)}
              required
            /><br />
            <input
              type="text"
              className="formulario_grupo_input"
              name="descripcionProducto"
              id="descripcionProducto"
              placeholder="Descripción Producto"
              value={descripcionProducto}
              onChange={(e) => setDescripcionProducto(e.target.value)}
              required
            /><br />
            <input
              type="text"
              className="formulario_grupo_input"
              name="precioProducto"
              id="precioProducto"
              placeholder="Precio Producto"
              value={precioProducto}
              onChange={handlePrecioChange}
              required
            /><br />
            <input
              type="text"
              className="formulario_grupo_input"
              name="ivaProducto"
              id="ivaProducto"
              placeholder="IVA Producto"
              value={ivaProducto}
              readOnly
            /><br />
            <input
              type="text"
              className="formulario_grupo_input"
              name="cantidadProducto"
              id="cantidadProducto"
              placeholder="Cantidad Producto"
              value={cantidadProducto}
              onChange={handleCantidadChange}
              required
            /><br />
            <input
              type="text"
              className="formulario_grupo_input"
              name="subtotal"
              id="subtotal"
              placeholder="Subtotal"
              value={subtotal}
              readOnly
            /><br />
            <select
              className='form-select'
              name='inventario.id'
              value={idInventario}
              onChange={(e) => setIdInventario(e.target.value)}
            >
              <option value="">Seleccione Inventario</option>
              {Array.isArray(inventario) && inventario.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.id}
                </option>
              ))}
            </select>
            <br />
            <select
              className='form-select'
              name='proveedor.id'
              value={idProveedor}
              onChange={(e) => setIdProveedor(e.target.value)}
            >
              <option value="">Seleccione un Proveedor</option>
              {proveedor.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.nombreProveedor}
                </option>
              ))}
            </select>
            <br />
            <select
              className='form-select'
              name='categoria.id'
              value={idCategoria}
              onChange={(e) => setIdCategoria(e.target.value)}
            >
              <option value="">Seleccione una Categoría</option>
              {categoria.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombreCategoria}
                </option>
              ))}
            </select>
            <br />
            <select
              className='form-select'
              name='marca.id'
              value={idMarca}
              onChange={(e) => setIdMarca(e.target.value)}
            >
              <option value="">Seleccione una Marca</option>
              {marca.map((mar) => (
                <option key={mar.id} value={mar.id}>
                  {mar.nombreMarca}
                </option>
              ))}
            </select>
            <br />
            <button id="submitButton" type="submit">Registrar</button>
          </div>
        </form><br /><br />
      </div>
    </div>
  );
};

export default RegistrarProductos;
