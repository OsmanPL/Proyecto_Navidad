import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';

const urlServer =`http://localhost:3000`;
class Login extends Component {
    state ={
        form:{
            user:'',
            password:''
        }
    }
    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value
            }
        });
    }

    iniciarSesion =async()=>{
        var valido={};
       await axios.get(urlServer+`/login/iniciarSesion/${this.state.form.user}/${this.state.form.password}`)
        .then(response=>{
            valido=response.data;
        })
        .catch(error=>{
            alert(error);
        })

        if(valido.auth==true){
            if(valido.tipo=='Hijo'){
                alert("Usuario Hijo "+valido.user+" ha iniciado sesion")
                window.location.href = `http://localhost:8001/hijo/${valido.user}`
            }else if(valido.tipo=='Administrador'){
                alert("Usuario Administrador "+valido.user+" ha iniciado sesion")
                window.location.href = `http://localhost:8001/administrador`
            }
        }
    }

    render() {
        return (

            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><Badge variant="danger">Usuario</Badge></Form.Label>
                    <Form.Control type="text" placeholder="Ingrese Usuario" name="user" onChange={this.handleChange} />
                    <Form.Text className="text-muted" >
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label><Badge variant="danger">Password</Badge></Form.Label>
                    <Form.Control type="password" placeholder="Ingrese Password" name="password" onChange={this.handleChange}/>
                </Form.Group>
                <Button variant="danger" onClick={()=>this.iniciarSesion()}>
                    Ingresar
                </Button>
                <a href="/registro"> <Button variant="danger">
                   Registrarse
                </Button></a>
            </Form>
        )
    }
}

export default Login;