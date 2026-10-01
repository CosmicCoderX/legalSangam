-- Seed file generated from scraped LawRato data

-- User: Ravi Jadhav
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '0ea35420-a35f-4ead-b7c4-a125b003c720', 'authenticated', 'authenticated', 'ravijadhav123@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('0ea35420-a35f-4ead-b7c4-a125b003c720', 'Ravi Jadhav', 'ravijadhav123@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '0ea35420-a35f-4ead-b7c4-a125b003c720', 
    'Ravi Jadhav', 
    ARRAY['General Practice'], 
    12, 
    500, 
    'Koregaon Park', 
    'Pune', 
    'verified', 
    true,
    '/advocates/photos/advocate-ravi-jadhav.webp',
    'Supreme Court, High Court',
    4.7,
    null,
    null,
    null,
    ARRAY['English', 'Hindi']
);

-- User: J. P. Rinwa
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '102d345b-6115-4851-af52-35ff5d6a5462', 'authenticated', 'authenticated', 'jprinwa427@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('102d345b-6115-4851-af52-35ff5d6a5462', 'J. P. Rinwa', 'jprinwa427@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '102d345b-6115-4851-af52-35ff5d6a5462', 
    'J. P. Rinwa', 
    ARRAY['General Practice'], 
    9, 
    1000, 
    'Swej Farm', 
    'Sodala', 
    'verified', 
    true,
    '/advocates/photos/advocate-j--p--rinwa.webp',
    'Supreme Court, High Court',
    4.7,
    null,
    null,
    null,
    ARRAY['English', 'Hindi']
);

-- User: Sunil Kumar Bakshi
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '36d853a2-7724-49a5-bb78-ab7e48759390', 'authenticated', 'authenticated', 'sunilkumarbakshi817@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('36d853a2-7724-49a5-bb78-ab7e48759390', 'Sunil Kumar Bakshi', 'sunilkumarbakshi817@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '36d853a2-7724-49a5-bb78-ab7e48759390', 
    'Sunil Kumar Bakshi', 
    ARRAY['General Practice'], 
    8, 
    2000, 
    'Sector-16', 
    'Faridabad', 
    'verified', 
    true,
    '/advocates/photos/advocate-sunil-kumar-bakshi.webp',
    null,
    4.9,
    null,
    null,
    null,
    ARRAY['English', 'Hindi', 'Punjabi']
);

-- User: Chitra Bhanu Gupta
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '5100a326-8b24-4bc7-b985-fddbfdd5697d', 'authenticated', 'authenticated', 'chitrabhanugupta179@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('5100a326-8b24-4bc7-b985-fddbfdd5697d', 'Chitra Bhanu Gupta', 'chitrabhanugupta179@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '5100a326-8b24-4bc7-b985-fddbfdd5697d', 
    'Chitra Bhanu Gupta', 
    ARRAY['General Practice'], 
    13, 
    1500, 
    'BBD Bagh', 
    'Kolkata', 
    'verified', 
    true,
    '/advocates/photos/advocate-chitra-bhanu-gupta.webp',
    'High Court',
    4.7,
    null,
    null,
    null,
    ARRAY['Bengali', 'English', 'Hindi']
);

-- User: H Gouri Shankar
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '691e515b-2d84-4360-92b3-bdf98f7194ca', 'authenticated', 'authenticated', 'hgourishankar102@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('691e515b-2d84-4360-92b3-bdf98f7194ca', 'H Gouri Shankar', 'hgourishankar102@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '691e515b-2d84-4360-92b3-bdf98f7194ca', 
    'H Gouri Shankar', 
    ARRAY['General Practice'], 
    15, 
    2000, 
    'Banjara Hills', 
    'Hyderabad', 
    'verified', 
    true,
    '/advocates/photos/advocate-h-gouri-shankar.webp',
    'Supreme Court',
    4.9,
    null,
    null,
    null,
    ARRAY['English', 'Hindi', 'Telugu']
);

