import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Adisorn Sancharoen",
    studentId: "650612104",
  });
};
