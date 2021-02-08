package ee.dmibiz.simplechatgraphql.repository;

import ee.dmibiz.simplechatgraphql.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Integer> {
}
