import { createContext, useContext, useState } from "react";
import { Content, ContentType } from "../constants/models/content";

export const ContentContext = createContext({
  type: "",
  uri: "",
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
    type: content.type,
    uri: content.uri,
    changeContent: changeContent,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
}