-- User: Madhuri Bakshi
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', 'c41d1c06-fc6d-4399-9fe8-c4d9fcb1546c', 'authenticated', 'authenticated', 'madhuribakshi990@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('c41d1c06-fc6d-4399-9fe8-c4d9fcb1546c', 'Madhuri Bakshi', 'madhuribakshi990@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    'c41d1c06-fc6d-4399-9fe8-c4d9fcb1546c', 
    'Madhuri Bakshi', 
    ARRAY['General Practice'], 
    14, 
    1000, 
    'Sector 16', 
    'Faridabad', 
    'verified', 
    true,
    '/advocates/photos/advocate-madhuri-bakshi.jpg',
    null,
    4.8,
    null,
    null,
    null,
    ARRAY['English', 'Hindi', 'Punjabi']
);

-- User: Rajeev Nigam
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '6a994497-befb-477d-9f9a-cac05c83579a', 'authenticated', 'authenticated', 'rajeevnigam557@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('6a994497-befb-477d-9f9a-cac05c83579a', 'Rajeev Nigam', 'rajeevnigam557@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '6a994497-befb-477d-9f9a-cac05c83579a', 
    'Rajeev Nigam', 
    ARRAY['General Practice'], 
    10, 
    2000, 
    'Kanpur Nagar', 
    'Kanpur', 
    'verified', 
    true,
    '/advocates/photos/advocate-rajeev-nigam.webp',
    'District Court Kanpur Nagar',
    4.9,
    null,
    null,
    null,
    ARRAY['English', 'Hindi']
);

-- User: Bala Janaki
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '5d75c8c1-f24a-4121-8f28-a34653491b82', 'authenticated', 'authenticated', 'balajanaki461@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('5d75c8c1-f24a-4121-8f28-a34653491b82', 'Bala Janaki', 'balajanaki461@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '5d75c8c1-f24a-4121-8f28-a34653491b82', 
    'Bala Janaki', 
    ARRAY['General Practice'], 
    4, 
    1500, 
    'Thambuchetty Street', 
    'Chennai', 
    'verified', 
    true,
    '/advocates/photos/advocate-bala-janaki.webp',
    ', Chennai',
    4.9,
    null,
    null,
    null,
    ARRAY['English', 'Kannada', 'Malayalam', 'Tamil', 'Telugu']
);

-- User: Neelkanth Goswami
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '299e2b72-ca27-4470-b36d-22da7e48ad24', 'authenticated', 'authenticated', 'neelkanthgoswami179@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('299e2b72-ca27-4470-b36d-22da7e48ad24', 'Neelkanth Goswami', 'neelkanthgoswami179@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '299e2b72-ca27-4470-b36d-22da7e48ad24', 
    'Neelkanth Goswami', 
    ARRAY['General Practice'], 
    13, 
    2000, 
    'Charai', 
    'Thane', 
    'verified', 
    true,
    '/advocates/photos/advocate-neelkanth-goswami.jpg',
    'Supreme Court',
    4.5,
    null,
    null,
    null,
    ARRAY['English', 'Hindi', 'Marathi']
);

-- User: Rajesh K.S
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '19b2205b-2f5d-43ac-b6ad-fc9a24fa84ff', 'authenticated', 'authenticated', 'rajeshks895@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('19b2205b-2f5d-43ac-b6ad-fc9a24fa84ff', 'Rajesh K.S', 'rajeshks895@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '19b2205b-2f5d-43ac-b6ad-fc9a24fa84ff', 
    'Rajesh K.S', 
    ARRAY['General Practice'], 
    6, 
    1000, 
    'Subedar Chatram Road (SC Road)', 
    'Bangalore / Bengaluru', 
    'verified', 
    true,
    '/advocates/photos/advocate-rajesh-k-s.jpg',
    'Karnataka High Court, 
	                        	                        Supreme Court Of India',
    4.7,
    null,
    null,
    null,
    ARRAY['English', 'Hindi', 'Kannada', 'Telugu']
);

