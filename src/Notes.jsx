import React, { useState, useEffect } from 'react';
import { HomeIcon, MoonIcon, SunIcon, Pin, ArrowRight , Circle } from 'lucide-react';
import { themes } from './Themes.jsx'


export default function Notes({ goToPage , theme , setTheme , todos}) {

    const t = themes[theme];

    const pinnedTodos = todos.filter(todo => todo.pinned && !todo.completed);
    

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
            <div className={`animate-fadeIn transition-colors duration-500 ease-in-out min-h-screen font-serif p-8`}>
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
                            placeholder="what are we doing today queen"
                            className={`px-4 py-3 border ${t.textArea} ${t.textAreaOutline} rounded-lg ${t.text} focus:outline-none 
                                        focus:ring-2 focus:ring-blue-300 w-3/4 h-96`}
                        />

                        <div className={`px-4 py-3 mb-4 border ${t.textArea} ${t.textAreaOutline} rounded-lg ${t.text} focus:outline-none 
                                        focus:ring-2 focus:ring-blue-300 w-1/4 h-96`} >
                            <div className="text-center">
                                <b>pinned tasks 📍</b>
                            </div>

                            {pinnedTodos.map(todo => (
                                <div
                                    key={todo.id}
                                    className="flex space-x-3"
                                >
                                    <Circle /> {todo.text} 
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

