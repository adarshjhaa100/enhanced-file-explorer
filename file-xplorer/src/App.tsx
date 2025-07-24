import { useState } from "react";
import "./App.css";
import AppContent from "./components/AppContent";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import { invoke } from "@tauri-apps/api/core";

async function getContent() {
  return JSON.stringify([
    await invoke("greet", {
      name: "John",
    }),
  ]);
}

function App() {
  const [name, setName] = useState("");
  return (
    <main
      className="
        min-h-[100vh] 
        min-w-[100vw] "
    >
      <AppHeader />
      <AppContent />
      <AppFooter />
      <div>
        <span>{name}</span>
        <button
          onClick={async () => {
            setName(
              await invoke("greet", {
                name: "John",
              })
            );
          }}
        >
          Click me
        </button>
      </div>
    </main>
  );
}

export default App;
