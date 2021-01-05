import { IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import React from 'react';
import FormLogin from '../components/FormLogin';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import axios from 'axios';
import {accessibilityOutline,happyOutline,backspaceOutline } from 'ionicons/icons';

const urlServer = `http://localhost:3000`;

const PerfilPadre: React.FC = () => {
    let [padre, setPadre] = React.useState({});
    let [hijos, setHijos] = React.useState([]);
    let [correo, setCorreo] = React.useState(String);
    let [nombrePadre, setNombrePadre] = React.useState(String);
    let [telefono, setTelefono] = React.useState(Number);
    let [inversion, setInversion] = React.useState(Number);
    let [departamento, setDepartamento] = React.useState(String);
    let [municipio, setMunicipio] = React.useState(String);
    let [descripcion, setDescripcion] = React.useState(String);
    let [latitud, setLatitud] = React.useState(Number);
    let [longitud, setLongitud] = React.useState(Number);
    useIonViewDidEnter(() => {
        let paths = window.location.pathname.split('/');
        let corre = paths[paths.length - 1]
        recuperarPadre(corre)
    });
    async function recuperarPadre(correo: String) {
        await axios.get(urlServer + `/recuperarPadre/recuperarPadre/${correo}`)
            .then(response => {
                setPadre({})
                setPadre(response.data)
                setNombrePadre(response.data.Nombre)
                setCorreo(response.data.Correo)
                setTelefono(Number(response.data.Telefono))
                setInversion(Number(response.data.Dinero))
                //Direccion
                setDepartamento(response.data.Direccion.Departamento)
                setMunicipio(response.data.Direccion.Municipio)
                setDescripcion(response.data.Direccion.Descripcion)
                setLatitud(Number(response.data.Direccion.Latitud))
                setLongitud(Number(response.data.Direccion.Longitud))
            }).catch(error => {
                alert(error);
            })
        await axios.get(urlServer + `/padreHijo/getHijos/${correo}`)
            .then(response => {
                setHijos([])
                setHijos(response.data)
            }).catch(error => {
                alert(error)
            })

    }
    function clickPerfil() {
        window.location.href = `http://localhost:8002/perfilPadre/${correo}`
    }
    function clickHijos() {
        window.location.href = `http://localhost:8002/hijosPadre/${correo}`
    }
    return (

        <IonPage>
            <IonMenu side="start" contentId="MenuPadre">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu Padre</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonMenuToggle>
                            <IonItem onClick={()=>clickPerfil()} routerDirection="none">
                                <IonIcon color="primary" slot="start" icon={accessibilityOutline} />
                                <IonLabel>Perfil Padre</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem onClick={()=>clickHijos()} routerDirection="none">
                                <IonIcon color="primary" slot="start" icon={happyOutline} />
                                <IonLabel>Hijos</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem routerLink="/" routerDirection="none">
                                <IonIcon color="primary" slot="start" icon={backspaceOutline} />
                                <IonLabel>Cerrar Sesion</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
            </IonMenu>

            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Perfil Padre</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent id="MenuPadre">
                <IonItem>
                    <IonBadge color="light"><h3>
                        <IonLabel >Feliz Navidad {nombrePadre}</IonLabel>
                    </h3>
                    </IonBadge>
                </IonItem>
                <IonItem>
                    <IonBadge color="light"><h3>
                        <IonLabel>Correo {correo}</IonLabel>
                    </h3>
                    </IonBadge>
                </IonItem>
                <IonItem>
                    <IonBadge color="light"><h3>
                        <IonLabel>Telefono {telefono}</IonLabel>
                    </h3>
                    </IonBadge>
                </IonItem>
                <IonItem>
                    <IonBadge color="light"><h3>
                        <IonLabel>Inversion {inversion}</IonLabel>
                    </h3>
                    </IonBadge>
                </IonItem>
                <IonItem>
                    <IonBadge color="light"><h3>
                        <IonLabel>Departamento {departamento}</IonLabel>
                    </h3>
                    </IonBadge>
                </IonItem>
                <IonItem>
                    <IonBadge color="light"><h3>
                        <IonLabel>Municipio {municipio}</IonLabel>
                    </h3>
                    </IonBadge>
                </IonItem>
                <IonItem>
                    <IonBadge color="light"><h3>
                        <IonLabel>Descripcion {descripcion}</IonLabel>
                    </h3>
                    </IonBadge>
                </IonItem>
                <IonItem>
                    <IonBadge color="light"><h3>
                        <IonLabel>Latitud {latitud}</IonLabel>
                    </h3>
                    </IonBadge>
                </IonItem>
                <IonItem>
                    <IonBadge color="light"><h3>
                        <IonLabel>Longitud {longitud}</IonLabel>
                    </h3>
                    </IonBadge>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default PerfilPadre;