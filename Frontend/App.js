import 'react-native-gesture-handler';
import AppNavigation from "./navigation/AppNavigation";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import {AuthProvider} from "./context/AuthContext";

export default function App() {
  return (
      <AuthProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
            <AppNavigation/>
        </ApplicationProvider>
      </AuthProvider>
);
}