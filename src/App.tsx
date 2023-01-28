import React from 'react';
import './App.css';
import Footer from './Components/LayoutArea/Footer';
import Header from './Components/LayoutArea/Header';
import Main from './Components/LayoutArea/Main';

function App() {
  return (
    <div className="App">
     <Header/>
     <Main/>
     <Footer/>
    </div>
  );
}

export default App;
