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

const urlServer = `http://34.70.211.238:3000`;

const PublicacionesSanta: React.FC = () => {
    let schemaPublicacion = {
        ID_Publicacion: '',
        Publicacion: '',
        Imagen: '',
        Santa_FK: '',
        Comentarios: []
    }
    let schemaComentarios = {
        ID_Comentario: '',
        Hijo_FK: '',
        Comentario: '',
        Publicacion_FK: ''
    }
    const [tipoModal, setTipo] = React.useState(String)
    const [showModal, setShowModal] = React.useState(false);
    const [showModalComentarios, setShowModalComentarios] = React.useState(false);
    const [idPubli, setIdPubli] = React.useState(String)
    let [userSanta, setUserSanta] = React.useState(String);
    let [publicacionT, setPublicacion] = React.useState(String);
    let [publicaciones, setPublicaciones] = React.useState([schemaPublicacion])
    let [comentarios, setComentarios] = React.useState([schemaComentarios])
    useIonViewDidEnter(() => {
        let paths = window.location.pathname.split('/');
        let user = paths[paths.length - 1];
        setUserSanta(user)
        obtenerPublicaciones()
    });
    async function obtenerPublicaciones() {
        await axios.get(urlServer + `/santaPublicaciones/publicaciones`)
            .then(response => {
                setPublicaciones([]);
                setPublicaciones(response.data)
            }).catch(error => {
                alert(error)
            })
    }
    async function crear() {
        await axios.post(urlServer + `/santaPublicaciones/crearPublicacion`, {
            publicacion: publicacionT,
            imagen: null,
            santa: userSanta
        }).then(response => {
            alert(JSON.stringify(response.data));
            obtenerPublicaciones()
        }).catch(error => {
            alert(error)
        })
    }
    async function verComentarios(id: Number) {
        for (var i = 0; i < publicaciones.length; i++) {
            if (id === Number(publicaciones[i].ID_Publicacion)) {
                setComentarios([]);
                setComentarios(publicaciones[i].Comentarios)
            }
        }
    }
    async function Editar() {
        await axios.put(urlServer + `/santaPublicaciones/editarPublicacion`, {
            id: idPubli,
            publicacion: publicacionT,
            imagen: null
        }).then(response => {
            alert(JSON.stringify(response.data));
            obtenerPublicaciones()
        }).catch(error => {
            alert(error)
        })
    }
    async function eliminarPublicacion(id: Number) {
        await axios.delete(urlServer + `/santaPublicaciones/eliminarPublicacion/${id}`,)
            .then(response => {
                alert(JSON.stringify(response.data));
                obtenerPublicaciones()
            }).catch(error => {
                alert(error)
            })
    }
    function clickPublicaciones(){
        window.location.href = `http://34.70.211.238:8002/publicacionesSanta/${userSanta}`
    }
    function clickPedidos(){
        window.location.href = `http://34.70.211.238:8002/pedidos/${userSanta}`
    }
    function clickPedidosEntregados(){
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
                            <IonItem routerDirection="none" onClick={()=>clickPublicaciones()}>
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
                            <IonItem routerDirection="none" onClick={()=>clickPedidosEntregados()}>
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
                            <IonTitle>{tipoModal} Publicacion</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setShowModal(false)}>Cerrar</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonList>
                            <IonItem>
                                <IonLabel>Publicacion</IonLabel>
                                <IonTextarea placeholder="Ingrese su Publicacion" value={publicacionT} onIonChange={e => setPublicacion(e.detail.value!)}></IonTextarea>
                            </IonItem>
                            {tipoModal === 'Insertar' ? <IonButton expand="block" color="success" onClick={() => { crear(); setShowModal(false) }}>Crear</IonButton>
                                : <IonButton expand="block" color="success" onClick={() => { Editar(); setShowModal(false) }}>Editar</IonButton>}

                        </IonList>
                    </IonContent>
                </IonModal>
                <IonModal isOpen={showModalComentarios} cssClass='my-custom-class'>
                    <IonHeader translucent>
                        <IonToolbar>
                            <IonTitle>Comentarios</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setShowModalComentarios(false)}>Cerrar</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {comentarios.map(comenta => {
                            return (
                                <IonCard>
                                    <IonCardHeader>
                                        <IonCardSubtitle>ID: {comenta.ID_Comentario}</IonCardSubtitle>
                                        <IonCardTitle>{comenta.Comentario}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        Comentado por: {comenta.Hijo_FK}
                                    </IonCardContent>
                                </IonCard>
                            )
                        })}
                    </IonContent>
                </IonModal>
                <IonButton color="success" expand="full" onClick={() => { setShowModal(true); setTipo('Insertar'); setPublicacion('') }}>Crear Publicacion</IonButton>
                {publicaciones.map(publi => {
                    return (
                        <IonCard>
                            <IonCardHeader>
                                <IonCardSubtitle>ID: {publi.ID_Publicacion}</IonCardSubtitle>
                                <IonCardTitle>{publi.Publicacion}</IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent>
                                Publicada por: {publi.Santa_FK}
                            </IonCardContent>
                            <IonGrid>
                                <IonRow>
                                    <IonCol><IonButton expand="block" color="danger" onClick={() => eliminarPublicacion(Number(publi.ID_Publicacion))}>Borrar</IonButton></IonCol>
                                    <IonCol><IonButton expand="block" color="primary" onClick={() => { setShowModal(true); setTipo('Editar'); setPublicacion(publi.Publicacion); setIdPubli(publi.ID_Publicacion) }}>Editar</IonButton></IonCol>
                                    <IonCol><IonButton expand="block" color="warning" onClick={() => { verComentarios(Number(publi.ID_Publicacion)); setShowModalComentarios(true) }}>Ver Comentarios</IonButton></IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCard>
                    )
                })}
            </IonContent>
        </IonPage>
    );
};

export default PublicacionesSanta;