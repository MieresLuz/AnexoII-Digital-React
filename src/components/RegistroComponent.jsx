import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../styles/registro.css';

Modal.setAppElement('#root');

const RegistroComponent = () => {
  const navigate = useNavigate();
  const [rol, setRol] = useState('');
  const [formData, setFormData] = useState({});
  const [departamentos, setDepartamentos] = useState([]);
  const [institutos, setInstitutos] = useState([]);
  const [carreras, setCarreras] = useState([]);

  const [modal, setModal] = useState({ isOpen: false, message: '', success: false });

  useEffect(() => {
    const datosDepartamentos = [

      {
        departamento: "Victoria",
        institutos: [
          {
            nombre: "Escuela de Música Justo José de Urquiza",
            carreras: [
              {
                nombre: "Profesorado con Orientación en Educación Musical",
                anio: [1, 2, 3, 4]
              }
            ],
            materias: [
              {
                codigo: "cod0001",
                nombre: "Pedagogía",
                correlativas: "Ninguna",
                anio: 1,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0002",
                nombre: "Oralidad Lectura Escritura y TIC",
                correlativas: "Ninguna",
                anio: 1,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Taller"
              },
              {
                codigo: "cod0003",
                nombre: "Psicología Educacional",
                correlativas: "Ninguna",
                anio: 1,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0004",
                nombre: "Corporeidad juegos y lenguajes Artísticos",
                correlativas: "Ninguna",
                anio: 1,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Taller"
              },
              {
                codigo: "cod0005",
                nombre: "Lenguaje Musical I",
                correlativas: "Ninguna",
                anio: 1,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0006",
                nombre: "Instrumentos I (percusión piano y guitarra)",
                correlativas: "Ninguna",
                anio: 1,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Taller"
              },
              {
                codigo: "cod0007",
                nombre: "Canto Colectivo",
                correlativas: "Ninguna",
                anio: 1,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Taller"
              },
              {
                codigo: "cod0008",
                nombre: "Historia Social de la Música I",
                correlativas: "Ninguna",
                anio: 1,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0009",
                nombre: "Sujetos de la Educación",
                correlativas: "Ninguna",
                anio: 1,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0010",
                nombre: "Práctica Docente I",
                correlativas: "Ninguna",
                anio: 1,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Practica Docente"
              },
              {
                codigo: "cod0011",
                nombre: "Didáctica General",
                correlativas: "Pedagogía - Psicología Institucional",
                anio: 2,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0012",
                nombre: "Historia Social y Política Argentina y latinoamericana",
                correlativas: "Ninguna",
                anio: 2,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0013",
                nombre: "Filosofía",
                correlativas: "Ninguna",
                anio: 2,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0014",
                nombre: "Lenguaje Musical II",
                correlativas: "Lenguaje Musical I",
                anio: 2,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0015",
                nombre: "Instrumentos II (percusión piano y guitarra)",
                correlativas: "Instrumentos I",
                anio: 2,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Taller"
              },
              {
                codigo: "cod0016",
                nombre: "Conjunto Vocal / Instrumental",
                correlativas: "Canto Colectivo",
                anio: 2,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Taller"
              },
              {
                codigo: "cod0017",
                nombre: "Historia Social de la Música II",
                correlativas: "Historia Social de la Música I",
                anio: 2,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0018",
                nombre: "Didáctica de la Música I",
                correlativas: "Pedagogía - Sujetos de la Educación",
                anio: 2,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0019",
                nombre: "UDI",
                correlativas: "Ninguna",
                anio: 2,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "-"
              },
              {
                codigo: "cod0020",
                nombre: "Práctica Docente II",
                correlativas: "Práctica Docente I - Lenguaje Musical I - Pedagogía - Psicología Institucional - Sujetos de la Educación - Oralidad Lectura Escritura y TIC",
                anio: 2,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Practica Docente"
              },
              {
                codigo: "cod0021",
                nombre: "Análisis y org. de las instituciones educativas",
                correlativas: "Pedagogía - Practica Docente II",
                anio: 3,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Seminario"
              },
              {
                codigo: "cod0022",
                nombre: "Historia y política de la educación argentina",
                correlativas: "Historia Social y Política Argentina y Latinoamericana",
                anio: 3,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0023",
                nombre: "Sociología de la educación",
                correlativas: "Pedagogía",
                anio: 3,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0024",
                nombre: "Lenguaje Musical III",
                correlativas: "Lenguaje Musical II",
                anio: 3,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0025",
                nombre: "Instrumentos Musicales III (percusión piano y guitarra)",
                correlativas: "Instrumentos II",
                anio: 3,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Taller"
              },
              {
                codigo: "cod0026",
                nombre: "Dirección de Conjunto Vocal e Instrumental",
                correlativas: "Corporeidad Juego y Lenguajes Artísticos - Conjunto Vocal/Instrumental",
                anio: 3,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0027",
                nombre: "Historia y repertorio de la música popular Argentina y Latinoamericana",
                correlativas: "Historia Social de la Música II",
                anio: 3,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Taller"
              },
              {
                codigo: "cod0028",
                nombre: "Didáctica de la Música II",
                correlativas: "Didáctica de la Música I - Didáctica General",
                anio: 3,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0029",
                nombre: "Producción digital con medios digitales",
                correlativas: "Oralidad Lectura Escritura y TIC - Lenguaje Musical II",
                anio: 3,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Taller"
              },
              {
                codigo: "cod0030",
                nombre: "Práctica Docente III",
                correlativas: "Práctica Docente II - Didáctica General - Lenguaje Musical II - Instrumentos II - Conjunto Vocal/Instrumental - Historia Social de la Música II - Didáctica de la Música I - Oralidad Lectura Escritura y TIC",
                anio: 3,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Práctica Docente"
              },
              {
                codigo: "cod0031",
                nombre: "Derechos humanos ética y ciudadanía",
                correlativas: "Filosofía - Historia Social y Política Argentina y Latinoamericana - Sociología de la Educación",
                anio: 4,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0032",
                nombre: "Educación sexual integral",
                correlativas: "Sujeto de la Educación",
                anio: 4,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Taller"
              },
              {
                codigo: "cod0033",
                nombre: "Lenguaje Musical IV",
                correlativas: "Lenguaje Musical III",
                anio: 4,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0034",
                nombre: "Instrumentos IV (percusión piano y guitarra)",
                correlativas: "Instrumentos III",
                anio: 4,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Taller"
              },
              {
                codigo: "cod0035",
                nombre: "Composición y Arreglos Musicales",
                correlativas: "Lenguaje Musical III",
                anio: 4,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0036",
                nombre: "Estética y crítica de la música",
                correlativas: "Historia y Repertorio de la Música Popular Argentina y Latinoamericana - Lenguaje Musical III",
                anio: 4,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Asignatura"
              },
              {
                codigo: "cod0037",
                nombre: "Puesta en Escena",
                correlativas: "Lenguaje Musical III - Instrumentos III - Dirección de Conjunto Vocal/Instrumental - Producción Musical con Medios Digitales",
                anio: 4,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "Taller"
              },
              {
                codigo: "cod0038",
                nombre: "UDI",
                correlativas: "Ninguna",
                anio: 4,
                carrera: "Profesorado con Orientación en Educación Musical",
                formato: "-"
              },
              {
                codigo: "cod0039",
                nombre: "Práctica Docente IV Residencia",
                correlativas: "Historia y Política de la Educación Argentina - Sociología de la Educación - Análisis y Organización de las Instituciones Educativas - Lenguaje Musical III - Instrumentos III - Dirección de Conjunto Vocal/Instrumental - Historia y Repertorio de la Música Popular Argentina y Latinoamericana - Didáctica de la Música II - Producción Musical con Medios Digitales - Práctica Docentes III",
                anio: 4,
                carrera: "Profesorado con  de Música",
                formato: "Práctica Docente"
              }
            ]
          }
        ]
      }
    ];

    setDepartamentos(datosDepartamentos);
  }, []);

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'file' ? files[0] : value
    }));
  };

  const handleRolChange = (e) => {
    const selectedRol = e.target.value;
    const tipoUsuario = selectedRol === 'edu' ? 'estudiante' : 'docente';

    setRol(selectedRol);
    setFormData((prev) => ({
      ...prev,
      tipoUsuario
    }));
  };

  const handleDepartamentoChange = (e) => {
    const departamentoSeleccionado = e.target.value;
    const departamento = departamentos.find(d => d.departamento === departamentoSeleccionado);
    setInstitutos(departamento ? departamento.institutos : []);
    setCarreras([]);
    setFormData((prev) => ({ ...prev, departamento: departamentoSeleccionado }));
    localStorage.setItem('departamento', departamentoSeleccionado);
  };

  const handleInstitutoChange = (e) => {
    const institutoSeleccionado = e.target.value;
    const instituto = institutos.find(i => i.nombre === institutoSeleccionado);
    setCarreras(instituto ? instituto.carreras : []);
    setFormData((prev) => ({ ...prev, instituto: institutoSeleccionado }));
    localStorage.setItem('instituto', institutoSeleccionado);
  };

  const handleCarreraChange = (e) => {
    const carreraSeleccionada = e.target.value;
    setFormData((prev) => ({ ...prev, carrera: carreraSeleccionada }));
    localStorage.setItem('carrera', carreraSeleccionada);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };
    if (rol === 'admin') delete payload.legajo;

    try {
      const response = await axios.post('https://anexoii-digital-backend.onrender.com/api/auth/register', payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      setModal({ isOpen: true, message: 'Registro exitoso 🎉', success: true });
    } catch (error) {
      const msg = error.response?.data || 'Error al registrar usuario.';
      setModal({ isOpen: true, message: msg, success: false });
    }
  };

  const closeModal = () => {
    setModal({ isOpen: false, message: '', success: false });
    if (modal.success) navigate('/');
  };

  return (
    <div className="container">
      <h1 className="titulo">Registro en Anexo II Digital</h1>
      <div className="tacuara">
        <img className="image-tacuara" src="logo-anexoII-digital.png" alt="logo" id="logo-anexoII-digital" />
      </div>
      <p>Para regresar al panel de ingreso <Link to="/">Login</Link></p>

      <form onSubmit={handleSubmit}>
        <input className='registro-input' type="text" id="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input className='registro-input' type="text" id="apellido" placeholder="Apellido" onChange={handleChange} required />
        <input className='registro-input' type="text" id="dni" placeholder="DNI" onChange={handleChange} required />
        <input className='registro-input' type="email" id="email" placeholder="Correo electrónico" onChange={handleChange} required />
        <input className='registro-input' type="password" id="contraseña" placeholder="Contraseña" onChange={handleChange} required />

        <div className="rol-group">
          <label>
            <input type="radio" name="rol" value="edu" onChange={handleRolChange} required /> Estudiante
          </label>
        </div>
        {(rol === 'edu') && (
          <>
            {rol === 'edu' && (
              <input className='registro-input' type="text" id="legajo" placeholder="Legajo" onChange={handleChange} required />
            )}

            <select className='registro-input' onChange={handleDepartamentoChange} required>
              <option value="">Seleccione un departamento</option>
              {departamentos.map((d) => (
                <option key={d.departamento} value={d.departamento}>{d.departamento}</option>
              ))}
            </select>

            <select className='registro-input' onChange={handleInstitutoChange} required>
              <option value="">Seleccione un instituto</option>
              {institutos.map((i) => (
                <option key={i.nombre} value={i.nombre}>{i.nombre}</option>
              ))}
            </select>

            <select className='registro-input' onChange={handleCarreraChange} required>
              <option value="">Seleccione una carrera</option>
              {carreras.map((c) => (
                <option key={c.nombre} value={c.nombre}>{c.nombre}</option>
              ))}
            </select>
          </>
        )}
        <button className='registro-button' type="submit">Registrarme</button>
      </form>

      <Modal
        isOpen={modal.isOpen}
        onRequestClose={closeModal}
        contentLabel="Mensaje"
        className="modal-registro"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <button className="modal-close" onClick={closeModal}>×</button>
          <h2>{modal.success ? '¡Registro exitoso 🎉!' : 'Error'}</h2>
        </div>
        <div className="modal-body">
          <p>Luego de aceptar Serás redirigido a login para que inicies sesión!.</p>
          <button className="modal-button" onClick={closeModal}>Aceptar</button>
        </div>
      </Modal>
    </div>
  );
};

export default RegistroComponent;
