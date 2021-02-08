package ee.dmibiz.simplechatgraphql.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class UserAuth {
    private User user;
}
