import React, { useState, useEffect } from 'react';

export default function Welcome() {

    const [currentPage, setCurrentPage] = useState('')

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-serif font-bold text-gray-800 mb-4">
                can't cry about having a lot on your plate if your goal is to EAT
            </h1>

            <div className="flex gap-4 justify-center">
            {['ic, i do', 'notes & stuff', 'about'].map(page => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === page
                        ? 'bg-blue-600 text-white font-serif'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-300 font-serif'
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

