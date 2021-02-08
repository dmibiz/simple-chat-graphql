package ee.dmibiz.simplechatgraphql.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "message")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Message extends BaseEntity {
    @Column(name = "sender_id")
    private Integer senderId;

    @Column(name = "timestamp")
    private Date timestamp;

    @Column(name = "content")
    private String content;
}
