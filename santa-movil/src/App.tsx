import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Registro from './pages/Registro';
import Login from './pages/Login';
import { keyOutline, addCircleOutline } from 'ionicons/icons'
import PerfilPadre from './pages/PerfilPadre';
import HijosPadre from './pages/HijosPadre';
import PerfilHijoPadre from './pages/PerfilHijoPadre';
import BuenasAccionesHijo from './pages/BuenasAccionesHijo';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonMenu side="start" contentId="MenuLogin">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem routerLink="/login" routerDirection="none">
                <IonIcon color="primary" slot="start" icon={keyOutline} />
                <IonLabel>Login</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/registro" routerDirection="none">
                <IonIcon color="primary" slot="start" icon={addCircleOutline} />
                <IonLabel>Registro</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="MenuLogin">
        <Route path="/buenasAccionesHijo/:correo/:nickname" component={BuenasAccionesHijo} exact={true} />
        <Route path="/perfilHijoPadre/:correo/:nickname" component={PerfilHijoPadre} exact={true} />
        <Route path="/hijosPadre/:correo" component={HijosPadre} exact={true} />
        <Route path="/perfilPadre/:correo" component={PerfilPadre} exact={true} />
        <Route path="/registro" component={Registro} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/login" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;