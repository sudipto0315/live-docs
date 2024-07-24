'use server';

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({ userIds }: { userIds: string[]}) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) => users.find((user) => user.email === email));

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
  }
}

export const getDocumentUsers = async ({ roomId, userID }: { roomId: string, userID: string}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAccess = Object.keys(room.usersAccesses).includes(userID);

    if(!hasAccess) {
        throw new Error('You do not have access to this document');
    }
    return parseStringify(room);
    
  } catch (error) {
    console.log(`Error fetching document users: ${error}`);
  }
}