-- User: Bhawana Pandey
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', 'bf2f3683-b490-4380-80ff-1e7acf28fa56', 'authenticated', 'authenticated', 'bhawanapandey753@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('bf2f3683-b490-4380-80ff-1e7acf28fa56', 'Bhawana Pandey', 'bhawanapandey753@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    'bf2f3683-b490-4380-80ff-1e7acf28fa56', 
    'Bhawana Pandey', 
    ARRAY['General Practice'], 
    4, 
    1500, 
    'Jangpura Extension', 
    'Delhi', 
    'verified', 
    true,
    '/advocates/photos/advocate-bhawana-pandey.jpg',
    'Armed Forces Tribunal, Supreme Court, High Court',
    4.8,
    null,
    null,
    null,
    ARRAY['English', 'Hindi']
);

-- User: M Krishna Chaitanya
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '3df9a7a0-b4a3-4a44-a158-63588c6b8305', 'authenticated', 'authenticated', 'mkrishnachaitanya976@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('3df9a7a0-b4a3-4a44-a158-63588c6b8305', 'M Krishna Chaitanya', 'mkrishnachaitanya976@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '3df9a7a0-b4a3-4a44-a158-63588c6b8305', 
    'M Krishna Chaitanya', 
    ARRAY['General Practice'], 
    11, 
    2000, 
    'VIP Hills', 
    'Hyderabad', 
    'verified', 
    true,
    '/advocates/photos/advocate-m-krishna-chaitanya.webp',
    'High Court',
    4.6,
    null,
    null,
    null,
    ARRAY['English', 'Telugu']
);

-- User: Naveen Sheokand
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', 'ae3d9c58-2e1f-4e93-afb8-3d1c77b45790', 'authenticated', 'authenticated', 'naveensheokand115@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('ae3d9c58-2e1f-4e93-afb8-3d1c77b45790', 'Naveen Sheokand', 'naveensheokand115@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    'ae3d9c58-2e1f-4e93-afb8-3d1c77b45790', 
    'Naveen Sheokand', 
    ARRAY['General Practice'], 
    9, 
    500, 
    'Zirakpur', 
    'Chandigarh', 
    'verified', 
    true,
    '/advocates/photos/advocate-naveen-sheokand.jpg',
    'High Court',
    4.9,
    null,
    null,
    null,
    ARRAY['English', 'Hindi', 'Punjabi']
);

-- User: Anuj Aggarwal
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '34890428-8e67-4e42-8ca4-4206565d95b9', 'authenticated', 'authenticated', 'anujaggarwal220@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('34890428-8e67-4e42-8ca4-4206565d95b9', 'Anuj Aggarwal', 'anujaggarwal220@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '34890428-8e67-4e42-8ca4-4206565d95b9', 
    'Anuj Aggarwal', 
    ARRAY['General Practice'], 
    11, 
    1000, 
    'Greater Kailash 1', 
    'Delhi', 
    'verified', 
    true,
    '/advocates/photos/advocate-anuj-aggarwal.webp',
    'Supreme Court, High Court',
    4.9,
    null,
    null,
    null,
    ARRAY['English', 'Hindi', 'Punjabi']
);

-- User: Ravi Shankar
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '85915776-e298-42ae-b855-e73e28cc6d11', 'authenticated', 'authenticated', 'ravishankar347@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('85915776-e298-42ae-b855-e73e28cc6d11', 'Ravi Shankar', 'ravishankar347@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '85915776-e298-42ae-b855-e73e28cc6d11', 
    'Ravi Shankar', 
    ARRAY['General Practice'], 
    8, 
    1000, 
    'Anna Nagar', 
    'Chennai', 
    'verified', 
    true,
    '/advocates/photos/advocate-ravi-shankar.webp',
    'High Court',
    4.7,
    null,
    null,
    null,
    ARRAY['English', 'Tamil']
);

