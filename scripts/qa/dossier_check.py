import os, re, sys, urllib.request, html
# Cross-checks the built site against the research dossier: every publication title, every DOI, key dates,
# names and links in the dossier must appear on the site, and private details (phone, residential address) must not.
BASE = os.environ.get("BASE", "http://localhost:3000")
DOSSIER = sys.argv[1]
d = open(DOSSIER, encoding="utf-8").read()
pages = ["/", "/research", "/publications", "/books", "/projects", "/locations", "/journey", "/about", "/contact"]
site = ""
for p in pages:
    raw = urllib.request.urlopen(BASE + p).read().decode("utf-8")
    site += html.unescape(re.sub(r"<!-- -->", "", raw))
site_n = re.sub(r"\s+", " ", site)
checks = []
def has(label, s): checks.append((s in site_n, label, s))
# titles: '### ' headings inside §12–14 (skip section headings)
sec = d[d.index("# 12. PUBLICATIONS"):d.index("# 15. RESEARCH TRAJECTORY")]
titles = sorted(set(t.strip() for t in re.findall(r"^#{2,3} (.+)$", sec, re.M) if not re.match(r"^(\d+\.|Publication status|Method|Main research|Research approach|Focus|Reported|Research focus|Central themes|Conceptual contribution|Key themes|Book positioning)", t)))
for t in titles: has("title", t)
for doi in sorted(set(re.findall(r"10\.\d{4,5}/[^\s)`]+", d))): has("doi", doi.rstrip("."))
for s in ["0000-0003-2667-4794", "shoeb.rahman@du.ac.bd", "30 December 2020", "15 December 2015", "29 December 2020", "16 March 2013", "14 December 2015",
          "10 February 2015", "29 May 2019", "25 November 2009", "30 November 2010", "25 October 2003", "30 October 2008", "20 May 2011", "15 March 2013",
          "1 January 2011", "1 May 2011", "Co-management for Tourism Development and Community Wellbeing: The Case of Hill Tracts, Bangladesh",
          "New Zealand Commonwealth Scholarship 2014", "ESD Research Writing Award", "Dean's List", "University of Wollongong", "April 2023",
          "University Grants Commission of Bangladesh (UGC)", "30 April 2025", "Prof. Dr. Santus Kumar Deb", "Mohammad Ruhual Amin",
          "Smile for Human Rights", "December 2013", "Community Ecotourism", "June 2010", "Dhaka College", "Madhukhali Pilot High School",
          "https://www.du.ac.bd/faculty/faculty_details/THM/535", "https://ssl.du.ac.bd/fontView/assets/faculty_cv/cv_535.pdf",
          "https://scholar.google.com/citations?user=Hcnk7NoAAAAJ&hl=en", "https://bd.linkedin.com/in/muhammad-shoeb-ur-rahman-phd-75254a15",
          "https://univdhaka.academia.edu/ShoebRahman", "https://www.researchgate.net/lab/Lab-in-progress-Muhammad-Shoeb-Ur-Rahman",
          "https://link.springer.com/book/10.1007/978-981-15-7014-8", "https://ideas.repec.org/a/ris/utmsje/0049.html"]:
    has("fact", s)
for interest in ["Crisis and Resilience in Tourism Systems", "Destination Development", "Sociology of Tourism", "Sustainable Tourism", "Tourism Governance", "Tourism Management", "Tourism Policy"]:
    has("interest", interest)
bad_terms = ["world-renowned", "leading global expert", "top researcher", "internationally acclaimed", "h-index", "i10", "citations:"]
for t in bad_terms: checks.append((t.lower() not in site_n.lower(), "forbidden phrase absent", t))
checks.append((not re.search(r"\+?880[\s-]?1\d{3}", site_n), "no personal phone number", "+880…"))
fails = [c for c in checks if not c[0]]
for ok_, label, s in checks:
    if not ok_: print("FAIL", label, "·", s)
print(f"{len(titles)} titles, {sum(1 for c in checks if c[1]=='doi')} DOIs, {len(checks)} checks · failures: {len(fails)}")
sys.exit(1 if fails else 0)
