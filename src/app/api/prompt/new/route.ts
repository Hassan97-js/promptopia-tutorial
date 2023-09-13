import { NextRequest } from "next/server";

import Prompt from "@/models/prompt";

import { connectToDB } from "@/utils/database";


import type { HydratedDocument } from "mongoose";
import type { MongoPrompt } from "@/models/prompt";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const { userId, text, tag } = await req.json();

    const newPrompt = (await Prompt.create({
      creator: userId,
      text,
      tag
    })) satisfies HydratedDocument<MongoPrompt>;

    return new Response(JSON.stringify(newPrompt), {
      status: 201
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
