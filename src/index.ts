// STARTING ATHENA, MAY SHE GUIDE US TO ATH WITH WISDOM AND GRACE
import { Telegraf } from "telegraf";
import { Context } from "telegraf";
import { Connection } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

const athena = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
const solanaConnection = new Connection(
  process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"
);

function logResponse(ctx: Context, command: String) {
  console.log(`Received ${command} command`);
  console.log("From:", ctx.from);
  console.log("Chat:", ctx.chat);
  console.log("Message:", ctx.message);
}

athena.start((ctx) => {
  logResponse(ctx, "/hello");
  ctx.reply("Athena Initialized");
});

athena.help((ctx) => ctx.reply("How can I help?"));

athena.command("hello", (ctx) => {
  console.log("Recieved command");
  ctx.reply("welcome to Athena");
});

athena.launch().then(() => console.log("Athena Running"));

// Enables graceful stop?
process.once("SIGINT", () => athena.stop("SIGINT"));
process.once("SIGTERM", () => athena.stop("SIGTERM"));
