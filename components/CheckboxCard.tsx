import { Checkbox, Stack, Text, UnstyledButton } from '@mantine/core';
import classes from './CheckboxCard.module.css';

export function CheckboxCard({ title, description, onChange, checked }: { title: string, description: string, onChange: (checked: boolean) => void, checked: boolean }) {
    return (
        <UnstyledButton component="label" mb="xs" p="md" className={classes.button}>
            <Checkbox
                checked={checked}
                onChange={(event) => onChange(event.currentTarget.checked)}
                size="md"
                mr="xl"
                styles={{ input: { cursor: 'pointer' } }}
            />

            <Stack gap={2}>
                <Text fw={500} lh={1} tt="capitalize">
                    {title}
                </Text>
                {description && (
                    <Text fz="sm" c="dimmed">
                        {description}
                    </Text>
                )}
            </Stack>
        </UnstyledButton>
    );
}