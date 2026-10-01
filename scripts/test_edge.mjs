import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read from .env.local
const env = fs.readFileSync('.env.local', 'utf8');
const SUPABASE_URL = env.match(/VITE_SUPABASE_URL=(.*)/)[1].trim();
const SUPABASE_KEY = env.match(/VITE_SUPABASE_PUBLISHABLE_KEY=(.*)/)[1].trim();

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  console.log('Logging in as ravijadhav123@example.com...');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'ravijadhav123@example.com',
    password: 'password123'
  });

  if (authError) {
    console.error('Auth error:', authError);
    return;
  }
  
  console.log('Logged in. Token:', authData.session.access_token.substring(0, 20) + '...');

  // Get any advocate ID
  const { data: advocates } = await supabase.from('advocates').select('id').limit(1);
  const advocateId = advocates[0].id;
  
  console.log('Hitting edge function for advocateId:', advocateId);
  const { data: fnData, error: fnError } = await supabase.functions.invoke('create-order', {
    body: {
      advocateId,
      date: '2026-10-01',
      startTime: '10:00',
      endTime: '10:30'
    }
  });

  console.log('Edge function response data:', fnData);
  console.log('Edge function response error:', fnError);
}

run();
