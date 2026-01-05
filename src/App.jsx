"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, Circle, PinIcon, HomeIcon, SunIcon, MoonIcon } from 'lucide-react';
import { useReward } from 'react-rewards';
import { themes } from './Themes.jsx'


export default function TodoApp( {goToPage , theme , setTheme , todos, setTodos} ) {

  const t = themes[theme];

  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoCategory, setNewTodoCategory] = useState('personal🧘🏻‍♀️');
  const [filter, setFilter] = useState('all 🗃️'); // 'all', 'active', 'completed', 'pinned (active)'

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const [newToDoDate, setNewToDoDueDate] = useState('');

  const {reward, isAnimating} = useReward('rewardId', 'confetti')

  // EVENT HANDLERS
  
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
    
    setTodos([...todos, newTodo]); 
    setNewTodoText(''); 
    setNewToDoDueDate('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const newCompleted = !todo.completed;
        return {
          ...todo,
          completed: newCompleted,
          completedDate: newCompleted ? new Date().toISOString().slice(0, 10) : null
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

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active ‼️') return !todo.completed;
    if (filter === 'archive 🗂️') return todo.completed;
    if (filter == 'action 📍') return todo.pinned && !todo.completed;
    return true; // 'all'
  });

  const sortedPinnedFilteredTodos = [...filteredTodos].sort((a, b) => {
    if (!a.pinned) return 1;
    if (!b.pinned) return -1;
    return 0;
  })

  const sortedFilteredTodos = [...sortedPinnedFilteredTodos].sort((a, b) => {
    if (a.completed) return 1;
    if (b.completed) return -1;
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
    <div className={`${t.bg}`}>
      <div className={`${t.bg} animate-fadeIn min-h-screen font-serif transition-colors duration-500 ease-in-out p-8`}>
        <div className="flex gap-4">
          <button
            onClick={() => goToPage('welcome')}
          >
              <HomeIcon color={t.iconColor}/>
          </button>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? (<MoonIcon color={t.iconColor}/>) :
                                (<SunIcon color={t.iconColor}/>) }
          </button>
        </div>
        <br></br>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className={`${t.blockColor} rounded-lg shadow-lg p-6 mb-6`}>
            <h1 className={`text-3xl font-bold ${t.text} mb-2`}>ic 👀 i do ✅</h1>
            <div className={`flex gap-4 text-sm ${t.text}`}>
              <span>{stats.total} total</span>
              <span>{stats.active} active</span>
              <span>{stats.completed} completed</span>
            </div>
          </div>

          {/* Add Todo Section */}
          <div className={`${t.blockColor} rounded-lg shadow-lg p-6 mb-6`}>
            <h2 className={`text-lg font-semibold ${t.text} mb-4`}>add new task ✍🏼</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="here!"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="date"
                value={newToDoDate}
                onChange={(e) => setNewToDoDueDate(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              <select
                value={newTodoCategory}
                onChange={(e) => setNewTodoCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
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
          <div className={`${t.blockColor} rounded-lg shadow-lg p-4 mb-6`}>
            <div className="flex gap-2">
              {['all 🗃️', 'active ‼️', 'archive 🗂️', 'action 📍'].map(filterType => (
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
              <div className={`${t.blockColor} rounded-lg shadow-lg p-8 text-center text-gray-500`}>
                :)
              </div>
            ) : (
              // Iterate over array and return JSX for each item
              sortedFilteredTodos.map(todo => (
                <div
                  key={todo.id}
                  className={`${t.blockColor} rounded-lg shadow-lg p-4 flex items-center gap-4 hover:shadow-xl transition-shadow`}
                >
                  {/* Toggle completion button */}
                  <button
                    disabled={isAnimating}
                    onClick={ () => {
                      todo.completed ? null: reward();
                      toggleTodo(todo.id);
                    }}
                    className="flex-shrink-0"
                  >
                    {todo.completed ? <span id="rewardId" /> : null} {todo.completed ? (
                      <Check className="text-green-600" size={24}/> 
                    ) : (
                      
                      <Circle className="text-gray-400 hover:scale-90" size={24}/>
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
                          todo.completed ? 'text-gray-400' : t.text
                        }`}
                        onClick = {() => {
                          setEditingId(todo.id);
                          setEditingText(todo.text);
                        }}
                      >
                        {todo.text} {todo.dueDate && !todo.completed && 
                                    (<span className = {`text-xs ${t.text}`}>
                                      due {todo.dueDate}
                                    </span>)} 
                                    {todo.completed && todo.completedDate && 
                                    (<span className = {`text-xs text-gray-400`}>
                                      completed {todo.completedDate}
                                    </span>
                                    )
                                              }
                      </p>
                    )}
                    <span className={`text-sm ${t.text}`}>{todo.category}</span>
                  </div>

                  {/* Pin button*/} 
                  <button
                    onClick={() => togglePin(todo.id)}
                    className="flex-shrink-0"
                  >
                    { todo.pinned ? (
                        <PinIcon className="text-red-400" size={20} fill="currentColor"/> 
                      ) : (
                        <PinIcon className={`text-${t.iconColor} hover:text-red-400 transition-colors`} size={20}/>)
                    }
                  </button>


                  {/* Delete button */}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="flex-shrink-0 text-black hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} color={t.iconColor}/>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}