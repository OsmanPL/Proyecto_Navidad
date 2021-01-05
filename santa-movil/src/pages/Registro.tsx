import { IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import FormRegistro from '../components/FormRegistro';

const Registro: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Santa Cloud Platform</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol><h1>Registro</h1></IonCol>
                    </IonRow>
                    <FormRegistro/>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Registro;