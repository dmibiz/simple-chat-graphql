package ee.dmibiz.simplechatgraphql.resolver;

import com.coxautodev.graphql.tools.GraphQLSubscriptionResolver;
import ee.dmibiz.simplechatgraphql.model.Message;
import org.reactivestreams.Publisher;
import ee.dmibiz.simplechatgraphql.publisher.MessagePublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SubscriptionResolver implements GraphQLSubscriptionResolver {
    private final MessagePublisher messagePublisher;

    public Publisher<Message> newMessage() {
        return messagePublisher.getPublisher();
    }
}
