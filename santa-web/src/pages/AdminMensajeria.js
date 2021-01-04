import renos from '../img/renos.png';
import PerfilHijo from '../components/PerfilHijo';
import Badge from 'react-bootstrap/Badge';
import col from 'react-bootstrap/Col';
import NavegacionAdmin from '../components/NavegacionAdmin';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import '../App.css';
import axios from 'axios';

const urlServer = `http://localhost:3000`;

class AdminMnesajeria extends Component {
    state = {
        form: {
            id: '',
            mensaje: ''
        },
        activo: true,
        conversaciones: [],
        mensajes:[]
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
    enviarMensaje = async () => {
        await axios.post(urlServer+ `/adminConversacion/enviarMensaje`,{
            conversacion: this.state.form.id, 
            mensaje : this.state.form.mensaje
        }).then(response=>{
            alert(JSON.stringify(response.data));
            this.cargarConversaciones();
            this.setState({mensajes:this.state.mensajes});
        }).catch(error=>{
            alert(error)
        });
    }
    seleccionarMensajes = (conversacion) => {
        this.setState({
             tipoModal: 'actualizar',
             form: {
                id: conversacion.ID_Conversacion,
                mensaje: '',
                emisor: 'Administrador'
             },
             mensajes: conversacion.Mensajes,
             activo:false
         })
    }
    cargarConversaciones = async () => {
        await axios.put(urlServer + `/adminConversacion/getMensajes`)
            .then(response => {
                this.setState({ conversaciones: response.data });
            })
            .catch(error => {
                alert(error);
            })
    }
    componentDidMount = async () => {
        this.load();
    }

    load = async () => {
        this.cargarConversaciones();
    }
    render() {
        const { form } = this.state;
        return (
            <div className="FondoAdmin">
                <NavegacionAdmin />
                <div className="App-header-admin-buenas">
                   <div id="tablaMensajes">
                        <Table striped bordered hover variant="primary">
                            <thead>
                                <tr>
                                    <th>ID Conversacion</th>
                                    <th>Niño</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.conversaciones.map(conversacion => {
                                    return (
                                        <tr>
                                            <th>{conversacion.ID_Conversacion}</th>
                                            <th>{conversacion.Hijo_FK}</th>
                                            <td>
                                                <Button variant="primary" onClick={() => this.seleccionarMensajes(conversacion)}>Ver Mensajes</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                    <div id="mensajes">
                        <Form>
                            <Form.Row className="align-items-center">
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control id="comentario" readOnly={this.state.activo} as="textarea" name="mensaje" onChange={this.handleChange} rows={1} cols={70} placeholder="Mensaje" />
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
            </div >


        )
    }
}

export default AdminMnesajeria;