import { NextRequest } from "next/server";

import Prompt from "@/models/prompt";

import { connectToDB } from "@/utils/database";

import type { HydratedDocument } from "mongoose";
import type { MongoPrompt } from "@/models/prompt";

type NextParams = { params: { id: string } };

export const GET = async (req: NextRequest, { params }: NextParams) => {
  try {
    await connectToDB();

    const prompt = (await Prompt.findById(params.id)
      .populate("creator", ["email", "username", "image"])
      .lean()) satisfies HydratedDocument<MongoPrompt> | null;

    if (!prompt) {
      return new Response("Prompt not found!", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch the prompt", { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: NextParams) => {
  try {
    await connectToDB();

    console.log("RUN-----------------------------------------");

    const { text, tag }: { text: string; tag: string } = await req.json();

    console.log(text, tag);

    const prompt = (await Prompt.findByIdAndUpdate(params.id, {
      $set: { text, tag }
    })) satisfies HydratedDocument<MongoPrompt> | null;

    if (!prompt) {
      return new Response("Prompt not found!", { status: 404 });
    }

    // prompt.text = text;
    // prompt.tag = tag;

    // await prompt.save();

    return new Response(JSON.stringify(prompt), {
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to edit the prompt", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: NextParams) => {
  try {
    await connectToDB();

    const prompt = (await Prompt.findByIdAndDelete(
      params.id
    )) satisfies HydratedDocument<MongoPrompt> | null;

    if (!prompt) {
      return new Response("Prompt not found!", { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Prompt has been deleted!" }), {
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};
