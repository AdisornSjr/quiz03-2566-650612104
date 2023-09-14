import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  //find room
  const NumofRoom = DB.rooms.length;
  // console.log(DB.rooms.length);
  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,
    totalRooms: NumofRoom,
  });
};

export const POST = async (request) => {
  const payload = checkToken();
  if (!payload) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }
  readDB();
  const body = await request.json();
  const { roomName } = body;
  const foundRoomName = DB.rooms.find((x) => x.roomName === roomName);
  if (foundRoomName) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${roomName} already exists`,
      },
      { status: 400 }
    );
  }

  const roomId = nanoid();

  //call writeDB after modifying Database
  DB.rooms.push({ roomId, roomName });
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId: roomId,
    message: `Room ${roomName} has been created`,
  });
};
