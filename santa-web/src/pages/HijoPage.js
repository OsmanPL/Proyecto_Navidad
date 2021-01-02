import renos from '../img/renos.png';
import PerfilHijo from '../components/PerfilHijo';
import Badge from 'react-bootstrap/Badge';
import Navegacion from '../components/Navegacion';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

const urlServer =`http://localhost:3000`;

class HijoPage extends Component {
    hijo={}
    clickPerfil = () => {
        window.location.href = `http://localhost:8001/hijo/${this.hijo.Nickname}`
    }
    clickBuenasAcciones = () =>{
        window.location.href = `http://localhost:8001/buenasAccionesHijo/${this.hijo.Nickname}`
    }
    clickRedactarCarta = () =>{
        window.location.href = `http://localhost:8001/redactarCarta/${this.hijo.Nickname}`
    }
    componentDidMount() {
        this.load();
    }
    load = async()=>{
        let paths = window.location.pathname.split('/');
        let nickname = paths[paths.length - 1];
        await axios.get(urlServer+`/recuperarHijo/recuperarHijo/${nickname}`)
        .then(response=>{
            this.hijo=response.data;
        })
        .catch(error=>{
            alert(error);
        })
        alert("Bienvenido(a) "+this.hijo.Nombre+"\nFelices Fiestas")
    }
    render() {
        return (
            <div className="FondoHijo">
            <Navbar bg="primary" variant="dark">
                <NavItem > <Button variant="outline-light" onClick={()=>this.clickPerfil()}>Perfil Hijo</Button>
                </NavItem>
                <Nav className="mr-auto">
                    <NavItem > <Button variant="outline-light" onClick={()=>this.clickBuenasAcciones()}>Buenas Acciones</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-light" onClick={()=>this.clickRedactarCarta()}>Redactar Carta</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-light">Ver Cartas</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-light">Perfil Santa</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-light">Mensajeria</Button>
                    </NavItem>
                    <NavItem > <a href="/"><Button variant="outline-light">Cerrar Sesion</Button></a>
                    </NavItem>
                </Nav>
            </Navbar>
                <div className="App-header-hijo">
                    <PerfilHijo />
                </div>
            </div>
        )
    }
}

export default HijoPage;