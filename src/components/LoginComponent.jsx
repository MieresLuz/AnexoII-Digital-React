import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = { email, contraseña };

    try {
      // Paso 1: Login
      const loginResponse = await axios.post('http://localhost:8080/api/auth/login', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const token = loginResponse.data;
      localStorage.setItem('token', token); // 👈 Unificado con AnexoIIComponent

      // Paso 2: Obtener datos del usuario actual
      const currentUserResponse = await axios.get('http://localhost:8080/api/auth/current', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Usuario autenticado:', currentUserResponse.data);

      // ✅ Guardamos el usuario en localStorage
      localStorage.setItem('user', JSON.stringify(currentUserResponse.data));

      // Paso 3: Mostrar modal y redirigir
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigate('/anexoII');
      }, 5000);

    } catch (error) {
      const errorMessage = error.response?.data || 'Error al iniciar sesión';
      console.error('Error en el inicio de sesión:', errorMessage);

      const newErrors = {};

      if (errorMessage.toLowerCase().includes('email')) {
        newErrors.email = errorMessage;
      } else if (errorMessage.toLowerCase().includes('contraseña') || errorMessage.toLowerCase().includes('password')) {
        newErrors.contraseña = errorMessage;
      } else {
        newErrors.general = errorMessage;
      }

      setErrors(newErrors);
    }
  };

  return (
    <div className="container">
      <div className="tacuara">
        <img className="image-tacuara" src="logo-anexoII-digital.png" alt="logo" id="logo-anexoII-digital" />
        <h1>Iniciar Sesión en Anexo II Digital</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            id="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            className="login-input"
            type="password"
            id="contraseña"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => {
              setContraseña(e.target.value);
              setErrors((prev) => ({ ...prev, contraseña: '' }));
            }}
            required
          />
          {errors.contraseña && <p className="error">{errors.contraseña}</p>}

          <button className="login-button" type="submit">Iniciar Sesión</button>

          {errors.general && <p className="error">{errors.general}</p>}
        </form>

        <div className="options">
          <a href="#">¿Olvidaste tu contraseña?</a>
          <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
          <div className="social-login">
            <p>O inicia sesión con:</p>
            <div className="social-icons">
              <a href="https://www.facebook.com"><img src="facebook-ico.png" alt="Facebook" /></a>
              <a href="https://www.instagram.com"><img src="instagram-ico.png" alt="Instagram" /></a>
              <a href="https://www.google.com"><img src="google-ico.png" alt="Google" /></a>
            </div>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="modal-login">
          <div className="modal-content">
            <h2>Inicio de sesión exitoso 🎉</h2>
            <p>Serás redirigido en 5 segundos...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginComponent;
