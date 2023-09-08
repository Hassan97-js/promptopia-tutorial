import { NextRequest } from "next/server";

import { connectToDB } from "@/utils/database";

import Prompt from "@/models/prompt";

import type { Document } from "mongoose";
import type { MongoPrompt } from "@/models/prompt";

export const POST = async (req: NextRequest) => {
  const { userId, text, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = (await Prompt.create({
      creator: userId,
      text,
      tag
    })) satisfies Document<MongoPrompt>;

    return new Response(JSON.stringify(newPrompt), {
      status: 201
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
