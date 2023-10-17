import 'react-native-gesture-handler';
import AppNavigation from "./navigation/AppNavigation";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {AuthProvider} from "./context/AuthContext";
import { default as theme } from './lib/custom-theme.json'; 

export default function App() {
  return (
      <AuthProvider>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{...eva.light,...theme}}>
              <AppNavigation/>
          </ApplicationProvider>
      </AuthProvider>
);
}