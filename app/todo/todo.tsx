import { useState } from "react"

export function ToDo() {
    const [todos, setTodos] = useState([
        "Make bed",
        "Take bath",
        "Have breakfast",
        "Go to school"
    ])
    const [newTodo, setNewToDo] = useState('')

    const addToDo = () => {
        const trimmedTodo = newTodo.trim();

        if (trimmedTodo === "") {
            alert("Please enter a todo item");
            return;
        }

        if (todos.some(todo => todo.toLowerCase() === trimmedTodo.toLowerCase())) {
            alert("This todo already exists!");
            return;
        }

        setTodos([...todos, trimmedTodo]);
        setNewToDo('');
    }

    const removeToDo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index))
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                        <div className="flex items-center gap-3">
                            <div className="text-4xl">✅</div>
                            <h1 className="text-3xl font-bold text-white tracking-tight">
                                To Do List
                            </h1>
                        </div>
                        <p className="text-purple-100 mt-2 text-sm">
                            Stay organized and productive
                        </p>
                    </div>

                    {/* Add Todo Section */}
                    <div className="px-8 pt-6 pb-4 bg-gray-50 border-b border-gray-200">
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <input 
                                    type="text" 
                                    value={newTodo} 
                                    onChange={(e) => setNewToDo(e.target.value)} 
                                    placeholder="Add a new todo..." 
                                    onKeyPress={(e) => e.key === 'Enter' && addToDo()}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 bg-white"
                                />
                                {newTodo && (
                                    <button
                                        onClick={() => setNewToDo('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                            <button 
                                onClick={addToDo}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                            >
                                + Add
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Press Enter to add quickly
                        </p>
                    </div>

                    {/* Todo List */}
                    <div className="px-8 py-6">
                        {todos.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🎉</div>
                                <p className="text-gray-500 text-lg">No todos left!</p>
                                <p className="text-gray-400 text-sm">Add some tasks to get started</p>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {todos.map((todo, index) => (
                                    <li 
                                        key={index} 
                                        className="group flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-purple-200 animate-slideIn"
                                        style={{
                                            animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
                                        }}
                                    >
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                                            <span className="text-gray-800 font-medium">{todo}</span>
                                        </div>
                                        <button 
                                            onClick={() => removeToDo(index)} 
                                            className="opacity-0 group-hover:opacity-100 transition-all duration-200 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-md text-sm font-medium hover:scale-105 transition-transform"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Stats Footer */}
                    {todos.length > 0 && (
                        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">
                                    📝 {todos.length} {todos.length === 1 ? 'task' : 'tasks'} total
                                </span>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete all tasks?')) {
                                            setTodos([]);
                                        }
                                    }}
                                    className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Inspirational Quote */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        ✨ Stay focused, one task at a time ✨
                    </p>
                </div>
            </div>

            {/* Add custom animation keyframes */}
            <style>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </main>
    )
}