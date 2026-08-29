import { globalShortcut } from "electron";

let current = "";

/**
 * Binds `accelerator` as the global chat hotkey, replacing whatever was bound before.
 * An empty accelerator means "intentionally disabled" and still counts as success.
 * Returns false only when a non-empty accelerator was rejected: `register()` returns
 * false when another app already owns the combo, and throws when the string is malformed.
 */
export function registerChatShortcut(accelerator: string, handler: () => void): boolean {
  unregisterChatShortcut();
  const next = accelerator.trim();
  if (!next) return true;
  try {
    if (!globalShortcut.register(next, handler)) return false;
  } catch {
    return false;
  }
  current = next;
  return true;
}

export function unregisterChatShortcut(): void {
  if (current) globalShortcut.unregister(current);
  current = "";
}
