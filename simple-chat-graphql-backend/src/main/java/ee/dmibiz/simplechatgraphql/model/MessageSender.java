package ee.dmibiz.simplechatgraphql.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
public class MessageSender {
    private Integer id;

    private String username;
}
