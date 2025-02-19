import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import {
    fetchTasks,
    addTask,
    editTask,
    deleteTask,
    toggleTask,
    paginateTasks,
    filterTask,
    searchTask,
} from "../Redux/Tasks/action";
import { Task } from "../Redux/Tasks/taskTypes";

const TaskManager: React.FC = () => {
    // Some state and variable declarations 
    const dispatch = useDispatch<AppDispatch>();
    const { tasks, loading, error, totalPages, totalItems } = useSelector((state: RootState) => state.tasks);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<Boolean>(false);
    const [filterSelectore, setFilterSelectore] = useState<string>('All');
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // handle functions for handling different different events 
    const handleAddTask = () => {
        if (!newTask.title.trim()) return;
        dispatch(addTask(newTask));
        setNewTask({ title: "", description: "" });
    };

    const handleUpdateTask = () => {
        if (!editingTask) return;
        dispatch(editTask(editingTask));
        setEditingTask(null);
    };

    const handleDeleteTask = (id: number) => {
        dispatch(deleteTask(id));
        dispatch(fetchTasks())
    };

    const handleToggleTask = (id: number) => {
        dispatch(toggleTask(id));
    };


    const handleFilter = (value: string) => {
        console.log(value, `value of filter`)
        setFilterSelectore(value)
        let filteredVal: boolean = value == 'completed' ? true : false;
        setFilter(true);
        dispatch(filterTask(filteredVal))
    }
    function debounce(func: (...args: any[]) => void, delay: number) {
        let timer: ReturnType<typeof setTimeout> | null = null;

        return function (...args: any[]) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    }

    // Debounced function wrapped with useCallback to prevent re-creation
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            dispatch(searchTask(query));
        }, 900),
        []
    );

    useEffect(() => {
        if (search.length > 0) {
            debouncedSearch(search);
        }
    }, [search, debouncedSearch]);

    useEffect(() => {
        dispatch(paginateTasks(currentPage))
    }, [currentPage]);

    useEffect(() => {
        if (filter || search.length > 0) return
        dispatch(fetchTasks());
    }, [tasks.length, totalItems]);

    return (
        <div className=" max-h-full overflow-scroll overflow-x-hidden overflow-y-scroll">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
                <div className="sticky top-0 bg-white pb-1.5">
                    <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
                    {loading && <p>Loading tasks...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    <div className="mb-4 flex gap-2">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="border p-2 flex-1 rounded-md"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                        />
                        <select
                            className="border p-2 rounded-md"
                            value={filterSelectore}
                            onChange={(e) => handleFilter(e.target.value)}
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
                        <button onClick={handleAddTask} className="bg-indigo-600 text-white px-4 py-2 rounded-md">Add</button>
                    </div>
                    {editingTask && (
                        <div className="mb-4 flex gap-2">
                            <input
                                type="text"
                                className="border p-2 flex-1 rounded-md"
                                value={editingTask.title}
                                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                            />
                            <input
                                type="text"
                                className="border p-2 flex-1 rounded-md"
                                value={editingTask.description}
                                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                            />
                            <button onClick={handleUpdateTask} className="bg-blue-600 text-white px-4 py-2 rounded-md">Update</button>
                        </div>
                    )}
                </div>
                <ul className="space-y-2 ">
                    {loading ? (<p className="font-extrabold text-2xl text-center">loading task item</p>) : (tasks.length > 0 && tasks.map((task, ind) => (
                        <li key={ind} className="border p-3 rounded-md flex justify-between items-center">
                            <div>
                                <p className={`text-lg font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</p>
                                <p className="text-sm text-gray-600">{task.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setEditingTask(task)} className="bg-yellow-500 text-white px-3 py-1 rounded-md">Edit</button>
                                <button onClick={() => handleToggleTask(task._id)} className="bg-green-500 text-white px-3 py-1 rounded-md">
                                    {task.completed ? "Pending" : "Complete"}
                                </button>
                                <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
                            </div>
                        </li>
                    )))}
                </ul>
                <div className="mt-4 flex justify-center gap-2">
                    <button onClick={() => setCurrentPage((prev) => prev - 1)} className="px-3 py-1 bg-gray-300 rounded-md" disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span className="px-3 py-1 bg-gray-200 rounded-md">Page {currentPage}
                        of {totalPages == 0 ? 1 : totalPages}
                    </span>
                    <button onClick={() => setCurrentPage((prev) => prev + 1)} className="px-3 py-1 bg-gray-300 rounded-md" disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskManager;