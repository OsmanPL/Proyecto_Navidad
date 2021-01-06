import renos from '../img/renos.png';
import PerfilHijo from '../components/PerfilHijo';
import Badge from 'react-bootstrap/Badge';
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

class BuenasAcciones extends Component {
    state = {
        form: {
            id: 0,
            descripcion: '',
            titulo: '',
            recompensa: 0,
            edad: 0
        },
        tipoModal:'',
        ModalInsertar: false,
        BuenasAcciones: []
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
    modalInsertar = () => {
        this.setState({ ModalInsertar: !this.state.ModalInsertar })
    }
    crearBuenaAccion = async () => {
        await axios.post(urlServer + `/adminBuenasAcciones/crearBuenaAccion`, {
            titulo: this.state.form.titulo,
            descripcion: this.state.form.descripcion,
            recompensa: this.state.form.recompensa,
            edad: this.state.form.edad
        }).then(response => {
            this.modalInsertar();
            this.cargarBuenasAcciones();
            alert(JSON.stringify(response.data));
        }).catch(error => {
            alert(error);
        })
        this.setState({form:{
            id: 0,
            descripcion: '',
            titulo: '',
            recompensa: 0,
            edad: 0
        }, tipoModal:''});
    }
    eliminarBuenaAccion=async(idAccion)=>{
        console.log(idAccion)
        await axios.delete(urlServer+`/adminBuenasAcciones/eliminarBuenaAccion/${idAccion}`)
        .then(response => {
            this.cargarBuenasAcciones();
            alert(JSON.stringify(response.data));
        })
        .catch(error => {
            alert(error);
        })
    }
    actualizarBuenaAccion=async()=>{
        await axios.put(urlServer + `/adminBuenasAcciones/actualizarBuenaAccion`, {
            id:this.state.form.id,
            titulo: this.state.form.titulo,
            descripcion: this.state.form.descripcion,
            recompensa: this.state.form.recompensa,
            edad: this.state.form.edad
        }).then(response => {
            this.modalInsertar();
            this.cargarBuenasAcciones();
            alert(JSON.stringify(response.data));
        }).catch(error => {
            alert(error);
        })
        this.setState({form:{
            id: 0,
            descripcion: '',
            titulo: '',
            recompensa: 0,
            edad: 0
        }, tipoModal:''});
    }
    seleccionrBuenaAccion = (buenaAccion) => {
        this.setState({
            tipoModal:'actualizar',
            form: {
                id: buenaAccion.ID_BuenaAccion,
                descripcion: buenaAccion.Descripcion,
                titulo: buenaAccion.Titulo,
                recompensa: buenaAccion.Recompensa,
                edad: buenaAccion.Edad
            }
        })
    }
    cargarBuenasAcciones = async () => {
        await axios.get(urlServer + `/adminBuenasAcciones/buenasAcciones`)
            .then(response => {
                this.setState({ BuenasAcciones: response.data });
            })
            .catch(error => {
                alert(error);
            })
    }
    componentDidMount = async () => {
        this.load();
    }

    load = async () => {
        this.cargarBuenasAcciones();
    }
    render() {
        const { form } = this.state;
        return (
            <div className="FondoAdmin">
                <NavegacionAdmin />
                <div className="App-header-admin-buenas">
                    <Button variant="success" id="btnCrearBuenaAccion" onClick={() => {this.setState({form:null,tipoModal:'insertar'});this.modalInsertar()}}>Crear Buena Accion</Button>
                    <div id="tablaBuenasAcciones">
                        <Table striped bordered hover variant="primary">
                            <thead>
                                <tr>
                                    <th>ID_BuenaAccion</th>
                                    <th>Titulo</th>
                                    <th>Descripcion</th>
                                    <th>Recompensa</th>
                                    <th>Edad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.BuenasAcciones.map(buenaAccion => {
                                    return (
                                        <tr>
                                            <td>{buenaAccion.ID_BuenaAccion}</td>
                                            <td>{buenaAccion.Titulo}</td>
                                            <td>{buenaAccion.Descripcion}</td>
                                            <td>{buenaAccion.Recompensa}</td>
                                            <td>{buenaAccion.Edad}</td>
                                            <td>
                                                <Button variant="primary" onClick={()=>{this.seleccionrBuenaAccion(buenaAccion);this.modalInsertar()}}>Editar</Button>
                                                <Button variant="danger" onClick={()=>this.eliminarBuenaAccion(buenaAccion.ID_BuenaAccion)}>Eliminar</Button>
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
                        <Modal.Title>Formulario Buenas Acciones</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control size="sm" type="text" placeholder="ID" name="id" readOnly onChange={this.handleChange} value={form?form.id:''} />
                            <Form.Control size="sm" type="text" placeholder="Titulo" name="titulo" onChange={this.handleChange} value={form?form.titulo:''} />
                            <Form.Control size="sm" type="text" placeholder="Descripcion" name="descripcion" onChange={this.handleChange} value={form?form.descripcion:''} />
                            <Form.Control size="sm" type="text" placeholder="Recompensa" name="recompensa" onChange={this.handleChange} value={form?form.recompensa:''} />
                            <Form.Control size="sm" type="text" placeholder="Edad" name="edad" onChange={this.handleChange} value={form?form.edad:''} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.modalInsertar()}>
                            Cancelar
                        </Button>
                        {this.state.tipoModal=='insertar'?<Button variant="success" onClick={() => this.crearBuenaAccion()}>
                            Insertar
                        </Button>:<Button variant="success" onClick={() => this.actualizarBuenaAccion()}>
                            Actualizar
                        </Button>}
                        
                    </Modal.Footer>
                </Modal>
            </div >


        )
    }
}

export default BuenasAcciones;