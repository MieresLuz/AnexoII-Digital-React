import React, { useState, useEffect } from 'react';
import '../styles/anexoIIComponent.css';
import axios from 'axios';
import jsPDF from 'jspdf';
import emailjs from 'emailjs-com';


const AnexoIIComponent = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        correo: '',
        departamento: '',
        instituto: '',
        carrera: '',
        anioCursada: '',
        numeroTramite: '',
        materias: [],
        aceptaTerminos: false
    });

    const [materias, setMaterias] = useState([]);
    const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);
    const [modales, setModales] = useState({
        advertencia: false,
        confirmacion: false,
        exito: false
    });

    const [numeroTramite, setNumeroTramite] = useState(null);

    const [departamentos, setDepartamentos] = useState([]);
    const [institutos, setInstitutos] = useState([]);
    const [carreras, setCarreras] = useState([]);

    const datos = [
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
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:8080/api/auth/current', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const usuario = response.data;

                    const dep = datos.find(d => d.departamento === usuario.departamento);
                    const inst = dep?.institutos.find(i => i.nombre === usuario.instituto);
                    const car = inst?.carreras.find(c => c.nombre === usuario.carrera);

                    setFormData({
                        nombre: usuario.nombre,
                        apellido: usuario.apellido,
                        dni: usuario.dni,
                        correo: usuario.email,
                        departamento: usuario.departamento || '',
                        instituto: usuario.instituto || '',
                        carrera: usuario.carrera || '',
                        anioCursada: '',
                        aceptaTerminos: false
                    });

                    setDepartamentos(datos);
                    setInstitutos(dep?.institutos || []);
                    setCarreras(inst?.carreras || []);
                }
            } catch (err) {
                console.error("Error al obtener datos del usuario", err);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (formData.anioCursada) {
            const dep = datos.find(d => d.departamento === formData.departamento);
            const inst = dep?.institutos.find(i => i.nombre === formData.instituto);

            // Si se selecciona "todos", mostramos todas las materias sin filtrar por año
            const materiasFiltradas = formData.anioCursada === 'todos'
                ? inst?.materias.filter(m => m.carrera === formData.carrera) || []
                : inst?.materias.filter(
                    m => m.carrera === formData.carrera && m.anio === parseInt(formData.anioCursada)
                ) || [];

            console.log(materiasFiltradas);  // Añadir console.log para verificar las materias filtradas

            setMaterias(materiasFiltradas);
        } else {
            setMaterias([]);  // Limpiar las materias si no hay selección de año
        }
    }, [formData.anioCursada, formData.departamento, formData.instituto, formData.carrera]);



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    const toggleMateria = (codigo) => {
        setMateriasSeleccionadas(prev =>
            prev.includes(codigo)
                ? prev.filter(c => c !== codigo)
                : [...prev, codigo]
        );
    };

    const mostrarConfirmacion = () => {
        const numero = Math.floor(Math.random() * 1000000);
        setNumeroTramite(numero);
        setModales({ advertencia: false, confirmacion: true, exito: false });
    };

    const confirmarInscripcion = () => {
        setModales({ advertencia: false, confirmacion: false, exito: true });

        // Guardamos en ventana global para PDF/correo
        const materiasInfo = materias.filter(m => materiasSeleccionadas.includes(m.codigo));
        window.__tramiteActual = {
            numeroTramite,
            usuario: formData,
            materias: materiasInfo
        };
    };

    const generarPDF = () => {
        const tramite = window.__tramiteActual;
        if (!tramite) return alert("No hay datos para exportar.");

        const doc = new jsPDF();
        doc.setFontSize(12);
        const maxWidth = 170; // Ajusta según márgenes

        doc.text("Constancia de Inscripción - Anexo II", 20, 20);
        doc.text(`Número de Trámite: ${tramite.numeroTramite}`, 20, 30);
        doc.text(`Nombre: ${tramite.usuario.nombre} ${tramite.usuario.apellido}`, 20, 40);
        doc.text(`DNI: ${tramite.usuario.dni}`, 20, 50);
        doc.text(`Correo: ${tramite.usuario.correo}`, 20, 60);

        let y = 80;

        tramite.materias.forEach((m, index) => {
            const bloque = [
                `Materia ${index + 1}:`,
                `- Nombre: ${m.nombre}`,
                `- Código: ${m.codigo}`,
                `- Régimen: ${m.regimen || 'No especificado'}`,
                `- Año: ${m.anio}`,
                `- Correlativas: ${m.correlativas || 'No especificado'}`,
                `- Carrera: ${m.carrera}`,
                `- Formato: ${m.formato}`,
            ];

            // Calcular el alto total del bloque (aproximado)
            const lineHeight = 10;
            const lineCount = bloque.reduce((acc, text) => {
                const lines = doc.splitTextToSize(text, maxWidth).length;
                return acc + lines;
            }, 0);

            if (y + lineCount * lineHeight > 280) {
                doc.addPage();
                y = 20;
            }

            bloque.forEach(text => {
                const lines = doc.splitTextToSize(text, maxWidth);
                doc.text(lines, 25, y);
                y += lines.length * lineHeight;
            });

            y += 5; // Espacio entre materias
        });

        doc.save(`inscripcion_${tramite.numeroTramite}.pdf`);
    };


    const handleEnviarCorreo = () => {
        const tramite = window.__tramiteActual;
        if (!tramite) {
            alert("No hay datos para enviar.");
            return;
        }

        const materiasTexto = tramite.materias.map((m, index) => (
            `Materia ${index + 1}:\n` +
            `Nombre: ${m.nombre}\n` +
            `Código: ${m.codigo || 'No especificado'}\n` +
            `Régimen: ${m.regimen || 'No especificado'}\n` +
            `Año Académico: ${m.anio || 'No especificado'}\n` +
            `Correlativas: ${m.correlativas || 'No especificado'}\n` +
            `Carrera: ${m.carrera || 'No especificado'}\n` +
            `Instituto: ${tramite.usuario.instituto || 'No especificado'}\n` +
            `Formato: ${m.formato || 'No especificado'}\n`
        )).join('\n');

        const templateParams = {
            nombre_completo: `${tramite.usuario.nombre} ${tramite.usuario.apellido}`,
            dni: tramite.usuario.dni,
            reply_to: tramite.usuario.correo,
            numero_tramite: tramite.numeroTramite,
            materias: tramite.materias.map((m) => ({
                nombre: m.nombre || 'No especificado',
                codigo: m.codigo || 'No especificado',
                regimen: m.regimen || 'No especificado',
                anio: m.anio || 'No especificado',
                correlativas: m.correlativas || 'No especificado',
                carrera: m.carrera || 'No especificado',
                instituto: tramite.usuario.instituto || 'No especificado',
                formato: m.formato || 'No especificado',
            })),
            to_email: "biblotecajjurquiza@gmail.com"
        };

        emailjs.send(
            'service_dvb0rt1',
            'template_4e5qsqi',
            templateParams,
            'IoyCjlSjxKeXnsASQ'
        )
            .then((response) => {
                console.log("✅ Correo enviado exitosamente", response);
                setModales({ ...modales, confirmacion: false, exito: true }); // Mostrar modal de éxito
            })
            .catch((error) => {
                console.error("❌ Error al enviar correo", error);
                alert("Hubo un error al enviar el correo. Inténtalo de nuevo.");
            });
    };




    return (
        <div className="anexo-fieldset">
            <h2>Formulario de Inscripción</h2>
            <form className="anexoII-form">
                <div className="anexo-legend">
                    <label className='anexo-label'>Nombre</label>
                    <input className='anexo-input' type="text" name="nombre" value={formData.nombre} onChange={handleChange} disabled />
                </div>
                <div className="anexo-legend">
                    <label className='anexo-label'>Apellido</label>
                    <input className='anexo-input' type="text" name="apellido" value={formData.apellido} onChange={handleChange} disabled />
                </div>
                <div className="anexo-legend">
                    <label className='anexo-label'>DNI</label>
                    <input className='anexo-input' type="text" name="dni" value={formData.dni} onChange={handleChange} disabled />
                </div>
                <div className="anexo-legend">
                    <label className='anexo-label'>Correo</label>
                    <input className='anexo-input' type="email" name="correo" value={formData.correo} onChange={handleChange} disabled />
                </div>

                {/* Selectores de Departamento, Instituto, Carrera */}
                <div className="anexo-legend">
                    <label className='anexo-label'>Departamento</label>
                    <select name="departamento" value={formData.departamento} onChange={handleChange} disabled>
                        <option value="">Seleccione un Departamento</option>
                        {departamentos.map((dep, idx) => (
                            <option key={idx} value={dep.departamento}>{dep.departamento}</option>
                        ))}
                    </select>
                </div>

                <div className="anexo-legend">
                    <label className='anexo-label'>Instituto</label>
                    <select name="instituto" value={formData.instituto} onChange={handleChange} disabled>
                        <option value="">Seleccione un Instituto</option>
                        {institutos.map((inst, idx) => (
                            <option key={idx} value={inst.nombre}>{inst.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="anexo-legend">
                    <label className='anexo-label'>Carrera</label>
                    <select name="carrera" value={formData.carrera} onChange={handleChange} disabled>
                        <option value="">Seleccione una Carrera</option>
                        {carreras.map((car, idx) => (
                            <option key={idx} value={car.nombre}>{car.nombre}</option>
                        ))}
                    </select>
                </div>

                {/* Selección de Año */}
                <div className="anexo-legend">
                    <label className='anexo-label'>Año de Cursada</label>
                    <select name="anioCursada" value={formData.anioCursada} onChange={handleChange}>
                        <option value="">Seleccione un Año</option>
                        <option value="todos">Todos los años</option> {/* Opción para mostrar todas las materias */}
                        {[1, 2, 3, 4].map((anio) => (
                            <option key={anio} value={anio}>{anio}</option>
                        ))}
                    </select>
                </div>

                {/* Mostrar tabla de materias cuando se filtren */}
                <div id="materiasContainer">
                    <h3>Materias disponibles</h3>
                    <table border="1" id="tablaMaterias">
                        <thead>
                            <tr>
                                <th>Inscribir</th>
                                <th>Código</th>
                                <th>Nombre de la Materia</th>
                                <th>Correlativas</th>
                                <th>Año de Cursada</th>
                                <th>Carrera</th>
                                <th>Instituto</th>
                                <th>Formato</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materias.map(materia => (
                                <tr key={materia.codigo}>
                                    <td><input type="checkbox" value={materia.codigo} onChange={() => toggleMateria(materia.codigo)} /></td>
                                    <td>{materia.codigo}</td>
                                    <td>{materia.nombre}</td>
                                    <td>{materia.correlativas === "Ninguna" ? "Ninguna" : materia.correlativas}</td>
                                    {/* Modificación aquí: Si se seleccionó "todos", mostramos el año de cada materia */}
                                    <td>{formData.anioCursada === 'todos' ? `${materia.anio}º` : `${formData.anioCursada}º`}</td>
                                    <td>{formData.carrera}</td>
                                    <td>{formData.instituto}</td>
                                    <td>{materia.formato}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Términos y Condiciones */}
                <div className="anexo-legend">
                    <label className='anexo-label'>
                        <input type="checkbox" name="aceptaTerminos" checked={formData.aceptaTerminos} onChange={handleChange} />
                        Acepto los términos y condiciones
                    </label>
                </div>

                {/* Botón para mostrar confirmación */}
                <div className="form-actions">
                    <button className='anexo-button'
                        type="button"
                        disabled={!formData.aceptaTerminos || materiasSeleccionadas.length === 0}
                        onClick={mostrarConfirmacion}
                    >
                        Confirmar Inscripción
                    </button>
                </div>
            </form>

            {/* Modal de Advertencia */}
            {modales.advertencia && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Advertencia</h3>
                        <p>Por favor, selecciona al menos una materia y acepta los términos y condiciones para continuar.</p>
                        <button className='anexo-button' onClick={() => setModales({ ...modales, advertencia: false })}>Cerrar</button>
                    </div>
                </div>
            )}

            {/* Modal de Confirmación */}
            {modales.confirmacion && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirmación</h3>
                        <p>¿Estás seguro de que deseas confirmar tu inscripción?</p>
                        <button className='anexo-button' onClick={confirmarInscripcion}>Sí, Confirmar</button>
                        <button className='anexo-button' onClick={() => setModales({ ...modales, confirmacion: false })}>Cancelar</button>
                    </div>
                </div>
            )}

            {modales.exito && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Correo Enviado Exitosamente</h3>
                        <p>Tu inscripción ha sido procesada correctamente.</p>
                        <p>El número de trámite es: {numeroTramite}</p>
                        <button className='anexo-button' onClick={generarPDF}>Generar PDF</button>
                        <button className='anexo-button' onClick={handleEnviarCorreo}>Enviar Correo</button>
                        <button className='anexo-button' onClick={() => setModales({ ...modales, exito: false })}>Cerrar</button>
                    </div>
                </div>
            )}

        </div>
    );
}
export default AnexoIIComponent;
