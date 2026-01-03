import React, { useState, useEffect } from 'react';
import { HomeIcon, MoonIcon, SunIcon } from 'lucide-react';


export default function Notes({ goToPage , theme , setTheme }) {

    const themes = {
        light: {
            bg: "bg-blue-50",
            iconColor: "black",
            text: "text-gray-800",
            button: "bg-gray-200",
            buttonText: "text-gray-700",
            buttonHover: "bg-gray-300",
            buttonCurrent: "bg-blue-500",
            buttonCurrentText: "text-white",

            textArea: "white",
            textAreaOutline: "border-gray-300"
        },
        dark: {
            bg: "bg-gray-800",
            iconColor: "white",
            text: "text-blue-50",
            button: "bg-blue-800",
            buttonText: "text-white",
            buttonHover: "bg-blue-400",
            buttonCurrent: "bg-blue-200",
            buttonCurrentText: "text-black",
            
            textArea: "bg-gray-600",
            textAreaOutline: "border-gray-700"
        }
    }

    const t = themes[theme];

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

        <div className={`min-h-screen font-serif ${t.bg} p-8`}>
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
                <h1 className={`${t.text} text-xl`}>
                    <b>{formattedDate}</b>
                </h1>


                <textarea
                    spellCheck={false}
                    type="textarea"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && setNotes()}
                    placeholder="what are we doing today queen"
                    className={`px-4 py-3 border ${t.textArea} ${t.textAreaOutline} rounded-lg ${t.text} focus:outline-none 
                                focus:ring-2 focus:ring-blue-300 w-full h-96`}
                />
            </div>
        </div>
    )

}


