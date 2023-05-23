import { createContext, useState } from "react";
import { Content, ContentType } from "../../constants/models/content";

export const ContentContext = createContext({
  content: { type: "" as ContentType, uri: "" } as Content,
  changeContent: (type: ContentType, uri: string) => {},
});

function ContentContextProvider({ children }) {
  const [content, setContent] = useState<Content>({
    type: "" as ContentType,
    uri: "",
  });

  function changeContent(contentType: ContentType, contentUri: string) {
    setContent({ type: contentType, uri: contentUri });
  }

  const contextValue = {
    content: content,
    changeContent: changeContent,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
}

export default ContentContextProvider;
