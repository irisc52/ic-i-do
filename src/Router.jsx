import './index.css'
import { useState } from 'react';
import App from './App.jsx'
import WelcomePage from './Welcome.jsx'
import AboutPage from './About.jsx'
import NotesPage from './Notes.jsx'

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
}

export default function Main() {
    const [currentScreen, setCurrentScreen] = useState('welcome');
    const [theme, setTheme] = useState('light');

    const pages = {
        welcome: <WelcomePage goToPage={setCurrentScreen} theme={theme} setTheme={setTheme}/>,
        app: <App goToPage={setCurrentScreen} theme={theme} setTheme={setTheme}/>,
        about: <AboutPage goToPage={setCurrentScreen} theme={theme} setTheme={setTheme}/>,
        notes: <NotesPage goToPage={setCurrentScreen} theme={theme} setTheme={setTheme}/>
    };
  
    return <div>{pages[currentScreen]}</div>;
  }