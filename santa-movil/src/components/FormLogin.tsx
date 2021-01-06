import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import axios from 'axios';

const urlServer = `http://localhost:3000`;

const FormLogin: React.FC = () => {
    const [user, setUser] = React.useState(String);
    const [password, setPassword] = React.useState(String);
    async function ingresar() {
        var valido = {
            auth: false,
            tipo: '',
            user: ''
        };
       await axios.get(urlServer + `/login/iniciarSesion/${user}/${password}`)
            .then(response => {
                valido.auth = response.data.auth;
                valido.tipo = response.data.tipo;
                valido.user = response.data.user;
            })
            .catch(error => {
                alert(error);
            })
        if (valido.auth == true) {
            console.log('si')
            if (valido.tipo === 'Hijo') {
                alert("Usuario Hijo " + valido.user + " ha iniciado sesion")
                window.location.href = `http://localhost:8001/hijo/${valido.user}`
            } else if (valido.tipo === 'Administrador') {
                console.log('si')
                alert("Usuario Administrador " + valido.user + " ha iniciado sesion")
                window.location.href = `http://localhost:8001/administrador`
            } else if (valido.tipo === 'Padre'){
                alert("Usuario Padre " + valido.user + " ha iniciado sesion")
                window.location.href = `http://localhost:8002/perfilPadre/${valido.user}`
            } else if(valido.tipo === 'Santa'){
                alert("Usuario Santa " + valido.user + " ha iniciado sesion")
                window.location.href = `http://localhost:8002/publicacionesSanta/${valido.user}`
            }
        }else{
            alert("El Usuario No existe")
        }
    }

    return (
        <IonList>
            <IonItem>
                 <IonLabel>Usuario</IonLabel>
                <IonInput placeholder="Ingrese su Usuario" value={user} onIonChange={e => setUser(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Password</IonLabel>
                <IonInput placeholder="Ingrese su Password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}></IonInput>
            </IonItem>
            <IonButton expand="block" onClick={() => ingresar()}>Ingresar</IonButton>
        </IonList>
    );
};

export default FormLogin;