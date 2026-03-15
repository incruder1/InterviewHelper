package middleware

import (
	"net/http"
	"strings"
	"sync"

	"github.com/clerk/clerk-sdk-go/v2"
	clerkjwt "github.com/clerk/clerk-sdk-go/v2/jwt"
	clerkuser "github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/gin-gonic/gin"
)

const (
	ContextKeyEmail  = "userEmail"
	ContextKeyUserID = "userID"
)

// emailCache prevents a Clerk API call on every request for the same user.
// In production, replace with a TTL cache (e.g. github.com/patrickmn/go-cache).
var emailCache sync.Map

// ClerkAuth verifies the Clerk JWT, fetches the user's primary email from the
// Clerk API, and injects both userID and userEmail into the Gin context.
// All downstream handlers must call GetUserEmail(c) — never trust client-sent email.
func ClerkAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if !strings.HasPrefix(authHeader, "Bearer ") {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing or malformed Authorization header"})
			return
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")

		claims, err := clerkjwt.Verify(c.Request.Context(), &clerkjwt.VerifyParams{
			Token: tokenStr,
		})
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid or expired token"})
			return
		}

		userID := claims.Subject

		email, err := resolveEmail(c, userID)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "could not resolve user identity"})
			return
		}
		if email == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "user has no verified email address"})
			return
		}

		c.Set(ContextKeyUserID, userID)
		c.Set(ContextKeyEmail, email)
		c.Next()
	}
}

// GetUserEmail extracts the authenticated user's email from the Gin context.
// Panics if called outside a ClerkAuth-protected route (programming error).
func GetUserEmail(c *gin.Context) string {
	return c.MustGet(ContextKeyEmail).(string)
}

// resolveEmail fetches the user's primary email from the Clerk API, with an
// in-process cache keyed by Clerk user ID.
func resolveEmail(c *gin.Context, userID string) (string, error) {
	if cached, ok := emailCache.Load(userID); ok {
		return cached.(string), nil
	}

	usr, err := clerkuser.Get(c.Request.Context(), userID)
	if err != nil {
		return "", err
	}

	email := primaryEmail(usr)
	if email != "" {
		emailCache.Store(userID, email)
	}
	return email, nil
}

func primaryEmail(usr *clerk.User) string {
	if usr.PrimaryEmailAddressID == nil {
		if len(usr.EmailAddresses) > 0 {
			return usr.EmailAddresses[0].EmailAddress
		}
		return ""
	}
	for _, ea := range usr.EmailAddresses {
		if ea.ID == *usr.PrimaryEmailAddressID {
			return ea.EmailAddress
		}
	}
	return ""
}
