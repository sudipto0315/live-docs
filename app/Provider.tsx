'use client';
import Loader from '@/components/Loader';
import { getClerkUsers } from '@/lib/actions/user.action';
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react/suspense';
import React, { ReactNode } from 'react'

const Provider = ({children}:{ children: ReactNode}) => {
  return (
    <LiveblocksProvider 
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds});

        return users;
      }}
      // resolveMentionSuggestions={async ({ text, roomId }) => {
      //   const roomUsers = await getDocumentUsers({
      //     roomId,
      //     currentUser: clerkUser?.emailAddresses[0].emailAddress!,
      //     text,
      //   })
      //   return roomUsers;
      // }}
    >
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider