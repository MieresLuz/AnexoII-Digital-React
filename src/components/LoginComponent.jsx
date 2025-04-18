import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const sessionTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const validateField = (id, value) => {
    let newErrors = { ...errors };

    if (id === "email") {
      const emailPattern = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.com$/;
      if (!value.trim()) {
        newErrors.email = "El correo no puede estar vacío";
      } else if (!emailPattern.test(value)) {
        newErrors.email = "Formato de correo inválido. Debe terminar en .com";
      } else {
        delete newErrors.email;
      }
    }

    if (id === "contraseña") {
      let passwordErrors = [];

      if (value.length < 8) passwordErrors.push("Debe tener al menos 8 caracteres");
      if (!/[A-Z]/.test(value)) passwordErrors.push("Debe contener una letra mayúscula");
      if (!/[a-z]/.test(value)) passwordErrors.push("Debe contener una letra minúscula");
      if (!/[0-9]/.test(value)) passwordErrors.push("Debe contener un número");
      if (!/[!@#$%^&*(),.?\":{}|<>_\-\\[\];'/+=`~]/.test(value)) passwordErrors.push("Debe contener un carácter especial");

      if (passwordErrors.length > 0) {
        newErrors.contraseña = passwordErrors;
      } else {
        delete newErrors.contraseña;
      }
    }

    setErrors(newErrors);
  };

  const isFormValid = () => {
    return (
      email.trim() !== '' &&
      contraseña.trim() !== '' &&
      Object.values(errors).every(err => !err || (Array.isArray(err) && err.length === 0))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, contraseña };

    try {
      const loginResponse = await axios.post(
        'https://anexoii-digital-backend.onrender.com/api/auth/login',
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const token = loginResponse.data;
      localStorage.setItem('token', token);

      const currentUserResponse = await axios.get(
        'https://anexoii-digital-backend.onrender.com/api/auth/current',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem('user', JSON.stringify(currentUserResponse.data));
      setModalMessage('Inicio de sesión exitoso 🎉');
      setModalSuccess(true);
      setModalVisible(true);
    } catch (error) {
      let errorMsg = 'Error al iniciar sesión';
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMsg = error.response.data;
        } else if (error.response.data.message) {
          errorMsg = error.response.data.message;
        }
      }

      setModalMessage(errorMsg);
      setModalSuccess(false);
      setModalVisible(true);
    }
  };

  const handleAceptar = () => {
    setModalVisible(false);
    if (modalSuccess) {
      localStorage.setItem('loginTime', Date.now());
      navigate('/anexoII');
    }
  };

  return (
    <div className="container">
      <h1>Iniciar Sesión en Anexo II Digital</h1>
      <div className="tacuara">
        <img className="image-tacuara" src="logo-anexoII-digital.png" alt="logo" id="logo-anexoII-digital" />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="email"
          id="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateField('email', e.target.value);
          }}
          onFocus={() => setTouched(prev => ({ ...prev, email: true }))}
          required
        />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}

        <input
          className="login-input"
          type="password"
          id="contraseña"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => {
            setContraseña(e.target.value);
            validateField('contraseña', e.target.value);
          }}
          onFocus={() => setTouched(prev => ({ ...prev, contraseña: true }))}
          required
        />
        {touched.contraseña && Array.isArray(errors.contraseña) ? (
          <ul className="error-list">
            {errors.contraseña.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        ) : (
          touched.contraseña && errors.contraseña && <p className="error">{errors.contraseña}</p>
        )}

        <button
          className={`login-button ${!isFormValid() ? 'disabled' : ''}`}
          type="submit"
          disabled={!isFormValid()}
        >
          Iniciar Sesión
        </button>
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

      {modalVisible && (
        <div className="modal-login">
          <div className="modal-content-login">
            <h2>{modalSuccess ? '¡Éxito!' : 'Error'}</h2>
            <p>{modalMessage}</p>
            <button className='login-button' onClick={handleAceptar}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginComponent;
