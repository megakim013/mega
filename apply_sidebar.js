const fs = require('fs');
const path = require('path');

const dir = "C:/Users/ASUS/Downloads/mega-main/mega-main";
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const sidebar_css = `/* ------------------------------
   좌측 사이드바 메뉴 스타일
------------------------------ */
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    background: linear-gradient(180deg, rgba(10,16,26,0.95) 0%, rgba(7,12,20,0.95) 100%);
    border-right: 1px solid rgba(0,150,255,0.25);
    z-index: 2000;
    display: flex;
    flex-direction: column;
    box-shadow: 5px 0 25px rgba(0,0,0,0.6);
    backdrop-filter: blur(10px);
}
.sidebar-logo {
    padding: 35px 20px 25px 20px;
    text-align: center;
    border-bottom: 1px solid rgba(0,150,255,0.15);
}
.sidebar-logo h2 {
    margin: 0;
    color: #fff;
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 3px;
    text-shadow: 0 0 15px #0066ff, 0 0 25px #0033aa;
}
.sidebar-menu {
    display: flex;
    flex-direction: column;
    padding: 25px 0;
    flex: 1;
    overflow-y: auto;
}
.sidebar-menu a {
    color: #ccc;
    padding: 16px 30px;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 15px;
    border-left: 4px solid transparent;
    transition: 0.25s;
}
.sidebar-menu a:hover {
    color: #33ccff;
    background: rgba(0, 150, 255, 0.08);
    border-left: 4px solid #33ccff;
    text-shadow: 0 0 10px #0088ff;
}
.sidebar-footer {
    padding: 20px;
    text-align: center;
    font-size: 13px;
    color: #666;
    border-top: 1px solid rgba(255,255,255,0.05);
}
/* 메인 컨텐츠 영역 (사이드바 우측) */
.main-content {
    margin-left: 250px;
    width: calc(100% - 250px);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}`;

const sidebar_html = `<div class="sidebar">
    <div class="sidebar-logo">
        <h2>MEGA</h2>
    </div>
    <div class="sidebar-menu">
        <a href="index.html">🏠 홈</a>
        <a href="notice.html">📢 공지사항</a>
        <a href="info.html">📜 서버정보</a>
        <a href="update.html">⚡ 업데이트</a>
        <a href="boss.html">💀 보스정보</a>
        <a href="promo.html">📣 홍보안내</a>
        <a href="service.html">💬 고객센터</a>
        <a href="download.html">⬇ 다운로드</a>
    </div>
    <div class="sidebar-footer">
        <span>© 2026 Mega Server</span>
    </div>
</div>
<div class="main-content">`;

for (const file of files) {
    if (file.includes("update_write") || file.includes("update_edit") || file.includes("boss_downloaded") || file.includes("boss_node")) continue;

    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // 1. Replace navbar CSS with sidebar CSS
    const css_regex = /(?:\/\*[\s\S]*?\*\/)?\s*\.navbar\s*\{[\s\S]*?\.navbar\s*a:hover\s*\{[\s\S]*?\}/;
    if (css_regex.test(content)) {
        content = content.replace(css_regex, sidebar_css);
    } else {
        console.log(`Warning: navbar CSS not found in ${file}`);
    }

    // 2. Replace navbar HTML with sidebar HTML + open .main-content
    const html_regex = /(?:<!--\s*메뉴\s*-->\s*)?<div class="navbar">[\s\S]*?<\/div>/;
    if (html_regex.test(content)) {
        content = content.replace(html_regex, sidebar_html);
    } else {
        console.log(`Warning: navbar HTML not found in ${file}`);
    }

    // 3. Close .main-content after footer
    const footer_regex = /(<div class="footer">[\s\S]*?<\/div>)/;
    if (footer_regex.test(content)) {
        if (!content.includes("<!-- //main-content -->")) {
            content = content.replace(footer_regex, '$1\n</div><!-- //main-content -->');
        }
    } else {
        console.log(`Warning: footer not found in ${file}`);
    }

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated ${file}`);
}
console.log("All files updated to sidebar layout successfully.");
