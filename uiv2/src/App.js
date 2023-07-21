// import logo from './logo.svg';
// import './App.css';
import Container from "./components/Container.jsx";

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="logo"></div>
        <h1 className="title">MSaver</h1>
      </div>

      <div className="container">
        <Container />
      </div>
    </div>
  );
}

export default App;
