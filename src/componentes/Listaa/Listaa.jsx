import './Listaa.css';
import { FaTrashAlt, FaCalendarAlt } from 'react-icons/fa';

export const Lista = ({ tareas, toggleCompletada, eliminarTarea }) => {
  const tareasOrdenadas = [...tareas].sort((a, b) => {
    if (!a.fecha) return 1;
    if (!b.fecha) return -1;
    const diffA = new Date(a.fecha) - new Date();
    const diffB = new Date(b.fecha) - new Date();
    return diffA - diffB;
  });

  return (
    <div className="lista-container">
      <h2 className="lista-titulo">Lista a futuro</h2>
      <div className="task-list">
        {tareasOrdenadas.length === 0 ? (
          <p className="empty-list-message">
            Ingresa la primer tarea
          </p>
        ) : (
          tareasOrdenadas.map(tarea => (
            <div key={tarea.id} className="task-item">
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={tarea.completada}
                  onChange={() => toggleCompletada(tarea.id, tarea.completada)}
                  className="task-checkbox"
                />
                <span className={`task-text ${tarea.completada ? 'completed' : ''}`}>
                  {tarea.texto}
                </span>
              </div>
              <div className="task-actions">
                {tarea.fecha && (
                  <div className="task-date">
                    <FaCalendarAlt className="date-icon" />
                    <span>{tarea.fecha}</span>
                  </div>
                )}
                <button
                  className="delete-button"
                  onClick={() => eliminarTarea(tarea.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
