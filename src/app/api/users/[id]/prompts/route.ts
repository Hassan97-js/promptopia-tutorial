import { NextRequest } from "next/server";
import { connectToDB } from "@/utils/database";

import Prompt from "@/models/prompt";
import type { Document } from "mongoose";
import type { MongoPrompt } from "@/models/prompt";

type NextParams = { params: { id: string } };

export const GET = async (req: NextRequest, { params }: NextParams) => {
  try {
    await connectToDB();

    const prompts = (await Prompt.find({
      creator: params.id
    })
      .populate("creator", ["email", "username", "image"])
      .lean()) satisfies Document<MongoPrompt>[];

    return new Response(JSON.stringify(prompts), {
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch user prompts", { status: 500 });
  }
};
