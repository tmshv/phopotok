import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Mapgl from "./components/Mapgl";

import "@mantine/core/styles.css";
import "./App.css";

function App() {
    return (
        <MantineProvider theme={theme}>
            <Mapgl />
        </MantineProvider>
    );
}

export default App
