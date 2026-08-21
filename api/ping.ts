/** Temporary diagnostic: zero imports, isolates runtime health from bundling. */
export default function handler(
  _req: unknown,
  res: { status: (c: number) => { json: (b: unknown) => unknown } }
) {
  return res.status(200).json({ pong: true });
}
