import { useState } from "react";

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const TaskManager: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [newTask, setNewTask] = useState({ title: "", description: "" });

    const addTask = () => {
        if (!newTask.title.trim()) return;
        setTasks([...tasks, { id: Date.now(), title: newTask.title, description: newTask.description, completed: false }]);
        setNewTask({ title: "", description: "" });
    };

    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const filteredTasks = tasks.filter(task =>
        (filter === "all" || (filter === "completed" && task.completed) || (filter === "pending" && !task.completed)) &&
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
                <div className="mb-4 flex gap-2">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="border p-2 flex-1 rounded-md"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="border p-2 rounded-md"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div className="mb-4 flex gap-2">
                    <input
                        type="text"
                        placeholder="Task Title"
                        className="border p-2 flex-1 rounded-md"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Task Description"
                        className="border p-2 flex-1 rounded-md"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <button onClick={addTask} className="bg-indigo-600 text-white px-4 py-2 rounded-md">Add</button>
                </div>
                <ul className="space-y-2">
                    {filteredTasks.map(task => (
                        <li key={task.id} className="border p-3 rounded-md flex justify-between items-center">
                            <div>
                                <p className={`text-lg font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</p>
                                <p className="text-sm text-gray-600">{task.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => toggleTaskCompletion(task.id)} className="bg-green-500 text-white px-3 py-1 rounded-md">
                                    {task.completed ? "Undo" : "Complete"}
                                </button>
                                <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskManager;
