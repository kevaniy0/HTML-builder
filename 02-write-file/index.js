const path = require('path');
const fs = require('fs');
const input = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

process.stdout.write('Hello, type your message\n');
process.on('exit', () => process.stdout.write('Bye Bye'))
process.on('SIGINT', () => process.exit());
process.stdin.on('data', (chunk) => {
    if (chunk.toString().toUpperCase().trim() === 'EXIT') {
        process.exit();
    }
    input.write(chunk);
})

