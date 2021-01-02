import React, { Component } from 'react';
import '../App.css';
import renos from '../img/renos.png';
import Registro from '../components/Registro';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';

class RegistroPage extends Component {
    render() {
        return (
            <div className="App">
                <h1><Badge variant="danger">Registro</Badge>{' '}</h1>
                <header className="App-header">
                    <Registro />
                </header>
                <Image src={renos} fluid />
            </div>
        )
    }
}

export default RegistroPage;