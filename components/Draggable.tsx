import { useDraggable } from '@dnd-kit/react';
import { Card, Group, Text, ThemeIcon } from '@mantine/core';
import { IconGripVertical } from '@tabler/icons-react';

export default function Draggable({ id, children }: { id: string, children: React.ReactNode }) {
    const { ref } = useDraggable({
        id,
    });

    return (
        <Card radius="md" p="md" ref={ref} withBorder>
            <Group>
                <ThemeIcon>
                    <IconGripVertical size={18} stroke={1.5} />
                </ThemeIcon>
                <Text>{children}</Text>
            </Group>
        </Card>
    );
}