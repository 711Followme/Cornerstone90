/**
 * VAPID Key Generator for Push Notifications
 * Run this file to generate VAPID keys for your push notification service
 * 
 * Usage: node generateVapidKeys.js
 */

// Note: This uses the Web Crypto API available in modern browsers and Node.js 15+
// For Node.js < 15, you'll need the 'web-push' npm package

async function generateVapidKeys() {
  console.log('🔑 Generating VAPID Keys for Push Notifications...\n');

  try {
    // Generate ECDSA P-256 key pair
    const keyPair = await crypto.subtle.generateKey(
      {
        name: 'ECDSA',
        namedCurve: 'P-256'
      },
      true,
      ['sign', 'verify']
    );

    // Export public key
    const publicKeyBuffer = await crypto.subtle.exportKey('spki', keyPair.publicKey);
    const publicKeyArray = new Uint8Array(publicKeyBuffer);
    const publicKeyBase64 = btoa(String.fromCharCode(...publicKeyArray));
    const publicKeyUrlSafe = publicKeyBase64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    // Export private key
    const privateKeyBuffer = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
    const privateKeyArray = new Uint8Array(privateKeyBuffer);
    const privateKeyBase64 = btoa(String.fromCharCode(...privateKeyArray));
    const privateKeyUrlSafe = privateKeyBase64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    console.log('✅ VAPID Keys Generated Successfully!\n');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('📋 COPY THESE KEYS TO YOUR .env FILE:');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    console.log('# Public Key (Add to your frontend - can be public)');
    console.log(`VITE_VAPID_PUBLIC_KEY=${publicKeyUrlSafe}\n`);
    
    console.log('# Private Key (Keep SECRET - backend only, never commit to git!)');
    console.log(`VAPID_PRIVATE_KEY=${privateKeyUrlSafe}\n`);
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('📝 INSTRUCTIONS:');
    console.log('═══════════════════════════════════════════════════════════════\n');
    console.log('1. Create a .env file in your project root if you don\'t have one');
    console.log('2. Copy both keys above to your .env file');
    console.log('3. Add .env to your .gitignore (IMPORTANT!)');
    console.log('4. Restart your development server\n');
    console.log('⚠️  SECURITY WARNING:');
    console.log('   Never commit the VAPID_PRIVATE_KEY to version control!');
    console.log('   Keep it secret in your .env file and server environment.\n');

  } catch (error) {
    console.error('❌ Error generating VAPID keys:', error);
    console.log('\n💡 Alternative: Use the web-push library:');
    console.log('   npm install web-push');
    console.log('   npx web-push generate-vapid-keys');
  }
}

// Run if this file is executed directly
if (typeof window === 'undefined') {
  generateVapidKeys();
} else {
  console.log('Run this script in Node.js environment: node generateVapidKeys.js');
}

export default generateVapidKeys;
