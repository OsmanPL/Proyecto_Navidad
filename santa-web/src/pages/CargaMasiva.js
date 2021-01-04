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

const urlServer = `http://localhost:3000`;

class CargaMasiva extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: "",
      datos: []
    };
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    this.setState({ file });
  }
  readFile() {
    var f = this.state.file;
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      console.log(this.convertToJson(data))
      this.setState({ datos: this.convertToJson(data) })
    };
    reader.readAsBinaryString(f);
    console.log(this.state.datos)
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
      if (Object.entries(obj).length === 0){

      }else{
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