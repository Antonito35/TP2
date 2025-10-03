import { useState, useEffect } from 'react';
import './App.css';

// Définition du type d'une tâche
type Task = {
  title: string;
  description: string;
  dueDate: string | null;
  status: 'à faire' | 'fait';
};

function App() {
  // --- États ---
  // title, description, dueDate : valeurs saisies dans le formulaire
  // tasks : liste des tâches avec persistance dans localStorage
  // error : message d'erreur à afficher
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [error, setError] = useState('');

  // --- Persistance des tâches dans le navigateur ---
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // --- Ajouter une tâche ---
  // Vérifie la validité du titre et de la date avant d'ajouter
  const handleAddTask = () => {
    if (title.trim().length < 3) {
      setError('Le titre doit contenir au moins 3 caractères.');
      return;
    }

    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(dueDate);
      if (selectedDate < today) {
        setError('La date d’échéance doit être aujourd’hui ou dans le futur.');
        return;
      }
    }

    const newTask: Task = {
      title,
      description,
      dueDate: dueDate || null,
      status: 'à faire',
    };

    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setDueDate('');
    setError('');
  };

  // --- Changer le statut d’une tâche ---
  // Coche/décoche la case et barre le texte si fait
  const toggleTaskStatus = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index
        ? { ...task, status: task.status === 'à faire' ? ('fait' as 'fait') : ('à faire' as 'à faire') }
        : task
    );
    setTasks(updatedTasks);
  };

  // --- Supprimer une tâche ---
  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <>
      <h1>Gestion des tâches</h1>

      {/* --- Formulaire d’ajout de tâche --- */}
      <div className="form">
        <label htmlFor="title">Titre (obligatoire)</label>
        <input
          id="title"
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="description">Description (optionnelle)</label>
        <textarea
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="dueDate">Date d’échéance</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={handleAddTask} disabled={!title.trim()}>
          Ajouter
        </button>

        {error && <p className="error">{error}</p>}
      </div>

      {/* --- Liste des tâches --- */}
      <h2>Liste des tâches</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.status === 'fait' ? 'done' : ''}>
            <input
              type="checkbox"
              checked={task.status === 'fait'}
              onChange={() => toggleTaskStatus(index)}
            />

            <div className="task-content">
              <span className="task-title">{task.title}</span>
              {task.description && <p className="task-desc">{task.description}</p>}
              {task.dueDate && <span className="due-date">Échéance : {task.dueDate}</span>}
            </div>

            <button className="delete" onClick={() => handleDeleteTask(index)}>Supprimer</button>
          </li>
        ))}
      </ul>

      {/* --- Pied de page : résumé des tâches --- */}
      <p>
        {tasks.filter((task) => task.status === 'à faire').length} à faire /{' '}
        {tasks.filter((task) => task.status === 'fait').length} faites
      </p>
    </>
  );
}

export default App;
