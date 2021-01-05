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

const HijosPadre: React.FC = () => {
    let hijo={
        Nickname:'',
        Nombre:''
    }
    let [padre, setPadre] = React.useState({});
    let [hijos, setHijos] = React.useState([hijo]);
    let [correo, setCorreo] = React.useState(String);
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
                setCorreo(response.data.Correo)
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
    function irHijo(nickname:String){
        window.location.href = `http://localhost:8002/perfilHijoPadre/${correo}/${nickname}`
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
                            <IonItem onClick={()=>clickPerfil()}  routerDirection="none">
                                <IonIcon color="primary" slot="start" icon={accessibilityOutline} />
                                <IonLabel>Perfil Padre</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem onClick={()=>clickHijos()}   routerDirection="none">
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
            <h1>Hijos</h1>
                {hijos.map(hijoe=>{
                    return(
                        <IonButton expand="block" onClick={()=>irHijo(hijoe.Nickname)}>Nickname:{hijoe.Nickname} - Nombre:{hijoe.Nombre}</IonButton>
                    )
                })}
            </IonContent>
        </IonPage>
    );
};

export default HijosPadre;