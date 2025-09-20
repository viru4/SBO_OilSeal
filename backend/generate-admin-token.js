// Generate a secure admin token
import crypto from 'crypto';

console.log('🔐 Generating New Admin Token...\n');

// Generate a secure random token
const adminToken = crypto.randomBytes(32).toString('hex');

console.log('✅ New Admin Token Generated:');
console.log(`🔑 ADMIN_TOKEN=${adminToken}`);
console.log('\n📝 To use this token:');
console.log('1. Update your backend/.env file');
console.log('2. Replace the ADMIN_TOKEN value with the token above');
console.log('3. Restart your development server');
console.log('\n🔒 Keep this token secure - it provides full admin access!');
console.log('\n💡 You can also use this token in API calls:');
console.log(`   Authorization: Bearer ${adminToken}`);
