import type { VercelRequest, VercelResponse } from "@vercel/node";
import { toPublicRoute } from "../lib/stravaRoute.js";

/** Temporary diagnostic: verifies that shared code under lib/ is bundled. */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    ok: true,
    libImportWorks: typeof toPublicRoute === "function",
  });
}
