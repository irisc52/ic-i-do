import React, { useState, useEffect } from 'react';
import { HomeIcon } from 'lucide-react';

export default function About( {goToPage} ) {
    return (
        <div className="min-h-screen font-serif bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <button
                onClick={() => goToPage('welcome')}
            >
                <HomeIcon/>
            </button>
                <div className={`min-h-screen p-8 flex items-center justify-center`}>
                    <div className="space-y-8 font-serif max-w-3xl mx-auto text-center">
                        <p>
                            <b>ic, i do</b> was created by
                            <a href="https://www.linkedin.com/in/iristtchen/"> <span className="text-blue-500"><u>Iris Chen</u> </span></a>
                            (me!) cus using a gdoc for everything is bad
                            <br></br>
                            <br></br>
                            YAY
                        </p>
                        
                    </div>
                </div>
        </div>
    )
}