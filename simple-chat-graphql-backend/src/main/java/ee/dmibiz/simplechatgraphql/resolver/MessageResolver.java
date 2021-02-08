package ee.dmibiz.simplechatgraphql.resolver;

import com.coxautodev.graphql.tools.GraphQLResolver;
import ee.dmibiz.simplechatgraphql.model.Message;
import ee.dmibiz.simplechatgraphql.model.MessageSender;
import ee.dmibiz.simplechatgraphql.model.User;
import ee.dmibiz.simplechatgraphql.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MessageResolver implements GraphQLResolver<Message> {
    private final UserService userService;

    public MessageSender getSender(Message message) {
        User user = userService.getById(message.getSenderId());
        return new MessageSender(message.getSenderId(), user.getUsername());
    }
}
