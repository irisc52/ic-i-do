import React, { useState, useEffect } from 'react';
import { HomeIcon, SunIcon, MoonIcon } from 'lucide-react';
import meImg from './me.jpeg'
import { themes } from './Themes.jsx'

export default function About( {goToPage , theme , setTheme} ) {

    const t = themes[theme];

    return (
        <div className={`${t.bg}`}>
            <div className={`${t.bg} animate-fadeIn transition-colors duration-500 ease-in-out min-h-screen font-serif p-8`}>
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
                                <b>ic, i do</b> was born when i finally accepted (after almost four years!) 
                                that using a single google doc for all my organizational purposes wasn't cutting it anymore.
                                <br></br><br></br>
                                about <a href="https://www.linkedin.com/in/iristtchen/"> <span className="text-blue-500"><u>myself</u></span></a>: 
                                i'm a student at Carnegie Mellon studying statistics and machine learning, with a deep interest in where 
                                ML, data, and other areas of CS intersect and the problems that emerge there. 
                                <br></br><br></br>
                                {/* this site reflects my belief that tools should represent how we actually think and motivate us.  */}
                                fueled by a long winter break, a growing curiosity about frontend development, and an inexplicable aversion to Notion, 
                                i built this web app into a personal productivity system that i get to know all the ins and outs of - and it's 
                                customized in a way that speaks directly to my work style.
                                <br></br><br></br>
                                i'm always working on my ability to solve challenging problems with interesting
                                tools and motivated people. if you have thoughts, suggestions, or just want to say 
                                hi, feel free to reach out at irischen@andrew.cmu.edu!
                            </p>
                            
                        </div>
                    </div>
            </div>
        </div>
    );
}