import { useEffect, useState } from "react";

function App() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [stats, setStats] = useState(null);
  const [touched, setTouched] = useState(false);

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
  setTouched(true);

  if (!titulo || !descricao) return;

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

  async function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE"
      });

      setTasks(prev => prev.filter(task => task.id !== id));

      const statsRes = await fetch("http://localhost:3000/tasks/stats");
      const statsData = await statsRes.json();
      setStats(statsData);

    } catch (err) {
      alert("Erro ao excluir tarefa");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        AI Task Analyzer
      </h1>

      {/* FORM */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md border border-white/40 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Criar Tarefa
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            className="border border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          {touched && !titulo && (
           <p className="text-red-500 text-xs">Informe um título</p>
            )}

          <textarea
            className="border border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          {touched && !descricao && (
           <p className="text-red-500 text-xs">Informe uma descrição</p>
           )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 
            bg-gradient-to-r from-blue-500 to-purple-500 
            text-white px-4 py-2.5 rounded-xl font-semibold tracking-wide 
            hover:opacity-90 transition-all duration-200 
            active:scale-95 shadow-md hover:shadow-lg 
            disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-[2.5px] border-white border-t-transparent rounded-full animate-spin opacity-80"></div>
                Analisando...
              </>
            ) : (
              "Analisar com IA"
            )}
          </button>
        </form>

        {resultado && (
          <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-100">
            <h3 className="font-semibold text-gray-800 mb-2">
              Resultado da IA
            </h3>
            <p><strong>Categoria:</strong> {resultado.categoria}</p>
            <p><strong>Dificuldade:</strong> {resultado.dificuldade}</p>
            <p><strong>Próximo passo:</strong> {resultado.proximo_passo}</p>
          </div>
        )}
      </div>

      {/* STATS */}
      {stats && (
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-md border border-white/40 mt-6 w-full max-w-md">
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-gray-800">
              {stats.total}
            </p>
            <p className="text-xs text-gray-500">
              Total de tarefas
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700 mb-1">Categorias</p>
              {stats.por_categoria.map((c, i) => (
                <p key={i} className="text-gray-600">
                  {c.categoria}: {c.total}
                </p>
              ))}
            </div>

            <div>
              <p className="font-semibold text-gray-700 mb-1">Dificuldade</p>
              {stats.por_dificuldade.map((d, i) => (
                <p key={i} className="text-gray-600">
                  {d.dificuldade}: {d.total}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LISTA */}
      <div className="w-full max-w-6xl mt-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Lista de Tarefas
        </h2>

        {tasks.length === 0 && (
          <p className="text-gray-500 text-sm">
            Nenhuma tarefa ainda
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white/70 backdrop-blur-md p-5 rounded-2xl 
              shadow-[0_10px_30px_rgba(0,0,0,0.08)] 
              border border-white/40 border-l-4 border-blue-400 hover:border-blue-200
              transition-all duration-300 
              hover:-translate-y-2 hover:scale-[1.02] 
              hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
            >
              <h3 className="font-semibold text-gray-800 text-lg">
                {task.titulo}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {task.descricao}
              </p>

              <div className="flex gap-2 mt-3 flex-wrap">
                <span className="text-xs bg-blue-50 border border-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  {task.categoria}
                </span>

                <span className="text-xs bg-yellow-50 border border-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">
                  {task.dificuldade}
                </span>
              </div>

              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                <span className="font-medium text-gray-700">
                  Próximo passo:
                </span>{" "}
                {task.proximo_passo}
              </p>

              <div className="flex justify-end mt-3">
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 text-xs px-2 py-0.5 border border-red-200 rounded-md hover:bg-red-50 hover:text-red-600 transition"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;