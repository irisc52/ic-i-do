import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon, NotebookTextIcon, PencilIcon, CircleQuestionMark} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { themes } from './Themes.jsx'

const moods = {
    normal: {
        message: ["welcome!"]
    },
    iris: {
        message: ["can't cry about having a lot on my plate if my goal is to EAT"]
    },

}

export default function Welcome({ goToPage , theme , setTheme }) {

    const [selectedPage, setSelectedPage] = useState('')
    // const [theme, setTheme] = useState('light')
    const [mood, setMood] = useState('iris')

    const toggleTheme = (theme) => {
        theme === 'light' ?
            theme = 'dark' : theme = 'light'
    }

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
    <div className={`transition-colors duration-500 ease-in-out min-h-screen ${t.bg } p-8 flex items-center justify-center`}>
        <div className="space-y-8 max-w-3xl mx-auto text-center">
            <button
                onClick = {() => setTheme(theme === 'light' ? 'dark' : 'light')}
                // onClick={setTheme(theme) => theme === 'light' ? (theme = 'dark') : (theme = 'light')}
            >
                {theme === 'light' ? (<MoonIcon size={30} color={t.iconColor}/>) : 
                                     (<SunIcon size={30} color={t.iconColor}/>) }
            </button>

            <h1 className={`text-5xl font-serif font-bold ${t.text} mb-4`}>
                <Typewriter words={m.message} loop={1} typeSpeed={60}/> 
            </h1>

            <div className="flex gap-4 justify-center">
            {/* {[<NotebookTextIcon/>, <PencilIcon/>, <CircleQuestionMark/>].map(page => ( */}
            {pages.map(page => (
                <button
                    key={page}
                    // onClick = {() => page.name === selectedPage ? setSelectedPage('') : setSelectedPage(page.name)}
                    onClick={() => goToPage(page.name)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedPage === page.name
                        ? t.buttonCurrent + ' ' + t.buttonCurrentText + ' font-serif'
                        : t.button + ' ' + t.buttonText + ' hover:' + t.buttonHover + ' font-serif'
                        // 'bg-blue-500 text-white font-serif'
                        // : 'bg-gray-200 text-gray-700 hover:bg-gray-300 font-serif'
                    }`}
                >
                    {page.icon}
                </button>
            ))}
            </div>

        </div>
    </div>
    );
}

