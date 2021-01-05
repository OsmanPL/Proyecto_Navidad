import { IonBadge, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
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

const PerfilHijoPadre: React.FC = () => {
    let [padre, setPadre] = React.useState({});
    let [hijo, setHijo] = React.useState({});
    let [correo, setCorreo] = React.useState(String);
    let [nicknameHijo, setNicknameHijo] = React.useState(String);
    let [nombreHijo, setNombreHijo] = React.useState(String);
    let [sexoHijo, setSexoHijo] = React.useState(String);
    let [diaHijo, setDiaHijo] = React.useState(Number);
    let [mesHijo, setMesHijo] = React.useState(Number);
    let [añoHijo, setAñoHijo] = React.useState(Number);
    let [password, setPassword] = React.useState(String);
    const dias31 = [
        { val: 1, desc: '1' },
        { val: 2, desc: '2' },
        { val: 3, desc: '3' },
        { val: 4, desc: '4' },
        { val: 5, desc: '5' },
        { val: 6, desc: '6' },
        { val: 7, desc: '7' },
        { val: 8, desc: '8' },
        { val: 9, desc: '9' },
        { val: 10, desc: '10' },
        { val: 11, desc: '11' },
        { val: 12, desc: '12' },
        { val: 13, desc: '13' },
        { val: 14, desc: '14' },
        { val: 15, desc: '15' },
        { val: 16, desc: '16' },
        { val: 17, desc: '17' },
        { val: 18, desc: '18' },
        { val: 19, desc: '19' },
        { val: 20, desc: '20' },
        { val: 21, desc: '21' },
        { val: 22, desc: '22' },
        { val: 23, desc: '23' },
        { val: 24, desc: '24' },
        { val: 25, desc: '25' },
        { val: 26, desc: '26' },
        { val: 27, desc: '27' },
        { val: 28, desc: '28' },
        { val: 29, desc: '29' },
        { val: 30, desc: '30' },
        { val: 31, desc: '31' },
    ]
    const meses = [
        { val: 1, desc: 'Enero' },
        { val: 2, desc: 'Febrero' },
        { val: 3, desc: 'Marzo' },
        { val: 4, desc: 'Abril' },
        { val: 5, desc: 'Mayo' },
        { val: 6, desc: 'Junio' },
        { val: 7, desc: 'Julio' },
        { val: 8, desc: 'Agosto' },
        { val: 9, desc: 'Septiembre' },
        { val: 10, desc: 'Octubre' },
        { val: 11, desc: 'Noviembre' },
        { val: 12, desc: 'Diciembre' }
    ]
    const años = [
        { val: 2002, desc: '2002' },
        { val: 2003, desc: '2003' },
        { val: 2004, desc: '2004' },
        { val: 2005, desc: '2005' },
        { val: 2006, desc: '2006' },
        { val: 2007, desc: '2007' },
        { val: 2008, desc: '2008' },
        { val: 2009, desc: '2009' },
        { val: 2010, desc: '2010' },
        { val: 2011, desc: '2011' },
        { val: 2012, desc: '2012' },
        { val: 2013, desc: '2013' },
        { val: 2014, desc: '2014' },
        { val: 2015, desc: '2015' },
        { val: 2016, desc: '2016' },
        { val: 2017, desc: '2017' },
        { val: 2018, desc: '2018' },
        { val: 2019, desc: '2019' },
        { val: 2020, desc: '2020' }
    ]
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
                setPassword(response.data.Password)
                setNombreHijo(response.data.Nombre)
                setSexoHijo(response.data.Sexo)
                let fecha = response.data.Fecha_Nacimiento.split('/')
                setDiaHijo(Number(fecha[0]))
                setMesHijo(Number(fecha[1]))
                setAñoHijo(Number(fecha[2]))
            })
            .catch(error => {
                alert(error);
            })
    }
    async function actualizarHijo() {
        await axios.put(urlServer+`/padreHijo/actualizarHijo`,{
            nickname:nicknameHijo,
            password:password,
            nombre:nombreHijo,
            sexo:sexoHijo,
            fecha:diaHijo+'/'+mesHijo+'/'+añoHijo
        }).then(response=>{
            alert(JSON.stringify(response.data))
        }).catch(error=>{
            alert(error)
        })
        cargar(correo,nicknameHijo)
    }
    
    function clickPerfilHijo(){
        window.location.href = `http://localhost:8002/perfilHijoPadre/${correo}/${nicknameHijo}`
    }
    function clickBuenasAcciones(){
        window.location.href = `http://localhost:8002/buenasAccionesHijo/${correo}/${nicknameHijo}`
    }
    function clickCerrar(){
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
                            <IonItem onClick={()=>clickPerfilHijo()}  routerDirection="none">
                                <IonIcon color="primary" slot="start" icon={manOutline} />
                                <IonLabel>Ver Perfil Hijo</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem onClick={()=>clickBuenasAcciones()}  routerDirection="none">
                                <IonIcon color="primary" slot="start" icon={bookOutline} />
                                <IonLabel>Ver Buenas Acciones</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem   routerDirection="none">
                                <IonIcon color="primary" slot="start" icon={giftOutline} />
                                <IonLabel>Ver Cartas</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem   routerDirection="none">
                                <IonIcon color="primary" slot="start" icon={chatbubbleEllipsesOutline} />
                                <IonLabel>Ver Mensajes</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                        <IonMenuToggle>
                            <IonItem onClick={()=>clickCerrar()} routerDirection="none">
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
                    <IonTitle>Perfil Padre-Hijo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent id="MenuHijo">
                <IonItem>
                    <IonBadge color="light"><h3>
                        <IonLabel >Nickname Hijo: {nicknameHijo}</IonLabel>
                    </h3>
                    </IonBadge>
                </IonItem>
                <IonItem>
                    <IonLabel>Password</IonLabel>
                    <IonInput placeholder="Ingrese su Password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Nombre del Hijo</IonLabel>
                    <IonInput placeholder="Ingrese Nombre del Hijo" value={nombreHijo} onIonChange={e => setNombreHijo(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Sexo del Hijo</IonLabel>
                    <IonSelect placeholder="Seleccionar Sexo" value={sexoHijo} onIonChange={e => setSexoHijo(e.detail.value!)}>
                        <IonSelectOption value="Femenino">Femenino</IonSelectOption>
                        <IonSelectOption value="Masculino">Masculino</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel>Dia</IonLabel>
                    <IonSelect placeholder="Seleccionar Dia" value={diaHijo} onIonChange={e => setDiaHijo(Number(e.detail.value!))}>
                        {dias31.map(dia => {
                            return (
                                <IonSelectOption value={dia.val}>{dia.desc}</IonSelectOption>
                            )
                        })}
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel>Mes</IonLabel>
                    <IonSelect placeholder="Seleccionar Mes" value={mesHijo} onIonChange={e => setMesHijo(Number(e.detail.value!))}>
                        {meses.map(mes => {
                            return (
                                <IonSelectOption value={mes.val}>{mes.desc}</IonSelectOption>
                            )
                        })}
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel>Año</IonLabel>
                    <IonSelect placeholder="Seleccionar Año" value={añoHijo} onIonChange={e => setAñoHijo(Number(e.detail.value!))}>
                        {años.map(año => {
                            return (
                                <IonSelectOption value={año.val}>{año.desc}</IonSelectOption>
                            )
                        })}
                    </IonSelect>
                </IonItem>
                <IonButton expand="block" onClick={()=>actualizarHijo()}>Actualizar Hijo</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default PerfilHijoPadre;