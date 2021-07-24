import { gql } from 'apollo-boost';

const createChatMsg = gql`
  subscription OnChatMsg($threadId: String!, $sender: String, $msgTxt: String!) {
    createChatMessage(threadId: $threadId, sender: $sender, msgTxt: $msgTxt) {
      id
      sender
      msgTxt
      status
    }
  }
`;

export { createChatMsg };