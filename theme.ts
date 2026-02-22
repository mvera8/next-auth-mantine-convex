"use client";

import { createTheme, DEFAULT_THEME } from "@mantine/core";

export const theme = createTheme({
  // Controls --mantine-font-family
  fontFamily: `Roboto, ${DEFAULT_THEME.fontFamily}`,

  // Controls --mantine-font-family-monospace
  fontFamilyMonospace: `Roboto Mono, ${DEFAULT_THEME.fontFamilyMonospace}`,

  headings: {
    // Controls --mantine-font-family-headings
    fontFamily: 'Georgia, serif',
  },
});
