import React from "react";
import styled from "src/typed-components";
import Header from "src/Components/Header";
import { getChat, userProfile } from "src/types/api";
import Message from "src/Components/Message";
import Form from "src/Components/Form";
import Input from "src/Components/Input";

const Container = styled.div``;

const Chat = styled.div`
  height: 80vh;
  overflow: scroll;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputCont = styled.div`
  padding: 0 20px;
`;

interface IProps {
  data?: getChat | any;
  userData?: userProfile | any;
  loading: boolean;
  messageText: string;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const ChatPresenter: React.SFC<IProps> = ({
  loading,
  data: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  messageText,
  onInputChange,
  onSubmit
}) => (
  <Container>
    <Header title={"Chat"} />
    {!loading && chat && user && (
      <>
        <Chat>
          {chat.messages &&
            chat.messages.map(message => {
              if (message) {
                return (
                  <Message
                    key={message.id}
                    text={message.text}
                    mine={user.id === message.userId}
                  />
                );
              }
              return null;
            })}
        </Chat>
        <InputCont>
          <Form onSubmitFn={onSubmit}>
            <Input
              value={messageText}
              placeholder={"Type your message"}
              onChange={onInputChange}
              name={"message"}
            />
          </Form>
        </InputCont>
      </>
    )}
  </Container>
);

export default ChatPresenter;
