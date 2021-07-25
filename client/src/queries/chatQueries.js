import { gql } from 'apollo-boost';

const getChatThreadQuery = gql`
  subscription OnChatMsg($threadId: String!, $sender: String, $msgTxt: String!) {
    createChatMessage(threadId: $threadId, sender: $sender, msgTxt: $msgTxt) {
      id
      sender
      msgTxt
      status
    }
  }
`;

const createMsgSubscription = gql`
  subscription OnChatMsg($threadId: String!, $sender: String, $msgTxt: String!) {
    createChatMessage(threadId: $threadId, sender: $sender, msgTxt: $msgTxt) {
      id
      sender
      msgTxt
      status
    }
  }
`;

const updateMsgSubscription = gql`
  subscription OnChatMsg($threadId: String!, $sender: String, $msgTxt: String!) {
    createChatMessage(threadId: $threadId, sender: $sender, msgTxt: $msgTxt) {
      id
      sender
      msgTxt
      status
    }
  }
`;

const deleteMsgSubscription = gql`
  subscription OnChatMsg($threadId: String!, $sender: String, $msgTxt: String!) {
    createChatMessage(threadId: $threadId, sender: $sender, msgTxt: $msgTxt) {
      id
      sender
      msgTxt
      status
    }
  }
`;

export { getChatThreadQuery, createMsgSubscription, updateMsgSubscription, deleteMsgSubscription };