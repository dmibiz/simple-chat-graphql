package ee.dmibiz.simplechatgraphql.resolver;

import ee.dmibiz.simplechatgraphql.input.CreateMessageInput;
import ee.dmibiz.simplechatgraphql.input.CreateUserInput;
import ee.dmibiz.simplechatgraphql.input.LoginInput;
import ee.dmibiz.simplechatgraphql.model.Message;
import ee.dmibiz.simplechatgraphql.model.User;
import ee.dmibiz.simplechatgraphql.model.UserAuth;
import ee.dmibiz.simplechatgraphql.publisher.MessagePublisher;
import ee.dmibiz.simplechatgraphql.service.MessageService;
import ee.dmibiz.simplechatgraphql.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;

@Component
@RequiredArgsConstructor
public class MutationResolver implements GraphQLMutationResolver {
    private final UserService userService;
    private final MessageService messageService;
    private final AuthenticationProvider authenticationProvider;
    private final MessagePublisher messagePublisher;

    public UserAuth createUser(CreateUserInput userInput) {
        UserAuth userAuth = new UserAuth();
        userAuth.setUser(userService.createUser(userInput));
        return userAuth;
    }

    @PreAuthorize("isAnonymous()")
    public UserAuth login(LoginInput loginInput) {
        UsernamePasswordAuthenticationToken credentials = new UsernamePasswordAuthenticationToken(
                loginInput.getEmail(),
                loginInput.getPassword()
        );
        try {
            SecurityContextHolder.getContext().setAuthentication(authenticationProvider.authenticate(credentials));
            UserAuth userAuth = new UserAuth();
            userAuth.setUser(userService.getCurrentUser());
            return userAuth;
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }

    @PreAuthorize("isAuthenticated()")
    public Message sendMessage(CreateMessageInput messageInput) {
        User currentUser = userService.getCurrentUser();
        Message sentMessage = messageService.createMessage(messageInput, currentUser);
        messagePublisher.publish(sentMessage);
        return sentMessage;
    }
}
