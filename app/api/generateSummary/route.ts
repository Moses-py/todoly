import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // todos are sent in the body of the post request

  const { todos } = await request.json();

  //   Communicate with openAI GPT
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "When responding, welcome the user always as Mr. Moses and say here is your task summary!, limit the response to 200 characters",
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos.  Count how many todos are in each category such as To do, in progress and done, after that, tell the user a random motivational quote, prefix it with something in the lines Here's a food for thought for your day, be spontaneous with it, not-repititive, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  const { data } = response;

  return NextResponse.json(data.choices[0].message);
}
