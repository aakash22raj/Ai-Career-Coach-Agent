import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf'
import { inngest } from "@/inngest/client";
import axios from "axios";
import { currentUser } from "@clerk/nextjs/server";



export async function POST(req: NextRequest) {
    try {
        console.log("📥 API called");

        const FormData = await req.formData();
        const resumeFile: any = FormData.get('resumeFile');
        const recordId = FormData.get('recordId');
        
        if (!resumeFile || !recordId) {
            return NextResponse.json({ error: 'Missing file or recordId' }, { status: 400 });
        }
    
        const user = await currentUser();

        const loader = new WebPDFLoader(resumeFile);
        const docs = await loader.load();
        console.log("📄 PDF text:", docs[0])  //Raw Pdf Text
    
        const arrayBuffer = await resumeFile.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
    
    
        const resultIds = await inngest.send({
            name: "AiResumeAgent",
            data: {
                // recordId: recordId,
                recordId,
                base64ResumeFile: base64,
                pdfText: docs[0]?.pageContent,
                aiAgentType: '/ai-tools/ai-resume-analyzer',
                userEmail: user?.primaryEmailAddress?.emailAddress
            },
        });
    
        const runId = resultIds?.ids?.[0];
        console.log("🆔 Inngest run ID:", runId)
        
        let runStatus;
        let attempts = 0;
        const maxAttempts = 30;
        
        while (attempts < maxAttempts) {
            runStatus = await getRuns(runId);
            console.log("📊 Run status:", runStatus?.data);
        
            if (Array.isArray(runStatus?.data) && runStatus.data[0]?.status === "Completed") {
                break;
            }
            attempts++;
        
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    
        // const output = runStatus.data?.[0]?.output?.output[0];
        if (attempts === maxAttempts) {
            return NextResponse.json({ error: "Inngest run timeout." }, { status: 504 });
        }


        // Ensure the output is properly serializable
        const output = runStatus.data[0]?.output;
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
            
        // return NextResponse.json(runStatus.data?.[0]?.output?.output[0]);

    } catch (err: any) {
        console.error("❌ API Error:", err);
        return NextResponse.json(
            {error: err.message || 'Server Error' }, 
            { status: 500 }
        );
    }
}


export async function getRuns(runId: string) {
    console.log()
  const url = `${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`;

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
      },
    });

    return result.data;
  } catch (error) {
    console.error("❌ Failed to get run status from Inngest:", error);
    return null;
  }
}
