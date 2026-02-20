import { cookies } from "next/headers";
import React from "react";
import ClientCookie from "./client-cookie";
import { cookieService } from "@/Services/cookie.service";
import { getCookie } from "@/Actions/cookie.action";

export default async function Cookie() {
  const cookie= await getCookie()

  return (
    <div
      className="
    "
    >
      <div className="">
        <h1 className="font-bold">Server</h1>
        <br />
        <div>"{JSON.stringify(cookie)}"</div>
        <br />

        
      </div>
      <div className="">
        <h1 className="font-bold">Client</h1>
        <br />
        {/* <ClientCookie /> */}
      </div>
    </div>
  );
}
