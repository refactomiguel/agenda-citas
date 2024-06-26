import { useState, useEffect } from 'react'
import Error from './Error'

const Formulario = ({ paciente, pacientes, setPaciente, setPacientes }) => {

  // State
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error, setError] = useState(false)

  // Escucha componente listo
  useEffect(() => {
    console.log('[Formulario] El componente está listo')
  }, [])

  // Solo ejecuta el código cuando la dependencia (paciente) cambie,
  // en lugar de cada vez que se renderiza el componente
  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])


  const generarId = () => {
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
  }

  /**
   * Handle Form Submit
   * @param {*} e
   */
  const _handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true)
      return;
    }

    const tmpPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if (paciente.id) {
      // Editando paciente
      tmpPaciente.id = paciente.id
      const tmpPacientes = pacientes.map(item => item.id === paciente.id ? tmpPaciente : item)
      setPacientes(tmpPacientes)
      setPaciente({})

    } else {
      // Nuevo registro
      tmpPaciente.id = generarId()
      setPacientes([...pacientes, tmpPaciente])
    }


    // Reiniciar el form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setError(false)
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">
        Seguimiento pacientes
      </h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y {''}
        <span className="text-indigo-600 font-bold">Adminístralos</span>
      </p>

      <form className="bg-white shadow-md rounded-lg py-10 px-5 mb-10" onSubmit={_handleSubmit}>

        {error && <Error mensaje="Todos los campos son obligatorios" />}

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">
            Nombre Mascota
          </label>
          <input
            id="mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre de la mascota"
            type="text"
            onInput={() => setError(false)}
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">
            Nombre Propietario
          </label>
          <input
            id="propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del propietario"
            type="text"
            onInput={() => setError(false)}
            onChange={(e) => setPropietario(e.target.value)}
            value={propietario}
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Email contacto propietario"
            type="email"
            onInput={() => setError(false)}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">
            Alta
          </label>
          <input
            id="alta"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            type="date"
            onInput={() => setError(false)}
            onChange={(e) => setFecha(e.target.value)}
            value={fecha}
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">
            Síntomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los síntomas"
            type="email"
            onInput={() => setError(false)}
            onChange={(e) => setSintomas(e.target.value)}
            value={sintomas}
          />
        </div>

        <input
          className="btn w-full"
          type="submit"
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />

      </form>
    </div>
  )
}

export default Formulario
