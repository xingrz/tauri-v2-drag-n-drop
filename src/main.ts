import { listen, TauriEvent } from "@tauri-apps/api/event";
import { stat } from "@tauri-apps/plugin-fs";

let greetMsgEl: HTMLElement | null;

window.addEventListener("DOMContentLoaded", () => {
  greetMsgEl = document.querySelector("#greet-msg");

  listen<{ paths: string[] }>(TauriEvent.DRAG, (event) => {
    console.log(event);
    greetMsgEl!.innerText = "DRAG: " + event.payload.paths;
  });

  listen<{ paths: string[] }>(TauriEvent.DROP, async (event) => {
    console.log(event);
    greetMsgEl!.innerText = "DROP: " + event.payload.paths;
    const stats = await stat(event.payload.paths[0]);
    greetMsgEl!.innerText += "\n(size: " + stats.size + ")";
  });

  listen<{ paths: string[] }>(TauriEvent.DROP_CANCELLED, (event) => {
    console.log(event);
    greetMsgEl!.innerText = "DROP_CANCELLED";
  });
});
