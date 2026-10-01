import axios from 'axios';
import fs from 'fs';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function run() {
    const { data } = await axios.get('https://lawrato.com/advocate-ravi-jadhav', {
        headers: { 'User-Agent': USER_AGENT }
    });
    fs.writeFileSync('scripts/sample_profile.html', data);
    console.log('Saved');
}
run();
