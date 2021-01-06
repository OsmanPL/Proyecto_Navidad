import renos from '../img/renos.png';
import PerfilAdmin from '../components/PerfilAdmin';
import Badge from 'react-bootstrap/Badge';
import NavegacionAdmin from '../components/NavegacionAdmin';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import * as XLSX from 'xlsx';

const urlServer = `http://34.70.211.238:3000`;

class CargaMasiva extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: "",
      padres: [],
      hijos: [],
      cartas: [],
      juguetes: []
    };
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }
  llenarDatosPadre(carga) {
    console.log(carga)
    for (var i = 0; i < carga.length; i++) {
      var existePadre = false;
      var existeHijo = false;
      var existeJuguete = false;
      var existeCarta = false;
      for (var j = 0; j < this.state.padres.length; j++) {
        if (this.state.padres[j].correo === carga[i].CorreoElectronico) {
          existePadre = true;
          break;
        }
      }
      for (var j = 0; j < this.state.hijos.length; j++) {
        if (this.state.hijos[j].nickname === carga[i].NicknameHijo) {
          this.state.hijos[j].bastones = Number(this.state.hijos[j].bastones) + Number(carga[i].PrecioJuguete);
          existeHijo = true;
          break;
        }
      }
      for (var j = 0; j < this.state.juguetes.length; j++) {
        if (this.state.juguetes[j].nombre === carga[i].NombreJuguete) {
          existeJuguete = true;
        }
      }
      for (var j = 0; j < this.state.cartas.length; j++) {
        if (this.state.cartas[j].nickname === carga[i].NicknameHijo) {
          this.state.cartas[j].total = Number(this.state.cartas[j].total) + Number(carga[i].PrecioJuguete);
          let deseo = {
            nombre: carga[i].NombreJuguete,
            precio: Number(carga[i].PrecioJuguete),
            cantidad: 1
          }
          this.state.cartas[j].deseos.push(deseo);
          existeCarta = true;
        }
      }
      if (!existePadre) {
        let padre = {
          correo: carga[i].CorreoElectronico,
          nombre: carga[i].NombrePadre,
          password: carga[i].Password,
          dinero: 0,
          telefono: Number(carga[i].NumeroTelefono),
          departamento: carga[i].Departamento,
          municipio: carga[i].Municipio,
          descripcion: carga[i].DescripcionDireccion,
          latitud: Number(carga[i].Latitud),
          longitud: Number(carga[i].Longitud)
        }
        this.state.padres.push(padre)
      }
      if (!existeHijo) {
        let hijo = {
          nickname: carga[i].NicknameHijo,
          password: carga[i].Password,
          nombre: carga[i].NombreHijo,
          sexo: (Math.floor(Math.random() * (3 - 1)) + 1) === 2 ? 'Masculino' : 'Femenino',
          fecha: (Math.floor(Math.random() * (29 - 1)) + 1) + '/' + (Math.floor(Math.random() * (13 - 1)) + 1) + '/' + (Math.floor(Math.random() * (2017 - 2008)) + 2008),
          padre: carga[i].CorreoElectronico,
          bastones: Number(carga[i].PrecioJuguete)
        }
        this.state.hijos.push(hijo)
      }
      if (!existeJuguete) {
        let juguete = {
          nombre: carga[i].NombreJuguete,
          categoria: carga[i].CategoriaJuguete,
          precio: Number(carga[i].PrecioJuguete),
          edad: Number(carga[i].EdadRecomendable)
        }
        this.state.juguetes.push(juguete)
      }
      if (!existeCarta) {
        let carta = {
          nickname: carga[i].NicknameHijo,
          descripcion: 'Hola santa te envio mi lista de deseos',
          total: Number(carga[i].PrecioJuguete),
          deseos: []
        }
        let deseo = {
          nombre: carga[i].NombreJuguete,
          precio: Number(carga[i].PrecioJuguete),
          cantidad: 1
        }
        carta.deseos.push(deseo)
        this.state.cartas.push(carta)
      }
    }
    console.log(this.state.padres)
    console.log(this.state.hijos)
    console.log(this.state.juguetes)
    console.log(this.state.cartas)
    this.crear()
  }

  crear = async () => {
    for (var i = 0; i < this.state.padres.length; i++) {
      await axios.post(urlServer + `/adminPerfilPadre/crearPadre`, {
        correo: this.state.padres[i].correo,
        password: this.state.padres[i].password,
        nombre: this.state.padres[i].nombre,
        telefono: this.state.padres[i].telefono,
        dinero: this.state.padres[i].dinero,
        departamento: this.state.padres[i].departamento,
        municipio: this.state.padres[i].municipio,
        descripcion: this.state.padres[i].descripcion,
        latitud: this.state.padres[i].latitud,
        longitud: this.state.padres[i].longitud
      }).then(response => {
        console.log(response.data);
      }).catch(error => {
        alert(error);
      })
    }
    for (var i = 0; i < this.state.hijos.length; i++) {
      await axios.post(urlServer + `/adminPerfilHijo/crearHijo`, {
        nickname: this.state.hijos[i].nickname,
        password: this.state.hijos[i].password,
        nombre: this.state.hijos[i].nombre,
        sexo: this.state.hijos[i].sexo,
        fecha: this.state.hijos[i].fecha,
        padre: this.state.hijos[i].padre,
        bastones: this.state.hijos[i].bastones,
      }).then(response => {
        console.log(response.data);
      }).catch(error => {
        alert(error);
      })
    }
    for (i = 0; i < this.state.juguetes.length; i++) {
      await axios.post(urlServer + `/adminProducto/crearProducto`, {
        nombre: this.state.juguetes[i].nombre,
        categoria: this.state.juguetes[i].categoria,
        precio: this.state.juguetes[i].precio,
        imagen: null,
        edad: this.state.juguetes[i].edad
      }).then(response => {
        console.log(response.data);
      }).catch(error => {
        alert(error);
      })
    }
    for (var i = 0; i < this.state.cartas.length; i++) {
      var carta = {};
      await axios.put(urlServer + `/hijoCarta/entregarCarta`, {
        nickname: this.state.cartas[i].nickname,
        descripcion: this.state.cartas[i].descripcion,
        total: this.state.cartas[i].total
      }).then(response => {
        carta = response.data;
      }).catch(error => {
        alert(error)
      });
      for (var j = 0; j < this.state.cartas[i].deseos.length; j++) {
        var juguete = {};
        await axios.get(urlServer + `/recuperarProducto/recuperarProducto/${this.state.cartas[i].deseos[j].nombre}`)
          .then(response => {
            juguete = response.data;
          }).catch(error => {
            alert(error)
          })
        await axios.post(urlServer + `/hijoDeseo/deseos`, {
          juguete: juguete.ID_Juguete,
          carta: carta.id_carta,
          cantidad: this.state.cartas[i].deseos[j].cantidad,
          total: this.state.cartas[i].deseos[j].precio
        }).then(response => {
          console.log(response.data);
        }).catch(error => {
          alert(error);
        });
      }
    }
    alert("Terminado")
  }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    this.setState({ file });
  }
  readFile() {
    var carga = []
    var f = this.state.file;
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      carga = this.convertToJson(data)
      this.llenarDatosPadre(carga)
    };
    reader.readAsBinaryString(f);
  }

  convertToJson(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        if (currentline[j] === "" || currentline[j] === undefined) {
          break;
        } else {
          obj[headers[j]] = currentline[j];
        }
      }
      if (Object.entries(obj).length === 0) {

      } else {
        result.push(obj);
      }
    }
    return result;
  }

  render() {

    return (
      <div className="FondoAdmin">
        <NavegacionAdmin />
        <div className="App-header-admin-buenas">
          <div id="cargaMasiva"><input
            type="file"
            id="file"
            ref="fileUploader"
            onChange={this.filePathset.bind(this)}
          />
            <Button variant="outline-primary" onClick={() => { this.readFile(); }}>
              Leer Archivo
                    </Button ></div>

        </div>
      </div>
    )
  }
}

export default CargaMasiva;