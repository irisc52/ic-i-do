import React, { useState, useEffect } from 'react';
import { HomeIcon } from 'lucide-react';

export default function Notes({ goToPage }) {

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

    return (

        <div className="min-h-screen font-serif bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <button
                onClick={() => goToPage('welcome')}
            >
                <HomeIcon />
            </button>
            <div className="min-h-screen p-8 flex justify-center items-center"> 
                <textarea
                    spellCheck={false}
                    type="textarea"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && setNotes()}
                    placeholder="what are we doing today queen"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none 
                                focus:ring-2 focus:ring-blue-500 w-full h-96"
                />
            </div>
        </div>
    )

}


