import React, { useState, useEffect } from 'react';
import App from './App.jsx'
import WelcomePage from './Welcome.jsx'
import AboutPage from './About.jsx'
import NotesPage from './Notes.jsx'

export default function Main() {
    const [currentScreen, setCurrentScreen] = useState('welcome');
    const [theme, setTheme] = useState('light');

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            return JSON.parse(savedTodos);
        }
        return [
            { id: 1, text: 'example task', completed: false, category: 'personal🧘🏻‍♀️' },
        ];
    });
    
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]); // Dependency array: only run when 'todos' changes

    const pages = {
        welcome: <WelcomePage goToPage={setCurrentScreen} theme={theme} setTheme={setTheme}/>,
        app: <App goToPage={setCurrentScreen} theme={theme} setTheme={setTheme} todos={todos} setTodos={setTodos}/>,
        about: <AboutPage goToPage={setCurrentScreen} theme={theme} setTheme={setTheme}/>,
        notes: <NotesPage goToPage={setCurrentScreen} theme={theme} setTheme={setTheme} todos={todos} setTodos={setTodos}/>
    };
    return <div>{pages[currentScreen]}</div>;
}