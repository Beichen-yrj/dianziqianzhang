package com.example.backend;

import com.example.backend.util.TokenUtil;
import org.junit.Test;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import static org.junit.Assert.*;

public class TokenUtilTests {
    @Test
    public void signedTokenPreservesUsername() {
        String token = TokenUtil.sign("test-user", "2026-01-01");
        assertNotNull(token);
        assertTrue(TokenUtil.verify(token));
        assertEquals("test-user", TokenUtil.getLoginName(token));
    }

    @Test
    public void rejectsModifiedUsername() {
        String token = TokenUtil.sign("test-user", "2026-01-01");
        assertNotNull(token);
        String[] parts = token.split("\\.");
        String payload = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
        parts[1] = Base64.getUrlEncoder().withoutPadding().encodeToString(
                payload.replace("test-user", "other-user").getBytes(StandardCharsets.UTF_8));
        String tampered = String.join(".", parts);
        assertFalse(TokenUtil.verify(tampered));
        assertNull(TokenUtil.getLoginName(tampered));
    }
}
