/**
 * Environment-aware logging utility
 * Only logs detailed errors in development mode
 * In production, logs sanitized error codes only
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const isDevelopment = process.env.NODE_ENV === 'development';

class Logger {
  private log(level: LogLevel, message: string, data?: any) {
    if (!isDevelopment && level === 'debug') {
      return; // Skip debug logs in production
    }

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    if (isDevelopment) {
      // Development: Log everything with full details
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
        prefix,
        message,
        data
      );
    } else {
      // Production: Log sanitized messages only
      if (level === 'error') {
        // Extract error code if available, hide sensitive details
        const errorCode = data?.code || 'UNKNOWN_ERROR';
        console.error(prefix, message, `Code: ${errorCode}`);

        // TODO: Send to error tracking service (Sentry, DataDog, etc.)
        // trackError({ message, code: errorCode });
      } else {
        console[level === 'warn' ? 'warn' : 'log'](prefix, message);
      }
    }
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error | any) {
    // Sanitize error object for production
    const sanitizedError = isDevelopment
      ? error
      : {
          code: error?.code,
          name: error?.name,
          // Never log full error message or stack in production
        };

    this.log('error', message, sanitizedError);
  }

  debug(message: string, data?: any) {
    this.log('debug', message, data);
  }
}

export const logger = new Logger();
