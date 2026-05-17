const https = require('https');
const fs = require('fs');

https.get('https://baphometlin.github.io/crown/boss.html', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    fs.writeFileSync('C:/Users/ASUS/Downloads/mega-main/mega-main/boss_node.html', data);
    console.log('Downloaded');
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
