# Supabase Setup Complete Guide

Your project already has Supabase integrated! Here's how to complete the setup:

## ✅ What's Already Integrated

- **Backend Supabase Client**: `backend/server/services/supabase.ts`
- **Database Operations**: `backend/server/store/contacts-supabase.ts`
- **Smart Fallback System**: `backend/server/store/index.ts` - Uses Supabase if configured, falls back to file storage
- **API Routes**: All contact and admin routes already support Supabase
- **Dependencies**: `@supabase/supabase-js` v2.57.4 installed

## 🚀 Quick Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your credentials from **Settings** → **API**

### 2. Set Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE=your_service_role_key_here
SUPABASE_ANON_KEY=your_anon_key_here

# Admin Configuration
ADMIN_TOKEN=your_secure_admin_token_here

# Server Configuration
PING_MESSAGE=ping
PORT=8080
```

### 3. Create Database Schema

In your Supabase project, go to **SQL Editor** and run:

```sql
-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'closed', 'replied')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  product TEXT,
  quantity TEXT,
  message TEXT NOT NULL,
  reply_message TEXT,
  reply_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_contacts_updated_at 
    BEFORE UPDATE ON contacts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow public to insert contacts (for contact forms)
CREATE POLICY "Allow public to insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Allow service role to do everything (for backend)
CREATE POLICY "Allow service role full access" ON contacts
  FOR ALL USING (auth.role() = 'service_role');
```

### 4. Test the Setup

1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Check the console for Supabase connection status
3. Submit a contact form to test data storage
4. Access admin panel at `/admin` with your admin token

## 🔧 How It Works

### Automatic Detection
The backend automatically detects Supabase configuration:
- If `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE` are set → Uses Supabase
- If not set → Falls back to file storage (`backend/data/contacts.json`)

### API Endpoints
All existing endpoints work with Supabase:
- `POST /api/contact` - Submit contact form
- `GET /api/admin/contacts` - List contacts (requires admin token)
- `GET /api/admin/contacts/:id` - Get specific contact
- `POST /api/admin/contacts/:id/reply` - Reply to contact
- `PATCH /api/admin/contacts/:id` - Update contact status

### Admin Access
- Set `ADMIN_TOKEN` in environment variables
- Use the token in the admin panel or API calls
- Frontend admin panel at `/admin` route

## 🛠️ Troubleshooting

### Common Issues

1. **"Supabase not configured" error**
   - Check that `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE` are set
   - Verify the values are correct (no extra spaces)

2. **Database connection errors**
   - Check your Supabase project is active
   - Verify the service role key has proper permissions

3. **Admin panel not working**
   - Set `ADMIN_TOKEN` environment variable
   - Use the token when accessing `/admin`

4. **Fallback to file storage**
   - This is normal if Supabase isn't configured
   - Check console logs for Supabase connection status

### Environment Variables Reference

```env
# Required for Supabase
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE=eyJ... (starts with eyJ)

# Optional
SUPABASE_ANON_KEY=eyJ... (for frontend direct access)
ADMIN_TOKEN=your_secure_token_here
PING_MESSAGE=ping
PORT=8080
```

## 🎯 Next Steps

1. **Set up your Supabase project** with the schema above
2. **Configure environment variables** in `backend/.env`
3. **Test the integration** by submitting contact forms
4. **Access admin panel** to manage contacts
5. **Optional**: Set up real-time subscriptions or authentication

Your Supabase integration is complete and ready to use! 🚀
