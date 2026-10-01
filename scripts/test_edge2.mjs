import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const env = fs.readFileSync('.env.local', 'utf8');
const SUPABASE_URL = env.match(/VITE_SUPABASE_URL=(.*)/)[1].trim();
const SUPABASE_KEY = env.match(/VITE_SUPABASE_PUBLISHABLE_KEY=(.*)/)[1].trim();

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const testEmail = `testclient${Math.floor(Math.random() * 10000)}@example.com`;
  console.log('Signing up as', testEmail);
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: testEmail,
    password: 'password123',
    options: { data: { name: 'Test Client', role: 'client' } }
  });

  if (authError) {
    console.error('Auth error:', authError);
    return;
  }
  
  console.log('Signed up. Token:', authData.session.access_token.substring(0, 20) + '...');

  // Get any advocate ID
  const { data: advocates } = await supabase.from('advocates').select('id').limit(1);
  if (!advocates || advocates.length === 0) {
    console.error('No advocates found!');
    return;
  }
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
