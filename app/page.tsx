"use client"

import { Avatar, Button, Container, Group, Stack, Title } from "@mantine/core"
import { signIn, signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession();

  return (
    <Container size="md">
      <Title order={1} size="h2">Home</Title>
    </Container>
  )
}
