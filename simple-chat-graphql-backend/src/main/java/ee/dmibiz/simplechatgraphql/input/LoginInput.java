package ee.dmibiz.simplechatgraphql.input;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(onConstructor = @__(@JsonCreator))
public class LoginInput {
    private final String email;
    private final String password;
}
