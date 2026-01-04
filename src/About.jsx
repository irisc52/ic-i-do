import React, { useState, useEffect } from 'react';
import { HomeIcon, SunIcon, MoonIcon } from 'lucide-react';
import meImg from './me.jpeg'

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
                <div className={`min-h-screen p-6 flex items-center justify-center`}>
                    <div className={`space-y-8 font-serif ${t.text} max-w-3xl mx-auto text-center`}>
                        <img
                            src={meImg}
                            style={{ height: '300px'}}
                            className="mx-auto"
                        />
                        <p>
                            <b>ic, i do</b> was born when i finally decided halfway through my sophomore year of college that using a single google doc for all
                            my organizational purposes had become too boring.
                            <br></br><br></br>
                            about <a href="https://www.linkedin.com/in/iristtchen/"> <span className="text-blue-500"><u>myself</u></span></a>: 
                            i'm a student at Carnegie Mellon learning about statistics and various areas of computer science
                            and growing (a lot) as a person. i'm deeply interested in where data, ML, and CS intersect and the problems that are solved there. 
                            <br></br><br></br>
                            this site reflects my belief that tools should represent how we actually think and motivate us. what started as a way to learn more 
                            about React and frontend development has since grown into a personal productivity system that i get to know <i>all</i> the 
                            ins and outs of. it's inspired by Notion, stripped down to the elements that matter most to me, and customized in a 
                            way that speaks to my work style.
                            <br></br><br></br>
                            i'm always working to maximize my ability to solve challenging problems with interesting
                            tools. if you have thoughts, suggestions, or just want to say hi, feel free to reach me 
                            via email at irischen@andrew.cmu.edu!
                        </p>
                        
                    </div>
                </div>
        </div>
    )
}