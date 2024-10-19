export type StatusType = "completed" | "abandoned" | "postponed" | "ongoing";

export type Project = {
  id: string;
  datetime: string;
  title?: string;
  body?: string;
  status?: StatusType;
  summary?: string;
  coverPhoto?: string;
  tags?: string;
  link?: string;
  categories?: string[];
  ytVideos?: string[];
};
