import { NextRequest } from "next/server";

import Prompt from "@/models/prompt";

import { connectToDB } from "@/utils/database";

import type { HydratedDocument } from "mongoose";
import type { MongoPrompt } from "@/models/prompt";

export const GET = async (_req: NextRequest, _res: Response) => {
  try {
    await connectToDB();

    const prompts = (await Prompt.find()
      .populate("creator", ["email", "username", "image"])
      .lean()) satisfies HydratedDocument<MongoPrompt>[];

    return new Response(JSON.stringify(prompts), {
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
