import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, Circle } from 'lucide-react';

export default function TodoApp() {
  // STATE MANAGEMENT with localStorage
  // Load todos from localStorage on initial render, or use default todos if none exist
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [
      { id: 1, text: 'Learn React basics', completed: false, category: 'Learning' },
      { id: 2, text: 'Build todo app', completed: false, category: 'Project' },
    ];
  });
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoCategory, setNewTodoCategory] = useState('Personal');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // useEffect: Runs side effects after render
  // This saves todos to localStorage whenever the todos array changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // Dependency array: only run when 'todos' changes

  // EVENT HANDLERS
  // These are like callback functions - they run when user interacts with UI
  
  const addTodo = () => {
    if (newTodoText.trim() === '') return;
    
    // Create new todo object with unique ID
    const newTodo = {
      id: Date.now(), // Simple way to generate unique IDs
      text: newTodoText,
      completed: false,
      isEditing: false,
      category: newTodoCategory
    };
    
    // IMPORTANT: In React, you never mutate state directly
    // Instead, create a new array with the new item
    setTodos([...todos, newTodo]); // Spread operator: copies all existing todos
    setNewTodoText(''); // Clear input field
  };

  const toggleTodo = (id) => {
    // Map creates a new array by transforming each element
    // If the todo matches our ID, flip its completed status
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    // Filter creates a new array with only items that pass the test
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editToDo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? {...todo, text: newText} : todo
    ));
  }

  // COMPUTED VALUES
  // Derive data from state (like computed properties)
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  const categories = [...new Set(todos.map(todo => todo.category))];
  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  // JSX - Looks like HTML but it's JavaScript
  // Curly braces {} let you embed JavaScript expressions
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">To Do</h1>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>{stats.total} total</span>
            <span>{stats.active} active</span>
            <span>{stats.completed} completed</span>
          </div>
        </div>

        {/* Add Todo Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Task</h2>
          <div className="flex gap-3">
            {/* INPUT: value links to state, onChange updates state */}
            <input
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newTodoCategory}
              onChange={(e) => setNewTodoCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Personal</option>
              <option>School</option>
              <option>TA</option>
              <option>Recruiting</option>
              <option>Other</option>
            </select>
            <button
              onClick={addTodo}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex gap-2">
            {['all', 'active', 'completed'].map(filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
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
              No tasks to show. Add one above!
            </div>
          ) : (
            // MAP: Iterate over array and return JSX for each item
            // KEY: React needs unique keys to efficiently update lists
            filteredTodos.map(todo => (
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
                      {todo.text}
                    </p>
                  )}
                  <span className="text-sm text-gray-500">{todo.category}</span>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors"
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
            <h3 className="text-lg font-semibold text-gray-700 mb-3">By Category</h3>
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