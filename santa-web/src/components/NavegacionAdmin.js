import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

const urlServer = `http://34.70.211.238:3000`;

class NavegacionAdmin extends Component {
    hijo = {}
    clickPerfil = () => {
        window.location.href = `http://34.70.211.238:8001/administrador`
    }
    clickBuenasAcciones = () =>{
        window.location.href = `http://34.70.211.238:8001/adminBuenasAcciones`
    }
    clickProductos = () =>{
        window.location.href = `http://34.70.211.238:8001/adminProductos`
    }
    clickHijo = () =>{
        window.location.href = `http://34.70.211.238:8001/adminHijo`
    }
    clickPadre = () =>{
        window.location.href = `http://34.70.211.238:8001/adminPadre`
    }
    clickSanta = () =>{
        window.location.href = `http://34.70.211.238:8001/adminSanta`
    }
    clickMensajeria = () =>{
        window.location.href = `http://34.70.211.238:8001/adminMensajeria`
    }
    clickReportes =()=>{
        window.location.href = `http://34.70.211.238:8001/adminReportes`
    }
    clickCarga =()=>{
        window.location.href = `http://34.70.211.238:8001/cargaMasiva`
    }
    render() {
        return (
            <Navbar bg="light" variant="primary">
                <NavItem > <Button variant="outline-primary" onClick={() => this.clickPerfil()}>Perfil Adminnistrador</Button>
                </NavItem>
                <Nav className="mr-auto">
                    <NavItem > <Button variant="outline-primary" onClick={() => this.clickBuenasAcciones()}>Buenas Acciones</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-primary" onClick={() => this.clickProductos()}>Productos</Button>
                    </NavItem>
                    <NavDropdown variant="outline-primary" title="Perfiles" id="collasible-nav-dropdown">
                        <NavDropdown.Item ><Button variant="outline-primary" onClick={() => this.clickHijo()}>Hijo</Button></NavDropdown.Item>
                        <NavDropdown.Item ><Button variant="outline-primary" onClick={()=>this.clickPadre()}>Padre</Button></NavDropdown.Item>
                        <NavDropdown.Item ><Button variant="outline-primary" onClick={()=>this.clickSanta()}>Santa</Button></NavDropdown.Item>
                    </NavDropdown>
                    <NavItem > <Button variant="outline-primary" onClick={()=>this.clickMensajeria()}>Mensajeria</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-primary" onClick={()=>this.clickReportes()}>Reportes</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-primary" onClick={()=>this.clickCarga()}>Carga Masiva</Button>
                    </NavItem>
                    <NavItem > <a href="/"><Button variant="outline-primary">Cerrar Sesion</Button></a>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default NavegacionAdmin;