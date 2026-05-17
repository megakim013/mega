const fs = require('fs');
const path = require('path');

const dir = "C:/Users/ASUS/Downloads/mega-main/mega-main";
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const navbar_html = `<div class="navbar">
    <a href="index.html">홈</a>
    <a href="notice.html">공지사항</a>
    <a href="info.html">서버정보</a>
    <a href="update.html">업데이트</a>
    <a href="boss.html">보스정보</a>
    <a href="promo.html">홍보안내</a>
    <a href="service.html">고객센터</a>
    <a href="download.html">다운로드</a>
</div>`;

const replacements = [
    [/linear-gradient\(180deg,\s*#2e2e2e\s*0%,\s*#1f1f1f\s*50%,\s*#151515\s*100%\)/gi, "linear-gradient(180deg, #1a2636 0%, #111822 50%, #0b0f15 100%)"],
    [/rgba\(0,0,0,0\.55\)/g, "rgba(10,16,26,0.65)"],
    [/rgba\(0,0,0,0\.78\)/g, "rgba(10,16,26,0.78)"],
    [/rgba\(255,0,0,0\.25\)/g, "rgba(0,150,255,0.25)"],
    [/rgba\(255,0,0,0\.35\)/g, "rgba(0,150,255,0.35)"],
    [/rgba\(255,\s*0,\s*0,\s*0\.08\)/g, "rgba(0, 150, 255, 0.08)"],
    [/rgba\(255,\s*0,\s*0,\s*0\.45\)/g, "rgba(0, 150, 255, 0.45)"],
    [/rgba\(255,0,0,0\.2\)/g, "rgba(0,150,255,0.2)"],
    [/color:\s*#ff3333/g, "color: #33ccff"],
    [/color:\s*#ff4444/g, "color: #33ccff"],
    [/color:\s*#ffbbbb/g, "color: #bbddff"],
    [/border-bottom:\s*2px\s*solid\s*#ff3333/g, "border-bottom: 2px solid #33ccff"],
    [/text-shadow:\s*0\s*0\s*8px\s*(?:#ff0000|red)/gi, "text-shadow: 0 0 10px #0088ff, 0 0 20px #0055ff"],
    [/text-shadow:\s*0\s*0\s*10px\s*#000,\s*0\s*0\s*20px\s*#990000/g, "text-shadow: 0 0 15px #000, 0 0 25px #0066ff, 0 0 35px #0033aa"],
    [/images\/baphomet2\.jpg/g, "images/megamain.png"],
    [/background:\s*#800000/g, "background: #004488"],
    [/border:\s*1px\s*solid\s*#ff0000/g, "border: 1px solid #0088ff"],
    [/background:\s*#ff0000/g, "background: #0088ff"],
    [/box-shadow:\s*0\s*0\s*10px\s*#ff0000/g, "box-shadow: 0 0 10px #0088ff"]
];

for (const file of files) {
    if (file.includes("update_write") || file.includes("update_edit")) continue;
    
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Apply CSS replacements
    for (const [old_regex, new_str] of replacements) {
        content = content.replace(old_regex, new_str);
    }

    // Replace navbar
    content = content.replace(/<div class="navbar">[\s\S]*?<\/div>/, navbar_html);

    // Adjust margin for navbar links if it's 25, 28, or 35px
    content = content.replace(/margin:\s*0\s*(?:25|28|35)px;/g, 'margin: 0 15px;');

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
}

console.log("Updates completed successfully.");
