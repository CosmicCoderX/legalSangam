import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const categories = [
    'https://lawrato.com/criminal-lawyers',
    'https://lawrato.com/divorce-lawyers',
    'https://lawrato.com/property-lawyers',
    'https://lawrato.com/civil-lawyers'
];

// Helper for delays
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchHTML(url) {
    try {
        console.log(`Fetching ${url}...`);
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': USER_AGENT,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            },
            timeout: 15000
        });
        return data;
    } catch (error) {
        console.error(`Failed to fetch ${url}: ${error.message}`);
        return null;
    }
}

async function downloadImage(url, filename) {
    if (!url) return null;
    if (url.startsWith('//')) url = 'https:' + url;
    if (url.startsWith('/')) url = 'https://lawrato.com' + url;
    
    try {
        const p = path.resolve('public/advocates/photos');
        fs.mkdirSync(p, { recursive: true });
        
        const res = await axios.get(url, {
            responseType: 'stream',
            headers: { 'User-Agent': USER_AGENT }
        });
        const filepath = path.join(p, filename);
        const writer = fs.createWriteStream(filepath);
        res.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(`/advocates/photos/${filename}`));
            writer.on('error', reject);
        });
    } catch (e) {
        console.error(`Failed to download image ${url}:`, e.message);
        return null;
    }
}

async function scrapeProfile(url) {
    const html = await fetchHTML(url);
    if (!html) return null;
    const $ = cheerio.load(html);
    
    const data = {};
    
    // Name
    data.name = $('h1').first().text().trim() || $('title').text().split('-')[0].trim();
    if (data.name.startsWith('Advocate ')) data.name = data.name.replace('Advocate ', '');
    
    // Photo
    const imgUrl = $('img.profile-pic, .adv-img img, .advocate-img img, img[alt*="Advocate"]').first().attr('src');
    if (imgUrl) {
        // e.g., advocate-ravi-jadhav.webp
        const ext = imgUrl.split('.').pop().split('?')[0] || 'jpg';
        const filename = `advocate-${data.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.${ext}`;
        data.photo = await downloadImage(imgUrl, filename);
    }
    
    // Basic Details
    // Many fields in lawrato are in text blocks. Let's try to extract cleanly.
    data.verification = html.includes('Verified') ? 'verified' : 'pending';
    
    const extractField = (label) => {
        let val = '';
        $('div, p, span, li').each((i, el) => {
            const text = $(el).text().trim();
            if (text.toLowerCase().includes(label.toLowerCase()) && text.length < 200) {
                const parts = text.split(new RegExp(`${label}:?`, 'i'));
                if (parts.length > 1 && parts[1].trim()) {
                    val = parts[1].trim();
                }
            }
        });
        return val;
    };
    
    data.location = extractField('Location') || extractField('Practicing in');
    data.experience = extractField('Experience') || extractField('Years of Experience');
    if (data.experience) {
       const m = data.experience.match(/(\d+)/);
       if (m) data.experience = parseInt(m[1]);
    }
    
    data.enrollment = extractField('Enrollment');
    data.languages = extractField('Languages');
    data.courts = extractField('Courts');
    
    // About
    data.about = $('.about-advocate, .adv-bio, #about').text().trim().replace(/\s+/g, ' ') || '';
    
    // Ratings
    const ratingText = $('.rating-val, .star-rating, .rating').first().text().trim();
    if (ratingText) {
        const rm = ratingText.match(/([\d\.]+)/);
        if (rm) data.rating = parseFloat(rm[1]);
    }
    const reviewText = html.match(/(\d+)\+? user ratings/i) || html.match(/(\d+)\+? reviews/i);
    if (reviewText) {
        data.reviews = parseInt(reviewText[1]);
    }
    
    // Specialties
    data.practiceAreas = [];
    $('.specialization, .practice-areas, .services li').each((i, el) => {
        data.practiceAreas.push($(el).text().trim());
    });
    // Fallback if empty
    if (data.practiceAreas.length === 0) {
        const pa = extractField('Practice Areas');
        if (pa) data.practiceAreas = pa.split(',').map(x => x.trim());
    }

    return data;
}

async function run() {
    const allUrls = new Set();
    
    // 1. Scrape listing pages
    for (const catUrl of categories) {
        const html = await fetchHTML(catUrl);
        if (!html) {
            await sleep(2000);
            continue;
        }
        const $ = cheerio.load(html);
        let count = 0;
        $('a').each((i, el) => {
            const href = $(el).attr('href');
            if (href && href.includes('/advocate-') && !href.includes('?') && !href.includes('reviews')) {
                const fullUrl = href.startsWith('http') ? href : `https://lawrato.com${href}`;
                if (!allUrls.has(fullUrl) && count < 5) {
                    allUrls.add(fullUrl);
                    count++;
                }
            }
        });
        await sleep(2000);
    }
    
    console.log(`Found ${allUrls.size} unique advocate profiles. Scraping details...`);
    
    const results = [];
    for (const url of allUrls) {
        console.log(`Scraping profile: ${url}`);
        const data = await scrapeProfile(url);
        if (data) {
            data.profileUrl = url;
            results.push(data);
        }
        await sleep(2000); // Respectful delay
    }
    
    // Save JSON
    fs.mkdirSync('public', { recursive: true });
    fs.writeFileSync('public/advocates_data.json', JSON.stringify(results, null, 2));
    console.log(`Saved ${results.length} profiles to public/advocates_data.json`);
    
    // Save CSV
    const csvLines = ['Name,Location,Experience,Rating,Reviews,ProfileUrl'];
    for (const r of results) {
        csvLines.push(`"${r.name}","${r.location}","${r.experience}","${r.rating}","${r.reviews}","${r.profileUrl}"`);
    }
    fs.writeFileSync('public/advocates_summary.csv', csvLines.join('\n'));
    console.log('Saved public/advocates_summary.csv');
}

run();
