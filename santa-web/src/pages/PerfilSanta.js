import Badge from 'react-bootstrap/Badge';
import Navegacion from '../components/Navegacion';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import PS from '../img/perfilSanta.png';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import '../App.css';

const urlServer = `http://localhost:3000`;

class PerfilSanta extends Component {
    state = {
        form:{
            comentario:''
        },
        hijo: {},
        publicaciones: [],
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

    comentar = async (id)=>{
        if (this.state.form.comentario!=''){
            await axios.post(urlServer+`/hijoPublicacion/comentar`,
            {
                publicacion:id,
                nickname:this.state.hijo.Nickname,
                comentario:this.state.form.comentario
            }).then(response=>{
                alert(JSON.stringify(response.data));
            }).catch(error=>{
                alert(error);
            })
        }else{
            alert("Debe escribir un comentario")
        }

        this.state.form.comentario='';
        
    }

    cargarPublicaciones = async () => {
        await axios.get(urlServer + `/hijoPublicacion/publicaciones`)
            .then(response => {
                this.setState({ publicaciones: response.data });
            })
            .catch(error => {
                alert(error);
            })
            this.cargarPublicaciones()
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
        this.cargarPublicaciones()
    }
    render() {
        return (
            <div className="FondoHijo">
                <Navegacion />
                <div className="App-header-Perfil-Santa">
                    <h1><Badge pill variant="primary">Perfil de Santa</Badge></h1>
                    <Image src={PS} fluid />
                    <div id="publicaciones">
                        {this.state.publicaciones.map(publicacion => {
                            return (
                                <div id="publicacion">
                                    <Card>
                                        <Card.Header><Badge pill variant="primary">ID:{publicacion.ID_Publicacion}</Badge></Card.Header>
                                        <Card.Body>
                                            <blockquote className="blockquote mb-0">
                                                <Badge pill variant="primary">{publicacion.Publicacion}</Badge>
                                                <footer className="blockquote-footer">
                                                    Publicado por: <cite title="Source Title">{publicacion.Santa}</cite>
                                                </footer>
                                            </blockquote>
                                            <Accordion >
                                                <Card>
                                                    <Card.Header>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                            Comentarios
                                            </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey="0">
                                                        <Card.Body>
                                                            {publicacion.Comentarios.map(comentario => {
                                                                return (
                                                                    <Card>
                                                                        <Card.Header><Badge pill variant="primary">ID: {comentario.ID_Comentario}</Badge></Card.Header>
                                                                        <Card.Body>
                                                                            <blockquote className="blockquote mb-0">
                                                                                <Badge pill variant="primary">{comentario.Comentario}</Badge>
                                                                                <footer className="blockquote-footer">
                                                                                    Comentado por: <cite title="Source Title">{comentario.Hijo_FK}</cite>
                                                                                </footer>
                                                                            </blockquote>
                                                                        </Card.Body>
                                                                    </Card>
                                                                )
                                                            })}

                                                            <Form>
                                                                <Form.Row className="align-items-center">
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Control id="comentario" as="textarea" name="comentario" onChange={this.handleChange} rows={1} cols={150} placeholder="Comentario" />
                                                                    </Form.Group>
                                                                    <Button className="mb-2" onClick={()=>this.comentar(publicacion.ID_Publicacion)}>
                                                                        Comentar
                                                                    </Button>
                                                                </Form.Row>
                                                            </Form>
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            </Accordion>
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

export default PerfilSanta;