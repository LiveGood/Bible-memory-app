import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import TestCss from './components/TestCss';
import Sidebar from './components/Sidebar';
import Main from './components/Main';



function App() {
  //TODO: 
  return (
    <div className="App">
        <Header />
        <div id="main-container">
          <Sidebar />
          <Main />
        </div>
        {/* <TestCss /> */}
    </div>
  );
}

export default App;
