// Study Rooms Repository: screens call this function ONLY
import { StudyRoom } from '../types';
import mockRoomsData from '../mock/rooms.json';

let roomsState: StudyRoom[] = [...(mockRoomsData as StudyRoom[])];

export async function getRooms(): Promise<StudyRoom[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return [...roomsState];
}

export async function joinRoom(roomId: string): Promise<StudyRoom> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const room = roomsState.find((r) => r.id === roomId);
  if (!room) {
    throw new Error(`Room ${roomId} not found`);
  }
  return { ...room };
}
