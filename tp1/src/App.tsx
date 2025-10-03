import { useState } from 'react';

function App() {
  const nom = "Antoine";
  const date = new Date().toLocaleTimeString();
  const fruits = ["Pomme", "Banane", "Orange"];
  const [compteur, setCompteur] = useState(0);
  const [texte, setTexte] = useState(""); // État pour le champ texte
  const [taches, setTaches] = useState<string[]>([]); // État pour la liste de tâches
  const [nouvelleTache, setNouvelleTache] = useState(""); // État pour la nouvelle tâche
  const [connecte, setConnecte] = useState(false); // État pour la connexion

  const incrementer = () => {
    setCompteur(compteur + 1);
  };

  const decrementer = () => {
    setCompteur(compteur > 0 ? compteur - 1 : 0);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTexte(event.target.value); // Met à jour l'état avec la valeur saisie
  };

  const resetTexte = () => {
    setTexte(""); // Réinitialise le champ texte
  };

  const ajouterTache = () => {
    if (nouvelleTache.trim() !== "") {
      setTaches([...taches, nouvelleTache]); // Ajoute la nouvelle tâche à la liste
      setNouvelleTache(""); // Réinitialise le champ de saisie
    }
  };

  const supprimerTache = (index: number) => {
    const nouvellesTaches = taches.filter((_, i) => i !== index); // Supprime la tâche à l'index donné
    setTaches(nouvellesTaches);
  };

  const toggleConnexion = () => {
    setConnecte(!connecte); // Change l'état de connexion
  };

  return (
    <div>
      <h1>Bonjour {nom} 👋</h1>
      <h2>Il est {date}</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
      <h3>Compteur : {compteur}</h3>
      <button onClick={incrementer} style={{ marginRight: '10px' }}>Incrémenter</button>
      <button onClick={decrementer} disabled={compteur === 0}>Décrémenter</button>
      <hr />
      <h2>Formulaire Dynamique</h2>
      <input
        type="text"
        value={texte}
        onChange={handleChange}
        placeholder="Saisissez du texte"
        style={{ marginRight: '10px' }}
      />
      <button onClick={resetTexte}>Réinitialiser</button>
      <h3>Texte saisi : {texte}</h3>
      <hr />
      <h2>Liste de tâches (To-Do List)</h2>
      <input
        type="text"
        value={nouvelleTache}
        onChange={(e) => setNouvelleTache(e.target.value)}
        placeholder="Ajouter une tâche"
        style={{ marginRight: '10px' }}
      />
      <button onClick={ajouterTache}>Ajouter</button>
      <ul>
        {taches.map((tache, index) => (
          <li key={index}>
            {tache}
            <button
              onClick={() => supprimerTache(index)}
              style={{ marginLeft: '10px' }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <h2>Affichage Conditionnel</h2>
      <p style={{ color: connecte ? "green" : "red" }}>
        {connecte ? "Vous êtes connecté" : "Vous êtes déconnecté"}
      </p>
      <button onClick={toggleConnexion}>
        {connecte ? "Se déconnecter" : "Se connecter"}
      </button>
    </div>
  );
}

export default App;