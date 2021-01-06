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
            <Navegacion/>
                <div className="App-header-hijo">
                    <PerfilHijo />
                </div>
            </div>
        )
    }
}

export default HijoPage;