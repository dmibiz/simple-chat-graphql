import { useState, useEffect } from 'react';
import Layout from '../../layout';
import { MESSAGES_QUERY } from '../../../graphql/queries';
import { SEND_MESSAGE_MUTATION } from '../../../graphql/mutations';
import { NEW_MESSAGE_SUBSCRIPTION } from '../../../graphql/subscriptions';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { useSelector } from 'react-redux';
import {
    ThemeProvider,
    MessageList, 
    Message,
    Bubble,
    MessageText, 
    TextComposer,
    TextInput,
    SendButton,
    Row,
    Fill,
    Fit
} from '@livechat/ui-kit';
import { animateScroll } from 'react-scroll';


const Chat = () => {
    const { loading: messagesLoading, error: messagesError } = useQuery(MESSAGES_QUERY, {
        onCompleted: ({ messages }) => {
            setMessages(messages);
        }
    });

    const [sendMessage, { loading: sendMessageLoading, error: sendMessageError}] = useMutation(SEND_MESSAGE_MUTATION);

    useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
        onSubscriptionData: ({ subscriptionData: { data } }) => {
            if (data.newMessage) {
                setMessages([...messages, data.newMessage]);
            }
        }
    });

    const authData = useSelector(({auth}) => auth);
    
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');

    useEffect(() => {
        animateScroll.scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        sendMessage({
            variables: {
                messageInput: {
                    content: messageText
                }
            }
        });
    }

    const customTheme = {
        Bubble: {
            css: {
                backgroundColor: '#dbdbdb',
            },
        }
    }


    return (
        <ThemeProvider theme={customTheme}>
            <Layout hideFooter>
                <MessageList active className="mb-5">
                    {messages.map((message) => {
                        const isOwn = message.sender.id === authData.user.id;

                        let bubbleStyle = {
                            borderRadius: '1.4em',
                        };

                        if (isOwn) {
                            bubbleStyle.borderTopRightRadius = '0.3em';
                        } else {
                            bubbleStyle.borderTopLeftRadius = '0.3em';
                        }

                        return (
                            <Message
                                key={message.id}
                                date={message.timestamp} 
                                authorName={message.sender.username} 
                                isOwn={isOwn}
                                >
                                    <Bubble
                                      style={bubbleStyle}
                                    >
                                        <MessageText>{message.content}</MessageText>
                                    </Bubble>
                            </Message>
                        )
                    })}
                </MessageList>
                <TextComposer
                    className="fixed-bottom"
                    onChange={({target: {value}}) => setMessageText(value)}
                    onSend={handleSendMessage}
                >
                    <Row align="center">
                        <Fill>
                            <TextInput />
                        </Fill>
                        <Fit>
                            <SendButton />
                        </Fit>
                    </Row>
                </TextComposer>
            </Layout>
        </ThemeProvider>
    );
}

export default Chat;