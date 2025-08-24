/**
 * Environment Configuration
 * 
 * This file provides type-safe access to environment variables with validation
 * and sensible defaults. It ensures that required environment variables are
 * present and provides helpful error messages if they're missing.
 */

// Environment variable validation and defaults
const requiredEnvVars = {
  // Application
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Memojo Chat',
  NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
} as const;

const optionalEnvVars = {
  // API Configuration
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  
  // n8n Webhook
  N8N_CHAT_WEBHOOK_URL: process.env.N8N_CHAT_WEBHOOK_URL,
  
  // Rate Limiting
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  
  // Database
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT || '5432'),
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  
  // Authentication
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_MAX_AGE: parseInt(process.env.SESSION_MAX_AGE || '2592000'),
  
  // File Storage
  STORAGE_PROVIDER: process.env.STORAGE_PROVIDER || 'local',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  GOOGLE_CLOUD_PROJECT_ID: process.env.GOOGLE_CLOUD_PROJECT_ID,
  GOOGLE_CLOUD_STORAGE_BUCKET: process.env.GOOGLE_CLOUD_STORAGE_BUCKET,
  
  // Email
  EMAIL_PROVIDER: process.env.EMAIL_PROVIDER || 'smtp',
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587'),
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  
  // Monitoring & Analytics
  SENTRY_DSN: process.env.SENTRY_DSN,
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN,
  
  // Development & Debugging
  NODE_ENV: process.env.NODE_ENV || 'development',
  DEBUG: process.env.DEBUG === 'true',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_FORMAT: process.env.LOG_FORMAT || 'json',
  
  // Feature Flags
  ENABLE_CHAT_HISTORY: process.env.ENABLE_CHAT_HISTORY !== 'false',
  ENABLE_FILE_UPLOAD: process.env.ENABLE_FILE_UPLOAD !== 'false',
  ENABLE_USER_AUTHENTICATION: process.env.ENABLE_USER_AUTHENTICATION === 'true',
  ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS === 'true',
  
  // Chat Configuration
  CHAT_MAX_MESSAGE_LENGTH: parseInt(process.env.CHAT_MAX_MESSAGE_LENGTH || '1000'),
  CHAT_HISTORY_LIMIT: parseInt(process.env.CHAT_HISTORY_LIMIT || '100'),
  CHAT_AUTO_SCROLL: process.env.CHAT_AUTO_SCROLL !== 'false',
  
  // File Upload Configuration
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB
  ALLOWED_FILE_TYPES: process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif,image/webp',
  UPLOAD_DIRECTORY: process.env.UPLOAD_DIRECTORY || 'uploads',
  
  // Cache & Performance
  REDIS_URL: process.env.REDIS_URL,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  CACHE_TTL: parseInt(process.env.CACHE_TTL || '3600'),
  CACHE_MAX_SIZE: parseInt(process.env.CACHE_MAX_SIZE || '1000'),
  
  // Deployment
  VERCEL_URL: process.env.VERCEL_URL,
} as const;

// Validate required environment variables
function validateRequiredEnvVars() {
  const missingVars: string[] = [];
  
  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value) {
      missingVars.push(key);
    }
  });
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    );
  }
}

// Environment configuration object
export const env = {
  ...requiredEnvVars,
  ...optionalEnvVars,
  
  // Computed values
  isDevelopment: optionalEnvVars.NODE_ENV === 'development',
  isProduction: optionalEnvVars.NODE_ENV === 'production',
  isTest: optionalEnvVars.NODE_ENV === 'test',
  
  // Helper methods
  getApiUrl: () => optionalEnvVars.NEXT_PUBLIC_API_URL || requiredEnvVars.NEXT_PUBLIC_APP_URL,
  getDatabaseConfig: () => ({
    url: optionalEnvVars.DATABASE_URL,
    host: optionalEnvVars.DATABASE_HOST,
    port: optionalEnvVars.DATABASE_PORT,
    name: optionalEnvVars.DATABASE_NAME,
    user: optionalEnvVars.DATABASE_USER,
    password: optionalEnvVars.DATABASE_PASSWORD,
  }),
  getStorageConfig: () => ({
    provider: optionalEnvVars.STORAGE_PROVIDER,
    aws: {
      accessKeyId: optionalEnvVars.AWS_ACCESS_KEY_ID,
      secretAccessKey: optionalEnvVars.AWS_SECRET_ACCESS_KEY,
      region: optionalEnvVars.AWS_REGION,
      bucket: optionalEnvVars.AWS_S3_BUCKET,
    },
    google: {
      projectId: optionalEnvVars.GOOGLE_CLOUD_PROJECT_ID,
      bucket: optionalEnvVars.GOOGLE_CLOUD_STORAGE_BUCKET,
    },
  }),
  getEmailConfig: () => ({
    provider: optionalEnvVars.EMAIL_PROVIDER,
    smtp: {
      host: optionalEnvVars.SMTP_HOST,
      port: optionalEnvVars.SMTP_PORT,
      user: optionalEnvVars.SMTP_USER,
      password: optionalEnvVars.SMTP_PASSWORD,
    },
  }),
} as const;

// Validate environment variables on module load (only in development)
if (process.env.NODE_ENV === 'development') {
  try {
    validateRequiredEnvVars();
    console.log('✅ Environment variables validated successfully');
  } catch (error) {
    console.error('❌ Environment validation failed:', error);
    // Don't throw in development to allow the app to start
  }
}

// Type exports for TypeScript
export type EnvConfig = typeof env;
export type RequiredEnvVars = typeof requiredEnvVars;
export type OptionalEnvVars = typeof optionalEnvVars;

// Default export
export default env;
