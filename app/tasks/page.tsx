"use client";

import Draggable from "@/components/Draggable";
import Droppable from "@/components/Droppable";
import { DragDropProvider } from "@dnd-kit/react";
import { Container, SimpleGrid, Title } from "@mantine/core";
import { useState } from "react";

export default function TasksPage() {
    const targets = ['A', 'B'];
    const [target, setTarget] = useState<string | undefined>(undefined);
    const draggable = (
        <Draggable id="draggable">Drag me</Draggable>
    );

    return (
        <Container size="lg">
            <Title order={1} mb="sm">Mis Tareas</Title>
            <DragDropProvider
                onDragEnd={(event) => {
                    if (event.canceled) return;

                    setTarget(event.operation.target?.id?.toString());
                }}
            >
                <SimpleGrid cols={3}>
                    <div>
                        {!target ? draggable : null}
                    </div>
                    {targets.map((id) => (
                        <Droppable key={id} id={id}>
                            {target === id ? draggable : `Droppable ${id}`}
                        </Droppable>
                    ))}
                </SimpleGrid>
            </DragDropProvider>
        </Container>
    );
}