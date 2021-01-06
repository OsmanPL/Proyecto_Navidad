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

const urlServer = `http://localhost:3000`;

const VerCartas: React.FC = () => {
    let schemaCarta = {
        ID_Carta: '',
        Hijo_FK: '',
        Padre_FK: '',
        Direccion_FK: '',
        Descripcion: '',
        Estado: '',
        PrecioTotal: '',
        FechaEnvia: ''
    }
    let [padre, setPadre] = React.useState({});
    let [hijo, setHijo] = React.useState({});
    let [cartas, setCartas] = React.useState([schemaCarta]);
    let [correo, setCorreo] = React.useState(String);
    let [nicknameHijo, setNicknameHijo] = React.useState(String);
    useIonViewDidEnter(() => {
        let paths = window.location.pathname.split('/');
        let corre = paths[paths.length - 2]
        let nickn = paths[paths.length - 1]
        cargar(corre, nickn)
    });
    async function cargar(corre: String, nickname: String) {
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
        await axios.get(urlServer+`/padreCartas/getCartas/${corre}/${nickname}`)
            .then(response => {
                setCartas([]);
                setCartas(response.data)
            })
            .catch(error => {
                alert(error);
            })
    }

    function clickVerDeseos(id:String){
        window.location.href = `http://localhost:8002/deseos/${correo}/${nicknameHijo}/${id}`
    }

    async function confirmar(id: number) {
        await axios.put(urlServer + `/padreCartas/pedido`, {
            id: id
        }).then(response => {
            alert(JSON.stringify(response.data))
        }).catch(error => {
            alert(error)
        })
        cargar(correo, nicknameHijo)
    }

    function clickPerfilHijo() {
        window.location.href = `http://localhost:8002/perfilHijoPadre/${correo}/${nicknameHijo}`
    }
    function clickBuenasAcciones() {
        window.location.href = `http://localhost:8002/buenasAccionesHijo/${correo}/${nicknameHijo}`
    }
    function clickCartas() {
        window.location.href = `http://localhost:8002/cartas/${correo}/${nicknameHijo}`
    }
    function clickMensajes(){
        window.location.href = `http://localhost:8002/mensajes/${correo}/${nicknameHijo}`
    }
    function clickCerrar() {
        window.location.href = `http://localhost:8002/perfilPadre/${correo}`
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
                    <IonTitle>Cartas a Santa</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent id="MenuHijo">
            {cartas.map(carta => {
                    return (
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>ID: {carta.ID_Carta}</IonCardSubtitle>
                                <IonCardTitle>{carta.Descripcion}</IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent>
                                Enviada por: {carta.Hijo_FK} <br/>
                                Precio: {carta.PrecioTotal} <br/>
                                Estado: {carta.Estado} <br/>
                                Fecha: {carta.FechaEnvia}
                    </IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol><IonButton expand="block" color="primary" onClick={()=>clickVerDeseos(carta.ID_Carta)}>Ver Deseos</IonButton></IonCol>
                                    <IonCol><IonButton expand="block" color="success" onClick={()=>confirmar(Number(carta.ID_Carta))}>Confirmar</IonButton></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCard>
                    )
                })}
            </IonContent>
        </IonPage>
    );
};

export default VerCartas;