"use client";

import { authClient } from '@/lib/auth-client';
import React from 'react'

export default function ClientCookie() {
    const session = authClient.useSession()
  return (
    <div>{`${JSON.stringify(session)}`}</div>
  )
}
