package ee.dmibiz.simplechatgraphql.security;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

import java.time.Duration;

@ConstructorBinding
@ConfigurationProperties(prefix="simplechat.security.properties")
@Getter
@RequiredArgsConstructor
public class SecurityProperties {
    /**
     * Amount of hashing iterations, where formula is 2^passwordStrength iterations
     */
    private final int passwordStrength;
    /**
     * Secret used to generate and verify JWT tokens
     */
    private final String tokenSecret;
    /**
     * Name of the token issuer
     */
    private final String tokenIssuer = "dmibiz";
    /**
     * Duration after which a token will expire
     */
    private final Duration tokenExpiration = Duration.ofHours(4);
}
