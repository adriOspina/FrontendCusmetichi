import React from 'react';
import './Estilos/styleGestionGerente.css';
import fotoPerfil from './imagenes/adriana.jfif'; 

const HeaderInventario = () => {
  const redireccionarPagina = () => {
    // Aquí puedes agregar la lógica para redirigir a la página principal si es necesario
  };

  return (
    <div>
      <header className="header">
        <nav id="menu">
          <ul> {/* Agregué el elemento ul para contener la lista de elementos li */}
            <li>
              <div className="usuario">
                <img src={fotoPerfil} alt="Foto de perfil" /><br />
                <span>Adriana Ospina</span><br /> {/* Corregí la codificación HTML de la ñ */}
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default HeaderInventario;
