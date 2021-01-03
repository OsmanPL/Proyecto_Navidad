import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

const urlServer = `http://localhost:3000`;

class NavegacionAdmin extends Component {
    hijo = {}
    clickPerfil = () => {
        window.location.href = `http://localhost:8001/administrador`
    }
    clickBuenasAcciones = () =>{
        window.location.href = `http://localhost:8001/adminBuenasAcciones`
    }
    clickProductos = () =>{
        window.location.href = `http://localhost:8001/adminProductos`
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
                        <NavDropdown.Item ><Button variant="outline-primary" >Hijo</Button></NavDropdown.Item>
                        <NavDropdown.Item ><Button variant="outline-primary" >Padre</Button></NavDropdown.Item>
                        <NavDropdown.Item ><Button variant="outline-primary" >Santa</Button></NavDropdown.Item>
                    </NavDropdown>
                    <NavItem > <Button variant="outline-primary" >Mensajeria</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-primary" >Reportes</Button>
                    </NavItem>
                    <NavItem > <Button variant="outline-primary" >Carga Masiva</Button>
                    </NavItem>
                    <NavItem > <a href="/"><Button variant="outline-primary">Cerrar Sesion</Button></a>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default NavegacionAdmin;