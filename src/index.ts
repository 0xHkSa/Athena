// STARTING ATHENA, MAY SHE GUIDE US TO ATH WITH WISDOM AND GRACE
import { Telegraf } from "telegraf";
import { Connection } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

const athena = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
const solanaConnection = new Connection(
  process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"
);

athena.start((ctx) => ctx.reply("Athena Initialized"));

athena.help((ctx) => ctx.reply("How can I help?"));

athena.on("text", async (ctx) => {
  // TO-DO
  ctx.reply("still need to implement");
});

athena.launch().then(() => console.log("Athena Running"));

// Enables graceful stop?
process.once("SIGINT", () => athena.stop("SIGINT"));
process.once("SIGTERM", () => athena.stop("SIGTERM"));
