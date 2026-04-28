import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
    api: { bodyParser: false },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    const rawBody = await new Promise<string>((resolve, reject) => {
        let data = "";
        req.on("data", (chunk: Buffer) => { data += chunk.toString("utf-8"); });
        req.on("end", () => resolve(data));
        req.on("error", reject);
    });

    const response = await fetch("https://climate-reading-api.vercel.app/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: rawBody,
    });

    const data = await response.json();
    res.status(response.status).json(data);
}
