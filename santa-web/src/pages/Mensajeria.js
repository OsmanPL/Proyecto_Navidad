import Badge from 'react-bootstrap/Badge';
import Navegacion from '../components/Navegacion';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import PS from '../img/elfo.png';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import '../App.css';

const urlServer = `http://localhost:3000`;

class Mensajeria extends Component {
    state = {
        form: {
            mensaje: ''
        },
        hijo: {},
        conversacion: {},
        mensajes:[],
        padre: {}
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
    componentDidMount = async () => {
        this.load();
    }
    enviarMensaje = async ()=>{
        if (this.state.form.mensaje!=''){
            await axios.post(urlServer + `/hijoConversacion/enviarMensaje`,{
                conversacion:this.state.conversacion.ID_Conversacion,
                nickname:this.state.hijo.Nickname,
                mensaje:this.state.form.mensaje
            }).then(response=>{
                alert(JSON.stringify(response.data));
            }).catch(error=>{
                alert(error);
            })
        }else{
            alert("Debe escribir un mensaje para enviarlo")
        }
        this.state.form.mensaje='';
        this.cargarMensajes();

    }
    cargarMensajes = async () => {
        await axios.get(urlServer + `/hijoConversacion/conversacion/${this.state.hijo.Nickname}`)
            .then(response => {
                this.setState({ conversacion: response.data });
                this.setState({mensajes:this.state.conversacion.Mensajes})
            })
            .catch(error => {
                alert(error)
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
            this.cargarMensajes()
    }
    render() {
        return (
            <div className="FondoHijo">
                <Navegacion />
                <h1><Badge pill variant="primary">Mensajeria con Elfos</Badge></h1>
                <div className="App-header-Mensajeria">
                    <div id="elfo">
                        <Image src={PS} fluid />
                    </div>
                    <div id="mensajes">
                        <Form>
                            <Form.Row className="align-items-center">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control id="comentario" as="textarea" name="mensaje" onChange={this.handleChange} rows={1} cols={70} placeholder="Mensaje" />
                                </Form.Group>
                                <Button className="mb-2" onClick={()=>this.enviarMensaje()}>
                                    Enviar
                                </Button>
                            </Form.Row>
                        </Form>
                        {this.state.mensajes.map(mensaje => {
                            return (
                                <div id="mensaje">
                                    <Card>
                                        <Card.Body>
                                            <blockquote className="blockquote mb-0">
                                                <Badge pill variant="primary">{mensaje.Descripcion}</Badge>
                                                <footer className="blockquote-footer">
                                                    Enviado por:<cite title="Source Title">{mensaje.Emisor}</cite>
                                                </footer>
                                            </blockquote>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        )
    }
}

export default Mensajeria;