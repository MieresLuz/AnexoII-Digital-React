import React from 'react'
import '../styles/footer.css'

function Footer() {
  return (
    <>
      <footer>
        <p>Todos los derechos reservados ©By Angel Perla</p>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/luzmieres/" target="_blank" rel="noopener noreferrer">
            <img src="linkedin-100-footer.png" alt="Linkedin LuzMieres" />
          </a>
          <a href="https://github.com/MieresLuz" target="_blank" rel="noopener noreferrer">
            <img src="github-100-footer.png" alt="GitHub MieresLuz" />
          </a>
          <a href="https://wa.link/xpw3k5" target="_blank" rel="noopener noreferrer">
            <img src="whtsapp-footer.png" alt="Whatsapp" />
          </a>
        </div>
      </footer>
    </>
  )
}

export default Footer