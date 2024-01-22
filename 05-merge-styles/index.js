const path = require('path');
const fs = require('fs');
const bundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8');


fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
     files.forEach((item) => {
         if (item.isFile()) {
            const exp = path.extname(path.join(__dirname, 'styles', item.name));
            if (exp === '.css') {
                const read = fs.createReadStream(path.join(__dirname, 'styles', item.name));
                let str = '';
                read.on('data', (chunk) => {
                    str = str + chunk.toString() + '\n';
                    bundle.write(str);
                })
            }
        }
    })
})