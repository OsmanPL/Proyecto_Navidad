import Badge from 'react-bootstrap/Badge';
import Navegacion from '../components/Navegacion';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import '../App.css';

const urlServer = `http://localhost:3000`;

class VerCartas extends Component {
    state = {
        hijo: {},
        cartas: [],
        padre: {}
    }

    componentDidMount = async () => {
        this.load();
    }

    cargarCartas = async () => {
        await axios.get(urlServer + `/hijoCarta/verCartas/${this.state.hijo.Nickname}`)
            .then(response => {
                this.setState({ cartas: response.data });
            })
            .catch(error => {
                alert(error);
            })
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
        await axios.get(urlServer + `/recuperarPadre/recuperarPadre/${this.state.hijo.Padre}`)
            .then(response => {
                this.setState({ padre: response.data })
            }).catch(error => {
                alert(error);
            })
        this.cargarCartas();
    }
    render() {
        return (
            <div className="FondoHijo">
                <Navegacion />
                <div className="App-header-Redactar">
                    <div id="cartas" >
                        {this.state.cartas.map(country => {
                            return (<Card >
                                <Card.Header><Badge variant="primary">ID: {country.ID_Carta}</Badge></Card.Header>
                                <Card.Body>
                                    <Card.Title><Badge variant="primary">{country.Descripcion}</Badge></Card.Title>
                                    <Card.Text>
                                        <Badge variant="primary">Precio de la Carta: {country.PrecioTotal}</Badge>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-muted">Estado: {country.Estado} Fecha de Envio: {country.FechaEnvia}</Card.Footer>
                                <Accordion >
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Lista De Deseos
                                                </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            
                                        <Card.Body>
                                            {country.ListaDeseos.map(deseo => {
                                                return (
                                                        <Card>
                                                            <Card.Header as="h5"><Badge variant="primary">Nombre: {deseo.Juguete[0].Nombre}</Badge></Card.Header>
                                                            <Card.Body>
                                                                <Card.Title><Badge variant="primary">Cantidad: {deseo.Cantidad}</Badge></Card.Title>
                                                                <Card.Text>
                                                                <Badge variant="primary">Total: {deseo.Total}</Badge>
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                )
                                            })}
                                            
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Card>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default VerCartas;