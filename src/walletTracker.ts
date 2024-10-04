import { MongoClient, Db } from "mongodb";

class WalletTracker {
  private db: Db;

  constructor(private mongoUri: string) {}

  async connect() {
    const client = new MongoClient(this.mongoUri);
    await client.connect();
    this.db = client.db("athena bot");
    console.log("Connected to MongoDB");
  }

  async registerWallet(userId: number, chatId: number, walletAddress: string) {
    await this.db
      .collection("users")
      .updateOne(
        { userId },
        { $set: { chatId, walletAddress } },
        { upsert: true }
      );
  }

  async getWallet(userId: number): Promise<string | null> {
    const user = await this.db.collection("users").findOne({ userId });
    return user?.walletAddress || null;
  }
}

export default WalletTracker;
