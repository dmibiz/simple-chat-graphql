package ee.dmibiz.simplechatgraphql.resolver;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import ee.dmibiz.simplechatgraphql.model.Message;
import ee.dmibiz.simplechatgraphql.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class QueryResolver implements GraphQLQueryResolver {
    private final MessageService messageService;

    @PreAuthorize("isAuthenticated()")
    public List<Message> getMessages() {
        return messageService.getAll();
    }
}
