import { MantineProvider, Container, SegmentedControl, RangeSlider, Flex } from "@mantine/core";
import { theme } from "./theme";
import Mapgl from "./components/Mapgl";

import "@mantine/core/styles.css";
import "./App.css";
import { useState } from "react";

function App() {
    const [mode, setMode] = useState("Circles")
    const [score, setScore] = useState([0.9, 1.0])
    return (
        <MantineProvider theme={theme}>
            <Mapgl
                mode={mode}
                minScore={score[0]}
                maxScore={score[1]}
            />
            <div style={{
                position: "fixed",
                padding: "0 20px",
                width: "100%",
                bottom: 20,
                left: 0,
            }}>
                <Flex direction={"row"} gap={10} align={"center"} justify={"space-between"}>
                    <SegmentedControl
                        onChange={setMode}
                        data={[
                            "Circles",
                            "Heatmap",
                            "Photos",
                        ]}
                    />
                    <RangeSlider
                        flex={2}
                        onChange={setScore}
                        color="blue"
                        minRange={0.1}
                        defaultValue={[0.9, 1.0]}
                        min={0}
                        max={1}
                        step={0.01}
                        marks={[
                            // { value: 20, label: '20%' },
                            // { value: 50, label: '50%' },
                            { value: 0.9, label: '90%' },
                        ]}
                    />
                    <div style={{flex: 1}} />
                </Flex>
            </div>
        </MantineProvider>
    );
}

export default App
