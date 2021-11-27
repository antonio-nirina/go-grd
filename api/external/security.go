package external

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
)

// Handle security middleware aims to implement a JWT authentication.
func Handle(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		err := godotenv.Load()

		if err != nil {
			log.Fatal("Error loading .env file")
		}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, Content-Length, Accept-Encoding")

		if r.Method == "OPTIONS" {
			w.Header().Set("Access-Control-Max-Age", "86400")
			w.WriteHeader(http.StatusOK)
			return
		}

		tokenString := r.Header.Get("Authorization")
		arrayToken := strings.SplitAfter(tokenString, " ")

		if len(arrayToken) > 1 {
			array := strings.Split(arrayToken[1], "=")
			if array[0] == "" {
				token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
					if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
						return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
					}

					return []byte(os.Getenv("SECRET")), nil
				})

				if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
					log.Printf("JWT Authenticated OK (app: %s)", claims["app"])
					next.ServeHTTP(w, r)
				}
			}
		}

		/*var checkRef bool = false
		arrayRf := strings.SplitAfter(os.Getenv("REFERS"), "-")

		if r.Referer() != "" {
			for _, val := range arrayRf {
				if r.Referer() == strings.Split(val, "-")[0] {
					checkRef = true
				}
			}
		}

		if tokenString == "" && !checkRef {
			w.WriteHeader(401)
			w.Write([]byte(`{ "error": "not authorized" }`))
		} else {
			next.ServeHTTP(w, r)
		}*/
		next.ServeHTTP(w, r)
	})
}
