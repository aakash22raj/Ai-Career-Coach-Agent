import { NextRequest, NextResponse } from "next/server";
// import {db} from '../../../configs/db'
import { db } from "@/configs/db";
// import {HistoryTable} from '../../../configs/schema'
import { HistoryTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";


// export async function POST(req:NextRequest) {
export async function POST(req:any) {
    
    const {content, recordId, aiAgentType} = await req.json();
    const user = await currentUser();
    try {

        if (!user || !user.primaryEmailAddress?.emailAddress) {
            return NextResponse.json(
              { error: "Unauthorized: Missing user or email" },
              { status: 401 }
            );
        }

        const result=await db.insert(HistoryTable).values({
        // Insert record
            recordId: recordId,
            content: content,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: (new Date()).toString(),
            aiAgentType: aiAgentType
        });
        return NextResponse.json(result, { status: 200 });
    } catch (e: any) {
        console.error("Error saving history:", e.message || e);
        return NextResponse.json(
            { error: e.message || "Internal server error" },
            { status: 500 }
        )
    }
}


export async function PUT(req:any) {
    const {content, recordId} = await req.json();
    try {
        // Insert record
        const result=await db.update(HistoryTable).set({
            content: content,
        }).where(eq(HistoryTable.recordId, recordId))

        return NextResponse.json(result, { status: 200 });
    } catch (e) {
        console.error("Error saving history:", e);
        return NextResponse.json(e)
    }
}


export async function GET(req:any) {
    const {searchParams} = new URL(req.url);
    const recordId=searchParams.get('recordId');
    const user = await currentUser();

    try {
        if(recordId) {
            const result = await db.select()
                .from(HistoryTable)
                .where(eq(HistoryTable.recordId, recordId))
            return NextResponse.json(result[0])
        }
        else {
            const result = await db.select()
                .from(HistoryTable)
                .where(eq(HistoryTable.userEmail, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(HistoryTable.createdAt)); 
            return NextResponse.json(result)
        }
        return NextResponse.json({})
    } catch (e) {
        return NextResponse.json(e)
    }
}