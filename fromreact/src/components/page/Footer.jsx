import React from 'react';
import imagen from './imagenes/Logo.png'; // Ensure this path is correct
import './Estilos/styleFooter.css';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="logo-header">
                    <a href="/"><img src={imagen} /></a>
                    <h4>¿Quiénes somos?</h4>
                    <p>Somos una empresa dedicada a la venta de productos de belleza ubicada en el barrio Aurora Usme, compitiendo en el mercado desde hace 20 años.</p>
                </div>

                <div className="iconos-sociales">
                    <h4>Contactos</h4>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <img loading="lazy" alt="Sígueme en Facebook" height="35" width="35" src="https://1.bp.blogspot.com/-Pop-U7OywXs/YPhkfrImyiI/AAAAAAAAA1Y/UBnVfTK9j2U-bIUqwZYMNSQPvz_l06mbwCPcBGAYYCw/s0/facebook-icono.png" title="Sígueme en Facebook" />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <img loading="lazy" alt="Sígueme en Instagram" height="35" width="35" src="https://1.bp.blogspot.com/-VFfOISywV0c/YPhkeRXuRQI/AAAAAAAAA1M/L75S9Usg5AovunH2Y-VzqJbaaY1LuK3eACPcBGAYYCw/s0/Instagram-icono.png" title="Sígueme en Instagram" />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                        <img loading="lazy" alt="Sígueme en Twitter" height="35" width="35" src="https://1.bp.blogspot.com/-2JwTJZxg1AU/YPhkfB0DdjI/AAAAAAAAA1c/tDKdU6tS0A0lt4YegGUVd7k-9hguYz82ACPcBGAYYCw/s0/Twitter-icono.png" title="Sígueme en Twitter" />
                    </a>
                </div>

                <div className="links">
                    <h4>Mapa del sitio</h4>
                    <ul>
                        <li className="mapa">
                            <iframe title="Mapa" src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3977.3881287483246!2d-74.12146092405966!3d4.523897943162908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sCALLE%2069f%20%23%2014a%20-%2037%20sUR%20aURORA%201!5e0!3m2!1ses!2sco!4v1683238402949!5m2!1ses!2sco" allowFullScreen="" />
                        </li>
                    </ul>
                </div>

                <div className="bottom-bar">
                    <p>&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
