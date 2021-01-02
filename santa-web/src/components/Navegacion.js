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
        this.load();
        return (
            <Navbar bg="primary" variant="dark">
                <NavItem > <Button variant="outline-light" onClick={()=>this.clickPerfil()}>Perfil Hijo</Button>
                </NavItem>
                <Nav className="mr-auto">
                    <NavItem > <Button variant="outline-light">Buenas Acciones</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-light">Carta</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-light">Perfil Santa</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-light">Mensajeria</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-light">Cerrar Sesion</Button>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default Navegacion;