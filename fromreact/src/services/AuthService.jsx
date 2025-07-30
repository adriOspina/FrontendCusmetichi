import axios from 'axios';

export const login = async (username, password) => {
    try {
        const response = await axios.get('http://localhost:8085/api/user/all');
        if (!response.data.data || !Array.isArray(response.data.data)) {
            throw new Error('No se pudo obtener la información de los usuarios');
        }
        const usuario = response.data.data.find(user => user.usuario === username && user.contrasena === password);
        if (usuario) {
            const rol = usuario.fkidRole.nombre;
            localStorage.setItem('token', 'tu_token_jwt');
            localStorage.setItem('rol', rol);
            return rol;
        } else {
            throw new Error('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        throw new Error(`Error al intentar iniciar sesión: ${error.message}`);
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    window.history.replaceState(null, '', '/');
};
