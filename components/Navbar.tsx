"use client"

import { Avatar, Button, Group } from "@mantine/core"
import { useSession, signIn, signOut } from "next-auth/react"
import Demo from "./Demo"
import Link from "next/link"

const links = [
    { label: "Home", href: "/dashboard" },
    { label: "Todos", href: "/todos" },
    { label: "Tasks", href: "/tasks" },
]

export function Navbar() {
    const { data: session } = useSession()

    return (
        <Group justify="space-between" p="md">
            <Group>
                {links.map((link) => (
                    <Link key={link.href} href={link.href}>
                        {link.label}
                    </Link>
                ))}
            </Group>

            {!session ? (
                <Group>
                    <Button
                        component="a"
                        href="/login"
                    >
                        Go to singin
                    </Button>
                    <Button size="xs" onClick={() => signIn("github")}>
                        Login
                    </Button>
                </Group>
            ) : (
                <Group>
                    <span>{session.user?.name}</span>
                    <Avatar src={session.user?.image} radius="xl" size="sm" />
                    <Button size="xs" color="red" onClick={() => signOut()}>
                        Logout
                    </Button>
                    <Demo />
                </Group>
            )}
        </Group>
    )
}
