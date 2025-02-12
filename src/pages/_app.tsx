import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/api/AuthContext";
import { Sidebar } from "@/components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="w-full min-h-full flex flex-row">
        <Sidebar/>
        <Component {...pageProps} />
      </div>
      
    </AuthProvider>
  );;
}
