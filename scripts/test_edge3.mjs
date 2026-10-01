import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
const SUPABASE_URL = env.match(/VITE_SUPABASE_URL=(.*)/)[1].trim();
const SUPABASE_KEY = env.match(/VITE_SUPABASE_PUBLISHABLE_KEY=(.*)/)[1].trim();

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'testclient1394@example.com',
    password: 'password123'
  });

  if (authError) {
    console.error('Auth error:', authError);
    return;
  }
  
  const advocateId = '0ea35420-a35f-4ead-b7c4-a125b003c720';
  
  const res = await fetch(`${SUPABASE_URL}/functions/v1/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authData.session.access_token}`
    },
    body: JSON.stringify({
      advocateId,
      date: '2026-10-01',
      startTime: '10:00',
      endTime: '10:30'
    })
  });

  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Body:', text);
}

run();
