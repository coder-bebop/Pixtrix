// TO BE USED IN THE data.tsx module
export interface Data {
  title: string;
  content: string | string[] | Content[];
}

// When having to differ between video and image
export type Content = {
  type: ContentType;
  uri: string;
};

export const enum ContentType {
  Image = "image",
  Video = "video",
}
