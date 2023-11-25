import "@/styles/globals.css";
import "@/styles/colors.css";
import "@/styles/text.css";
import "@/styles/dynamicArea.css";
import "react-quill/dist/quill.bubble.css"; // or the theme you prefer

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
