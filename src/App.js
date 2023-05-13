
import "./App.css";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import AppBarTop from "./components/appBar/AppBarTop";
import { Container } from "@mui/material";

function App() {
  return (
    <FirebaseProvider>
      <AppBarTop></AppBarTop>
      <Container>
      </Container>
    </FirebaseProvider>
  );
}

export default App;
