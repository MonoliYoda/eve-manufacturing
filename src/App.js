
import "./App.css";
import { FirebaseProvider } from "./contexts/FirebaseContext";

import AppContainer from "./components/main/AppContainer";

function App() {
  return (
    <FirebaseProvider>
      
      <AppContainer/>
    </FirebaseProvider>
  );
}

export default App;
