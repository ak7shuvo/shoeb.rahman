import os
BASE = os.environ.get("BASE", "http://localhost:3000")
import asyncio, json
from playwright.async_api import async_playwright
ROUTES=["/","/research","/publications","/books","/projects","/locations","/journey","/about","/contact","/does-not-exist"]
WIDTHS=[1920,1440,1280,1180,1024,768,480,390,360,320]
CHECK="""() => {
 const r={};
 const de=document.documentElement;
 r.overflow = de.scrollWidth - de.clientWidth;
 r.h1 = document.querySelectorAll('h1').length;
 const ids=[...document.querySelectorAll('[id]')].map(e=>e.id); r.dupIds=ids.filter((x,i)=>ids.indexOf(x)!==i);
 r.imgNoAlt=[...document.querySelectorAll('img')].filter(i=>!i.hasAttribute('alt')).length;
 r.unnamed=[...document.querySelectorAll('a[href],button')].filter(e=>{ if(e.closest('[hidden],[inert]')) return false; const n=(e.getAttribute('aria-label')||e.textContent||'').trim(); return !n; }).map(e=>e.outerHTML.slice(0,80));
 // heading skips
 const hs=[...document.querySelectorAll('h1,h2,h3,h4')].filter(h=>!h.closest('[hidden]')).map(h=>+h.tagName[1]); let skip=[]; for(let i=1;i<hs.length;i++){ if(hs[i]-hs[i-1]>1) skip.push(hs[i-1]+'>'+hs[i]); } r.headingSkips=skip;
 // small text
 r.tiny=[...document.querySelectorAll('body *')].filter(e=>{ if(!e.childNodes.length) return false; const t=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()); if(!t) return false; const cs=getComputedStyle(e); if(cs.display==='none'||cs.visibility==='hidden') return false; if(e.closest('.visually-hidden,svg')) return false; return parseFloat(cs.fontSize)<11; }).map(e=>e.className+':'+getComputedStyle(e).fontSize).slice(0,5);
 // invisible reveals after scroll
 r.unrevealed=[...document.querySelectorAll('[data-reveal]')].filter(e=>!e.closest('[hidden]') && e.offsetParent!==null && !e.classList.contains('is-in')).length;
 // touch targets < 44 on small screens
 if (innerWidth<=900) r.smallTargets=[...document.querySelectorAll('a[href],button')].filter(e=>{ if(e.closest('[hidden],.visually-hidden,.skip,.crumbs,.prose,p,.sr,.viz,.gantt,.map svg')) return false; const b=e.getBoundingClientRect(); return b.width>0 && (b.height<24 || b.width<24); }).map(e=>(e.textContent||e.getAttribute('aria-label')).trim().slice(0,30)).slice(0,6);
 // header collisions (desktop)
 const brand=document.querySelector('.brand-name'), nav=document.querySelector('.nav'), cta=document.querySelector('.bar .icon-btn');
 if (nav && getComputedStyle(nav).display!=='none'){ const rng=(el)=>{const rg=document.createRange(); rg.selectNodeContents(el); return rg.getBoundingClientRect();}; const a=rng(brand), links=[...nav.querySelectorAll('a')].map(rng), c=cta.getBoundingClientRect(); r.navGapL=Math.round(links[0].left-a.right); r.navGapR=Math.round(c.left-links[links.length-1].right); }
 return r; }"""
async def main():
    fails=[]; rows=[]
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for w in WIDTHS:
            ctx=await b.new_context(viewport={"width":w,"height":900}); pg=await ctx.new_page()
            errs=[]; pg.on("pageerror",lambda e: errs.append(str(e))); pg.on("console",lambda m: errs.append(m.text) if m.type=="error" and "404" not in m.text else None)
            for r in ROUTES:
                await pg.goto(BASE+r, wait_until="networkidle")
                h=await pg.evaluate("document.documentElement.scrollHeight"); y=0
                while y<h:
                    await pg.evaluate(f"window.scrollTo({{top:{y},behavior:'instant'}})"); await pg.wait_for_timeout(70); y+=600
                await pg.wait_for_timeout(300)
                res=await pg.evaluate(CHECK); res["errors"]=errs[:]; errs.clear()
                bad=[]
                if res["overflow"]>0: bad.append("overflow %d"%res["overflow"])
                if res["h1"]!=1: bad.append("h1=%d"%res["h1"])
                for k in ["dupIds","unnamed","headingSkips","tiny","errors"]:
                    if res[k]: bad.append(f"{k}={res[k]}")
                if res["imgNoAlt"]: bad.append("imgNoAlt")
                if res["unrevealed"]: bad.append("unrevealed=%d"%res["unrevealed"])
                if res.get("smallTargets"): bad.append(f"smallTargets={res['smallTargets']}")
                if "navGapL" in res and (res["navGapL"]<8 or res["navGapR"]<8): bad.append(f"navGap {res['navGapL']}/{res['navGapR']}")
                rows.append((r,w,"PASS" if not bad else "FAIL",bad, res.get("navGapL"), res.get("navGapR")))
            await ctx.close()
        await b.close()
    for row in rows:
        if row[2]=="FAIL": print(row)
    print("runs",len(rows),"fails",sum(1 for r in rows if r[2]=="FAIL"))
    gaps=[(r[1],r[4],r[5]) for r in rows if r[4] is not None and r[0]=="/"]
    print("nav gaps (width, brand→nav, nav→cta):",gaps)
    
asyncio.run(main())
