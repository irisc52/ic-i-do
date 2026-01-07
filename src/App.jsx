import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Check, Circle, PinIcon, HomeIcon, SunIcon, MoonIcon, ChevronsDown , ChevronsUp} from 'lucide-react';
import { useReward } from 'react-rewards';
import { themes } from './Themes.jsx'


export default function TodoApp( {goToPage , theme , setTheme , todos, setTodos} ) {

  const t = themes[theme];

  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoCategory, setNewTodoCategory] = useState('personal🧘🏻‍♀️');
  const [filter, setFilter] = useState('all 🗃️'); // 'all', 'active', 'archive (completed)', 'active (pinned)'

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const [newToDoDate, setNewToDoDueDate] = useState('');

  const {reward, isAnimating} = useReward("rewardId", 'confetti')

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
      subtasks: [],
      subtaskDraft: "", // per item subtask draft
      expanded: false, // showing subtasks or not
      ...(newToDoDate && {dueDate: newToDoDate})
    };
    
    setTodos([...todos, newTodo]); 
    setNewTodoText(''); 
    setNewToDoDueDate('');
  };

  const addSubtask = (parentId) => {
    setTodos(todos.map(todo => {
      if (todo.id === parentId) {
        if (todo.subtaskDraft.trim() === '') return;
        const newSubtask = {
          id: Date.now(),
          text: todo.subtaskDraft,
          completed: false,
          completedDate: null,
          isEditing: false,
          category: todo.category,
          ...(todo.dueDate && {dueDate: todo.dueDate})
        };
        return {
          ...todo, 
          subtasks: [...todo.subtasks ?? [], 
          newSubtask
          ],
          subtaskDraft: ""
        };
      };
      return todo;
    }));
  }

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

  const toggleSubtaskTodo = (parentId, subtaskId) => {
    setTodos(todos.map(todo => {
      if (todo.id === parentId) {
        const newSubtasks = todo.subtasks.map(subtask => {
          if (subtask.id === subtaskId) {
            return {
              ...subtask,
              completed: !subtask.completed
            };
          };
          return subtask;
        });
        return {
          ...todo,
          subtasks: newSubtasks
        };
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const deleteSubtask = (parentId, subtaskId) => {
    setTodos(todos.map(todo => {
      if (todo.id === parentId) {
        const newSubtasks = todo.subtasks.filter(subtask => subtask.id !== subtaskId);
        return {
          ...todo,
          subtasks: newSubtasks
        };
      };
      return todo;
    }))
  }

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

  const toggleExpanded = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? {...todo, expanded: !todo.expanded} : todo
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
  }) // pinned items should be at the top

  const sortedFilteredTodos = [...sortedPinnedFilteredTodos].sort((a, b) => {
    if (a.completed) return 1;
    if (b.completed) return -1;
    return 0;
  }) // completed items should be at the bottom. priority over pinned.

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
                {/* no tasks in this filter category */}
              </div>
            ) : (
              // Iterate over array and return JSX for each item
              sortedFilteredTodos.map(todo => (
                <div
                  key={todo.id}
                  className={`${t.blockColor} rounded-lg shadow-lg p-4 flex items-start gap-4 hover:shadow-xl transition-shadow`}
                >
                  {/* Toggle completion button */}
                  <button
                    onClick={ () => {
                      toggleTodo(todo.id);
                      todo.completed ? null: reward();
                    }}
                    className="flex-shrink-0"
                  >
                    <span id="rewardId"/> 
                    {todo.completed ? (
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
                    {/* Displaying subtasks */}
                    <div 
                      className={`text-sm ml-8 pl-4 border-l-2 
                                    transition-all duration-500 overflow-hidden ${todo.expanded ? 'max-h-96' : 'max-h-0'}`}>
                      {!todo.subtasks || todo.subtasks.length === 0 ? (
                        null // no subtasks to display
                      ) : (
                        <div className={`${t.text} space-y-2`}>
                          {todo.subtasks.map(subtask => (
                            <div
                              key={subtask.id}
                              className={`${t.text} space-x-2`}
                            >
                              <button
                                onClick={() => {
                                  toggleSubtaskTodo(todo.id, subtask.id);
                                  subtask.completed ? null: reward();
                                }}
                              > 
                              {/* if main task is completed, subtasks all marked as "complete" */}
                                {todo.completed || subtask.completed ? 
                                (<Check className="text-green-600"size={12}/>) : 
                                (<Circle className="hover:scale-90" size={12}/>)}
                              </button>
                              <button
                                onClick={() => deleteSubtask(todo.id, subtask.id)}
                              >
                                <Trash2 size={12}/>
                              </button>
                              <span className={`${todo.completed || subtask.completed ? 'text-gray-400' : t.text}`}>
                                {subtask.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {todo.completed ? (null) : (
                        <div className="flex gap-2">
                        <input
                          type="text"
                          value={todo.subtaskDraft}
                          onChange={(e) => {
                            const value = e.target.value
                            setTodos(
                              todos.map(t =>
                              (t.id === todo.id) ? 
                                {...t, subtaskDraft: value} : t
                              )
                            );
                          }}
                          onKeyPress={(e) => e.key === 'Enter' && addSubtask(todo.id)}
                          placeholder="add new subtask"
                          className="flex-1 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 focus:ring-blue-300"
                        />
                        <button
                          onClick={() => addSubtask(todo.id)}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                      )}
                    </div>
                  </div>

                  {/* Expand View Button  */}
                  <button
                    className={`flex-shrink-0 text-${t.iconColor}`}
                    onClick={() => toggleExpanded(todo.id)}
                  >
                    {todo.expanded ? <ChevronsUp size={20}/> : <ChevronsDown size={20}/>}
                  </button>
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