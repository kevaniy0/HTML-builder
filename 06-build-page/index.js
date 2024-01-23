const path = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;
const folder = path.join(__dirname, 'assets');
const newFolder = path.join(__dirname, 'project-dist', 'assets');

async function createHtml() {
    await fsPromise.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true });
    await fsPromise.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
    const template = await fsPromise.readFile(
      path.join(__dirname, 'template.html'), 'utf-8'
    );
    await fsPromise.writeFile(
      path.join(__dirname, 'project-dist', 'index.html'),
      template
    );
    const files = await fsPromise.readdir(path.join(__dirname, 'components'), {
      withFileTypes: true,
    });
    let str = template;
    for (const file of files) {
      if (file.isFile()) {
        const ext = path.extname(path.join(__dirname, 'components', file.name));
        if (ext === '.html') {
          const item = await fsPromise.readFile(
            path.join(__dirname, 'components', file.name), 'utf-8'
          );
          const name = file.name.slice(0, file.name.lastIndexOf('.'));
          str = str.replaceAll(`{{${name}}}`, item);
        }
      }
    }
    const newHtml = await fsPromise.writeFile(
        path.join(__dirname, 'project-dist', 'index.html'),
        str
      );
    const style = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
    fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (error, files) => {
        files.forEach((item) => {
            if (item.isFile()) {
               const exp = path.extname(path.join(__dirname, 'styles', item.name));
               if (exp === '.css') {
                   const read = fs.createReadStream(path.join(__dirname, 'styles', item.name), 'utf-8');
                   let str = '';
                   read.on('data', (chunk) => {
                       str = str + chunk.toString() + '\n';
                       style.write(str);
                   })
               }
           }
       })
   });
   copy(folder, newFolder);
  }

  async function copy(src, dst) {
    await fsPromise.mkdir(dst, { recursive: true });
    fs.readdir(src, {withFileTypes: true}, async (error, files) => {
        for (let item of files){
            const newSrc = path.join(src, item.name);
            const newDst = path.join(dst, item.name);
            if (item.isDirectory()){
                copy(newSrc, newDst);
            }else if (item.isFile()){
                fs.copyFile(newSrc, newDst, (error) => {
                    if (error) throw error;
                });
            }
        }
    });
  }

createHtml();

