import axios from 'axios';
import * as cheerio from 'cheerio';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchHTML(url) {
    try {
        const { data } = await axios.get(url, {
            headers: { 'User-Agent': USER_AGENT }
        });
        return data;
    } catch (error) {
        console.error(`Failed to fetch ${url}: ${error.message}`);
        return null;
    }
}

async function run() {
    const html = await fetchHTML('https://lawrato.com/advocate-ravi-jadhav');
    if (!html) return;
    
    const $ = cheerio.load(html);
    
    console.log('Title:', $('title').text());
    
    // Name
    console.log('Name:', $('h1').text().trim());
    
    // Try to find image
    const imgUrl = $('img.profile-pic, .adv-img img, .advocate-img img, img[alt*="Advocate"]').attr('src');
    console.log('Image:', imgUrl);
    
    // Find some info classes
    console.log('Body classes:', $('body').attr('class'));
    
    // Print all headers and some meta info for debugging
    const metaInfo = [];
    $('.advocate-meta, .adv-info, .profile-info, .card, .expert-details').each((i, el) => {
        metaInfo.push($(el).text().replace(/\s+/g, ' ').substring(0, 100));
    });
    console.log('Info Blocks:', metaInfo);
}

run();
