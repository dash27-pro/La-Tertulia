import { useState } from "react";

const initialScore = { team1: 0, team2: 0 };
const pointLabels = ["0", "15", "30", "40", "ADV", "GAME"];

export default function App() {
  const [score, setScore] = useState({ team1: 0, team2: 0 });
  const [history, setHistory] = useState([]);
  const [players, setPlayers] = useState({
    team1: ["Jugador A", "Jugador B"],
    team2: ["Jugador C", "Jugador D"],
  });

  function handlePoint(team) {
    const newScore = { ...score };
    newScore[team] += 1;
    if (newScore[team] > 5) {
      finishGame(team);
      return;
    }
    setScore(newScore);
  }

  function finishGame(winningTeam) {
    const match = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      players,
      winner: winningTeam,
    };
    setHistory([match, ...history]);
    setScore(initialScore);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <h1 className="text-3xl font-bold text-center mb-4">La Tertulia</h1>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">{players.team1[0]} & {players.team1[1]}</h2>
          <p className="text-4xl">{pointLabels[score.team1]}</p>
          <button onClick={() => handlePoint("team1")} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">+ Punto</button>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">{players.team2[0]} & {players.team2[1]}</h2>
          <p className="text-4xl">{pointLabels[score.team2]}</p>
          <button onClick={() => handlePoint("team2")} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">+ Punto</button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Historial de Partidos</h2>
        <ul className="space-y-2">
          {history.map((match) => (
            <li key={match.id} className="bg-white p-3 rounded-xl shadow text-sm">
              <p><strong>{match.date}</strong></p>
              <p>{match.players.team1[0]} & {match.players.team1[1]} vs {match.players.team2[0]} & {match.players.team2[1]}</p>
              <p className="text-green-600">Ganador: {match.winner === "team1" ? `${match.players.team1[0]} & ${match.players.team1[1]}` : `${match.players.team2[0]} & ${match.players.team2[1]}`}</p>
            </li>
          ))}
        </ul>
      </div>

      <footer className="mt-10 text-center text-sm text-gray-500">
        <p>Desarrollado por <strong>R.Silverio</strong></p>
      </footer>
    </div>
  );
}
