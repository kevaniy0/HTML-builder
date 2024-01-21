const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (error, files) => {
    if (error) throw error;
    files.forEach((item) => {
       if (item.isFile()) {
        const itemPath = path.join(__dirname, 'secret-folder', item.name);
        fs.stat(itemPath, (error, stats) => {
            const index = item.name.lastIndexOf('.')
            console.log(`${item.name.slice(0, index)} - ${path.extname(itemPath).replace('.', '')} - ${stats.size / 1000}kb`)
        })
       }
    });
})

