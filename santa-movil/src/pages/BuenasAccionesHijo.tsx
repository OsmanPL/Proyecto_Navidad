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

const BuenasAccionesHijo: React.FC = () => {
    let schemaAccion = {
        ID_BuenaAccion_Realizada: '',
        ID_BuenaAccion: '',
        Titulo: '',
        Descripcion: '',
        Hijo: '',
        Padre: '',
        Estado: '',
        Recompensa: ''
    }
    let [padre, setPadre] = React.useState({});
    let [hijo, setHijo] = React.useState({});
    let [acciones, setAcciones] = React.useState([schemaAccion]);
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
        await axios.get(urlServer+`/padreBuenasAcciones/getBuenasAcciones/${corre}/${nickname}`)
            .then(response => {
                setAcciones([]);
                setAcciones(response.data)
            })
            .catch(error => {
                alert(error);
            })
    }

    async function confirmar(id :number,recompensa:number) {
        await axios.put(urlServer+`/padreBuenasAcciones/buenaAccionrealizada`,{
            id:id,
            nickname:nicknameHijo, 
            cantidad:recompensa,
            correo:correo
        }).then(response=>{
            alert(JSON.stringify(response.data))
        }).catch(error=>{
            alert(error)
        })
        cargar(correo,nicknameHijo)
    }
    async function denegar(id:Number) {
        await axios.delete(urlServer+`/padreBuenasAcciones/eliminarBuenaAccion/${id}`)
        .then(response=>{
            alert(JSON.stringify(response.data))
        }).catch(error=>{
            alert(error)
        })
        cargar(correo,nicknameHijo)
    }

    function clickPerfilHijo() {
        window.location.href = `http://localhost:8002/perfilHijoPadre/${correo}/${nicknameHijo}`
    }
    function clickBuenasAcciones() {
        window.location.href = `http://localhost:8002/buenasAccionesHijo/${correo}/${nicknameHijo}`
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
                            <IonItem routerDirection="none">
                                <IonIcon color="primary" slot="start" icon={giftOutline} />
                                <IonLabel>Ver Cartas</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem routerDirection="none">
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
                    <IonTitle>Buenas Acciones Hijo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent id="MenuHijo">
                {acciones.map(accion => {
                    return (
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>ID: {accion.ID_BuenaAccion_Realizada}</IonCardSubtitle>
                                <IonCardTitle>{accion.Titulo}</IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent>
                                {accion.Descripcion} <br/>
                                Recompensa: {accion.Recompensa} <br/>
                                Estado: {accion.Estado} <br/>
                    </IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol><IonButton expand="block" color="danger" onClick={()=>denegar(Number(accion.ID_BuenaAccion_Realizada))}>Denegar</IonButton></IonCol>
                                    <IonCol><IonButton expand="block" color="success" onClick={()=>confirmar(Number(accion.ID_BuenaAccion_Realizada),Number(accion.Recompensa))}>Confirmar</IonButton></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCard>
                    )
                })}

            </IonContent>
        </IonPage>
    );
};

export default BuenasAccionesHijo;