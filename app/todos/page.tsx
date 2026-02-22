"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { sileo } from "sileo";
import {
    Button,
    Container,
    TextInput,
    Text,
    Title,
    Select,
    Stack,
} from "@mantine/core";
import { CheckboxCard } from "@/components/CheckboxCard";

export default function TodosPage() {
    const { data: session } = useSession();
    const userId = session?.user?.email;

    const todos = useQuery(
        api.todos.getTodos,
        userId ? { userId } : "skip"
    );

    const createTodo = useMutation(api.todos.createTodo);
    const toggleTodo = useMutation(api.todos.toggleTodo);

    const [text, setText] = useState("");
    const [category, setCategory] = useState("");

    if (!session) return <div>No autorizado</div>;
    if (!todos) return <div>Loading...</div>;

    // 🔥 Nueva función separada
    const handleCreateTodo = async () => {
        if (!text) return;
        if (!userId) throw new Error("User not authenticated");

        return createTodo({
            text,
            category,
            userId,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text) return;

        await sileo.promise(handleCreateTodo(), {
            loading: { title: "Creating todo..." },
            success: () => {
                setText("");
                setCategory("");

                return {
                    title: "Todo created",
                    description: <Text c="dimmed" tt="capitalize">{text}</Text>,
                };
            },
            error: (err: any) => ({
                title: "Failed to create todo",
                description: <Text c="dimmed" tt="capitalize">{err?.message || "An unexpected error occurred"}</Text>,
            }),
        });
    };

    return (
        <Container size="xs">
            <Title order={1} mb="sm">
                Mis To-Dos
            </Title>

            <form onSubmit={handleSubmit}>
                <Stack mb="md">
                    <TextInput
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Nueva tarea..."
                    />

                    <Select
                        value={category}
                        onChange={(val) => setCategory(val ?? "")}
                        placeholder="Pick value"
                        data={["React", "Angular", "Vue", "Svelte"]}
                        clearable
                    />

                    <Button type="submit">Agregar</Button>
                </Stack>
            </form>

            <Stack gap="xs">
                {todos.map((todo) => (
                    <CheckboxCard
                        key={todo._id}
                        title={todo.text}
                        description={todo.category || ""}
                        checked={todo.completed}
                        onChange={() => toggleTodo({ id: todo._id })}
                    />
                ))}
            </Stack>
        </Container>
    );
}