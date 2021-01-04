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

const urlServer = `http://localhost:3000`;

class Productos extends Component {
    state = {
        form: {
            id: 0,
            nombre: '',
            categoria: '',
            precio: 0,
            edad: 0
        },
        tipoModal:'',
        ModalInsertar: false,
        Productos: []
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
    crearProducto = async () => {
        await axios.post(urlServer + `/adminProducto/crearProducto`,{
            nombre:this.state.form.nombre,
            categoria:this.state.form.categoria,
            precio:this.state.form.precio,
            imagen:null,
            edad:this.state.form.edad
        }).then(response=>{
            this.modalInsertar();
            this.cargarProductos();
            alert(JSON.stringify(response.data));
        }).catch(error => {
            alert(error);
        })
        this.setState({form:{
            id: 0,
            nombre: '',
            categoria: '',
            precio: 0,
            edad: 0
        }, tipoModal:''});
    }
    eliminarProducto=async(idAccion)=>{
        console.log(idAccion)
        await axios.delete(urlServer+`/adminProducto/eliminarProducto/${idAccion}`)
        .then(response => {
            this.cargarProductos();
            alert(JSON.stringify(response.data));
        })
        .catch(error => {
            alert(error);
        })
    }
    actualizarProducto=async()=>{
        await axios.put(urlServer + `/adminProducto/actualizarProducto`,{
            id:this.state.form.id,
            nombre:this.state.form.nombre,
            categoria:this.state.form.categoria,
            precio:this.state.form.precio,
            imagen:null,
            edad:this.state.form.edad
        }).then(response=>{
            this.modalInsertar();
            this.cargarProductos();
            alert(JSON.stringify(response.data));
        }).catch(error => {
            alert(error);
        })
        this.setState({form:{
            id: 0,
            nombre: '',
            categoria: '',
            precio: 0,
            edad: 0
        }, tipoModal:''});
    }
    seleccionarProducto = (producto) => {
        this.setState({
            tipoModal:'actualizar',
           form: {
                id: producto.ID_Juguete,
                nombre: producto.Nombre,
                categoria: producto.Categoria,
                precio: producto.Precio,
                edad: producto.Edad
            }
        })
    }
    cargarProductos = async () => {
        await axios.get(urlServer + `/adminProducto/getProductos`)
            .then(response => {
                this.setState({ Productos: response.data });
            })
            .catch(error => {
                alert(error);
            })
    }
    componentDidMount = async () => {
        this.load();
    }

    load = async () => {
        this.cargarProductos();
    }
    render() {
        const { form } = this.state;
        return (
            <div className="FondoAdmin">
                <NavegacionAdmin />
                <div className="App-header-admin-buenas">
                    <Button variant="success" id="btnCrearBuenaAccion" onClick={() => {this.setState({form:null,tipoModal:'insertar'});this.modalInsertar()}}>Crear Producto</Button>
                    <div id="tablaBuenasAcciones">
                        <Table striped bordered hover variant="primary">
                            <thead>
                                <tr>
                                    <th>ID_Producto</th>
                                    <th>Nombre</th>
                                    <th>Categoria</th>
                                    <th>Precio</th>
                                    <th>Edad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Productos.map(producto=>{
                                    return(
                                        <tr>
                                            <td>{producto.ID_Juguete}</td>
                                            <td>{producto.Nombre}</td>
                                            <td>{producto.Categoria}</td>
                                            <td>{producto.Precio}</td>
                                            <td>{producto.Edad}</td>
                                            <td>
                                                <Button variant="primary" onClick={()=>{this.seleccionarProducto(producto);this.modalInsertar()}}>Editar</Button>
                                                <Button variant="danger" onClick={()=>this.eliminarProducto(producto.ID_Juguete)}>Eliminar</Button>
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
                        <Modal.Title>Formulario Producto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control size="sm" type="text" placeholder="ID" name="id" readOnly onChange={this.handleChange} value={form?form.id:''} />
                            <Form.Control size="sm" type="text" placeholder="Nombre" name="nombre" onChange={this.handleChange} value={form?form.nombre:''} />
                            <Form.Control size="sm" type="text" placeholder="Categoria" name="categoria" onChange={this.handleChange} value={form?form.categoria:''} />
                            <Form.Control size="sm" type="text" placeholder="Precio" name="precio" onChange={this.handleChange} value={form?form.precio:''} />
                            <Form.Control size="sm" type="text" placeholder="Edad" name="edad" onChange={this.handleChange} value={form?form.edad:''} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.modalInsertar()}>
                            Cancelar
                        </Button>
                        {this.state.tipoModal=='insertar'?<Button variant="success" onClick={() => this.crearProducto()}>
                            Insertar
                        </Button>:<Button variant="success" onClick={() => this.actualizarProducto()}>
                            Actualizar
                        </Button>}
                        
                    </Modal.Footer>
                </Modal>
            </div >


        )
    }
}

export default Productos;