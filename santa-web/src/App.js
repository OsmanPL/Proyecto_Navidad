import './App.css';
import Login from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import HijoPerfilPage from './pages/HijoPage';
import BuenasAcciones from './pages/BuenasAcciones';
import RedactarCarta from './pages/RedactarCarta';
import VerCartas from './pages/VerCartas';
import PerfilSanta from './pages/PerfilSanta';
import Mensajeria from './pages/Mensajeria';
import AdminPage from './pages/AdminPage';
import BuenasAccionesAdmin from './pages/BuenasAccionesAdmin';
import Productos from './pages/Productos';
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
        <Router path={"/verCartas/:nickname"} exact>
          <VerCartas/>
        </Router>
        <Router path={"/perfilSanta/:nickname"} exact>
          <PerfilSanta/>
        </Router>
        <Router path={"/mensajeria/:nickname"} exact>
          <Mensajeria/>
        </Router>
        <Router path={"/administrador"} exact>
          <AdminPage/>
        </Router>
        <Router path={"/adminBuenasAcciones"} exact>
          <BuenasAccionesAdmin/>
        </Router>
        <Router path={"/adminProductos"} exact>
          <Productos/>
        </Router>
      </Switch>
    </Router>
  );
}

export default App;
