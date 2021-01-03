import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

const urlServer =`http://localhost:3000`;

class Navegacion extends Component {
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
    clickVerCartas = () =>{
        window.location.href = `http://localhost:8001/verCartas/${this.hijo.Nickname}`
    }
    clickPerfilSanta = () =>{
        window.location.href = `http://localhost:8001/perfilSanta/${this.hijo.Nickname}`
    }
    clickMensajeria = () =>{
        window.location.href = `http://localhost:8001/mensajeria/${this.hijo.Nickname}`
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
    }
    render() {
        return (
            <Navbar bg="primary" variant="dark">
                <NavItem > <Button variant="outline-light" onClick={()=>this.clickPerfil()}>Perfil Hijo</Button>
                </NavItem>
                <Nav className="mr-auto">
                    <NavItem > <Button variant="outline-light" onClick={()=>this.clickBuenasAcciones()}>Buenas Acciones</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-light" onClick={()=>this.clickRedactarCarta()}>Redactar Carta</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-light" onClick={()=>this.clickVerCartas()}>Ver Cartas</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-light" onClick={()=>this.clickPerfilSanta()}>Perfil Santa</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-light" onClick={()=>this.clickMensajeria()}>Mensajeria</Button>
                    </NavItem>
                    <NavItem > <a href="/"><Button variant="outline-light">Cerrar Sesion</Button></a>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default Navegacion;