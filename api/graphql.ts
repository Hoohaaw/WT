import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);

    const response = await fetch("https://climate-reading-api.vercel.app/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
    });

    const data = await response.json();
    res.status(response.status).json(data);
}
