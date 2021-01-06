import { IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonModal, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import React from 'react';
import FormLogin from '../components/FormLogin';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import axios from 'axios';
import { accessibilityOutline, happyOutline, backspaceOutline, clipboardOutline, desktopOutline, airplaneOutline, arrowUndoOutline, bagCheckOutline } from 'ionicons/icons';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
const urlServer = `http://34.70.211.238:3000`;

const PedidosEntregados: React.FC = () => {
    let SchemaCarta = {
        ID_Carta: '',
        Hijo_FK: '',
        Padre_FK: '',
        Direccion_FK: '',
        Descripcion: '',
        Estado: '',
        PrecioTotal: '',
        FechaEnvia: '',
        ListaDeseos: [],
        Hijo: {
            Nickname: '',
            Password: '',
            Nombre: '',
            Sexo: '',
            Fecha_Nacimiento: '',
            Edad: '',
            Bastones: '',
            Padre: ''
        }
    }
    let schemaHijo = {
        Nickname: '',
        Password: '',
        Nombre: '',
        Sexo: '',
        Fecha_Nacimiento: '',
        Edad: '',
        Bastones: '',
        Padre: ''
    }
    let schemaDeseo = {
        ID_JugueteCarta: '',
        Juguete_FK: '',
        Carta_FK: '',
        Cantidad: '',
        Total: '',
        Juguete: {
            Nombre: '',
            Categoria: ''
        }
    }

    let [hijo, setHijo] = React.useState(schemaHijo);
    
    const [showModalDeseos, setShowModalDeseos] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    let [userSanta, setUserSanta] = React.useState(String);
    let [cartas, setCartas] = React.useState([SchemaCarta]);
    let [deseos, setDeseos] = React.useState([schemaDeseo]);

    useIonViewDidEnter(() => {
        let paths = window.location.pathname.split('/');
        let user = paths[paths.length - 1];
        setUserSanta(user)
        obtenerEntregadas()
    });
    async function obtenerEntregadas() {
        await axios.delete(urlServer + `/santaCarta/entregadas`)
            .then(response => {
                setCartas([]);
                setCartas(response.data);
                console.log(response.data)
            }).catch(error => {
                alert(error)
            })
    }
    function verHijo(id: String) {
        for (var i = 0; i < cartas.length; i++) {
            if (cartas[i].ID_Carta === id) {
                setHijo(cartas[i].Hijo);
            }
        }
    }
    async function verDeseos(idc: String) {
        await axios.put(urlServer + `/santaCarta/deseos`, {
            id: idc
        }).then(response=>{
            setDeseos([]);
            setDeseos(response.data)
        }).catch(error=>{
            alert(error)
        })
    }
    function clickPublicaciones() {
        window.location.href = `http://34.70.211.238:8002/publicacionesSanta/${userSanta}`
    }
    function clickPedidos(){
        window.location.href = `http://34.70.211.238:8002/pedidos/${userSanta}`
    }
    function clickPedidosEntregados() {
        window.location.href = `http://34.70.211.238:8002/pedidosEntregados/${userSanta}`
    }
    return (

        <IonPage>
            <IonMenu side="start" contentId="MenuSanta">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu Santa</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonMenuToggle>
                            <IonItem routerDirection="none" onClick={() => clickPublicaciones()}>
                                <IonIcon color="primary" slot="start" icon={desktopOutline} />
                                <IonLabel>Publicaciones</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem routerDirection="none" onClick={()=>clickPedidos()}>
                                <IonIcon color="primary" slot="start" icon={airplaneOutline} />
                                <IonLabel>Pedidos</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem routerDirection="none" onClick={() => clickPedidosEntregados()}>
                                <IonIcon color="primary" slot="start" icon={bagCheckOutline} />
                                <IonLabel>Pedidos Entregados</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem routerLink="/" routerDirection="none">
                                <IonIcon color="primary" slot="start" icon={arrowUndoOutline} />
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
                    <IonTitle>Perfil Santa</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent id="MenuSanta">
                <IonModal isOpen={showModal} cssClass='my-custom-class'>
                    <IonHeader translucent>
                        <IonToolbar>
                            <IonTitle>Hijo</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setShowModal(false)}>Cerrar</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>Nickname: {hijo.Nickname}</IonCardSubtitle>
                                <IonCardTitle>{hijo.Nombre}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                Sexo: {hijo.Sexo} <br />
                                Fecha de Nacimiento: {hijo.Fecha_Nacimiento} <br />
                                Edad: {hijo.Edad} <br />
                                Padre: {hijo.Padre}<br />
                            </IonCardContent>
                        </IonCard>
                    </IonContent>
                </IonModal>

                <IonModal isOpen={showModalDeseos} cssClass='my-custom-class'>
                    <IonHeader translucent>
                        <IonToolbar>
                            <IonTitle>Deseos</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => {setShowModalDeseos(false);setDeseos([])}}>Cerrar</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {deseos.map(deseo=>{
                            return(
                                <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>ID: {deseo.ID_JugueteCarta}</IonCardSubtitle>
                                <IonCardTitle>{deseo.Juguete.Nombre}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                        Categoria: {deseo.Juguete.Categoria}<br />
                                        Fecha: {deseo.Cantidad}<br />
                                        Estado: {deseo.Total}<br />
                            </IonCardContent>
                        </IonCard>
                            )
                        })}
                    </IonContent>
                </IonModal>

                {cartas.map(carta => {
                    return (
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>ID: {carta.ID_Carta}</IonCardSubtitle>
                                <IonCardTitle>{carta.Descripcion}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                Total: {carta.PrecioTotal}<br />
                                        Fecha: {carta.FechaEnvia}<br />
                                        Estado: {carta.Estado}<br />
                                <IonGrid>
                                    <IonRow>
                                        <IonCol><IonButton shape="round" fill="outline" color="danger" onClick={() => { setShowModal(true); verHijo(carta.ID_Carta) }}>Ver Hijo</IonButton></IonCol>
                                        <IonCol><IonButton shape="round" fill="outline" color="danger" onClick={()=>{verDeseos(carta.ID_Carta);setShowModalDeseos(true)}}>Ver Deseos</IonButton></IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCardContent>
                        </IonCard>
                    )
                })}

            </IonContent>
        </IonPage>
    );
};

export default PedidosEntregados;



        
  