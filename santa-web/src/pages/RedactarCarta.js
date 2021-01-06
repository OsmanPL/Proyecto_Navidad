import renos from '../img/renos.png';
import PerfilHijo from '../components/PerfilHijo';
import Badge from 'react-bootstrap/Badge';
import Navegacion from '../components/Navegacion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import '../App.css';

const urlServer = `http://34.70.211.238:3000`;

class RedactarCarta extends Component {
    state = {
        form: {
            categoria: 'todo',
            total: 0,
            descripcion:''
        },
        hijo: {},
        juguetes: [],
        deseos: [],
        padre: {}
    }

    agregarListaDeseos = async (numero) => {
        console.log(numero)
        for (var i = 0; i < this.state.juguetes.length; i++) {
            if (this.state.juguetes[i].ID_Juguete == numero) {
                const deseo = {
                    ID_Juguete: this.state.juguetes[i].ID_Juguete,
                    Nombre_Juguete: this.state.juguetes[i].Nombre,
                    Cantidad: 1,
                    Total: this.state.juguetes[i].Precio
                }
                this.setState({
                    form: {
                        ...this.state.form,
                        total: this.state.form.total + this.state.juguetes[i].Precio
                    }
                })
                this.state.deseos.push(deseo);
            }
        }
        console.log(this.state.deseos)
        console.log(this.state.form.total)
    }
    quitarDeseo = async (numero) => {
        console.log(numero)
        for (var i = 0; i < this.state.deseos.length; i++) {
            if (this.state.deseos[i].ID_Juguete == numero) {
                this.setState({
                    form: {
                        ...this.state.form,
                        total: this.state.form.total - this.state.deseos[i].Total
                    }
                })
                this.state.deseos.splice(i, 1)
                break;
            }
        }
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });

        console.log(this.state.form);
    }

    enviarCarta = async () => {
        var carta={};
        if (this.state.form.total <= this.state.hijo.Bastones && this.state.deseos.length>0 && this.state.form.descripcion!='') {
            await axios.post(urlServer+`/hijoCarta/carta`,{
                nickname:this.state.hijo.Nickname,
                descripcion:this.state.form.descripcion,
                total:this.state.form.total
            }).then(response=>{
                carta = response.data;
                alert("Carta Enviada")
            }).catch(error=>{
                alert(error)
            });
            for (var i = 0; i < this.state.deseos.length; i++) {
                await axios.post(urlServer+`/hijoDeseo/deseos`,{
                    juguete:this.state.deseos[i].ID_Juguete,
                    carta:carta.id_carta,
                    cantidad:this.state.deseos[i].Cantidad,
                    total:this.state.deseos[i].Total
                }).then(response=>{
                    console.log(response.data);
                }).catch(error=>{
                    alert(error);
                });
            }

        } else {
            alert("No se envio carta por una de las siguientes razones\n1. No cuenta con los bastones necesarios\n2. La carta esta vacia\n3. La lista de deseos esta vacia")
        }
    }
    componentDidMount = async () => {
        this.load();
    }

    cargarJuguetes = async () => {
        if (this.state.form.categoria != '' || this.state.form.categoria != 'todo' || this.state.form.categoria != 'todos') {
            await axios.post(urlServer + `/hijoJuguetes/juguetes`, {
                categoria: this.state.form.categoria,
                dinero: this.state.padre.Dinero
            }).then(response => {
                this.setState({ juguetes: response.data });
                console.log(response.data)
            }).catch(error => {
                alert(error);
            })
        } else {

            await axios.post(urlServer + `/hijoJuguetes/juguetes`, {
                categoria: "todo",
                edad: this.state.hijo.Edad,
                dinero: this.state.padre.Dinero
            }).then(response => {
                this.setState({ juguetes: response.data });
                console.log(response.data)
            }).catch(error => {
                alert(error);
            })
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
        await axios.get(urlServer + `/recuperarPadre/recuperarPadre/${this.state.hijo.Padre}`)
            .then(response => {
                this.setState({ padre: response.data })
            }).catch(error => {
                alert(error);
            })
        this.cargarJuguetes();
    }
    render() {
        return (
            <div className="FondoHijo">
                <Navegacion/>
                <div className="App-header-Redactar">
                    <div id="growth3">
                        <h2><Badge pill variant="danger" id="bastones">Bastones: {this.state.hijo.Bastones} </Badge></h2>
                        <h6><Badge pill variant="danger" id="nombreCarta">
                            {this.state.hijo.Nickname}
                        </Badge></h6>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" id="carta" rows={14} cols={77} name="descripcion" onChange={this.handleChange}/>
                            </Form.Group>
                        </Form>
                        <Button id="btnEnviar" variant="danger" onClick={() => this.enviarCarta()}>
                            Enviar Carta
                        </Button>
                    </div>
                    <div id="growth4">
                        <div id="growth2">
                            <h2><Badge pill variant="primary">Lista Deseos </Badge></h2>
                            <h2><Badge pill variant="primary">Total: {this.state.form.total} </Badge></h2>
                            {this.state.deseos.map(country => {
                                return (<Card >
                                    <Card.Header><Badge variant="primary">ID: {country.ID_Juguete}</Badge></Card.Header>
                                    <Card.Body>
                                        <Card.Title><Badge variant="primary">{country.Nombre_Juguete}</Badge></Card.Title>
                                        <Card.Text>
                                            <Badge variant="primary">Cantidad: {country.Cantidad}</Badge>
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => this.quitarDeseo(country.ID_Juguete)}>Quitar</Button>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">Total: {country.Total}</Card.Footer>
                                </Card>)
                            })}
                        </div>
                        <div id="growth5">
                            <Form>
                                <h2><Badge pill variant="primary">Juguetes </Badge></h2>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Ingrese Categoria" name="categoria" onChange={this.handleChange} />
                                    <Form.Text className="text-muted" >
                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" onClick={() => this.cargarJuguetes()}>
                                    Buscar
                                </Button>
                            </Form>

                            {this.state.juguetes.map(country => {
                                return (<Card >
                                    <Card.Header><Badge variant="primary">ID: {country.ID_Juguete}</Badge></Card.Header>
                                    <Card.Body>
                                        <Card.Title><Badge variant="primary">{country.Nombre}</Badge></Card.Title>
                                        <Card.Text>
                                            <Badge variant="primary">Precio: {country.Precio}  Edad: {country.Edad}</Badge>
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => this.agregarListaDeseos(country.ID_Juguete)}>Agregar</Button>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">Categoria: {country.Categoria}</Card.Footer>
                                </Card>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RedactarCarta;