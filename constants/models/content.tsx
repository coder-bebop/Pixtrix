export type Content = {
  type: ContentType;
  uri: string;
};

export const enum ContentType {
  Image = "image",
  Video = "video",
}