-- User: Vikash Shangari
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '88f68e18-573b-4966-8b88-d09780204de1', 'authenticated', 'authenticated', 'vikashshangari204@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('88f68e18-573b-4966-8b88-d09780204de1', 'Vikash Shangari', 'vikashshangari204@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '88f68e18-573b-4966-8b88-d09780204de1', 
    'Vikash Shangari', 
    ARRAY['General Practice'], 
    13, 
    1000, 
    'City Civil Court', 
    'Jamshedpur', 
    'verified', 
    true,
    '/advocates/photos/advocate-vikash-shangari.webp',
    'District Court Jamshedpur, 
	                        	                        Jharkhand High Court',
    4.6,
    null,
    null,
    null,
    ARRAY['English', 'Hindi']
);

-- User: Sharat Chandra Arukonda
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', 'abe54787-95ea-4bd4-8d46-498b91db085f', 'authenticated', 'authenticated', 'sharatchandraarukonda228@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('abe54787-95ea-4bd4-8d46-498b91db085f', 'Sharat Chandra Arukonda', 'sharatchandraarukonda228@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    'abe54787-95ea-4bd4-8d46-498b91db085f', 
    'Sharat Chandra Arukonda', 
    ARRAY['General Practice'], 
    16, 
    1000, 
    'Madhapur', 
    'Hyderabad', 
    'verified', 
    true,
    '/advocates/photos/advocate-sharat-chandra-arukonda.jpg',
    'High Court',
    4.5,
    null,
    null,
    null,
    ARRAY['English', 'Hindi', 'Telugu']
);

-- User: Vijay Tangri
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '991865dc-bd45-4651-83b9-cdfc7e33612c', 'authenticated', 'authenticated', 'vijaytangri732@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('991865dc-bd45-4651-83b9-cdfc7e33612c', 'Vijay Tangri', 'vijaytangri732@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '991865dc-bd45-4651-83b9-cdfc7e33612c', 
    'Vijay Tangri', 
    ARRAY['General Practice'], 
    11, 
    2000, 
    'Saket', 
    'Delhi', 
    'verified', 
    true,
    '/advocates/photos/advocate-vijay-tangri.webp',
    ', Delhi',
    4.7,
    null,
    null,
    null,
    ARRAY['English', 'Hindi']
);

-- User: Smita Sachin Mendhe
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', 'e7f2b4da-9c0d-463f-b24f-83a0d139b5ee', 'authenticated', 'authenticated', 'smitasachinmendhe491@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('e7f2b4da-9c0d-463f-b24f-83a0d139b5ee', 'Smita Sachin Mendhe', 'smitasachinmendhe491@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    'e7f2b4da-9c0d-463f-b24f-83a0d139b5ee', 
    'Smita Sachin Mendhe', 
    ARRAY['General Practice'], 
    15, 
    2000, 
    'New Kailash Nagar', 
    'Nagpur', 
    'verified', 
    true,
    '/advocates/photos/advocate-smita-sachin-mendhe.webp',
    'Nagpur',
    4.9,
    null,
    null,
    null,
    ARRAY['English', 'Hindi', 'Marathi']
);

-- User: Jia Kapur
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('00000000-0000-0000-0000-000000000000', '4d514fc1-c2d0-4eed-a5cc-fcfd161c4b2a', 'authenticated', 'authenticated', 'jiakapur652@example.com', crypt('password123', gen_salt('bf')), now(), now(), now());

INSERT INTO public.profiles (id, name, email, role, created_at)
VALUES ('4d514fc1-c2d0-4eed-a5cc-fcfd161c4b2a', 'Jia Kapur', 'jiakapur652@example.com', 'advocate', now());

INSERT INTO public.advocates (
    id, name, specializations, experience_years, consultation_fee, 
    city, state, verification_status, available_for_consultation,
    photo_url, courts, rating, reviews, bio, enrollment, languages
) VALUES (
    '4d514fc1-c2d0-4eed-a5cc-fcfd161c4b2a', 
    'Jia Kapur', 
    ARRAY['General Practice'], 
    8, 
    1500, 
    'Jangpura Extension', 
    'Delhi', 
    'verified', 
    true,
    '/advocates/photos/advocate-jia-kapur.jpg',
    'High Court',
    4.6,
    null,
    null,
    null,
    ARRAY['English', 'Hindi']
);

