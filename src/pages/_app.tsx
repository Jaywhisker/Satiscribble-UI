import "@/styles/globals.css";
import "@/styles/colors.css";
import "@/styles/text.css";
import "@/styles/padding.css";
import "react-quill/dist/quill.bubble.css"; // or the theme you prefer

import type { AppProps } from "next/app";
import { ToastContextProvider } from "@/contexts/ToastContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <ToastContextProvider>
    <Component {...pageProps} />
  </ToastContextProvider>
  )
}
