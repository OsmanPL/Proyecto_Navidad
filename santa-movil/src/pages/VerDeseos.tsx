import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import React from 'react';
import FormLogin from '../components/FormLogin';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import axios from 'axios';
import { accessibilityOutline, happyOutline, backspaceOutline, manOutline, bookOutline, giftOutline, chatboxEllipsesOutline, exitOutline, chatbubbleEllipsesOutline } from 'ionicons/icons';

const urlServer = `http://34.70.211.238:3000`;

const VerDeseos: React.FC = () => {
    let schemaJuguete = {
        ID_JugueteCarta: '',
        Juguete_FK: '',
        Carta_FK: '',
        Cantidad: '',
        Total: '',
        Juguete: {
            Id_JC: '',
            Nombre: '',
            Categoria: '',
            Precio: '',
            Imagen: '',
            Edad: ''
        }
    }
    let [padre, setPadre] = React.useState({});
    let [hijo, setHijo] = React.useState({});
    let [deseos, setDeseos] = React.useState([schemaJuguete]);
    let [idC, setIdC] = React.useState(Number)
    let [correo, setCorreo] = React.useState(String);
    let [nicknameHijo, setNicknameHijo] = React.useState(String);
    useIonViewDidEnter(() => {
        let paths = window.location.pathname.split('/');
        let corre = paths[paths.length - 3]
        let nickn = paths[paths.length - 2]
        let idCT = paths[paths.length - 1]
        cargar(corre, nickn, idCT)
    });
    async function cargar(corre: String, nickname: String, idCT: String) {
        await axios.get(urlServer + `/recuperarPadre/recuperarPadre/${corre}`)
            .then(response => {
                setPadre({})
                setPadre(response.data)
                setCorreo(response.data.Correo)
            }).catch(error => {
                alert(error);
            })
        await axios.get(urlServer + `/recuperarHijo/recuperarHijo/${nickname}`)
            .then(response => {
                setHijo({});
                setHijo(response.data)
                setNicknameHijo(response.data.Nickname)
            })
            .catch(error => {
                alert(error);
            })
        await axios.delete(urlServer + `/padreCartas/lista/${idCT}`)
            .then(response => {
                setDeseos([]);
                setDeseos(response.data)
                setIdC(Number(idCT))
            })
            .catch(error => {
                alert(error);
            })
    }

    async function eliminar(id: number,precio:number) {
        await axios.post(urlServer + `/padreCartas/deseo`, {
            idcarta:idC, 
            precioTotalProducto:precio,
            idjp: id
        }).then(response => {
            alert(JSON.stringify(response.data))
        }).catch(error => {
            alert(error)
        })
        cargar(correo, nicknameHijo, String(idC))
    }

    function clickPerfilHijo() {
        window.location.href = `http://34.70.211.238:8002/perfilHijoPadre/${correo}/${nicknameHijo}`
    }
    function clickBuenasAcciones() {
        window.location.href = `http://34.70.211.238:8002/buenasAccionesHijo/${correo}/${nicknameHijo}`
    }
    function clickCartas() {
        window.location.href = `http://34.70.211.238:8002/cartas/${correo}/${nicknameHijo}`
    }
    function clickMensajes(){
        window.location.href = `http://34.70.211.238:8002/mensajes/${correo}/${nicknameHijo}`
    }
    function clickCerrar() {
        window.location.href = `http://34.70.211.238:8002/perfilPadre/${correo}`
    }
    return (

        <IonPage>
            <IonMenu side="start" contentId="MenuHijo">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu Padre-Hijo</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonMenuToggle>
                            <IonItem onClick={() => clickPerfilHijo()} routerDirection="none">
                                <IonIcon color="primary" slot="start" icon={manOutline} />
                                <IonLabel>Ver Perfil Hijo</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem onClick={() => clickBuenasAcciones()} routerDirection="none">
                                <IonIcon color="primary" slot="start" icon={bookOutline} />
                                <IonLabel>Ver Buenas Acciones</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem routerDirection="none" onClick={() => clickCartas()}>
                                <IonIcon color="primary" slot="start" icon={giftOutline} />
                                <IonLabel>Ver Cartas</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem routerDirection="none" onClick={() => clickMensajes()}>
                                <IonIcon color="primary" slot="start" icon={chatbubbleEllipsesOutline} />
                                <IonLabel>Ver Mensajes</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem onClick={() => clickCerrar()} routerDirection="none">
                                <IonIcon color="primary" slot="start" icon={exitOutline} />
                                <IonLabel>Cerrar Hijo</IonLabel>
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
                    <IonTitle>Lista de Deseos</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent id="MenuHijo">
                {deseos.map(deseo => {
                    return (
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>ID: {deseo.ID_JugueteCarta}</IonCardSubtitle>
                                <IonCardTitle>{deseo.Juguete.Nombre}</IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent>
                                Categoria: {deseo.Juguete.Categoria} <br />
                                Precio: {deseo.Total} <br />
                                Cantidad: {deseo.Cantidad} 
                            </IonCardContent>
                            <IonButton expand="block" color="danger" onClick={()=>eliminar(Number(deseo.ID_JugueteCarta),Number(deseo.Total))}>Quitar Deseo</IonButton>
                        </IonCard>
                    )
                })}
            </IonContent>
        </IonPage>
    );
};

export default VerDeseos;