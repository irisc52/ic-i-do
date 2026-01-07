import React, { useState, useEffect } from 'react';
import { HomeIcon, MoonIcon, SunIcon, Check, Circle } from 'lucide-react';
import { themes } from './Themes.jsx'
import { useReward } from 'react-rewards';


export default function Notes({ goToPage , theme , setTheme , todos, setTodos}) {

    const t = themes[theme];
    const {reward, isAnimating} = useReward('rewardId', 'confetti')

    const pinnedTodos = todos.filter(todo => todo.pinned && !todo.completed);

    const [localPinnedTodos, setLocalPinnedTodos] = useState(pinnedTodos) 

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

    const toggleLocalCompletion = (id) => {
        setLocalPinnedTodos(localPinnedTodos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed
                };
            }
        return todo;
        }))
    }
    // completion date doesn't matter here. just updating 
    // the display in the notes section
    
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
    const toggleLocalSubtaskCompletion = (parentId, subtaskId) => {
        setLocalPinnedTodos(localPinnedTodos.map(todo => {
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

    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            return JSON.parse(savedNotes);
        }
        return '';
        });
    

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes])

    const months = ["january", "february", "march", "april", 
        "may", "june", "july", "august", "september", 
        "october", "november", "december"
    ];
    
    const days = ["sunday", "monday", "tuesday", "wednesday", 
                "thursday", "friday", "saturday"]
    
    const today = new Date();
    const month = months[today.getMonth()];
    const weekday = days[today.getDay()];
    const day = today.getDate();
    const year = today.getFullYear();
    const formattedDate = `${weekday}, ${month} ${day}, ${year}`

    return (
        <div className={`${t.bg}`}>
            <div className={`${t.bg} animate-fadeIn transition-colors duration-500 ease-in-out min-h-screen font-serif p-8`}>
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

                <div className={`min-h-screen p-8 space-y-4 flex flex-col justify-center items-center`}>
                    <h1 className={`${t.text} text-3xl`}>
                        <b>{formattedDate}</b>
                    </h1>

                    <div className={`flex w-full space-x-4`}>


                        <textarea
                            spellCheck={false}
                            type="textarea"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && setNotes()}
                            placeholder="what's on today's agenda!"
                            className={`px-4 py-3 border ${t.textArea} ${t.textAreaOutline} rounded-lg ${t.text} focus:outline-none 
                                        focus:ring-2 focus:ring-blue-300 w-3/4 h-96`}
                        />

                        <div className={`px-4 py-3 mb-4 border ${t.textArea} ${t.textAreaOutline} rounded-lg ${t.text} focus:outline-none 
                                        focus:ring-2 focus:ring-blue-300 w-1/4 h-96`} >
                            <div className="text-center">
                                <b>pinned tasks 📍</b>
                            </div>

                            {localPinnedTodos.map(todo => (
                                <div key={todo.id} className="mb-3">
                                    <button
                                        className={`flex space-x-1 mb-2 ${todo.completed ? 'text-gray-400' : t.text}`}
                                        onClick={ () => {
                                            toggleTodo(todo.id);
                                            toggleLocalCompletion(todo.id);
                                            todo.completed ? null : reward();
                                        }
                                        }
                                    >
                                        <span id="rewardId"/>
                                        {todo.completed ? <Check color="green" size={24}/> : <Circle size={24} className="hover:scale-90"/> }
                                        <span>{todo.text}</span>
                                    </button>
                                    {todo.subtasks && todo.subtasks.length > 0 && (
                                        <div className="ml-6 mt-2 space-y-1 border-l-2 pl-3">
                                            {todo.subtasks.map(subtask => (
                                                <div key={subtask.id} className="flex items-center gap-2 text-sm">
                                                    <button 
                                                    onClick={() => {
                                                        toggleSubtaskTodo(todo.id, subtask.id);
                                                        toggleLocalSubtaskCompletion(todo.id, subtask.id);
                                                        subtask.completed ? null : reward();
                                                    }}
                                                    >
                                                        <span id="rewardId" />
                                                        {todo.completed || subtask.completed ? (
                                                            <Check className="text-green-600" size={12} />
                                                        ) : (
                                                            <Circle className="text-gray-400" size={12} />
                                                        )}

                                                    </button> 
                                                    <span className={`${todo.completed || subtask.completed ? 'text-gray-400' : t.text}`}>
                                                        {subtask.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}