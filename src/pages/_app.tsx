import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider, AuthContext } from "@/api/AuthContext";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { useContext } from "react";
export default function App({ Component, pageProps }: AppProps) {
  const auth = useContext(AuthContext);

  return (
    <AuthProvider>
      <div className="w-full flex flex-row" style={{ height: "100vh" }}>
        <Sidebar/>
        <Component {...pageProps} />
      </div>
      
    </AuthProvider>
  );;
}
