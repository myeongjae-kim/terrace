
export type DescriptionIcon = "EmojiPeople" | "Room" | "DeveloperBoard" | "Code" | "Email" | "Create";

export interface Description {
  icon: DescriptionIcon;
  label: string;
  href: string;
}
