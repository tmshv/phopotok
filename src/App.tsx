import { MantineProvider, Container, SegmentedControl } from "@mantine/core";
import { theme } from "./theme";
import Mapgl from "./components/Mapgl";

import "@mantine/core/styles.css";
import "./App.css";
import { useState } from "react";

function App() {
    const [mode, setMode] = useState("Circles")
    return (
        <MantineProvider theme={theme}>
            <Mapgl
                mode={mode}
            />
            <Container size="xs" style={{
                position: "fixed",
                bottom: 40,
                left: 0,
            }}>
                <SegmentedControl
                    onChange={setMode}
                    data={[
                        "Circles",
                        "Photos",
                        "Heatmap",
                    ]}
                />
            </Container>
        </MantineProvider>
    );
}

export default App
