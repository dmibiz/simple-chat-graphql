package ee.dmibiz.simplechatgraphql.service;

import ee.dmibiz.simplechatgraphql.input.CreateMessageInput;
import ee.dmibiz.simplechatgraphql.model.Message;
import ee.dmibiz.simplechatgraphql.model.User;
import ee.dmibiz.simplechatgraphql.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;

    public List<Message> getAll() {
        return messageRepository.findAll();
    }

    public Message createMessage(CreateMessageInput input, User sender) {
        return messageRepository.saveAndFlush(Message
                .builder()
                .senderId(sender.getId())
                .timestamp(new Date())
                .content(input.getContent())
                .build());
    }
}
