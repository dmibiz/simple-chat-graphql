package ee.dmibiz.simplechatgraphql;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class SimpleChatGraphqlApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimpleChatGraphqlApplication.class, args);
	}

}
