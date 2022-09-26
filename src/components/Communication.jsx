import { useContext, useEffect, useState } from 'react';

import { useAccount, useContractRead, useProvider, useSigner } from 'wagmi';
import { Client } from '@xmtp/xmtp-js'

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader
} from "@chatscope/chat-ui-kit-react";
import { shortAddress } from '../utilits';

export const Communication = ({ convAddress }) => {
  const { data: signer } = useSigner();
  const [client, setClient] = useState(false);
  const [conversation, setConversation] = useState(false);
  const [allMess, setAllMess] = useState(false);
  const [listenMess, setListenMess] = useState(false);
  const { address } = useAccount()


  const initClient = async (signer) => {
    if (signer && !client) {

      setClient(await Client.create(signer))

    }

  }

  const initConversation = async () => {

    if (convAddress) {
      setConversation(await client.conversations.newConversation(convAddress))
    }

  }

  const loadMessages = () => {
    conversation.messages().then((messages) => setAllMess(messages));
  }

  const listenMessages = async () => {
    for await (const message of await conversation.streamMessages()) {
      setListenMess(message);
    }


  }

  useEffect(() => {
    if (signer && !client) {

      initClient(signer);
    }

  }, [convAddress])


  useEffect(() => {

    if (convAddress && client) {
      initConversation();
    }
  }, [client, convAddress])


  useEffect(() => {
    if (conversation) {
      loadMessages();
      listenMessages();
    }
  }, [conversation])

  useEffect(() => {
    if (listenMess) {
      setAllMess(oldArray => [...oldArray, listenMess]);
    }
  }, [listenMess])


  return (<div className=" justify-center h-[500px] ">
      {
        conversation && (
          <MainContainer>

            <ChatContainer>
              <ConversationHeader>
                <Avatar className="border-2" src={`https://avatars.dicebear.com/api/jdenticon/${convAddress}.svg`} />
                <ConversationHeader.Content userName={shortAddress(convAddress)} />
              </ConversationHeader>
              <MessageList>
                {allMess && allMess.map((mess) => {
                    return (
                      <Message key={mess.id}
                               model={{
                                 sentTime: "j12312321",
                                 message: mess.content,
                                 direction: ((mess.senderAddress === address)) ? 'outgoing' : "incoming",

                               }}>
                        <Message.Footer sender="Emily" sentTime="just now" />


                        <Avatar className="border-2" src={`https://avatars.dicebear.com/api/jdenticon/${mess.senderAddress}.svg`} />
                      </Message>

                    )
                  }
                )}
              </MessageList>
              <MessageInput attachButton={false} autoFocus onSend={(msg) => {
                conversation.send(msg)
              }} placeholder="Type message here" />
            </ChatContainer>
          </MainContainer>
        )
      }


    </div>

  )
}
