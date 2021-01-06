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

class AdminHijo extends Component {
    state = {
        form: {
            nickname: '',
            nombre: '',
            sexo: 'Masculino',
            password: '',
            bastones: '',
            padre:'',
            dia: '',
            mes: '',
            año: ''
        },
        activo: false,
        tipoModal: '',
        ModalInsertar: false,
        hijos: []
    }
    dias31 = [
        { val: '1', desc: '1' },
        { val: '2', desc: '2' },
        { val: '3', desc: '3' },
        { val: '4', desc: '4' },
        { val: '5', desc: '5' },
        { val: '6', desc: '6' },
        { val: '7', desc: '7' },
        { val: '8', desc: '8' },
        { val: '9', desc: '9' },
        { val: '10', desc: '10' },
        { val: '11', desc: '11' },
        { val: '12', desc: '12' },
        { val: '13', desc: '13' },
        { val: '14', desc: '14' },
        { val: '15', desc: '15' },
        { val: '16', desc: '16' },
        { val: '17', desc: '17' },
        { val: '18', desc: '18' },
        { val: '19', desc: '19' },
        { val: '20', desc: '20' },
        { val: '21', desc: '21' },
        { val: '22', desc: '22' },
        { val: '23', desc: '23' },
        { val: '24', desc: '24' },
        { val: '25', desc: '25' },
        { val: '26', desc: '26' },
        { val: '27', desc: '27' },
        { val: '28', desc: '28' },
        { val: '29', desc: '29' },
        { val: '30', desc: '30' },
        { val: '31', desc: '31' },
    ]

