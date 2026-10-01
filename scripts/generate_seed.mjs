import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

// Parse the scraped data
const data = JSON.parse(fs.readFileSync('public/advocates_data.json', 'utf8'));

let sql = `-- Seed file generated from scraped LawRato data\n\n`;

for (const advocate of data) {
    const id = uuidv4();
    
    // Hash a default password 'password123'
    // Actually we can use Supabase's built in crypt function for passwords in SQL
    // e.g. crypt('password123', gen_salt('bf'))
    
    // Create auth user
    sql += `-- User: ${advocate.name}\n`;
    const email = `${advocate.name.replace(/[^a-zA-Z]/g, '').toLowerCase()}${Math.floor(Math.random()*1000)}@example.com`;
    
    sql += `INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '${id}', 'authenticated', 'authenticated', '${email}', crypt('password123', gen_salt('bf')), now(), now(), now());\n\n`;

    // Create profile
    sql += `INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('${id}', '${advocate.name.replace(/'/g, "''")}', '${email}', 'advocate', now());\n\n`;

    // Format fields
    const spec = advocate.practiceAreas.length > 0 
        ? `ARRAY[${advocate.practiceAreas.map(a => `'${a.replace(/'/g, "''")}'`).join(', ')}]` 
        : `ARRAY['General Practice']`;
        
    const lang = advocate.languages
        ? `ARRAY[${advocate.languages.split(',').map(l => `'${l.trim().replace(/'/g, "''")}'`).join(', ')}]`
        : `ARRAY['English', 'Hindi']`;
        
    let exp = parseInt(advocate.experience) || Math.floor(Math.random() * 15) + 3;
    let fee = Math.floor(Math.random() * 4 + 1) * 500; // 500, 1000, 1500, 2000
    
    const [city, state] = (advocate.location || 'Delhi, Delhi').split(',').map(s => s.trim());
    
    sql += `INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '${id}', 
    '${advocate.name.replace(/'/g, "''")}', 
    ${spec}, 
    ${exp}, 
    ${fee}, 
    '${city ? city.replace(/'/g, "''") : 'Delhi'}', 
    '${state ? state.replace(/'/g, "''") : 'Delhi'}', 
    '${advocate.verification || 'verified'}', 
    true,
    ${advocate.photo ? `'${advocate.photo}'` : 'null'},
    ${advocate.courts ? `'${advocate.courts.replace(/'/g, "''")}'` : 'null'},
    ${advocate.rating ? advocate.rating : 'null'},
    ${advocate.reviews ? advocate.reviews : 'null'},
    ${advocate.about ? `'${advocate.about.replace(/'/g, "''")}'` : 'null'},
    ${advocate.enrollment ? `'${advocate.enrollment.replace(/'/g, "''")}'` : 'null'},
    ${lang}
);\n\n`;
}

fs.writeFileSync('supabase/migrations/004_seed_advocates.sql', sql);
console.log('Generated supabase/migrations/004_seed_advocates.sql');
