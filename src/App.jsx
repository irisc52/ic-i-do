import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, Circle, PinIcon } from 'lucide-react';

export default function TodoApp() {
  // STATE MANAGEMENT with localStorage
  // Load todos from localStorage on initial render, or use default todos if none exist
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [
      { id: 1, text: 'Test', completed: false, category: 'personal' },
    ];
  });
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoCategory, setNewTodoCategory] = useState('personal🧘🏻‍♀️');
  const [filter, setFilter] = useState('active'); // 'all', 'active', 'completed', 'pinned (active)'

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const [newToDoDate, setNewToDoDueDate] = useState('');

  // useEffect: Runs side effects after render
  // Saves todos to localStorage whenever the todos array changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // Dependency array: only run when 'todos' changes

  // EVENT HANDLERS
  // Run when user interacts with UI
  
  const addTodo = () => {
    if (newTodoText.trim() === '') return;
    
    // Create new todo object with unique ID
    const newTodo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
      completedDate: null,
      isEditing: false,
      category: newTodoCategory,
      pinned: false,
      ...(newToDoDate && {dueDate: newToDoDate})
    };
    
    setTodos([...todos, newTodo]); // Spread operator: copies all existing todos
    setNewTodoText(''); // Clear input field
    setNewToDoDueDate('');
  };

  const toggleTodo = (id) => {
    // If the todo matches our ID, flip its completed status
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const newCompleted = !todo.completed;
        return {
          ...todo,
          completed: newCompleted,
          completedDate: newCompleted ? new Date().toLocaleDateString() : null
        };
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editToDo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? {...todo, text: newText} : todo
    ));
  }

  const togglePin = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? {...todo, pinned: !todo.pinned} : todo
    ));
  }

  // COMPUTED VALUES
  // Derive data from state (like computed properties)
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  const sortedFilteredTodos = [...filteredTodos].sort((a, b) => {
    if (!a.pinned) return 1;
    if (!b.pinned) return -1;
    return 0;
  })

  const categories = [...new Set(todos.map(todo => todo.category))];
  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  // JSX
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ic 👀 i do ✅</h1>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>{stats.total} total</span>
            <span>{stats.active} active</span>
            <span>{stats.completed} completed</span>
          </div>
        </div>

        {/* Add Todo Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">add new task</h2>
          <div className="flex gap-3">
            {/* INPUT: value links to state, onChange updates state */}
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="here!"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={newToDoDate}
              onChange={(e) => setNewToDoDueDate(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            <select
              value={newTodoCategory}
              onChange={(e) => setNewTodoCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>personal🧘🏻‍♀️</option>
              <option>school📚</option>
              <option>112👩🏻‍🏫</option>
              <option>j*b💻</option>
              <option>other🤷🏻‍♀️</option>
            </select>
            <button
              onClick={addTodo}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              add
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex gap-2">
            {['active', 'all', 'completed'].map(filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === filterType
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
              lock in bruh
            </div>
          ) : (
            // MAP: Iterate over array and return JSX for each item
            // KEY: React needs unique keys to efficiently update lists
            sortedFilteredTodos.map(todo => (
              <div
                key={todo.id}
                className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-4 hover:shadow-xl transition-shadow"
              >
                {/* Toggle completion button */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="flex-shrink-0"
                >
                  {todo.completed ? (
                    <Check className="text-green-600" size={24} />
                  ) : (
                    <Circle className="text-gray-400" size={24} />
                  )}
                </button>

                {/* Todo text with conditional styling */}
                <div className="flex-1">
                  {editingId === todo.id ? (
                    <input
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          editToDo(todo.id, editingText);
                          setEditingId(null);
                        }
                      }}
                      onBlur={() => {
                        editToDo(todo.id, editingText);
                        setEditingId(null);
                      }}
                      className="text-lg border-b-2 border-blue-500 focus:outline-none"
                      autoFocus
                      />
                  ) : (
                    <p
                      className={`text-lg cursor-pointer ${
                        todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                      }`}
                      onClick = {() => {
                        setEditingId(todo.id);
                        setEditingText(todo.text);
                      }}
                    >
                      {todo.text} {todo.dueDate && !todo.completed && 
                                  (<span className = "text-xs text-gray-500">
                                    {new Date(todo.dueDate).toLocaleDateString()}
                                  </span>)} 
                                  {todo.completed && todo.completedDate && 
                                  (<span className = "text-xs text-gray-500">
                                    completed on {todo.completedDate}
                                  </span>
                                  )
                                            }
                    </p>
                  )}
                  <span className="text-sm text-gray-500">{todo.category}</span>
                </div>

                {/* Pin button*/} 
                <button
                  onClick={() => togglePin(todo.id)}
                  className="flex-shrink-0"
                >
                  { todo.pinned ? (
                      <PinIcon className="text-red-500" size={20} fill="currentColor"/> 
                    ) : (
                      <PinIcon className="text-black hover:text-red-500 transition-colors" size={20}/>)
                  }
                </button>


                {/* Delete button */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="flex-shrink-0 text-black hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Category Summary */}
        {categories.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">by category (active)</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => {
                const count = todos.filter(t => t.category === category && !t.completed).length;
                return (
                  <div key={category} className="px-4 py-2 bg-gray-100 rounded-lg">
                    <span className="font-medium text-gray-700">{category}</span>
                    <span className="ml-2 text-gray-500">({count})</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}