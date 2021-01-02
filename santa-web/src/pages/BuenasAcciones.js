import renos from '../img/renos.png';
import PerfilHijo from '../components/PerfilHijo';
import Badge from 'react-bootstrap/Badge';
import Navegacion from '../components/Navegacion';
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import '../App.css';

const urlServer = `http://localhost:3000`;

class BuenasAcciones extends Component {
    state = {
        form: {
            user: '',
            password: ''
        },
        hijo: {},
        BuenasAccionesHijo: [],
        padre: {}
    }

    clickPerfil = () => {
        window.location.href = `http://localhost:8001/hijo/${this.state.hijo.Nickname}`
    }
    clickBuenasAcciones = () =>{
        window.location.href = `http://localhost:8001/buenasAccionesHijo/${this.state.hijo.Nickname}`
    }
    clickRedactarCarta = () =>{
        window.location.href = `http://localhost:8001/redactarCarta/${this.state.hijo.Nickname}`
    }
    componentDidMount = async () => {
        this.load();
    }

    realizarAccion = async (number, recompensa) => {
        if (this.state.padre.Dinero >= recompensa) {
            await axios.post(urlServer + `/hijoBuenasAcciones/realizarAccion`,
                {
                    nickname: this.state.hijo.Nickname,
                    buenaAccion: number
                }).then(response => {
                    alert(JSON.stringify(response.data))
                }).catch(error => {
                    alert(error)
                })
        } else {
            alert("No puede realizar esta buena accion porque la cantidad de bastones que puede acumular es menor")
        }

    }

    load = async () => {
        let paths = window.location.pathname.split('/');
        let nickname = paths[paths.length - 1];
        await axios.get(urlServer + `/recuperarHijo/recuperarHijo/${nickname}`)
            .then(response => {
                this.setState({ hijo: response.data });
            })
            .catch(error => {
                alert(error);
            })
        await axios.get(urlServer + `/hijoBuenasAcciones/buenasAcciones/${this.state.hijo.Edad}`)
            .then(response => {
                this.setState({ BuenasAccionesHijo: response.data });
            })
            .catch(error => {
                alert(error);
            })
        await axios.get(urlServer + `/recuperarPadre/recuperarPadre/${this.state.hijo.Padre}`)
            .then(response => {
                this.setState({ padre: response.data })
            }).catch(error => {
                alert(error);
            })
        console.log(this.state.padre);

    }
    render() {
        return (
            <div className="FondoHijo">
                <Navbar bg="primary" variant="dark">
                    <NavItem > <Button variant="outline-light" onClick={() => this.clickPerfil()}>Perfil Hijo</Button>
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
                <h1><Badge pill variant="primary">Bastones Acumulados <Badge pill variant="light">{this.state.hijo.Bastones}</Badge> </Badge></h1>
                <h1><Badge pill variant="primary">Bastones Por Acumular <Badge pill variant="light">{this.state.padre.Dinero}</Badge> </Badge></h1>
                <div className="App-header-BuenasAcciones">
                    <div id="growth" >
                        {this.state.BuenasAccionesHijo.map(country => {
                            return (<Card >
                                <Card.Header><Badge variant="primary">ID: {country.ID_BuenaAccion}</Badge></Card.Header>
                                <Card.Body>
                                    <Card.Title><Badge variant="primary">{country.Titulo}</Badge></Card.Title>
                                    <Card.Text>
                                        <Badge variant="primary">{country.Descripcion}</Badge>
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => this.realizarAccion(country.ID_BuenaAccion, country.Recompensa)}>Realizar</Button>
                                </Card.Body>
                                <Card.Footer className="text-muted">Recompensa: {country.Recompensa}</Card.Footer>
                            </Card>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default BuenasAcciones;