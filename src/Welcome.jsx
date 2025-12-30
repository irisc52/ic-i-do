import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

const themes = {
    light: {
        bg: "bg-blue-50",
        iconColor: "black",
        text: "text-gray-800",
        button: "bg-gray-200",
        buttonText: "text-gray-700",
        buttonHover: "bg-gray-300",
        buttonCurrent: "bg-blue-500",
        buttonCurrentText: "text-white"
    },
    dark: {
        bg: "bg-gray-800",
        iconColor: "white",
        text: "text-blue-50",
        button: "bg-blue-800",
        buttonText: "text-white",
        buttonHover: "bg-blue-400",
        buttonCurrent: "bg-blue-200",
        buttonCurrentText: "text-black"
    }
    // pink: {}
}

const moods = {
    normal: {
        message: ["welcome!"]
    },
    iris: {
        message: ["can't cry about having a lot on my plate if my goal is to EAT"]
    },

}

export default function Welcome() {

    const [currentPage, setCurrentPage] = useState('')
    const [theme, setTheme] = useState('light')
    const [mood, setMood] = useState('iris')

    const toggleTheme = (theme) => {
        theme === 'light' ?
            theme = 'dark' : theme = 'light'
    }

    const t = themes[theme];
    const m = moods[mood];

    return (
    <div className={`min-h-screen ${t.bg } p-8 flex items-center justify-center`}>
        <div className="space-y-8 max-w-3xl mx-auto text-center">
            <button
                onClick = {() => setTheme(theme === 'light' ? 'dark' : 'light')}
                // onClick={setTheme(theme) => theme === 'light' ? (theme = 'dark') : (theme = 'light')}
            >
                {theme === 'light' ? (<MoonIcon size={30} color={t.iconColor}/>) : 
                                     (<SunIcon size={30} color={t.iconColor}/>) }
            </button>

            <h1 className={`text-5xl font-serif font-bold ${t.text} mb-4`}>
                <Typewriter words={m.message} loop={1}/> 
            </h1>

            <div className="flex gap-4 justify-center">
            {['ic, i do', 'notes & stuff', 'about'].map(page => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === page
                        ? t.buttonCurrent + ' ' + t.buttonCurrentText + ' font-serif'
                        : t.button + ' ' + t.buttonText + ' hover:' + t.buttonHover + ' font-serif'
                        // 'bg-blue-500 text-white font-serif'
                        // : 'bg-gray-200 text-gray-700 hover:bg-gray-300 font-serif'
                    }`}
                >
                    {page}
                </button>
            ))}
            </div>

        </div>
    </div>
    );
}

