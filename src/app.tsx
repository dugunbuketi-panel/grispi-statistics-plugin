import { GrispiProvider } from "./contexts/grispi-context";
import { StoreProvider } from "./contexts/store-context";
import { CompanyScreen } from "./screens/company-screen";

const App = () => {
  return (
    <StoreProvider>
      <GrispiProvider>
        <CompanyScreen />
      </GrispiProvider>
    </StoreProvider>
  );
};

export default App;
