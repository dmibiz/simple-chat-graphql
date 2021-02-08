package ee.dmibiz.simplechatgraphql.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.JWTVerifier;
import ee.dmibiz.simplechatgraphql.exception.BadTokenException;
import ee.dmibiz.simplechatgraphql.exception.UserExistsException;
import ee.dmibiz.simplechatgraphql.input.CreateUserInput;
import ee.dmibiz.simplechatgraphql.model.User;
import ee.dmibiz.simplechatgraphql.repository.UserRepository;
import ee.dmibiz.simplechatgraphql.security.JWTUserDetails;
import ee.dmibiz.simplechatgraphql.security.SecurityProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.util.function.Predicate.not;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final SecurityProperties securityProperties;
    private final Algorithm algorithm;
    private final JWTVerifier verifier;
    private final PasswordEncoder passwordEncoder;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User createUser(CreateUserInput input) {
        if (existsByEmail(input)) {
            throw new UserExistsException("A user with this email already exists");
        }

        if (existsByUsername(input)) {
            throw new UserExistsException("A user with this username already exists");
        }

        return userRepository.saveAndFlush(User
                .builder()
                .username(input.getUsername())
                .email(input.getEmail())
                .password(passwordEncoder.encode(input.getPassword()))
                .build());
    }

    public User getById(Integer id) {
        return userRepository.findById(id).orElseThrow();
    }

    @Override
    @Transactional
    public JWTUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository
                .findByEmail(email)
                .map(user -> getUserDetails(user, getToken(user)))
                .orElseThrow(() -> new UsernameNotFoundException("Username or password didn''t match"));
    }

    @Transactional
    public JWTUserDetails loadUserByToken(String token) {
        return getDecodedToken(token)
                .map(DecodedJWT::getSubject)
                .flatMap(userRepository::findByEmail)
                .map(user -> getUserDetails(user, token))
                .orElseThrow(BadTokenException::new);
    }

    @Transactional
    public String getToken(User user) {
        Instant now = Instant.now();
        Instant expiry = Instant.now().plus(securityProperties.getTokenExpiration());
        return JWT
                .create()
                .withIssuer(securityProperties.getTokenIssuer())
                .withIssuedAt(Date.from(now))
                .withExpiresAt(Date.from(expiry))
                .withSubject(user.getEmail())
                .sign(algorithm);
    }

    private JWTUserDetails getUserDetails(User user, String token) {
        return JWTUserDetails
                .builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .token(token)
                .build();
    }

    private Optional<DecodedJWT> getDecodedToken(String token) {
        try {
            return Optional.of(verifier.verify(token));
        } catch(JWTVerificationException ex) {
            return Optional.empty();
        }
    }

    private boolean isAnonymous(Authentication authentication) {
        return authentication instanceof AnonymousAuthenticationToken;
    }

    public boolean isAuthenticated() {
        return Optional
                .ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .filter(Authentication::isAuthenticated)
                .filter(not(this::isAnonymous))
                .isPresent();
    }

    private boolean existsByEmail(CreateUserInput input) {
        return userRepository.existsByEmail(input.getEmail());
    }

    private boolean existsByUsername(CreateUserInput input) {
        return userRepository.existsByUsername(input.getUsername());
    }

    @Transactional
    public User getCurrentUser() {
        return Optional
                .ofNullable(SecurityContextHolder.getContext())
                .map(SecurityContext::getAuthentication)
                .map(Authentication::getName)
                .flatMap(userRepository::findByEmail)
                .orElse(null);
    }
}
