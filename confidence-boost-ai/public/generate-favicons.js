import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import favicons from 'favicons';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.resolve(__dirname, 'cogniview.png.png');
const configuration = {
  path: '/favicons/',
  appName: 'Cogniview',
  appShortName: 'Cogniview',
  appDescription: 'AI Interview Coach',
  developerName: 'Cogniview',
  developerURL: null,
  background: '#0A0B14',
  theme_color: '#000000',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    coast: false,
    favicons: true,
    firefox: false,
    windows: true,
    yandex: false
  }
};

console.log('Generating favicons...');

favicons(source, configuration)
  .then((response) => {
    // Create the favicons directory if it doesn't exist
    const faviconDir = path.resolve(__dirname, 'favicons');
    if (!fs.existsSync(faviconDir)) {
      fs.mkdirSync(faviconDir);
    }

    // Write the image files
    response.images.forEach((image) => {
      fs.writeFileSync(
        path.resolve(__dirname, 'favicons', image.name),
        image.contents
      );
    });

    // Write the files (manifest, browserconfig, etc.)
    response.files.forEach((file) => {
      fs.writeFileSync(
        path.resolve(__dirname, 'favicons', file.name),
        file.contents
      );
    });

    console.log('Favicons generated successfully!');
  })
  .catch((error) => {
    console.log(error.message);
  }); 