    mes = [
        { val: '1', desc: 'Enero' },
        { val: '2', desc: 'Febrero' },
        { val: '3', desc: 'Marzo' },
        { val: '4', desc: 'Abril' },
        { val: '5', desc: 'Mayo' },
        { val: '6', desc: 'Junio' },
        { val: '7', desc: 'Julio' },
        { val: '8', desc: 'Agosto' },
        { val: '9', desc: 'Septiembre' },
        { val: '10', desc: 'Octubre' },
        { val: '11', desc: 'Noviembre' },
        { val: '12', desc: 'Diciembre' }
    ]
    options = [
        { val: '2002', desc: '2002' },
        { val: '2003', desc: '2003' },
        { val: '2004', desc: '2004' },
        { val: '2005', desc: '2005' },
        { val: '2006', desc: '2006' },
        { val: '2007', desc: '2007' },
        { val: '2008', desc: '2008' },
        { val: '2009', desc: '2009' },
        { val: '2010', desc: '2010' },
        { val: '2011', desc: '2011' },
        { val: '2012', desc: '2012' },
        { val: '2013', desc: '2013' },
        { val: '2014', desc: '2014' },
        { val: '2015', desc: '2015' },
        { val: '2016', desc: '2016' },
        { val: '2017', desc: '2017' },
        { val: '2018', desc: '2018' },
        { val: '2019', desc: '2019' },
        { val: '2020', desc: '2020' }
    ]
    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });

        console.log(this.state.form);
    }
    cambio =(cambiar)=>{
        this.setState({ activo: cambiar})
    }
    modalInsertar = () => {
        this.setState({ ModalInsertar: !this.state.ModalInsertar })
    }
    crearHijo = async () => {
        await axios.post(urlServer + `/adminPerfilHijo/crearHijo`,{
            nickname: this.state.form.nickname,
            password: this.state.form.password,
            nombre: this.state.form.nombre,
            sexo: this.state.form.sexo,
            fecha: this.state.form.dia+'/'+this.state.form.mes+'/'+this.state.form.año,
            padre:this.state.form.padre,
            bastones: this.state.form.bastones,
        }).then(response=>{
            this.modalInsertar();
            this.cargarHijos();
            alert(JSON.stringify(response.data));
        }).catch(error=>{
            alert(error);
        })
        this.setState({from:{
            nickname: '',
            nombre: '',
            sexo: 'Masculino',
            password: '',
            bastones: '',
            padre:'',
            dia: '',
            mes: '',
            año: ''
        }, tipoModal:''});
    }
    eliminarHijo = async (nickname) => {
        await axios.delete(urlServer + `/adminPerfilHijo/eliminarHijo/${nickname}`)
            .then(response => {
                this.cargarHijos();
                alert(JSON.stringify(response.data))
            })
            .catch(error => {
                alert(error);
            })
    }
    actualizarHijo = async () => {
        await axios.put(urlServer + `/adminPerfilHijo/actualizarHijo`,{
            nickname: this.state.form.nickname,
            password: this.state.form.password,
            nombre: this.state.form.nombre,
            sexo: this.state.form.sexo,
            fecha: this.state.form.dia+'/'+this.state.form.mes+'/'+this.state.form.año,
            bastones: this.state.form.bastones,
        }).then(response=>{
            this.modalInsertar();
            this.cargarHijos();
            alert(JSON.stringify(response.data));
        }).catch(error=>{
            alert(error);
        })
        this.setState({from:{
            nickname: '',
            nombre: '',
            sexo: 'Masculino',
            password: '',
            bastones: '',
            padre:'',
            dia: '',
            mes: '',
            año: ''
        }, tipoModal:''});
    }
    seleccionarHijo = (hijo) => {
        let fecha = hijo.Fecha_Nacimiento.split('/');
        this.setState({
            tipoModal: 'actualizar',
            form: {
                nickname: hijo.Nickname,
                nombre: hijo.Nombre,
                sexo: hijo.Sexo,
                password: hijo.Password,
                bastones: hijo.Bastones,
                padre:hijo.Padre,
                dia: fecha[0],
                mes: fecha[1],
                año: fecha[2]
            }
        })
    }
    cargarHijos = async () => {
        await axios.get(urlServer + `/adminPerfilHijo/getHijos`)
            .then(response => {
                this.setState({ hijos: response.data });
            })
            .catch(error => {
                alert(error);
            })
    }
    componentDidMount = async () => {
        this.load();
    }

    load = async () => {
        this.cargarHijos();
    }
    render() {
        const { form } = this.state;
        return (
            <div className="FondoAdmin">
                <NavegacionAdmin />
                <div className="App-header-admin-buenas">
                    <Button variant="success" id="btnCrearBuenaAccion" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' });this.cambio(false); this.modalInsertar() }}>Crear Hijo</Button>
                    <div id="tablaBuenasAcciones">
                        <Table striped bordered hover variant="primary">
                            <thead>
                                <tr>
                                    <th>Nickname</th>
                                    <th>Nombre</th>
                                    <th>Sexo</th>
                                    <th>Fecha</th>
                                    <th>Edad</th>
                                    <th>Password</th>
                                    <th>Bastones</th>
                                    <th>Correo del Padre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.hijos.map(hijo => {
                                    return (
                                        <tr>
                                            <td>{hijo.Nickname}</td>
                                            <td>{hijo.Nombre}</td>
                                            <td>{hijo.Sexo}</td>
                                            <td>{hijo.Fecha_Nacimiento}</td>
                                            <td>{hijo.Edad}</td>
                                            <td>{hijo.Password}</td>
                                            <td>{hijo.Bastones}</td>
                                            <td>{hijo.Padre}</td>
                                            <td>
                                                <Button variant="primary" onClick={() => { this.seleccionarHijo(hijo); this.modalInsertar();this.cambio(true) }}>Editar</Button>
                                                <Button variant="danger" onClick={() => this.eliminarHijo(hijo.Nickname)}>Eliminar</Button>
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
                        <Modal.Title>Formulario Hijo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control size="sm" type="text" readOnly={this.state.activo}  placeholder="Nickname" name="nickname" onChange={this.handleChange} value={form ? form.nickname : ''} />
                            <Form.Control size="sm" type="text" placeholder="Nombre" name="nombre" onChange={this.handleChange} value={form ? form.nombre : ''} />
                            <Form.Control as="select" size="lg" onChange={this.handleChange} name="sexo" value={form ? form.sexo : 'Masculino'}>
                                <option>Masculino</option>
                                <option>Femenino</option>
                            </Form.Control>
                            <Form.Control size="sm" type="text" placeholder="Password" name="password" onChange={this.handleChange} value={form ? form.password : ''} />
                            <Form.Control size="sm" type="text" placeholder="Cantidad de Bastones" name="bastones" onChange={this.handleChange} value={form ? form.bastones : ''} />
                            <Form.Control size="sm" type="text" readOnly={this.state.activo} placeholder="Correo del Padre" name="padre" onChange={this.handleChange} value={form ? form.padre : ''} />
                            <Form.Label><Badge variant="light">Fecha Nacimiento Hijo</Badge></Form.Label>
                            <Form.Row>
                                <Form.Group as={col} controlId="formBasicEmail">
                                    <Form.Control as="select" size="lg" value={form ? form.dia : 1} onChange={this.handleChange} name="dia">
                                        {this.dias31.map(country => <option key={country.val} value={country.val}>{country.desc}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={col} controlId="formBasicEmail">
                                    <Form.Control as="select" size="lg" value={form ? form.mes : 1} onChange={this.handleChange} name="mes">
                                        {this.mes.map(country => <option key={country.val} value={country.val}>{country.desc}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={col} controlId="formBasicEmail">
                                    <Form.Control as="select" size="lg" value={form ? form.año : 2002} onChange={this.handleChange} name="año">
                                        {this.options.map(country => <option key={country.val} value={country.val}>{country.desc}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.modalInsertar()}>
                            Cancelar
                        </Button>
                        {this.state.tipoModal == 'insertar' ? <Button variant="success" onClick={() => this.crearHijo()}>
                            Insertar
                        </Button> : <Button variant="success" onClick={() => this.actualizarHijo()}>
                                Actualizar
                        </Button>}

                    </Modal.Footer>
                </Modal>
            </div >


        )
    }
}

export default AdminHijo;