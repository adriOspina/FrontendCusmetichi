import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from 'sweetalert2';
import './Estilos/styleFormularios.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  const onChange = (token) => {
    setCaptchaToken(token);
    console.log("Captcha token:", token);
  };

  const handleChangeEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    setErrorEmail(!/^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/.test(value) ? 'Correo electrónico inválido, debe contener un @' : '');
  };

  const handleChangePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    setErrorPassword(value.length < 6 ? 'La contraseña debe tener al menos 6 caracteres' : '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setErrorEmail('');
    setErrorPassword('');

    if (!email.trim() || !/^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|yahoo\.com)$/.test(email)) {
      setErrorEmail('Por favor ingresa un email válido');
      return;
    }

    if (!password.trim()) {
      setErrorPassword('Por favor ingresa tu contraseña');
      return;
    }

    if (!captchaToken) {
      setError('Verificación reCAPTCHA requerida');
      return;
    }

    // Simulación de autenticación (reemplazar con tu lógica real)
    if (email === 'ac909008@gmail.com' && password === 'Adriana1998') {
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Inicio de sesión exitoso',
      });
      navigate('/GestionGerente');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate('/');
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);
  return (
    <div className="contenedor-principal" style={{ marginTop: '150px' }}>
      <form onSubmit={handleSubmit} className="formulario" id="formulario">
        <div className="titulo-recuadro">
          <h2>Login</h2>
        </div>
        <div className="imagen">
          <img src="https://static.vecteezy.com/system/resources/previews/005/879/539/original/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg" alt="Imagen Registro" />
        </div>
        <div className="formulario_grupo">
          <input
            type="text"
            className={`formulario_grupo_input ${errorEmail ? 'input-error' : ''}`}
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
            required
          />
          {errorEmail && <span className="mensajeError">{errorEmail}</span>}
          <br />
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`formulario_grupo_input ${errorPassword ? 'input-error' : ''}`}
              name="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={handleChangePassword}
              required
            />
            <button type="button" className="toggle-password-button" onClick={toggleShowPassword}>
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errorPassword && <span className="mensajeError">{errorPassword}</span>}
          
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey='6Lf2OPspAAAAAI-smQgzWoo6f34ZUU-45CiYqYKf' // Replace with your actual reCAPTCHA site key
            onChange={onChange}
          /><br></br>
          <button type="submit" className="btn-enviar">Enviar</button><br /><br></br>
          <Link to="/recuperar-contraseña" className="olvido-contraseña">¿Olvidaste tu contraseña?</Link><br />
          ¿Necesitas una cuenta?<Link to="/registrarse"> - Registrarse</Link><br /><br />
          <div className="iconos-sociales">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img loading="lazy" alt="Sígueme en Facebook" height="35" width="35" src="https://1.bp.blogspot.com/-Pop-U7OywXs/YPhkfrImyiI/AAAAAAAAA1Y/UBnVfTK9j2U-bIUqwZYMNSQPvz_l06mbwCPcBGAYYCw/s0/facebook-icono.png" title="Sígueme en Facebook" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img loading="lazy" alt="Sígueme en Instagram" height="35" width="35" src="https://1.bp.blogspot.com/-VFfOISywV0c/YPhkeRXuRQI/AAAAAAAAA1M/L75S9Usg5AovunH2Y-VzqJbaaY1LuK3eACPcBGAYYCw/s0/Instagram-icono.png" title="Sígueme en Instagram" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img loading="lazy" alt="Sígueme en Twitter" height="35" width="35" src="https://1.bp.blogspot.com/-2JwTJZxg1AU/YPhkfB0DdjI/AAAAAAAAA1c/tDKdU6tS0A0lt4YegGUVd7k-9hguYz82ACPcBGAYYCw/s0/Twitter-icono.png" title="Sígueme en Twitter" />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;