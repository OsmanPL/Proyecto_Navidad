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
import { Bar } from 'react-chartjs-2';

const urlServer = `http://localhost:3000`;

class Reportes extends Component {
    state = {
        form: {
            nickname: ''
        },
        Modal1: false,
        Modal2: false,
        Modal3: false,
        Modal4: false,
        Modal5: false,
        Modal6: false,
        Modal7: false,
        reporte1: [],
        reporte2: [],
        reporte3: [],
        reporte4: [],
        reporte5: [],
        reporte6: [],
        reporte7: [],
        dataGrafica3: {
            labels: [],
            datasets: [{
                label: 'Ventas',
                backgroundColor: '#05DC74',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: '#0076EF',
                hoverBorderColor: 'white',
                data: []
            }]
        },
        opcionesGrafica3: {
            maintainAspectRatio: false,
            responsive: true
        },
        dataGrafica4: {
            labels: [],
            datasets: [{
                label: 'Realizada',
                backgroundColor: '#05DC74',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: '#0076EF',
                hoverBorderColor: 'white',
                data: []
            }]
        },
        opcionesGrafica4: {
            maintainAspectRatio: false,
            responsive: true
        },
        dataGrafica6: {
            labels: [],
            datasets: [{
                label: 'Compras',
                backgroundColor: '#05DC74',
                borderColor: 'black',
                borderWidth: 1,
                hoverBackgroundColor: '#0076EF',
                hoverBorderColor: 'white',
                data: []
            }]
        },
        opcionesGrafica6: {
            maintainAspectRatio: false,
            responsive: true
        }
    }
    llenarGrafica3 = () => {
        for (let i = 0; i < this.state.reporte3.length; i++) {
            this.state.dataGrafica3.labels.push(this.state.reporte3[i].Municipio);
            this.state.dataGrafica3.datasets[0].data.push(this.state.reporte3[i].Cantidad);
        }
    }
    llenarGrafica4 = () => {
        for (let i = 0; i < this.state.reporte4.length; i++) {
            this.state.dataGrafica4.labels.push(this.state.reporte4[i].ID_BuenaAccion + ' - ' + this.state.reporte4[i].Titulo);
            this.state.dataGrafica4.datasets[0].data.push(this.state.reporte4[i].Cantidad);
        }
    }
    llenarGrafica6 = () => {
        for (let i = 0; i < this.state.reporte6.length; i++) {
            this.state.dataGrafica6.labels.push(this.state.reporte6[i].Categoria);
            this.state.dataGrafica6.datasets[0].data.push(this.state.reporte6[i].Cantidad);
        }
    }
    modal1 = async () => {
        this.setState({ Modal1: !this.state.Modal1 })
    }
    modal2 = () => {
        this.setState({ Modal2: !this.state.Modal2 })
    }
    modal3 = () => {
        this.setState({ Modal3: !this.state.Modal3 })
    }
    modal4 = () => {
        this.setState({ Modal4: !this.state.Modal4 })
    }
    modal5 = () => {
        this.setState({ Modal5: !this.state.Modal5 })
    }
    modal6 = () => {
        this.setState({ Modal6: !this.state.Modal6 })
    }
    modal7 = () => {
        this.setState({ Modal7: !this.state.Modal7 })
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
    cargarBitacora = async () => {
        await axios.post(urlServer + `/reportes2/bitacora`, {
            nickname: this.state.form.nickname
        })
            .then(response => {
                this.setState({ reporte5: response.data });
            })
            .catch(error => {
                alert(error);
            })
    }
    cargarReportes = async () => {

        await axios.get(urlServer + `/reportes1/top10Productos`)
            .then(response => {
                this.setState({ reporte1: response.data });
            })
            .catch(error => {
                alert(error);
            })
        await axios.post(urlServer + `/reportes1/top10Departamentos`)
            .then(response => {
                this.setState({ reporte2: response.data });
            })
            .catch(error => {
                alert(error);
            })
        await axios.put(urlServer + `/reportes1/top10Municipios`)
            .then(response => {
                this.setState({ reporte3: response.data });
            })
            .catch(error => {
                alert(error);
            })
        await axios.delete(urlServer + `/reportes1/top5BuenasAccions`)
            .then(response => {
                this.setState({ reporte4: response.data });
            })
            .catch(error => {
                alert(error);
            })

        await axios.get(urlServer + `/reportes2/top5Categoria`)
            .then(response => {
                this.setState({ reporte6: response.data });
            })
            .catch(error => {
                alert(error);
            })
        await axios.put(urlServer + `/reportes2/topCartas`)
            .then(response => {
                this.setState({ reporte7: response.data });
            })
            .catch(error => {
                alert(error);
            })
        this.llenarGrafica3();
        this.llenarGrafica4();
        this.llenarGrafica6();
        alert("Lleno todos los reportes")
    }
    componentDidMount = async () => {
        this.load();
    }

    load = async () => {
        this.cargarReportes();
    }
    render() {
        return (
            <div className="FondoAdmin">
                <NavegacionAdmin />
                <div className="App-header-admin-buenas">
                    <div id="tablaBuenasAcciones">
                        <Table striped bordered hover variant="primary">
                            <thead>
                                <tr>
                                    <th>Nombre del Reporte</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Top 10 de productos más comprados</td>
                                    <td>
                                        <Button variant="success" onClick={() => this.modal1()}>Mostrar Reporte</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Top 10 de departamentos con más ventas</td>
                                    <td>
                                        <Button variant="success" onClick={() => this.modal2()}>Mostrar Reporte</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Top 10 de municipios con más ventas</td>
                                    <td>
                                        <Button variant="success" onClick={() => this.modal3()}>Mostrar Reporte</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Top 5 de buenas acciones más realizadas</td>
                                    <td>
                                        <Button variant="success" onClick={() => this.modal4()}>Mostrar Reporte</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Bitácora de respuestas a publicaciones de santa por niño</td>
                                    <td>
                                        <Button variant="success" onClick={() => this.modal5()}>Mostrar Reporte</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Top 5 de categorías con más compras</td>
                                    <td>
                                        <Button variant="success" onClick={() => this.modal6()}>Mostrar Reporte</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Top de cartas con mayor gasto de bastones</td>
                                    <td>
                                        <Button variant="success" onClick={() => this.modal7()}>Mostrar Reporte</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
                <Modal show={this.state.Modal1}>
                    <Modal.Header >
                        <Modal.Title>Top 10 de productos más comprados</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>ID_JUGUETE</th>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.reporte1.map(reporte => {
                                    return (
                                        <tr>
                                            <th>{reporte.ID_Juguete}</th>
                                            <th>{reporte.Nombre}</th>
                                            <th>{reporte.Cantidad}</th>
                                        </tr>)
                                })}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.modal1()}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.Modal2}>
                    <Modal.Header >
                        <Modal.Title>Top 10 de departamentos con más ventas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Departamento</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.reporte2.map(reporte => {
                                    return (
                                        <tr>
                                            <th>{reporte.Departamento}</th>
                                            <th>{reporte.Cantidad}</th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.modal2()}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.Modal3}>
                    <Modal.Header >
                        <Modal.Title>Top 10 de municipios con más ventas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ width: '100%', height: '300px' }}>

                            <Bar data={this.state.dataGrafica3} options={this.state.opcionesGrafica3} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.modal3()}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.Modal4}>
                    <Modal.Header >
                        <Modal.Title>Top 5 de buenas acciones más realizadas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ width: '100%', height: '300px' }}>

                            <Bar data={this.state.dataGrafica4} options={this.state.opcionesGrafica4} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.modal4()}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.Modal5}>
                    <Modal.Header >
                        <Modal.Title>Bitácora de respuestas a publicaciones de santa por niño</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control size="sm" type="text" placeholder="Nickname" name="nickname" onChange={this.handleChange} />
                        </Form.Group>
                        <Button variant="primary" onClick={() => this.cargarBitacora()}>
                            Ver
                        </Button>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>ID_Comentario</th>
                                    <th>Hijo</th>
                                    <th>Comentario</th>
                                    <th>ID_Publicacion</th>
                                    <th>Publicacion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.reporte5.map(reporte => {
                                    return (<tr>
                                        <th>{reporte.ID_Comentario}</th>
                                        <th>{reporte.Hijo}</th>
                                        <th>{reporte.Comentario}</th>
                                        <th>{reporte.ID_Publicacion}</th>
                                        <th>{reporte.Publicacion}</th>
                                    </tr>)
                                })}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.modal5()}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.Modal6}>
                    <Modal.Header >
                        <Modal.Title>Top 5 de categorías con más compras</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ width: '100%', height: '300px' }}>

                            <Bar data={this.state.dataGrafica6} options={this.state.opcionesGrafica6} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.modal6()}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.Modal7}>
                    <Modal.Header >
                        <Modal.Title>Top de cartas con mayor gasto de bastones</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>ID_Carta</th>
                                    <th>Hijo</th>
                                    <th>Padre</th>
                                    <th>Descripcion</th>
                                    <th>Estado</th>
                                    <th>Precio Total</th>
                                    <th>Fecha de Envio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.reporte7.map(reporte => {
                                    return (
                                        <tr>
                                            <th>{reporte.ID_Carta}</th>
                                            <th>{reporte.Hijo_FK}</th>
                                            <th>{reporte.Padre_FK}</th>
                                            <th>{reporte.Descripcion}</th>
                                            <th>{reporte.Estado}</th>
                                            <th>{reporte.PrecioTotal}</th>
                                            <th>{reporte.FechaEnvia}</th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => this.modal7()}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div >


        )
    }
}

export default Reportes;