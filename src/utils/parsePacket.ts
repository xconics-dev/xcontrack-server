export function parsePacket(raw: string): string[] {
  if (!raw) throw new Error("Empty packet");

  // remove whitespace + newlines
  const trimmed = raw.trim();

  // basic validation
  if (!trimmed.startsWith("$") || !trimmed.endsWith("$")) {
    throw new Error("Invalid packet delimiters");
  }

  // remove starting and ending $
  const body = trimmed.slice(1, -1);

  // split by |
  const parts = body.split("|");

  return parts;
}
