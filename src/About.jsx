import React, { useState, useEffect } from 'react';
import { HomeIcon, SunIcon, MoonIcon } from 'lucide-react';

export default function About( {goToPage , theme , setTheme} ) {

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

    return (
        <div className={`min-h-screen font-serif ${t.bg} p-8`}>
            <div className = 'flex gap-4'>
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
                <div className={`min-h-screen p-8 flex items-center justify-center`}>
                    <div className={`space-y-8 font-serif ${t.text} max-w-3xl mx-auto text-center`}>
                        <p>
                            <b>ic, i do</b> was created by
                            <a href="https://www.linkedin.com/in/iristtchen/"> <span className="text-blue-500"><u>Iris Chen</u> </span></a>
                            (me!) when i concluded halfway through my sophomore year of college that using a single google doc for all
                            my organizational purposes was not very efficient (or fun).
                            <br></br><br></br>
                            more about me: i'm a student at carnegie mellon studying statistics, ml, and cs. i'm interested in the intersection
                            of those fields and the problems solved there. i built this app to reflect my belief that our organizational
                            tools should represent how we actually think and motivate us - not force us into rigid systems.
                            <br></br><br></br>
                            what started as a way to learn more about React and frontend development has grown into a personal
                            productivity hub that i know all of the ins and outs of. it's inspired by Notion but stripped down to 
                            the elements that matter most to me. 
                            <br></br><br></br>
                            i'm always working to maximize my ability to solve interesting and challenging problems with interesting
                            tools. if you have thoughts, suggestions, or just want to say hi, feel free to reach me 
                            via email at irischen@andrew.cmu.edu!
                        </p>
                        
                    </div>
                </div>
        </div>
    )
}