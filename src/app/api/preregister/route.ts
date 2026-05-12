import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "preregistrations.json");

interface Registration {
  email: string;
  locale: string;
  source: string;
  ts: string;
  ua?: string;
}

async function readAll(): Promise<Registration[]> {
  try {
    const buf = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(buf) as Registration[];
  } catch {
    return [];
  }
}

async function writeAll(rows: Registration[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(rows, null, 2), "utf-8");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: string; locale?: string; source?: string } = {};
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const locale = (body.locale ?? "ko").slice(0, 8);
  const source = (body.source ?? "hero").slice(0, 32);

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const all = await readAll();
  const existingIdx = all.findIndex((r) => r.email === email);

  if (existingIdx >= 0) {
    return NextResponse.json({
      ok: true,
      duplicate: true,
      position: existingIdx + 1,
      total: all.length,
    });
  }

  const reg: Registration = {
    email,
    locale,
    source,
    ts: new Date().toISOString(),
    ua: req.headers.get("user-agent") ?? undefined,
  };
  all.push(reg);
  await writeAll(all);

  return NextResponse.json({
    ok: true,
    duplicate: false,
    position: all.length,
    total: all.length,
  });
}

export async function GET() {
  // Public count only, for displaying social proof
  const all = await readAll();
  return NextResponse.json({ total: all.length });
}
