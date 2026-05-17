import os
import glob
import re

directory = r"C:\Users\ASUS\Downloads\mega-main\mega-main"
html_files = glob.glob(os.path.join(directory, "*.html"))

navbar_html = """<div class="navbar">
    <a href="index.html">홈</a>
    <a href="notice.html">공지사항</a>
    <a href="info.html">서버정보</a>
    <a href="update.html">업데이트</a>
    <a href="boss.html">보스정보</a>
    <a href="promo.html">홍보안내</a>
    <a href="service.html">고객센터</a>
    <a href="download.html">다운로드</a>
</div>"""

replacements = [
    (r"linear-gradient\(180deg,\s*#2e2e2e\s*0%,\s*#1f1f1f\s*50%,\s*#151515\s*100%\)", "linear-gradient(180deg, #1a2636 0%, #111822 50%, #0b0f15 100%)"),
    (r"rgba\(0,0,0,0.55\)", "rgba(10,16,26,0.65)"),
    (r"rgba\(0,0,0,0.78\)", "rgba(10,16,26,0.78)"),
    (r"rgba\(255,0,0,0.25\)", "rgba(0,150,255,0.25)"),
    (r"rgba\(255,0,0,0.35\)", "rgba(0,150,255,0.35)"),
    (r"rgba\(255,\s*0,\s*0,\s*0.08\)", "rgba(0, 150, 255, 0.08)"),
    (r"rgba\(255,\s*0,\s*0,\s*0.45\)", "rgba(0, 150, 255, 0.45)"),
    (r"rgba\(255,0,0,0.2\)", "rgba(0,150,255,0.2)"),
    (r"color:\s*#ff3333", "color: #33ccff"),
    (r"color:\s*#ff4444", "color: #33ccff"),
    (r"color:\s*#ffbbbb", "color: #bbddff"),
    (r"border-bottom:\s*2px\s*solid\s*#ff3333", "border-bottom: 2px solid #33ccff"),
    (r"text-shadow:\s*0\s*0\s*8px\s*(?:#ff0000|red)", "text-shadow: 0 0 10px #0088ff, 0 0 20px #0055ff"),
    (r"text-shadow:\s*0\s*0\s*10px\s*#000,\s*0\s*0\s*20px\s*#990000", "text-shadow: 0 0 15px #000, 0 0 25px #0066ff, 0 0 35px #0033aa"),
    (r"images/baphomet2\.jpg", "images/megamain.png"),
    (r"background:\s*#800000", "background: #004488"),
    (r"border:\s*1px\s*solid\s*#ff0000", "border: 1px solid #0088ff"),
    (r"background:\s*#ff0000", "background: #0088ff"),
    (r"box-shadow:\s*0\s*0\s*10px\s*#ff0000", "box-shadow: 0 0 10px #0088ff"),
]

for file in html_files:
    if "update_write" in file or "update_edit" in file:
        continue
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()

    # Apply CSS replacements
    for old, new in replacements:
        content = re.sub(old, new, content, flags=re.IGNORECASE)

    # Replace navbar
    # Look for <div class="navbar"> ... </div>
    navbar_pattern = r'<div class="navbar">.*?</div>'
    content = re.sub(navbar_pattern, navbar_html, content, flags=re.DOTALL)

    # Adjust margin for navbar links if it's 28px or 35px, so it fits 8 menus
    content = re.sub(r'margin:\s*0\s*(?:25|28|35)px;', 'margin: 0 15px;', content)

    with open(file, "w", encoding="utf-8") as f:
        f.write(content)

print("Updates completed successfully.")
