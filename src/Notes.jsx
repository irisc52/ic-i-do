import React, { useState, useEffect } from 'react';

export default function Notes() {
    const [notes, setNotes] = useState('')

    return (
        <input
            type="text"
            value={notes}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && setNotes()}
            placeholder="what r we doing today queen"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    )

}