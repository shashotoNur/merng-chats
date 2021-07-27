import { gql } from 'apollo-boost';

const getChatThreadQuery = gql`
  query GetChatMsg($user: String!, $otherUser: String!) {
    getChatThread (user: $user, otherUser: $otherUser) {
      id
      chatMessages
      status
    }
  }
`;

const createMsgMutation = gql`
  mutation CreateChatMsg($threadId: String!, $sender: String, $msgTxt: String!) {
    createChatMessage(threadId: $threadId, sender: $sender, msgTxt: $msgTxt) {
      id
      sender
      msgTxt
      status
    }
  }
`;

const updateMsgMutation = gql`
  mutation UpdateChatMsg($msgId: String!, $msgTxt: String!) {
    updateChatMessage(msgId: $msgId, msgTxt: $msgTxt) {
      id
      msgTxt
      status
    }
  }
`;

const deleteMsgMutation = gql`
  mutation DeleteChatMsg($msgId: String!) {
    deleteChatMessage(msgId: $msgId) {
      id
      status
    }
  }
`;

const threadChangeSubscription = gql`
  subscription ThreadChangeSubscription($threadId: String!) {
    threadChangeSubscription(threadId: $threadId) {
      chatMessage
      type
    }
  }
`;

export { getChatThreadQuery, createMsgMutation, updateMsgMutation, deleteMsgMutation,
  threadChangeSubscription };