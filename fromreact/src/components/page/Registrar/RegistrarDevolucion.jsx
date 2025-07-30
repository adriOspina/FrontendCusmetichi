import React from 'react';

const RegistrarDevolucion = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos del formulario al servidor
    console.log('Enviando formulario');
  };

  const redireccionarPagina = () => {
    window.location.href = "gestion de inventario.html"; 
  };

  return (
    <div className="contenedor-principal">
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <h2>Registro Devolución</h2>
        <div className="formulario_grupo">
          <input type="text" className="formulario_grupo_input" name="nombre" id="nombre" placeholder="Nombre" required /><br /><br />
          <input type="email" className="formulario_grupo_input" name="email" id="email" placeholder="Email" required /><br /><br />
          <input type="text" className="formulario_grupo_input" name="ProductoDevuelto" id="ProductoDevuelto" placeholder="Producto a Devolver" required /><br /><br />
          <textarea className="formulario_grupo_input" name="MotivoDevolucion" id="MotivoDevolucion" placeholder="Motivo Devolucion" required></textarea><br /><br />
          <span className="mensajeError" id="mensajeError"></span><br />
        </div>



        <button id="submitButton" type="submit">Registrar</button>
      </form>
      <div className="imagen">
        <img src="https://proveedor.mercadopublico.cl/assets/img/steps/index-registro.svg" alt="Imagen Registrarse" />
      </div>
      <button className="button" onClick={redireccionarPagina}>Volver a la página principal</button>
    </div>
  );
}

export default RegistrarDevolucion;