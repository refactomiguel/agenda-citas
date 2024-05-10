import { useEffect } from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import ListadoPacientes from './components/ListadoPacientes'
import { useState } from 'react'

function App() {

  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  // Agregamos datos de ejemplo para debug
  useEffect(() => {
    const getLocalStorage = () => {
      const lsPacientes = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(lsPacientes.length ? lsPacientes : getExampleData())
    }
    getLocalStorage()

  }, [])

  const getExampleData = () => {
    return [
      {
        id: 'p1',
        nombre: 'Pipo',
        propietario: 'Miguel',
        email: 'minchetas@hotmail.com',
        fecha: '2022-10-26',
        sintomas: 'No come'
      },
      {
        id: 'p2',
        nombre: 'Hook',
        propietario: 'Pablo',
        email: 'cuci@hotmail.com',
        fecha: '2022-10-26',
        sintomas: 'No duerme'
      },
    ]
  }

  // Almacenar pacientes en Local
  // storage cuando cambie
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])


  const eliminarPaciente = (id) => {
    console.log('Eliminar paciente', id)
    const tmpPacientes = pacientes.filter(item => item.id !== id)
    setPacientes(tmpPacientes)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header>
        Seguimiento Pacientes
        <span className="text-indigo-600"> Veterinaria</span>
      </Header>
      <div className="mt-12 md:flex">
        <Formulario paciente={paciente} pacientes={pacientes} setPaciente={setPaciente} setPacientes={setPacientes} />
        <ListadoPacientes pacientes={pacientes} setPaciente={setPaciente} eliminarPaciente={eliminarPaciente} />
      </div>
    </div>
  )
}

export default App
