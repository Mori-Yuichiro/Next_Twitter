import { EntryType } from "@/app/types/entry";
import { MessageType } from "./messages";

export type GroupType = {
    id: number;
    entries: EntryType[];
    messages: MessageType[];
};
