import React from "react";
import ChatPresenter from "./ChatPresenter";
import { RouteComponentProps } from "react-router";
import {
  getChat,
  getChatVariables,
  userProfile,
  sendMessage,
  sendMessageVariables
} from "src/types/api";
import { Query, Mutation, MutationFn } from "react-apollo";
import {
  GET_CHAT,
  SEND_MESSAGE,
  SUBSCRIBE_TO_MESSAGES
} from "./ChatQueries.queries";
import { USER_PROFILE } from "src/sharedQueries.queries";
import { SubscribeToMoreOptions } from "apollo-boost";

interface IProps extends RouteComponentProps<any> {}
interface IState {
  message: "";
}

class ProfileQuery extends Query<userProfile> {}
class ChatQuery extends Query<getChat, getChatVariables> {}
class SendMessageMutation extends Mutation<sendMessage, sendMessageVariables> {}

class ChatContainer extends React.Component<IProps, IState> {
  public sendMessageFn: MutationFn;

  constructor(props: IProps) {
    super(props);
    if (!props.match.params.chatId) {
      props.history.push("/");
    }
    this.state = {
      message: ""
    };
  }

  public render() {
    const {
      match: {
        params: { chatId }
      }
    } = this.props;
    const { message } = this.state;
    const parseChatId = parseInt(chatId, 10);
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData }) => (
          <ChatQuery query={GET_CHAT} variables={{ chatId: parseChatId }}>
            {({ data, loading, subscribeToMore }) => {
              const subscribeToMoreOption: SubscribeToMoreOptions = {
                document: SUBSCRIBE_TO_MESSAGES,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  const {
                    data: { MessageSubscription }
                  } = subscriptionData;
                  const {
                    GetChat: {
                      chat: { messages }
                    }
                  } = prev;
                  if (messages.length > 0) {
                    const newMessageId = MessageSubscription.id;
                    const latestMessageId = messages[messages.length - 1].id;
                    if (newMessageId === latestMessageId) {
                      return;
                    }
                  }
                  const newObject = Object.assign({}, prev, {
                    GetChat: {
                      ...prev.GetChat,
                      chat: {
                        ...prev.GetChat.chat,
                        messages: [
                          ...prev.GetChat.chat.messages,
                          MessageSubscription
                        ]
                      }
                    }
                  });
                  return newObject;
                }
              };
              subscribeToMore(subscribeToMoreOption);
              return (
                <SendMessageMutation mutation={SEND_MESSAGE}>
                  {sendMessageFn => {
                    this.sendMessageFn = sendMessageFn;
                    return (
                      <ChatPresenter
                        data={data}
                        loading={loading}
                        userData={userData}
                        onInputChange={this.onInputChange}
                        messageText={message}
                        onSubmit={this.onSubmit}
                      />
                    );
                  }}
                </SendMessageMutation>
              );
            }}
          </ChatQuery>
        )}
      </ProfileQuery>
    );
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public onSubmit = () => {
    const { message } = this.state;
    const {
      match: {
        params: { chatId }
      }
    } = this.props;
    const parseChatId = parseInt(chatId, 10);
    if (message !== "") {
      this.sendMessageFn({
        variables: {
          chatId: parseChatId,
          text: message
        }
      });
      this.setState({
        message: ""
      });
    }
    return;
  };
}

export default ChatContainer;
