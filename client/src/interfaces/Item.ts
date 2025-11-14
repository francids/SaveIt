export type ItemType = "note" | "link";

export default interface Item {
  id: string;
  type: ItemType;
  content: string;
  created_at: Date;
  updated_at: Date;
}
