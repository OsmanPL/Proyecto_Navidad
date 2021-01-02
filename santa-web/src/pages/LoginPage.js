import React, { Component } from 'react';
import '../App.css';
import renos from '../img/renos.png';
import Login from '../components/Login';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';

class LoginPage extends Component {
    render() {
        return (
            <div className="App">
                <h1><Badge variant="danger">SANTA CLOUD PLATFORM</Badge>{' '}</h1>
                <header className="App-header">
                    <Login />
                </header>
                <Image src={renos} fluid />
            </div>
        )
    }
}

export default LoginPage;