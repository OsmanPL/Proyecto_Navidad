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

const urlServer = `http://34.70.211.238:3000`;

class AdminSanta extends Component {
    state = {
        form: {
            usuario: '',
            password: ''
        },
        activo: false,
        tipoModal: '',
        ModalInsertar: false,
        santas: []
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
    cambio = (cambiar) => {
        this.setState({ activo: cambiar })
    }
    modalInsertar = () => {
        this.setState({ ModalInsertar: !this.state.ModalInsertar })
    }
    crearSanta = async () => {
        await axios.post(urlServer + `/adminPerfilSanta/crearSanta`, {
            usuario: this.state.form.usuario,
            password: this.state.form.password
        }).then(response => {
            alert(JSON.stringify(response.data));
            this.cargarSantas();
            this.modalInsertar();
        }).catch(error => {
            alert(error);
        })
        this.setState({
            form: {
                usuario: '',
                password: ''
            }, tipoModal:''
        })
    }
    eliminarSanta = async (usuario) => {
        await axios.delete(urlServer + `/adminPerfilSanta/eliminarSanta/${usuario}`)
            .then(response => {
                alert(JSON.stringify(response.data));
                this.cargarSantas();
            })
            .catch(error => {
                alert(error);
            })
    }
    actualizarSanta = async () => {
        await axios.put(urlServer + `/adminPerfilSanta/actualizarSanta`, {
            usuario: this.state.form.usuario,
            password: this.state.form.password
        }).then(response => {
            alert(JSON.stringify(response.data));
            this.cargarSantas();
            this.modalInsertar();
        }).catch(error => {
            alert(error);
        })
        this.setState({
            form: {
                usuario: '',
                password: ''
            }, tipoModal:''
        })
    }
    seleccionarSanta = (santa) => {
        this.setState({
             tipoModal: 'actualizar',
             form: {
                usuario: santa.Usuario,
                password: santa.Password,
             }
         })
    }
    cargarSantas = async () => {
        await axios.get(urlServer + `/adminPerfilSanta/getPerfilesSanta`)
            .then(response => {
                this.setState({ santas: response.data });
            })
            .catch(error => {
                alert(error);
            })
    }
    componentDidMount = async () => {
        this.load();
    }

    load = async () => {
        this.cargarSantas();
    }
    render() {
        const { form } = this.state;
        return (
            <div className="FondoAdmin">
                <NavegacionAdmin />
                <div className="App-header-admin-buenas">
                    <Button variant="success" id="btnCrearBuenaAccion" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar(); this.cambio(false) }}>Crear Santa</Button>
                    <div id="tablaBuenasAcciones">
                        <Table striped bordered hover variant="primary">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Password</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.santas.map(santa => {
                                    return (
                                        <tr>
                                            <th>{santa.Usuario}</th>
                                            <th>{santa.Password}</th>
                                            <td>
                                                <Button variant="primary" onClick={() => { this.seleccionarSanta(santa); this.modalInsertar(); this.cambio(true) }}>Editar</Button>
                                                <Button variant="danger" onClick={() => this.eliminarSanta(santa.Usuario)}>Eliminar</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <Modal show={this.state.ModalInsertar}>
                    <Modal.Header >
                        <Modal.Title>Formulario Santa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control size="sm" type="text" readOnly={this.state.activo} placeholder="Usuario" name="usuario" onChange={this.handleChange} value={form ? form.usuario : ''} />
                            <Form.Control size="sm" type="text" placeholder="Password" name="password" onChange={this.handleChange} value={form ? form.password : ''} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.modalInsertar()}>
                            Cancelar
                        </Button>
                        {this.state.tipoModal == 'insertar' ? <Button variant="success" onClick={() => this.crearSanta()}>
                            Insertar
                        </Button> : <Button variant="success" onClick={() => this.actualizarSanta()}>
                                Actualizar
                        </Button>}

                    </Modal.Footer>
                </Modal>
            </div >


        )
    }
}

export default AdminSanta;