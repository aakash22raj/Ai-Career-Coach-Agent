import { inngest } from "@/inngest/client";
import { getRuns } from "@/lib/inngest-utils";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try{
      // console.log("📥 API called");

      const {roadmapId, userInput} = await req.json();
      const user = await currentUser();
  
  
      const resultIds = await inngest.send({
        name: "AiRoadMapAgent",
        data: {
          userInput: userInput,
          roadmapId: roadmapId,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        },
      });
      
      // Return runId
      const runId = resultIds?.ids?.[0];
      // console.log("🆔 Inngest run ID:", runId)
  
  
      let runStatus;
      let attempts = 0;
      const maxAttempts = 30;
  
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


  
      // Ensure the output is properly serializable
      const output = runStatus!.data[0]?.output;
      let responseData;


      if (output?.output?.[0]?.content) {
        try {
          // Try to parse the content if it's a string
          responseData = typeof output.output[0].content === 'string' 
              ? JSON.parse(output.output[0].content.replace('```json', '').replace('```', ''))
              : output.output[0].content;
        } catch (e) {
          // If parsing fails, return the raw content
          responseData = output.output[0].content;
        }
      } else {
          responseData = output || { status: 'completed' };
      }

      return NextResponse.json(responseData);
  
    } catch (err: any) {
      // console.error("❌ API Error:", err);
      return NextResponse.json(
        {error: err.message || 'Server Error' }, 
        { status: 500 }
      );
    }
}

