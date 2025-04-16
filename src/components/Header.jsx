import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/header.css';

function Header() {
    const [showProfile, setShowProfile] = useState(false);
    const [profileImage, setProfileImage] = useState(() => {
        return localStorage.getItem('profileImage') || '/icono-perfil.png';
    });
    const [userData, setUserData] = useState(null);

    // Ref para el input de archivo
    const fileInputRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                localStorage.setItem('profileImage', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Activar el selector de archivo cuando se haga clic en la imagen dentro del modal
    const handleImageClickInModal = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify(user));

        if (user) {
            console.log('Usuario cargado:', user);
            setUserData(user);
        }
    }, []);

    useEffect(() => {
        gsap.to('.logo-container', {
            duration: 1,
            opacity: 1,
            y: -50,
            ease: 'power1.out',
            position: 'relative',
            top: 30,
        });
        gsap.to('#logo', {
            duration: 1,
            scale: 1.2,
            yoyo: true,
            repeat: -1,
            ease: 'power1.inOut',
        });
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <header>
            <div>
                <h1>Sistema Anexo II Digital</h1>
                <div className="logo-container" style={{ opacity: 0 }}>
                    <img id='logo' className="image-tacuara" src="logo-anexoII-digital.png" alt="logo-anexoII-digital" />
                </div>
            </div>
            <div className="profile-section">
                <button onClick={() => setShowProfile(!showProfile)}>
                    Perfil
                    <img 
                        src={profileImage} 
                        alt="icono del perfil" 
                        className="mini-profile-pic" 
                    />
                </button>
            </div>

            {showProfile && userData && (
                <div className="profile-modal">
                    <button className="close-btn" onClick={() => setShowProfile(false)}>
                        &times;
                    </button>
                    {/* Aquí agregamos la funcionalidad de hacer clic en la imagen dentro del modal */}
                    <div className="image-container">
                        <img
                            src={profileImage}
                            alt="profile"
                            className="profile-pic"
                            onClick={handleImageClickInModal}  // Activar el clic en la imagen dentro del modal
                        />
                        <p className="image-message">Seleccione una Imagen</p>  {/* El mensaje al lado de la imagen */}
                    </div>
                    <input
                        ref={fileInputRef}  // Asignamos el ref al input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}  // Ocultamos el input de archivos
                    />
                    <div className="profile-content">
                        <div>
                            <p>Legajo: {userData.legajo}</p>
                            <p>Alumno: {userData.nombre} {userData.apellido}</p>
                            <p>DNI: {userData.dni}</p>
                            <p>Email: {userData.email}</p>
                            <p>Departamento: {userData.departamento}</p>
                            <div className='profile-instituto'>
                                <p>{userData.instituto}</p>
                                <p>{userData.carrera}</p>
                            </div>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
