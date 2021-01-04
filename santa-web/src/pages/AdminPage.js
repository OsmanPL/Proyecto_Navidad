import renos from '../img/renos.png';
import PerfilAdmin from '../components/PerfilAdmin';
import Badge from 'react-bootstrap/Badge';
import NavegacionAdmin from '../components/NavegacionAdmin';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

const urlServer =`http://localhost:3000`;

class AdminPage extends Component {
    hijo={}
    componentDidMount() {
        this.load();
    }
    load = async()=>{
        alert("Bienvenido(a) Administrador(a)\nFelices Fiestas")
    }
    render() {
        return (
            <div className="FondoAdmin">
            <NavegacionAdmin/>
                <div className="App-header-admin">
                    <PerfilAdmin />
                </div>
            </div>
        )
    }
}

export default AdminPage;