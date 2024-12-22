import { NextRequest, NextResponse } from "next/server";
import { sendMsgToOpenAI } from "@/app/services/openai";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API,
  });

async function main(msgToSend: string, voice: string) {
    let mp3
    if (voice == "high") {
        mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "nova",
            input: msgToSend,
        });
    } else {
        mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "shimmer",
            input: msgToSend,
        });
    }
    const buffer = Buffer.from(await mp3.arrayBuffer());
    return buffer
  }

  export async function POST(req: NextRequest) {
    console.log("POST HIT")
    try {
        const body = await req.json()
        //i will be receiving the voice type, description, name
        console.log(body.message)
        console.log(body)
        const message = body.message
        const receivedWaifuMsg: string = await sendMsgToOpenAI(message, body.name, body.description, body.speak)
        let voicemsg
        if (body.type == "voice") {
            try {
                voicemsg = await main(receivedWaifuMsg, body.voice)
            } catch (error) {
                console.log("No more credits: ", error)
                voicemsg = await main(receivedWaifuMsg, body.voice)
            }
            return new NextResponse(voicemsg, {
                headers: {
                    "Content-Type": "audio/mpeg",
                    "Content-Disposition": `attachment; filename="speech.mp3"`,
                }
            })
        }
        console.log(receivedWaifuMsg)
        return NextResponse.json({
            response: receivedWaifuMsg,
            boolean: true
        })
    } catch {
        return NextResponse.json("wtf")
    }
}