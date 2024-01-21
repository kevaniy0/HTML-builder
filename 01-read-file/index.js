const path = require('path');
const fs = require('fs');
const output = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let str = '';

output.on('data', (chunk) => process.stdout.write((str = str + chunk)));
output.on('error', (error) => process.stdout.write('Error', error.message));
