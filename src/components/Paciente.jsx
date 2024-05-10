const Paciente = ({ paciente, setPaciente, eliminarPaciente }) => {

  const { id, nombre, propietario, email, fecha, sintomas } = paciente

  const _handleEdit = () => {
    setPaciente(paciente)
  }

  const _handleDelete = () => {
    confirm('¿Estás seguro de que quieres eliminar este paciente?') ? eliminarPaciente(id) : false
  }

  return (
    <div className="mx-5 my-10 mt-0 bg-white shadow-md rounded-lg px-5 py-10">
      <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: {''}
        <span className="font-normal normal-case">{nombre}</span>
      </p>

      <p className="font-bold mb-3 text-gray-700 uppercase">Propietario: {''}
        <span className="font-normal normal-case">{propietario}</span>
      </p>

      <p className="font-bold mb-3 text-gray-700 uppercase">Email: {''}
        <span className="font-normal normal-case">{email}</span>
      </p>

      <p className="font-bold mb-3 text-gray-700 uppercase">Fecha Alta: {''}
        <span className="font-normal normal-case">{fecha}</span>
      </p>

      <p className="font-bold mb-3 text-gray-700 uppercase">Síntomas: {''}
        <span className="font-normal normal-case">
          {sintomas}
        </span>
      </p>

      <div className="flex justify-between mt-10">
        <button
          className="btn"
          type="button"
          onClick={_handleEdit}>
            Editar
        </button>
        <button
          className="btn btn--alert"
          type="button"
          onClick={_handleDelete}>
            Eliminar
        </button>
      </div>
    </div>
  )
}

export default Paciente
