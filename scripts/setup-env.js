#!/usr/bin/env node

/**
 * Environment Setup Script
 * 
 * This script helps developers quickly set up their environment configuration
 * by copying the example file and generating secure secrets.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function generateJWTSecret() {
  return crypto.randomBytes(64).toString('base64');
}

function setupEnvironment() {
  const rootDir = path.resolve(__dirname, '..');
  const exampleFile = path.join(rootDir, 'env.example');
  const localFile = path.join(rootDir, '.env.local');

  log('🚀 Setting up environment configuration...', 'cyan');

  // Check if .env.local already exists
  if (fs.existsSync(localFile)) {
    log('⚠️  .env.local already exists. Skipping setup.', 'yellow');
    log('   If you want to regenerate it, delete .env.local and run this script again.', 'yellow');
    return;
  }

  // Check if env.example exists
  if (!fs.existsSync(exampleFile)) {
    log('❌ env.example file not found!', 'red');
    log('   Please ensure the env.example file exists in the project root.', 'red');
    process.exit(1);
  }

  try {
    // Read the example file
    let content = fs.readFileSync(exampleFile, 'utf8');

    // Generate secure secrets
    const secrets = {
      NEXTAUTH_SECRET: generateSecret(32),
      JWT_SECRET: generateJWTSecret(),
      SESSION_SECRET: generateSecret(32),
    };

    // Replace placeholder values with generated secrets
    Object.entries(secrets).forEach(([key, value]) => {
      const placeholder = `${key}=your_${key.toLowerCase()}_here`;
      const replacement = `${key}=${value}`;
      content = content.replace(placeholder, replacement);
    });

    // Write the new .env.local file
    fs.writeFileSync(localFile, content);

    log('✅ Environment configuration created successfully!', 'green');
    log('📁 File created: .env.local', 'green');
    log('🔐 Generated secure secrets for authentication', 'green');
    
    log('\n📋 Next steps:', 'cyan');
    log('1. Review .env.local and update any values as needed', 'reset');
    log('2. Add your API keys and external service credentials', 'reset');
    log('3. Configure database connection if needed', 'reset');
    log('4. Start the development server: npm run dev', 'reset');
    
    log('\n🔒 Security note:', 'yellow');
    log('   The .env.local file is excluded from git for security.', 'yellow');
    log('   Keep your secrets safe and never commit them to version control.', 'yellow');

  } catch (error) {
    log('❌ Error creating environment configuration:', 'red');
    log(`   ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run the setup
if (require.main === module) {
  setupEnvironment();
}

module.exports = { setupEnvironment, generateSecret, generateJWTSecret };
