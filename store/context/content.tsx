import { createContext, useState } from "react";
import { Content, ContentType } from "../../constants/models/content";

export const ContentContext = createContext({
  showModal: false,
  setShowModal: (isVisible: boolean) => {},
  content: { type: "" as ContentType, uri: "" } as Content,
  setContent: (type: ContentType, uri: string) => {},
});

function ContentContextProvider({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<Content>({
    type: "" as ContentType,
    uri: "",
  });

  function changeContent(contentType: ContentType, contentUri: string) {
    setContent({ type: contentType, uri: contentUri });
  }

  function changeShowModal(isVisible: boolean) {
    setShowModal(isVisible);
  }

  const contextValue = {
    showModal: showModal,
    setShowModal: changeShowModal,
    content: content,
    setContent: changeContent,
  };

  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
}

export default ContentContextProvider;
