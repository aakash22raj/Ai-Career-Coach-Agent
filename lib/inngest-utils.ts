import axios from "axios";



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
    console.error("❌ Failed to get run status from Inngest:", error);
    return null;
  }
}
