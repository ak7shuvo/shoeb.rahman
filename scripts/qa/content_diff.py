import os, asyncio, re
from playwright.async_api import async_playwright
# Every text node rendered by the previous version must appear somewhere in the new site (content may move between pages).
BASE = os.environ.get("BASE", "http://localhost:3000")
OLD = os.environ.get("BASE_OLD", "http://localhost:3400")
OLD_ROUTES = ["/", "/research", "/publications", "/about", "/projects", "/contact", "/missing-page"]
NEW_ROUTES = ["/", "/research", "/publications", "/books", "/projects", "/locations", "/journey", "/about", "/contact", "/missing-page"]
NODES = """() => { const out=[]; const w=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
 while(w.nextNode()){ const p=w.currentNode.parentElement; if(!p||p.closest('script,style')) continue; const t=w.currentNode.textContent.replace(/\\s+/g,' ').trim(); if(t.length>=2) out.push(t);} return out; }"""
ALL = """() => document.body.textContent + ' ' + [...document.querySelectorAll('[alt],[aria-label],[href]')].map(e=>(e.getAttribute('alt')||'')+' '+(e.getAttribute('aria-label')||'')+' '+(e.getAttribute('href')||'')).join(' ')"""
norm = lambda s: re.sub(r"\s+", " ", s.replace(" ", " ")).strip()
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page()
        corpus = ""
        for r in NEW_ROUTES:
            await pg.goto(BASE + r, wait_until="networkidle"); corpus += " " + norm(await pg.evaluate(ALL))
        missing, total = {}, 0
        for r in OLD_ROUTES:
            await pg.goto(OLD + r, wait_until="networkidle")
            for t in await pg.evaluate(NODES):
                t = norm(t); total += 1
                if t not in corpus: missing.setdefault(t, set()).add(r)
        print("previous-version text nodes checked:", total, "· unique not found verbatim:", len(missing))
        for t, rs in sorted(missing.items()): print(f"  - [{', '.join(sorted(rs))}] {t[:150]}")
        await b.close()
asyncio.run(main())
