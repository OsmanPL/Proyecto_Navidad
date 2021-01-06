import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import axios from 'axios';

const urlServer = `http://34.70.211.238:3000`;

const FormRegistro: React.FC = () => {
    const [correo, setCorreo] = React.useState(String);
    const [password, setPassword] = React.useState(String);
    const [nombrePadre, setNombrePadre] = React.useState(String);
    const [nombreHijo, setNombreHijo] = React.useState(String);
    const [telefono, setTelefono] = React.useState(Number);
    const [inversion, setInversion] = React.useState(Number);
    const [nicknameHijo, setNicknameHijo] = React.useState(String);
    const [sexoHijo, setSexoHijo] = React.useState(String);
    const [diaHijo, setDiaHijo] = React.useState(Number);
    const [mesHijo, setMesHijo] = React.useState(Number);
    const [añoHijo, setAñoHijo] = React.useState(Number);
    const [departamento, setDepartamento] = React.useState(String);
    const [municipio, setMunicipio] = React.useState(String);
    const [descripcion, setDescripcion] = React.useState(String);
    const [latitud, setLatitud] = React.useState(Number);
    const [longitud, setLongitud] = React.useState(Number);
    
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

    async function registrarse() {
        await axios.post(urlServer+`/login/registrarse`,{
            correo:correo,
            password:password,
            nombre_padre:nombrePadre,
            nombre_hijo:nombreHijo,
            nickname_hijo:nicknameHijo,
            sexo_hijo:sexoHijo,
            fecha_nac_hijo:diaHijo+"/"+mesHijo+"/"+añoHijo,
            departamento:departamento,
            municipio:municipio,
            descripcion:descripcion,
            latitud:latitud,
            longitud:longitud,
            telefono:telefono,
            dinero:inversion
        })
     .then(response=>{
         alert(JSON.stringify(response.data));
     })
     .catch(error=>{
         alert(error);
     })
    }


    return (
        <IonList>
            <IonItem>
                <IonLabel>Correo del Padre</IonLabel>
                <IonInput placeholder="Ingrese su correo" value={correo} onIonChange={e => setCorreo(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Password</IonLabel>
                <IonInput placeholder="Ingrese su Password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Nombre del Padre</IonLabel>
                <IonInput placeholder="Ingrese Nombre del Padre" value={nombrePadre} onIonChange={e => setNombrePadre(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Telefono</IonLabel>
                <IonInput placeholder="Ingrese Numero de Telefono" value={telefono} onIonChange={e => setTelefono(Number(e.detail.value!))}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Inversion</IonLabel>
                <IonInput placeholder="Ingrese Inversion" value={inversion} onIonChange={e => setInversion(Number(e.detail.value!))}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Nombre del Hijo</IonLabel>
                <IonInput placeholder="Ingrese Nombre del Hijo" value={nombreHijo} onIonChange={e => setNombreHijo(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Nickname del Hijo</IonLabel>
                <IonInput placeholder="Ingrese Nickname del Hijo" value={nicknameHijo} onIonChange={e => setNicknameHijo(e.detail.value!)}></IonInput>
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
            <IonItem>
                <IonLabel>Departamento</IonLabel>
                <IonInput placeholder="Ingrese Departamento" value={departamento} onIonChange={e => setDepartamento(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Municipio</IonLabel>
                <IonInput placeholder="Ingrese Municipio" value={municipio} onIonChange={e => setMunicipio(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Descripcion</IonLabel>
                <IonInput placeholder="Ingrese Descripcion" value={descripcion} onIonChange={e => setDescripcion(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Latitud</IonLabel>
                <IonInput placeholder="Ingrese Latitud" value={latitud} onIonChange={e => setLatitud(Number(e.detail.value!))}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Longitud</IonLabel>
                <IonInput placeholder="Ingrese Longitud" value={longitud} onIonChange={e => setLongitud(Number(e.detail.value!))}></IonInput>
            </IonItem>
            <IonButton expand="block" onClick={()=>{registrarse()}}>Registrarse</IonButton>
        </IonList>
    );
};

export default FormRegistro;