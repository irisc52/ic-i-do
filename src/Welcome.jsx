import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon, NotebookTextIcon, PencilIcon, CircleQuestionMark} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { themes } from './Themes.jsx'

const moods = {
    normal: {
        message: ["welcome!"]
    },
    iris: {
        message: ["can't cry about having a lot on my plate if my goal is to EAT"
        ]
    },

}

export default function Welcome({ goToPage , theme , setTheme }) {

    const [selectedPage, setSelectedPage] = useState('')
    const [mood, setMood] = useState('iris')

    const t = themes[theme];
    const m = moods[mood];

    const pages = [
        {   name: 'app',
            icon: <NotebookTextIcon/>
        },
        {   name: 'notes',
            icon: <PencilIcon/>
        },
        {   name: 'about',
            icon: <CircleQuestionMark/>
        }
    ]

    return (
        <div className={`${t.bg}`}>
            <div className={`${t.bg} animate-fadeIn transition-colors duration-500 ease-in-out min-h-screen p-8 flex items-center justify-center`}>
                <div className="space-y-8 max-w-3xl mx-auto text-center">
                    <button
                        onClick = {() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    >
                        {theme === 'light' ? (<MoonIcon size={30} color={t.iconColor}/>) : 
                                            (<SunIcon size={30} color={t.iconColor}/>) }
                    </button>

                    <h1 className={`text-5xl font-serif font-bold ${t.text} mb-4`}>
                        <Typewriter words={m.message} loop={1} typeSpeed={60}/> 
                    </h1>

                    <div className="flex gap-4 justify-center">
                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => goToPage(page.name)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                selectedPage === page.name
                                ? t.buttonCurrent + ' ' + t.buttonCurrentText + ' font-serif'
                                : t.button + ' ' + t.buttonText + ' hover:' + t.buttonHover + ' font-serif'
                            }`}
                        >
                            {page.icon}
                        </button>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

