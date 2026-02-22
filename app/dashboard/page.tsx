import { auth } from "@/auth"

export default async function Dashboard() {
    const session = await auth()

    return (
        <div style={{ padding: 20 }}>
            <h1>Dashboard 🔒</h1>
            <p>Bienvenido {session?.user?.name}</p>
        </div>
    )
}
