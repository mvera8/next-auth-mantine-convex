"use client";

import { MantineProvider, useComputedColorScheme } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "sileo";
import { theme } from "@/theme";
import React from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function MantineWrapper({ children }: { children: React.ReactNode }) {
    const computedColorScheme = useComputedColorScheme("light");

    return (
        <>
            <Toaster
                position="bottom-right"
                options={{
                    fill: computedColorScheme === "dark" ? "white" : "black",
                    styles: {
                        title: computedColorScheme === "dark" ? "text-black!" : "text-white!",
                    },
                }}
            />
            <Navbar />
            {children}
        </>
    );
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ConvexProvider client={convex}>
                <MantineProvider theme={theme} defaultColorScheme="auto">
                    <MantineWrapper>{children}</MantineWrapper>
                </MantineProvider>
            </ConvexProvider>
        </SessionProvider>
    );
}
