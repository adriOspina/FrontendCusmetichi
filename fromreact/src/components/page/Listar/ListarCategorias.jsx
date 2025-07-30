import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Estilos/ListadoProveedores.css';
import '../Estilos/styleGestionGerente.css';
import HeaderInventario from '../HeaderInventario';

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriasEliminadas, setCategoriasEliminadas] = useState([]);
  const [error, setError] = useState(null); // Para manejar errores
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/category/all');
        const categorias = response.data.data.filter(categoria => !categoria.eliminado); // Filtrar las categorías eliminadas
        setCategorias(categorias);

        // Obtener las categorías eliminadas del almacenamiento local
        const categoriasEliminadas = JSON.parse(localStorage.getItem('categoriasEliminadas')) || [];
        setCategoriasEliminadas(categoriasEliminadas);
      } catch (error) {
        console.error('Error al obtener Categorias:', error);
        setError('Error al obtener categorías. Inténtalo de nuevo más tarde.');
      }
    };

    obtenerCategorias();
  }, []);

  const handleEditarCategorias = (id) => {
    const categoriaSeleccionada = categorias.find(categoria => categoria.id === id);
    if (categoriaSeleccionada) {
      localStorage.setItem('categoriaSeleccionada', JSON.stringify(categoriaSeleccionada));
      navigate(`/EditarCategorias/${id}`);
    } else {
      console.error('Categoría no encontrada');
    }
  };

  const handleEliminarCategorias = async (id) => {
    try {
      // Envía la solicitud DELETE a la API
      await axios.delete(`http://localhost:8085/api/category/${id}`);

      // Actualiza el estado de categorías eliminando la categoría con el ID correspondiente
      const nuevasCategorias = categorias.filter(categoria => categoria.id !== id);
      setCategorias(nuevasCategorias);

      // Almacena el ID de la categoría eliminada en el almacenamiento local del navegador
      const categoriasEliminadas = JSON.parse(localStorage.getItem('categoriasEliminadas')) || [];
      localStorage.setItem('categoriasEliminadas', JSON.stringify([...categoriasEliminadas, id]));
      setCategoriasEliminadas([...categoriasEliminadas, id]);
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      setError('Error al eliminar categoría. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div>
      <HeaderInventario /><br /><br /><br /><br /><br /><br />
      <div className="contenedor-principal">
        <div>
          <Link to="/RegistrarCategorias"><button>Registrar Categoria</button></Link>
          &nbsp; {/* Espacio horizontal */}
          <Link to="/GestionGerente"><button>Regresar</button></Link>
        </div>
        <h2>Listado de Categorías</h2>
        {error && <p>{error}</p>}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Editar</th>
              <th>Eliminar</th> {/* Añadir columna de Eliminar */}
            </tr>
          </thead>
          <tbody>
            {categorias
              .filter(categoria => !categoriasEliminadas.includes(categoria.id))
              .map((categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.id}</td>
                  <td>{categoria.nombreCategoria}</td>
                  
                
                  <td>
                    <button className="button-editar" onClick={() => handleEditarCategorias(categoria.id)}>
                      Editar
                    </button>
                  </td>
                  <td>
                    <button className="button-eliminar" onClick={() => handleEliminarCategorias(categoria.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaCategorias;
