package middlewares

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus"
)

func RegisterPrometheusMetrics() {
	prometheus.Register(latency) // prometheus.MustRegister(latency)
}

var latency = prometheus.NewSummaryVec(
	prometheus.SummaryOpts{
		Namespace:  "api",
		Name:       "latency_seconds",
		Help:       "Latency distributions.",
		Objectives: map[float64]float64{0.5: 0.05, 0.9: 0.01, 0.99: 0.001},
	},
	[]string{"method", "path"},
)

func PrometheusMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		elapsed := time.Since(start).Seconds()
		latency.WithLabelValues(
			c.Request.RequestURI,
			c.Request.Method,
		).Observe(elapsed)
	}
}
