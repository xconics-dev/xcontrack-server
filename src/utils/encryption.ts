import crypto from "crypto";
import Config from "../config/index.js";

const algorithm = "aes-256-gcm";
const secretKey = Config.ENCRYPTION_SECRET; // 32 bytes
const ivLength = 12; // Recommended IV length for GCM

export function encrypt(text: string) {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return (
    iv.toString("hex") +
    ":" +
    authTag.toString("hex") +
    ":" +
    encrypted.toString("hex")
  );
}

export function decrypt(encryptedData: string) {
  const [ivHex, tagHex, encryptedHex] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(tagHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    iv
  );
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}
