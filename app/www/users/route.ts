/*
Route Handlers
    파일명이 중요하다.
    UI 를 렌더링 하지 않는다. 
    HTTP 요청을 받아서 json 을 반환하거나
    NextRequest : 쿠키 같은 정보를 가져올 수 있다.
*/

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request);
  return Response.json({
    ok: true,
  });
}
export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log("log the user in!!!");
  return Response.json(data);
}
