import { inngest } from "@/inngest/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // console.log("📥 API called");
    const { userInput } = await req.json();

    const resultIds = await inngest.send({
      name: "AiCareerAgent",
      data: {
        userInput,
      },
    });

    const runId = resultIds?.ids?.[0];
    // console.log("🆔 Inngest run ID:", runId)

    let runStatus;
    let attempts = 0;
    const maxAttempts = 40;

    // Use Polling to check Run status
    while (attempts < maxAttempts) {

      // call the getRuns for getting the return status
      runStatus = await getRuns(runId);
      // console.log("📊 Run status:", runStatus?.data);

      if (Array.isArray(runStatus?.data) && runStatus.data[0]?.status === "Completed") {
            break;
        }
      attempts++;

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (attempts === maxAttempts) {
      return NextResponse.json(
        { error: "Inngest run timeout." }, 
        { status: 504 }
      );
    }

    const output = runStatus.data?.[0]?.output?.output?.[0];

    if (!output) {
      // console.error("Output is missing from runStatus");
      return NextResponse.json({ error: "No output returned by the AI agent." }, { status: 500 });
    }

    return NextResponse.json(output);

  } catch (err: any) {
    // console.error("❌ API Error:", err);

    return NextResponse.json(
      { error: err.message || "Server Error" }, 
      { status: 500 }
    );
  }
}



export async function getRuns(runId: string) {
  const url = `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`;
  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
      },
    });

    return result.data;
  } catch (error) {
    // console.error("❌ Failed to get run status from Inngest:", error);
    return null;
  }
}
