import React from 'react';
import './Estilos/styleQuienesSomos.css';

export const QuienesSomos = () => {
  return (
    <div>
           <div className="quienes-somos-content">
                <h1>Nuestra empresa</h1>
                <div className="cuadro">
                    <div className="image-container">
                        <img src="https://img.freepik.com/vector-gratis/gente-trabajo-equipo-piezas-rompecabezas_24877-54950.jpg?w=740&t=st=1688026778~exp=1688027378~hmac=66fee4f72dd3fbf3ddd2a1e4a4ca53e4588c106d2feffcd4d20fce3739f233ea" alt="Imagen Quiénes somos" />
                    </div>
                    <div className="content">
                        <h2>Quiénes somos</h2>
                        <p>Somos una empresa de cosméticos dedicada a proporcionar productos de alta calidad y eficacia a nuestros clientes. Nos enorgullece ofrecer una amplia gama de productos de belleza, desde tratamientos capilares hasta maquillaje, pensando en la felicidad de nuestros clientes.</p>
                        <p>En nuestra empresa, valoramos la integridad y la transparencia. Nos comprometemos a proporcionar información precisa y detallada sobre nuestros productos, para que nuestros clientes puedan tomar decisiones informadas sobre lo que compran.</p>
                    </div>
                </div>

                <div className="cuadro">
                    <h2>Visión</h2>
                    <p>Nuestra visión es convertirnos en la marca líder en la industria de cosméticos, reconocida por nuestra calidad y compromiso con la satisfacción del cliente. Buscamos innovar constantemente, ofreciendo productos que cumplan con las últimas tendencias y necesidades del mercado.</p>
                </div>

                <div className="cuadro">
                    <h2>Misión</h2>
                    <p>Nuestra misión es brindar productos de belleza excepcionales que realcen la confianza y la belleza interior de nuestros clientes. Nos esforzamos por utilizar ingredientes de alta calidad y prácticas sostenibles en todos nuestros productos. Además, nos comprometemos a ofrecer un excelente servicio al cliente y a promover la belleza inclusiva y la autoexpresión.</p>
                </div>
            </div>

    </div>
  );
}
export default QuienesSomos;
