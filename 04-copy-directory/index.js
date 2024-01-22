const path = require('path');
const fs = require('fs');

const copyDir = () => {
    fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, () => {
        fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (error) => {
            if (error) throw error;
            fs.readdir(path.join(__dirname, 'files'), (error, files) => {
                if (error) throw error;
                files.forEach((item) => {
                    fs.copyFile(path.join(__dirname, 'files', item), path.join(__dirname, 'files-copy', item), (error) => {
                        if (error) throw error;
                    });
                })
            })
        })
    });
}
copyDir();

