import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="quizforge-theme"
      themes={['light', 'dark']}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}

