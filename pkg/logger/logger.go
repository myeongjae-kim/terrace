package logger

import (
	"io"
	"log"
	"os"
)

// InitLoggerWithLogFileName initializes a logger.
// Logs are saved to the path of an argument.
// It returns pointer of log file. It must be closed before a program terminates.
func InitLoggerWithLogFileName(logFilePath string) (*os.File, error) {
	f, err := os.OpenFile(logFilePath, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		return nil, err
	}

	log.SetOutput(io.MultiWriter(os.Stdout, f))
	log.Printf("(InitLogger) Logger is ready. Logs are saved to '%s'.\n", logFilePath)

	return f, nil
}
