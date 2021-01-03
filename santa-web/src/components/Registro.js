import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import col from 'react-bootstrap/Col';
import axios from 'axios';

const urlServer = `http://localhost:3000`;
class Login extends Component {


    state = {
        form: {
            correo: '',
            password: '',
            nombre_padre: '',
            nombre_hijo: '',
            nickname_hijo: '',
            sexo_hijo: '',
            dia: '',
            mes: '',
            año: '',
            departamento: '',
            municipio: '',
            descripcion: '',
            latitud:0,
            longitud:0,
            telefono: 0,
            dinero: 0
        }
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
    customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: state.isSelected ? 'white' : 'black',
            padding: 20,
        })
    }

    registrarse =async()=>{
        await axios.post(urlServer+`/login/registrarse`,{
                correo:this.state.form.correo,
                password:this.state.form.password,
                nombre_padre:this.state.form.nombre_padre,
                nombre_hijo:this.state.form.nombre_hijo,
                nickname_hijo:this.state.form.nickname_hijo,
                sexo_hijo:this.state.form.sexo_hijo,
                fecha_nac_hijo:this.state.form.dia+"/"+this.state.form.mes+"/"+this.state.form.año,
                departamento:this.state.form.departamento,
                municipio:this.state.form.municipio,
                descripcion:this.state.form.descripcion,
                latitud:this.state.form.latitud,
                longitud:this.state.form.longitud,
                telefono:this.state.form.telefono,
                dinero:this.state.form.dinero
            })
         .then(response=>{
             alert(JSON.stringify(response.data));
         })
         .catch(error=>{
             alert(error);
         })
     }

    render() {

        return (

            <Form>
                <Form.Row>
                    <Form.Group as={col} controlId="formBasicEmail">
                        <Form.Label><Badge variant="danger">Correo Padre</Badge></Form.Label>
                        <Form.Control type="text" placeholder="Ingrese Email" name="correo" onChange={this.handleChange} />
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={col} controlId="formBasicPassword">
                        <Form.Label><Badge variant="danger">Password</Badge></Form.Label>
                        <Form.Control type="password" placeholder="Ingrese Password" name="password" onChange={this.handleChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={col} controlId="formBasicEmail">
                        <Form.Label><Badge variant="danger">Nombre del Padre</Badge></Form.Label>
                        <Form.Control type="text" placeholder="Ingrese Nombre del Padre" name="nombre_padre" onChange={this.handleChange} />
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={col} controlId="formBasicEmail">
                        <Form.Label><Badge variant="danger">Nombre del Hijo</Badge></Form.Label>
                        <Form.Control type="text" placeholder="Ingrese Nombre del Hijo" name="nombre_hijo" onChange={this.handleChange} />
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={col} controlId="formBasicEmail">
                        <Form.Label><Badge variant="danger">Nickname del Hijo</Badge></Form.Label>
                        <Form.Control type="text" placeholder="Ingrese Nickname" name="nickname_hijo" onChange={this.handleChange} />
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={col} controlId="formBasicEmail">
                        <Form.Label><Badge variant="danger">Sexo del Hijo</Badge></Form.Label>
                        <Form.Control as="select" size="lg" value={this.state.form.sexo_hijo} onChange={this.handleChange} name="sexo_hijo">
                            <option>Masculino</option>
                            <option>Femenino</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                
                <Form.Row>
                    <Form.Group as={col} controlId="formBasicEmail">
                        <Form.Label><Badge variant="danger">Telefono</Badge></Form.Label>
                        <Form.Control type="text" placeholder="Ingrese Telefono" name="telefono" onChange={this.handleChange} />
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={col} controlId="formBasicEmail">
                        <Form.Label><Badge variant="danger">Inversion</Badge></Form.Label>
                        <Form.Control type="text" placeholder="Ingrese Dinero a Invertir" name="dinero" onChange={this.handleChange} />
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={col} controlId="formBasicEmail">
                        <Form.Label><Badge variant="danger">Latitud</Badge></Form.Label>
                        <Form.Control type="text" placeholder="Ingrese Latitud" name="latitud" onChange={this.handleChange} />
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>

                    <Form.Group as={col} controlId="formBasicEmail">
                        <Form.Label><Badge variant="danger">Longitud</Badge></Form.Label>
                        <Form.Control type="text" placeholder="Ingrese Longitud" name="longitud" onChange={this.handleChange} />
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Label><Badge variant="danger">Fecha Nacimiento Hijo</Badge></Form.Label>
                <Form.Row>
                    <Form.Group as={col} controlId="formBasicEmail">
                        <Form.Text className="text-muted">
                            <Badge variant="danger">Dia</Badge>
                        </Form.Text>
                        <Form.Control as="select" size="lg" value={this.state.form.dia} onChange={this.handleChange} name="dia">
                            {this.dias31.map(country => <option key={country.val} value={country.val}>{country.desc}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={col} controlId="formBasicEmail">
                        <Form.Text className="text-muted">
                            <Badge variant="danger">Mes</Badge>
                        </Form.Text>
                        <Form.Control as="select" size="lg" value={this.state.form.mes} onChange={this.handleChange} name="mes">
                            {this.mes.map(country => <option key={country.val} value={country.val}>{country.desc}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={col} controlId="formBasicEmail">
                        <Form.Text className="text-muted">
                            <Badge variant="danger">Año</Badge>
                        </Form.Text>
                        <Form.Control as="select" size="lg" value={this.state.form.año} onChange={this.handleChange} name="año">
                            {this.options.map(country => <option key={country.val} value={country.val}>{country.desc}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Label><Badge variant="danger">Direccion</Badge></Form.Label>
                <Form.Row>
                    <Form.Group as={col} controlId="formBasicEmail">
                        <Form.Text className="text-muted">
                            <Badge variant="danger">Departamento</Badge>
                        </Form.Text>
                        <Form.Control type="text" placeholder="Ingrese Departamento" name="departamento" onChange={this.handleChange} />
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={col} controlId="formBasicEmail">
                    <Form.Text className="text-muted">
                            <Badge variant="danger">Municipio</Badge>
                        </Form.Text>
                        <Form.Control type="text" placeholder="Ingrese Municipio" name="municipio" onChange={this.handleChange} />
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>
                    <Form.Group as={col} controlId="formBasicEmail">
                    <Form.Text className="text-muted">
                            <Badge variant="danger">Descripcion</Badge>
                        </Form.Text>
                        <Form.Control type="text" placeholder="Ingrese Descripcion" name="descripcion" onChange={this.handleChange} />
                        <Form.Text className="text-muted" >
                        </Form.Text>
                    </Form.Group>
                </Form.Row>


                <a href="/"> <Button variant="danger">
                    Volver
                </Button></a>
                <Button variant="danger" onClick={()=>this.registrarse()}>
                    Registrarse
                </Button>
            </Form>
        )
    }
}

export default Login;