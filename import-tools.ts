// import-tools.ts

import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function importTools() {
  const filePath = path.join(__dirname, "tools.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const tools = JSON.parse(rawData);

  for (const tool of tools) {
    const { data, error } = await supabase.from("tools").upsert(tool);

    if (error) {
      console.error(`❌ Failed to insert: ${tool.name}`, error.message);
    } else {
      console.log(`✅ Successfully inserted: ${tool.name}`);
    }
  }

  console.log("🎉 All tools imported!");
}

importTools();
