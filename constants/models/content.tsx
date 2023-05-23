// TO BE USED IN THE data.tsx module
interface Data {
  title: string;
  content: string | string[] | Content[];
}

type Content = {
  type: ContentType;
  uri: string;
};

const enum ContentType {
  Image = "image",
  Video = "video",
}

const enum WriteMode {
  Overwrite = "overwrite",
  Add = "add",
}

export { Data, Content, ContentType, WriteMode };
