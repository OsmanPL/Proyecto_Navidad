import './App.css';
import Login from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import HijoPerfilPage from './pages/HijoPage';
import BuenasAcciones from './pages/BuenasAcciones';
import RedactarCarta from './pages/RedactarCarta';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Router path="/" exact>
          <Login />
        </Router>
        <Router path="/registro" exact>
          <RegistroPage />
        </Router>
        <Router path={"/hijo/:nickname"} exact>
          <HijoPerfilPage/>
        </Router>
        <Router path={"/buenasAccionesHijo/:nickname"} exact>
          <BuenasAcciones/>
        </Router>
        <Router path={"/redactarCarta/:nickname"} exact>
          <RedactarCarta/>
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
