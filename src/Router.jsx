import './index.css'
import { useState } from 'react';
import App from './App.jsx'
import WelcomePage from './Welcome.jsx'
import AboutPage from './About.jsx'
import NotesPage from './Notes.jsx'

export default function Main() {
    const [currentScreen, setCurrentScreen] = useState('welcome');

    const pages = {
        welcome: <WelcomePage goToPage={setCurrentScreen} />,
        app: <App goToPage={setCurrentScreen} />,
        about: <AboutPage goToPage={setCurrentScreen} />,
        notes: <NotesPage goToPage={setCurrentScreen} />
    };
  
    return <div>{pages[currentScreen]}</div>;


    //   <div>
    //     {currentPage === 'welcome' ? (
    //       <WelcomePage goToApp = {() => setCurrentPage('app')} />
    //     ) : (
    //       <App goToHome = {() => setCurrentPage('welcome')} />
    //     )}
    //   </div>
    // )
  }