package ee.dmibiz.simplechatgraphql.resolver;

import com.coxautodev.graphql.tools.GraphQLResolver;
import ee.dmibiz.simplechatgraphql.model.UserAuth;
import ee.dmibiz.simplechatgraphql.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserAuthResolver implements GraphQLResolver<UserAuth> {
    private final UserService userService;

    @PreAuthorize("isAuthenticated()")
    public String getToken(UserAuth userAuth) {
        return userService.getToken(userAuth.getUser());
    }
}
