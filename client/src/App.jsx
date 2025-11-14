import Login from "./components/Login";
import PrivateData from "./components/PrivateData";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Autenticação JWT</h1>
      <Login />
      <PrivateData />
    </div>
  );
}

export default App;
