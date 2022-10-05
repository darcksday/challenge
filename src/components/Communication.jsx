import { useContext, useEffect, useState, memo, useMemo } from 'react';

import { useAccount, useContractRead, useProvider, useSigner } from 'wagmi';
import { Client } from '@xmtp/xmtp-js'
import { from } from 'rxjs';

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

export const Communication = memo(({ convAddress }) => {

  const { data: signer } = useSigner();
  const [client, setClient] = useState(false);
  const [conversation, setConversation] = useState(false);
  const [allMess, setAllMess] = useState([]);
  const { address } = useAccount();

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

  const mutateMessage = (item) => {
    return {
      'content': item['content'],
      'header': item['header'],
      'senderAddress': item['senderAddress'],
      'id': item['id'],

    }


  }

  const loadMessages = async () => {
    let messages = await conversation.messages();
    console.log('loaded')
    setAllMess(messages.map(item => mutateMessage(item)))
  }


  const listenMessages = async () => {
    let streamM = await conversation.streamMessages();
    let subj = from(streamM);
    subj.subscribe((rez) => {
      setAllMess(prevState => {
        return prevState.concat([mutateMessage(rez)])

      })
    });
  }

  const destroyListener = async () => {
    let st = await conversation.streamMessages()
    console.log(st);
    if (st) {
      console.log('destroyed')
      st.unsubscribeFn();
    }
  }


  useEffect(() => {

    if (convAddress && signer && !client) {
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
      destroyListener();
      loadMessages();
      listenMessages()

    }
  }, [conversation])


  return (convAddress) && <div className=" justify-center h-[500px] ">
    <MainContainer>

      <ChatContainer>
        <ConversationHeader>
          <Avatar className="border-2" src={`https://avatars.dicebear.com/api/jdenticon/${convAddress}.svg`} />
          <ConversationHeader.Content userName={shortAddress(convAddress)} />
        </ConversationHeader>
        <MessageList>
          {allMess.map((mess) => {
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


  </div>

}, (prevProps, nextProp) => {
  return prevProps.convAddress === nextProp.convAddress;

})