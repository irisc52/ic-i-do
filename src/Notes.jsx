import React, { useState, useEffect } from 'react';
import { HomeIcon, MoonIcon, SunIcon, Pin, ArrowRight } from 'lucide-react';
import { themes } from './Themes.jsx'


export default function Notes({ goToPage , theme , setTheme , todos}) {

    const t = themes[theme];

    const pinnedTodos = todos.filter(todo => todo.pinned && !todo.completed);
    

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

    const months = ["january", "february", "march", "april", 
        "may", "june", "july", "august", "september", 
        "october", "november", "december"
    ];
    
    const days = ["sunday", "monday", "tuesday", "wednesday", 
                "thursday", "friday", "saturday"]
    
    const today = new Date();
    const month = months[today.getMonth()];
    const weekday = days[today.getDay()];
    const day = today.getDate();
    const year = today.getFullYear();
    const formattedDate = `${weekday}, ${month} ${day}, ${year}`

    return (

        <div className={`transition-colors duration-500 ease-in-out min-h-screen font-serif ${t.bg} p-8`}>
            <div className="flex gap-4">
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

            <div className={`min-h-screen p-8 space-y-4 flex flex-col justify-center items-center`}>
                <h1 className={`${t.text} text-3xl`}>
                    <b>{formattedDate}</b>
                </h1>

                <div className={`flex w-full space-x-4`}>


                    <textarea
                        spellCheck={false}
                        type="textarea"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && setNotes()}
                        placeholder="what are we doing today queen"
                        className={`px-4 py-3 border ${t.textArea} ${t.textAreaOutline} rounded-lg ${t.text} focus:outline-none 
                                    focus:ring-2 focus:ring-blue-300 w-3/4 h-96`}
                    />

                    <div className={`px-4 py-3 mb-4 border ${t.textArea} ${t.textAreaOutline} rounded-lg ${t.text} focus:outline-none 
                                    focus:ring-2 focus:ring-blue-300 w-1/4 h-96`} >
                        <div className="text-center">
                            <b>pinned tasks 📍</b>
                        </div>

                        {pinnedTodos.map(todo => (
                            <div 
                                key={todo.id}
                                className="flex space-x-3"
                            >
                                <ArrowRight /> {todo.text} 
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}


// sortedFilteredTodos.map(todo => (
//     <div
//       key={todo.id}
//       className={`${t.blockColor} rounded-lg shadow-lg p-4 flex items-center gap-4 hover:shadow-xl transition-shadow`}
//     >
//       {/* Toggle completion button */}
//       <button
//         disabled={isAnimating}
//         onClick={ () => {
//           todo.completed ? null: reward();
//           toggleTodo(todo.id);
//           // todo.completed ? null: reward();
//         }}
//         className="flex-shrink-0"
//       >
//         {todo.completed ? <span id="rewardId" /> : null} {todo.completed ? (
//           <Check className="text-green-600" size={24}/> 
//         ) : (
          
//           <Circle className="text-gray-400 hover:scale-90" size={24}/>
//         )} 
//       </button>

//       {/* Todo text with conditional styling */}
//       <div className="flex-1">
//         {editingId === todo.id ? (
//           <input
//             value={editingText}
//             onChange={(e) => setEditingText(e.target.value)}
//             onKeyPress={(e) => {
//               if (e.key === 'Enter') {
//                 editToDo(todo.id, editingText);
//                 setEditingId(null);
//               }
//             }}
//             onBlur={() => {
//               editToDo(todo.id, editingText);
//               setEditingId(null);
//             }}
//             className="text-lg border-b-2 border-blue-500 focus:outline-none"
//             autoFocus
//             />
//         ) : (
//           <p
//             className={`text-lg cursor-pointer ${
//               todo.completed ? 'text-gray-400' : t.text
//             }`}
//             onClick = {() => {
//               setEditingId(todo.id);
//               setEditingText(todo.text);
//             }}
//           >
//             {todo.text} {todo.dueDate && !todo.completed && 
//                         (<span className = {`text-xs ${t.text}`}>
//                           due {todo.dueDate}
//                         </span>)} 
//                         {todo.completed && todo.completedDate && 
//                         (<span className = {`text-xs text-gray-400`}>
//                           completed {todo.completedDate}
//                         </span>
//                         )
//                                   }
//           </p>
//         )}
//         <span className={`text-sm ${t.text}`}>{todo.category}</span>
//       </div>