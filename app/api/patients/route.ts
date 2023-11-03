import { db } from "@/app/lib/db";
import { getSearch } from "@/app/lib/utils";
import { DBTables } from "@/app/types/DBTables";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { page = "1", limit = "10" } = getSearch(req);

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  const offset = (pageNum - 1) * limitNum;

  const patients = await db
    .select("id", "name", "email", "phone", "id_photo")
    .from(DBTables.patients)
    .orderBy("name", "asc")
    .offset(offset)
    .limit(limitNum);

  return NextResponse.json(patients);
}
