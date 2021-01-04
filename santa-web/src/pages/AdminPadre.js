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

class AdminPadre extends Component {
    state = {
        form: {
            correo: '',
            nombre: '',
            password: '',
            dinero: '',
            telefono: '',
            departamento: '',
            municipio: '',
            descripcion: '',
            latitud: '',
            longitud: ''
        },
        activo: false,
        tipoModal: '',
        ModalInsertar: false,
        padres: []
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
    crearPadre = async () => {
        await axios.post(urlServer + `/adminPerfilPadre/crearPadre`, {
            correo: this.state.form.correo,
            password: this.state.form.password,
            nombre: this.state.form.nombre,
            telefono: this.state.form.telefono,
            dinero: this.state.form.dinero,
            departamento: this.state.form.departamento,
            municipio: this.state.form.municipio,
            descripcion: this.state.form.descripcion,
            latitud: this.state.form.latitud,
            longitud: this.state.form.longitud
        }).then(response => {
            alert(JSON.stringify(response.data));
            this.cargarPadres();
            this.modalInsertar();
        }).catch(error => {
            alert(error);
        })
        this.setState({
            form: {
                correo: '',
                nombre: '',
                password: '',
                dinero: '',
                telefono: '',
                departamento: '',
                municipio: '',
                descripcion: '',
                latitud: '',
                longitud: ''
            }, tipoModal:''
        })
    }
    eliminarPadre = async (correo) => {
        await axios.delete(urlServer + `/adminPerfilPadre/eliminarPadre/${correo}`)
            .then(response => {
                alert(JSON.stringify(response.data));
                this.cargarPadres();
            })
            .catch(error => {
                alert(error);
            })
    }
    actualizarPadre = async () => {
        await axios.put(urlServer + `/adminPerfilPadre/actualizarPadre`, {
            correo: this.state.form.correo,
            password: this.state.form.password,
            nombre: this.state.form.nombre,
            telefono: this.state.form.telefono,
            dinero: this.state.form.dinero,
            departamento: this.state.form.departamento,
            municipio: this.state.form.municipio,
            descripcion: this.state.form.descripcion,
            latitud: this.state.form.latitud,
            longitud: this.state.form.longitud
        }).then(response => {
            alert(JSON.stringify(response.data));
            this.cargarPadres();
            this.modalInsertar();
        }).catch(error => {
            alert(error);
        })
        this.setState({
            form: {
                correo: '',
                nombre: '',
                password: '',
                dinero: '',
                telefono: '',
                departamento: '',
                municipio: '',
                descripcion: '',
                latitud: '',
                longitud: ''
            }, tipoModal:''
        })
    }
    seleccionarPadre = (padre) => {
        this.setState({
             tipoModal: 'actualizar',
             form: {
                correo: padre.Correo,
                nombre: padre.Nombre,
                password: padre.Password,
                dinero: padre.Dinero,
                telefono: padre.Telefono,
                departamento: padre.Direccion.Departamento,
                municipio: padre.Direccion.Municipio,
                descripcion: padre.Direccion.Descripcion,
                latitud: padre.Direccion.Latitud,
                longitud: padre.Direccion.Longitud
             }
         })
    }
    cargarPadres = async () => {
        await axios.get(urlServer + `/adminPerfilPadre/getPadres`)
            .then(response => {
                this.setState({ padres: response.data });
            })
            .catch(error => {
                alert(error);
            })
    }
    componentDidMount = async () => {
        this.load();
    }

    load = async () => {
        this.cargarPadres();
    }
    render() {
        const { form } = this.state;
        return (
            <div className="FondoAdmin">
                <NavegacionAdmin />
                <div className="App-header-admin-buenas">
                    <Button variant="success" id="btnCrearBuenaAccion" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar(); this.cambio(false) }}>Crear Padre</Button>
                    <div id="tablaBuenasAcciones">
                        <Table striped bordered hover variant="primary">
                            <thead>
                                <tr>
                                    <th>Correo</th>
                                    <th>Nombre</th>
                                    <th>Password</th>
                                    <th>Dinero</th>
                                    <th>Telefono</th>
                                    <th>Departamento</th>
                                    <th>Municipio</th>
                                    <th>Descripcion</th>
                                    <th>Latitud</th>
                                    <th>Longitud</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.padres.map(padre => {
                                    return (
                                        <tr>
                                            <th>{padre.Correo}</th>
                                            <th>{padre.Nombre}</th>
                                            <th>{padre.Password}</th>
                                            <th>{padre.Dinero}</th>
                                            <th>{padre.Telefono}</th>
                                            <th>{padre.Direccion.Departamento}</th>
                                            <th>{padre.Direccion.Municipio}</th>
                                            <th>{padre.Direccion.Descripcion}</th>
                                            <th>{padre.Direccion.Latitud}</th>
                                            <th>{padre.Direccion.Longitud}</th>
                                            <td>
                                                <Button variant="primary" onClick={() => { this.seleccionarPadre(padre); this.modalInsertar(); this.cambio(true) }}>Editar</Button>
                                                <Button variant="danger" onClick={() => this.eliminarPadre(padre.Correo)}>Eliminar</Button>
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
                        <Modal.Title>Formulario Padre</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control size="sm" type="text" readOnly={this.state.activo} placeholder="Correo" name="correo" onChange={this.handleChange} value={form ? form.correo : ''} />
                            <Form.Control size="sm" type="text" placeholder="Nombre" name="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} />
                            <Form.Control size="sm" type="text" placeholder="Password" name="password" onChange={this.handleChange} value={form ? form.password : ''} />
                            <Form.Control size="sm" type="text" placeholder="Inversion" name="dinero" onChange={this.handleChange} value={form ? form.dinero : ''} />
                            <Form.Control size="sm" type="text" placeholder="Telefono" name="telefono" onChange={this.handleChange} value={form ? form.telefono : ''} />
                            <Form.Control size="sm" type="text" placeholder="Departamento" name="departamento" onChange={this.handleChange} value={form ? form.departamento : ''} />
                            <Form.Control size="sm" type="text" placeholder="Municipio" name="municipio" onChange={this.handleChange} value={form ? form.municipio : ''} />
                            <Form.Control size="sm" type="text" placeholder="Descripcion" name="descripcion" onChange={this.handleChange} value={form ? form.descripcion : ''} />
                            <Form.Control size="sm" type="text" placeholder="Latitud" name="latitud" onChange={this.handleChange} value={form ? form.latitud : ''} />
                            <Form.Control size="sm" type="text" placeholder="Longitud" name="longitud" onChange={this.handleChange} value={form ? form.longitud : ''} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.modalInsertar()}>
                            Cancelar
                        </Button>
                        {this.state.tipoModal == 'insertar' ? <Button variant="success" onClick={() => this.crearPadre()}>
                            Insertar
                        </Button> : <Button variant="success" onClick={() => this.actualizarPadre()}>
                                Actualizar
                        </Button>}

                    </Modal.Footer>
                </Modal>
            </div >


        )
    }
}

export default AdminPadre;