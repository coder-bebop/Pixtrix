import { createContext, useContext, useState } from "react";
import { Content, ContentType } from "../constants/models/content";

export const ContentContext = createContext({
  isModalShown: false,
  content: { type: "" as ContentType, uri: "" } as Content,
  showModal: (isShown: boolean) => {},
  changeContent: (type: ContentType, uri: string) => {},
});

function ContentContextProvider({ children }) {
  const [isModalShown, setIsModalShown] = useState(false);
  const [content, setContent] = useState<Content>({
    type: "" as ContentType,
    uri: "",
  });

  function changeContent(contentType: ContentType, contentUri: string) {
    setContent({ type: contentType, uri: contentUri });
  }

  function showModal(isShown: boolean) {
    setIsModalShown(isShown);
  }

  const contextValue = {
    isModalShown: isModalShown,
    content: content,
    showModal: showModal,
    changeContent: changeContent,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
}

export default ContentContextProvider;
