import { BrowserRouter } from "react-router-dom";
import RoutesConfig from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { FleetProvider } from "./context/FleetContext";

function App() {
  return (
    <AuthProvider>
      <FleetProvider>
        <BrowserRouter>
          <RoutesConfig />
        </BrowserRouter>
      </FleetProvider>
    </AuthProvider>
  );
}

export default App;