import { useEffect, useState } from "react";

function App() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [stats, setStats] = useState(null);

  async function loadTasks() {
    const res = await fetch("http://localhost:3000/tasks");
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
  loadTasks();

  fetch("http://localhost:3000/tasks/stats")
    .then(res => res.json())
    .then(setStats);

}, []);

  async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  setResultado(null);

  try {
    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ titulo, descricao })
    });

    if (!res.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await res.json();

    setResultado(data);

    
    setTasks(prev => [data, ...prev]);

    const statsRes = await fetch("http://localhost:3000/tasks/stats");
const statsData = await statsRes.json();
setStats(statsData);

    setTitulo("");
    setDescricao("");

  } catch (err) {
    alert("Erro ao criar tarefa");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">AI Task Analyzer</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Criar Tarefa</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <textarea
            className="border p-2 rounded"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            type="submit"
            disabled={loading}
          >
            {loading ? "Analisando..." : "Analisar com IA"}
          </button>
        </form>

        {loading && (
          <p className="mt-3 text-gray-500">Processando tarefa com IA...</p>
        )}

        {resultado && (
          <div className="mt-4 p-3 border rounded bg-green-50">
            <h3 className="font-semibold">Resultado da IA</h3>
            <p><strong>Categoria:</strong> {resultado.categoria}</p>
            <p><strong>Dificuldade:</strong> {resultado.dificuldade}</p>
            <p><strong>Próximo passo:</strong> {resultado.proximo_passo}</p>
          </div>
        )}
      </div>

      {stats && (
  <div className="bg-white p-4 rounded-xl shadow mt-6 w-full max-w-md">
    <h2 className="text-lg font-bold mb-2">Estatísticas</h2>
    <p><strong>Total:</strong> {stats.total}</p>

    <div className="mt-2">
      <p className="font-semibold">Categorias:</p>
      {stats.por_categoria.map((c, i) => (
        <p key={i}>{c.categoria}: {c.total}</p>
      ))}
    </div>

    <div className="mt-2">
      <p className="font-semibold">Dificuldade:</p>
      {stats.por_dificuldade.map((d, i) => (
        <p key={i}>{d.dificuldade}: {d.total}</p>
      ))}
    </div>
  </div>
)}

      {/* LISTA */}
      <div className="w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-3">Lista de Tarefas</h2>

        {tasks.length === 0 && (
  <p className="text-gray-500 text-center">Nenhuma tarefa ainda</p>
)}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white p-4 rounded-xl shadow mb-3"
          >
            <h3 className="font-bold">{task.titulo}</h3>
            <p className="text-sm text-gray-600">{task.descricao}</p>
            <p><strong>Categoria:</strong> {task.categoria}</p>
            <p><strong>Dificuldade:</strong> {task.dificuldade}</p>
            <p><strong>Próximo passo:</strong> {task.proximo_passo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;