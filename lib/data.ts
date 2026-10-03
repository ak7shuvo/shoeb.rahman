/**
 * Single source of truth for every fact on the site.
 * Compiled from the supplied research dossier (verification cut-off 30 September 2026), whose own
 * hierarchy is: University of Dhaka profile/CV → publisher/DOI pages → scholarly profiles.
 * Nothing here is inferred: if the dossier does not state a field, the field is left out.
 * Theme tags and location links are editorial navigation aids derived from each item's dossier entry.
 */

export const profile = {
  name: "Dr. Muhammad Shoeb-Ur-Rahman",
  shortName: "Shoeb-Ur-Rahman",
  initials: "MSR",
  role: "Associate Professor",
  department: "Department of Tourism and Hospitality Management",
  faculty: "Faculty of Business Studies",
  institution: "University of Dhaka",
  location: "Dhaka-1000, Bangladesh",
  email: "shoeb.rahman@du.ac.bd",
  orcid: "0000-0003-2667-4794",
  /** University of Dhaka campus — used only for the decorative coordinate label. */
  coordinates: "23.73° N · 90.39° E",
  heroStatement: "Researching tourism, destinations, communities and resilience in a changing Bangladesh.",
  oneLine: "Tourism governance, sustainable destination development, community wellbeing and resilience in Bangladesh.",
  short:
    "Dr. Muhammad Shoeb-Ur-Rahman is an Associate Professor of Tourism and Hospitality Management at the University of Dhaka whose research explores sustainable tourism, destination governance, community wellbeing, tourism policy, rural and peripheral destinations, crisis and resilience, and emerging smart-tourism practices in Bangladesh.",
  long:
    "Dr. Muhammad Shoeb-Ur-Rahman's research examines tourism as a social, institutional and environmental system. His work connects sustainable tourism and destination development with governance, community wellbeing, social and cultural capital, policy, resilience and crisis. Beginning with research on ecotourism, rural tourism and Bangladesh's tourism development challenges, his scholarship has developed toward co-management and community-focused governance, and more recently toward tourism resilience, urban crisis governance, ecological governance and smart tourism.",
  bio: [
    "Dr. Muhammad Shoeb-Ur-Rahman is an Associate Professor of Tourism and Hospitality Management at the University of Dhaka, Bangladesh. He holds a PhD in Tourism Management from Lincoln University, New Zealand, and an MBA in Tourism and Hospitality Management from the University of Dhaka.",
    "His research interests include sustainable tourism, tourism management, tourism planning and policy, tourism governance, crisis and resilience in tourism systems, destination development and sociology of tourism.",
    "His doctoral research focused on co-management for tourism development and community wellbeing in the Hill Tracts of Bangladesh, establishing a strong scholarly connection between tourism governance, community participation, social and cultural capital, sustainable livelihoods and destination development.",
    "His later work extends this trajectory into rural tourism, social capital, destination governance, tourism policy, tourism resilience, crisis governance, ecologically critical areas, tourism technology and smart tourism.",
  ],
  trajectory:
    "The research trajectory moves from sustainability and Bangladesh tourism toward co-management, social and cultural capital, community wellbeing, crisis governance, resilience, ecological governance and smart tourism.",
  signature:
    "Dr. Rahman's research has developed a sustained interest in how tourism resources, communities and destination governance interact. His doctoral and subsequent work examine co-management, social and cultural capital, community wellbeing and sustainable livelihoods, later extending these concerns into tourism policy, crisis governance, resilience and destination development.",
} as const;

export const links = {
  du: "https://www.du.ac.bd/faculty/faculty_details/THM/535",
  cv: "https://ssl.du.ac.bd/fontView/assets/faculty_cv/cv_535.pdf",
  orcid: "https://orcid.org/0000-0003-2667-4794",
  scholar: "https://scholar.google.com/citations?user=Hcnk7NoAAAAJ&hl=en",
  linkedin: "https://bd.linkedin.com/in/muhammad-shoeb-ur-rahman-phd-75254a15",
  academia: "https://univdhaka.academia.edu/ShoebRahman",
  rg: "https://www.researchgate.net/lab/Lab-in-progress-Muhammad-Shoeb-Ur-Rahman",
  springerBook: "https://link.springer.com/book/10.1007/978-981-15-7014-8",
} as const;

export const profileLinks = [
  { key: "du", label: "University of Dhaka profile", short: "DU profile", href: links.du, note: "Official faculty profile" },
  { key: "cv", label: "Official CV (PDF)", short: "Official CV", href: links.cv, note: "University of Dhaka" },
  { key: "orcid", label: "ORCID", short: "ORCID", href: links.orcid, note: profile.orcid },
  { key: "scholar", label: "Google Scholar", short: "Scholar", href: links.scholar, note: "Citation profile" },
  { key: "linkedin", label: "LinkedIn", short: "LinkedIn", href: links.linkedin, note: "Professional profile" },
  { key: "academia", label: "Academia.edu", short: "Academia", href: links.academia, note: "Papers" },
  { key: "rg", label: "ResearchGate", short: "ResearchGate", href: links.rg, note: "Lab page" },
] as const;

/* ------------------------------------------------------------------ research */

/** Research interests exactly as listed on the current University of Dhaka faculty profile. */
export const interests = [
  "Crisis and Resilience in Tourism Systems",
  "Destination Development",
  "Sociology of Tourism",
  "Sustainable Tourism",
  "Tourism Governance",
  "Tourism Management",
  "Tourism Policy",
] as const;

export type ThemeId = "sustainable" | "governance" | "community" | "crisis" | "policy" | "destination" | "technology" | "environment";

export type Theme = {
  id: ThemeId;
  /** The dossier cluster this strand corresponds to, where there is one. */
  cluster?: string;
  title: string;
  short: string;
  description: string;
  questions?: string[];
  concepts: string[];
};

/** Research clusters A–F from the dossier (descriptions carried over from v1.5.1), plus the early interdisciplinary strand. */
export const themes: Theme[] = [
  {
    id: "sustainable",
    cluster: "Cluster A — Sustainable & Responsible Tourism",
    title: "Sustainable & Responsible Tourism",
    short: "Sustainability",
    description: "Tourism growth, environmental and social sustainability, community wellbeing and sustainable livelihoods.",
    questions: [
      "How can tourism growth remain environmentally and socially sustainable?",
      "How can destinations avoid uncontrolled tourism diffusion?",
      "How can tourism contribute to community wellbeing?",
      "How can tourism development support sustainable livelihoods?",
    ],
    concepts: ["Ecotourism", "Rural tourism", "SDGs", "Community wellbeing"],
  },
  {
    id: "governance",
    cluster: "Cluster B — Tourism Governance & Co-management",
    title: "Tourism Governance & Co-management",
    short: "Governance",
    description: "How social and cultural capital, trust, power and participation shape destination-level decision-making.",
    concepts: ["Co-management", "Social capital", "Cultural capital", "Governance structures", "Community participation", "Stakeholder relationships", "Power and trust"],
  },
  {
    id: "community",
    cluster: "Cluster C — Community & Destination Development",
    title: "Community & Rural Tourism",
    short: "Community",
    description: "Community empowerment, local livelihoods, peripheral destinations and destination development.",
    concepts: ["Community empowerment", "Local livelihoods", "Rural tourism", "Peripheral destinations"],
  },
  {
    id: "crisis",
    cluster: "Cluster D — Crisis, Resilience & Tourism Governance",
    title: "Crisis, Resilience & Tourism Governance",
    short: "Crisis & resilience",
    description: "Crisis governance, institutional fragmentation, resilience, disruption and policy negotiation.",
    concepts: ["Crisis governance", "Resilience", "Institutional fragmentation", "Institutional response", "Destination disruption", "Urban tourism", "Organisational resilience"],
  },
  {
    id: "policy",
    cluster: "Cluster E — Tourism Policy & Planning",
    title: "Tourism Policy & Planning",
    short: "Policy",
    description: "Tourism administration, destination planning, facilities, policy implementation and stakeholder coordination.",
    concepts: ["National tourism policy", "Tourism administration", "Destination planning", "Policy implementation", "Stakeholders"],
  },
  {
    id: "destination",
    cluster: "Official DU research interest — Destination Development",
    title: "Destination Development",
    short: "Destinations",
    description: "Tourism resources, destination-level challenges, service quality and the development of emerging and peripheral destinations.",
    concepts: ["Tourism resources", "Service quality", "Destination transformation", "Tourism products"],
  },
  {
    id: "technology",
    cluster: "Cluster F — Tourism Technology & Smart Destinations",
    title: "Tourism Technology & Smart Destinations",
    short: "Technology",
    description: "An emerging direction connecting destination management with technological adoption and smart tourism.",
    concepts: ["Smart tourism", "Technological adoption", "Digital adoption", "Destination intelligence", "Digital marketing", "Destination management"],
  },
  {
    id: "environment",
    title: "Environment & Development (early work)",
    short: "Environment",
    description: "Early interdisciplinary papers on green economics, climate adaptation, energy and urban waste in Bangladesh.",
    concepts: ["Green economics", "Climate adaptation", "Solar energy", "Solid waste management"],
  },
];

export const themeById = Object.fromEntries(themes.map((t) => [t.id, t])) as Record<ThemeId, Theme>;

/** Methods documented across the publications (dossier §19). No other methods are claimed. */
export const methods = [
  "Qualitative case study research",
  "Semi-structured interviews",
  "In-depth interviews",
  "Participant observation",
  "Thematic analysis",
  "Longitudinal qualitative research",
  "Policy / document analysis",
  "Media discourse analysis",
  "Desk-based literature review",
  "Secondary-data analysis",
  "Structured questionnaires",
  "Descriptive statistics",
  "Importance–Performance Analysis (IPA)",
  "Conceptual framework development",
] as const;

/* ------------------------------------------------------------------ places */

export type LocationId = "cht" | "sundarbans" | "dhaka" | "stmartin" | "rural" | "national";

export type Place = {
  id: LocationId;
  name: string;
  role: string;
  topics: string[];
  /** SVG coordinates in the 420 × 520 map (Mercator, Natural Earth 1:50m). */
  point?: [number, number];
  note?: string;
};

export const places: Place[] = [
  { id: "cht", name: "Chittagong Hill Tracts", role: "Primary doctoral research context", topics: ["Co-management", "Community wellbeing", "Social / cultural capital", "Sustainable tourism"], point: [344.4, 328.9] },
  { id: "sundarbans", name: "Sundarbans", role: "Forest-based and peripheral destination research", topics: ["Forest-based tourism", "Social capital", "Peripheral destination development"], point: [126.8, 383.8] },
  { id: "dhaka", name: "Dhaka", role: "Recent urban tourism research", topics: ["Urban tourism", "Crisis governance", "Longitudinal resilience"], point: [215.3, 243.4] },
  { id: "stmartin", name: "St. Martin's Island", role: "Ecologically critical area research", topics: ["Ecologically critical areas", "Tourism governance", "Conservation", "Justice", "Policy discourse"], point: [354.8, 486.7] },
  { id: "rural", name: "Rural Bangladesh", role: "Rural tourism research", topics: ["Rural tourism", "Community empowerment", "Tourism service quality", "SDGs"], note: "Dispersed across rural districts; one named case is Saturia Upazila." },
  { id: "national", name: "Bangladesh — national scale", role: "National-scale research", topics: ["Tourism policy", "Tourism products", "Tourism marketing", "Air transport sustainability", "Smart tourism", "Tourism investment", "Destination development"] },
];

/** Named case sites inside individual publications, shown as secondary map markers. */
export const caseSites = [
  { id: "saturia", name: "Saturia Upazila", point: [188.5, 228.6] as [number, number], pub: "harnessing-rural" },
  { id: "bogura", name: "Bogura", point: [140.6, 154.6] as [number, number], pub: "guest-satisfaction" },
];

export const placeById = Object.fromEntries(places.map((p) => [p.id, p])) as Record<LocationId, Place>;

/* ------------------------------------------------------------------ publications */

export type PubType = "journal" | "book" | "chapter" | "conference";

export type Publication = {
  id: string;
  title: string;
  year: number;
  /** Online-first date where the publisher reports one. */
  online?: string;
  type: PubType;
  authors: string[];
  venue: string;
  /** Book chapters: the book title is `venue`; publisher and editors here. */
  publisher?: string;
  editors?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  chapter?: string;
  articleNo?: string;
  doi?: string;
  url?: string;
  /** Research setting, as worded in the dossier. */
  setting?: string;
  locations?: LocationId[];
  themes: ThemeId[];
  summary?: string;
  method?: string;
  keywords?: string[];
  contribution?: string[];
  featured?: number;
  note?: string;
};

const ME = "Muhammad Shoeb-Ur-Rahman";
export const SELF = ME;

export const publications: Publication[] = [
  {
    id: "governing-fragility",
    title: "Governing fragility: tourism, justice, and the politics of conservation in an ecologically critical area",
    year: 2026, online: "28 July 2026", type: "journal",
    authors: ["Md Ariful Hoque", "Abrar Faisal", "Easnin Ara", ME],
    venue: "Tourism Recreation Research", doi: "10.1080/02508281.2026.2690977",
    setting: "St. Martin's Island, Bangladesh", locations: ["stmartin"], themes: ["governance", "crisis", "policy", "sustainable"],
    summary: "Examines tourism governance on St. Martin's Island, described in the article as an ecologically critical area and Bangladesh's only coral island, including competing ecological and socio-economic framings, policy-induced crisis dynamics and the disjuncture between policy intent and development practice.",
    keywords: ["Tourism governance", "Ecologically critical areas", "Conservation", "Justice", "Human–nonhuman relationships", "Media discourse"],
    featured: 1,
  },
  {
    id: "governance-trembles",
    title: "When governance trembles: resilience as contested terrain in urban tourism",
    year: 2026, online: "22 June 2026", type: "journal",
    authors: ["Abrar Faisal", ME, "Md Ariful Hoque"],
    venue: "Tourism Recreation Research", doi: "10.1080/02508281.2026.2680935",
    setting: "Dhaka, Bangladesh", locations: ["dhaka"], themes: ["crisis", "governance"],
    summary: "A five-year longitudinal qualitative study of tourism governance in Dhaka. Within its theoretical framing, the paper argues that tourism resilience in the studied context is produced and renegotiated through institutional tensions, disruptions and governance processes rather than being a stable organisational capability.",
    method: "Five-year longitudinal qualitative study",
    keywords: ["Resilience", "Crisis governance", "Urban tourism", "Political ecology", "Institutional asymmetry", "Authority and legitimacy"],
    featured: 2,
  },
  {
    id: "beyond-survival",
    title: "Beyond survival: a longitudinal study of organisational resilience in an urban destination",
    year: 2026, online: "26 May 2026", type: "journal",
    authors: ["Abrar Faisal", "Md Ariful Hoque", ME],
    venue: "International Journal of Tourism Cities", doi: "10.1080/20565607.2026.2678298",
    setting: "An urban destination", themes: ["crisis", "destination"],
    summary: "A longitudinal, multi-scalar analysis of organisational resilience in urban tourism. The article reports ethics approval from the Centre for Project Management & Information Systems at the University of Dhaka.",
    method: "Longitudinal, multi-scalar analysis",
    contribution: ["Investigation", "Writing — review & editing", "Validation", "Data curation"],
    keywords: ["Organisational resilience", "Urban tourism"],
  },
  {
    id: "guest-satisfaction",
    title: "Guest satisfaction in food and beverage services: exploring issues for a resort",
    year: 2025, online: "1 May 2025", type: "journal",
    authors: ["Md. Sohan Ali", "Md Ariful Hoque", "Md. Ashikur Rahman Avi", ME],
    venue: "International Journal of Tourism Policy", volume: "15", issue: "2", pages: "101–116", doi: "10.1504/IJTP.2025.146028",
    setting: "Momo Inn Park and Resort, Bogura, Bangladesh", themes: ["destination"],
    summary: "Uses semi-structured interviews and online customer reviews, through the lens of value-percept theory, to examine factors affecting guest satisfaction in resort food and beverage services.",
    method: "Semi-structured interviews and online customer reviews; value-percept theory",
    keywords: ["Food / service quality", "Price range", "Menu variety", "Food hygiene", "Staff training", "Customer feedback"],
  },
  {
    id: "handicraft",
    title: "Promoting handicraft family business through digital marketing towards sustainable performance",
    year: 2024, type: "journal",
    authors: ["Santus Kumar Deb", ME, "Shohel Md. Nafi"],
    venue: "GeoJournal of Tourism and Geosites", volume: "55", issue: "3", pages: "1402–1413", doi: "10.30892/gtg.55340-1312",
    themes: ["technology", "sustainable"],
    keywords: ["Handicraft family businesses", "Digital marketing", "Technological innovation", "Business performance", "Sustainable development"],
  },
  {
    id: "rural-service-quality",
    title: "Assessing Service Quality Attributes of Rural Tourism in Bangladesh: Avenues for Improvement",
    year: 2024, online: "31 July 2024", type: "journal",
    authors: [ME, "Karabi Kabir"],
    venue: "South Asian Journal of Tourism and Hospitality", volume: "4", issue: "1", pages: "98–119", doi: "10.4038/sajth.v4i1.82",
    setting: "Rural Bangladesh", locations: ["rural"], themes: ["community", "destination", "policy"],
    summary: "Applies Importance–Performance Analysis to 25 service-quality attributes using structured questionnaire data from 500 respondents. The authors report that Bangladesh possesses natural resources for rural tourism but faces limitations in human-made elements such as infrastructure and tourist facilities.",
    method: "Importance–Performance Analysis (IPA); 25 attributes; 500 respondents",
    keywords: ["Tourist perceptions", "Rural tourism quality", "Infrastructure", "Tourism facilities", "Tourism policy"],
    featured: 5,
  },
  {
    id: "social-cultural-capitals",
    title: "Social and cultural capitals in tourism resource governance: the essential lenses for community focussed co-management",
    year: 2022, type: "journal",
    authors: [ME, "David G. Simmons", "Michael C. Shone", "Nazmun N. Ratna"],
    venue: "Journal of Sustainable Tourism", volume: "30", issue: "11", pages: "2665–2685", doi: "10.1080/09669582.2021.1903016",
    setting: "Chittagong Hill Tracts, Bangladesh", locations: ["cht"], themes: ["governance", "sustainable", "community"],
    summary: "Examines the relative importance of social and cultural capital in reshaping tourism-resource governance for sustainable livelihood outcomes, applying the Capitals Co-management for Sustainable Livelihood Framework (CCSLF) in a remote case setting in the Chittagong Hill Tracts.",
    keywords: ["Social capital", "Cultural capital", "Tourism resource governance", "Co-management", "Sustainable livelihoods", "Community wellbeing"],
    featured: 3,
  },
  {
    id: "bcsir-smes",
    title: "Leading through innovation: The role of BCSIR in facilitating Small and Medium Enterprises in Bangladesh",
    year: 2022, type: "journal",
    authors: ["Mohammad Nashir Uddin", "Shah Abdul Tarique", "Md. Aftab Ali Shaikh", ME],
    venue: "International Journal of SME Development", issue: "5", pages: "115–129",
    locations: ["national"], themes: ["technology"],
    note: "Listed on the official DU publication profile and the SME Foundation Bangladesh site.",
    keywords: ["Innovation", "SMEs"],
  },
  {
    id: "destination-repurposed",
    title: "Destination repurposed: transformative impacts of refugee crisis",
    year: 2022, type: "journal",
    authors: ["Md Ariful Hoque", "Abrar Faisal", ME],
    venue: "Tourism Recreation Research", volume: "47", issue: "2", pages: "211–216", doi: "10.1080/02508281.2020.1862544",
    themes: ["crisis", "destination"],
    summary: "Examines how a refugee crisis can transform a tourism destination.",
    keywords: ["Crisis", "Destination transformation", "Tourism development"],
  },
  {
    id: "social-capital-peripheral",
    title: "Social Capital and Tourism Development: Insights from a Peripheral Destination",
    year: 2021, online: "30 November 2021", type: "journal",
    authors: ["Easnin Ara", ME, "Silvi Azad"],
    venue: "European Journal of Business and Management", volume: "13", issue: "22", pages: "81–86", doi: "10.7176/EJBM/13-22-09",
    setting: "Sundarbans, Bangladesh", locations: ["sundarbans"], themes: ["governance", "community", "destination"],
    summary: "A qualitative case study of social capital — bridging and linking capital, trust and power — in community-involved tourism development at a peripheral destination.",
    method: "Qualitative case study; semi-structured interviews; thematic analysis",
    keywords: ["Social capital", "Bridging capital", "Linking capital", "Trust", "Power", "Peripheral destinations"],
  },
  {
    id: "harnessing-rural",
    title: "Harnessing rural tourism for community empowerment: Insights from an emerging destination",
    year: 2021, type: "journal",
    authors: [ME, "Asmaul Husna Megha", "Md Ariful Hoque", "Abrar Faisal"],
    venue: "Jahangirnagar University Journal of Marketing", volume: "9", pages: "1–15",
    setting: "Saturia Upazila, Bangladesh", locations: ["rural"], themes: ["community", "destination"],
    summary: "A case study of rural tourism development, community empowerment and tourism impacts on host communities in an emerging destination.",
    method: "Case-study research design",
    keywords: ["Rural tourism development", "Community empowerment", "Host communities", "Tourism impacts"],
  },
  {
    id: "co-management-framework",
    title: "Co-management of capitals for community wellbeing and sustainable tourism development: A conceptual framework",
    year: 2020, online: "3 May 2019", type: "journal",
    authors: [ME, "David G. Simmons", "Michael Shone", "Nazmun N. Ratna"],
    venue: "Tourism Planning & Development", volume: "17", issue: "2", pages: "225–236", doi: "10.1080/21568316.2019.1600161",
    themes: ["governance", "sustainable", "community"],
    summary: "Proposes a framework connecting tourism resource capitals, co-management, community wellbeing and sustainable tourism development — one of the central theoretical papers in the research trajectory.",
    method: "Conceptual framework development",
    keywords: ["Tourism resource capitals", "Co-management", "Community wellbeing", "Sustainable tourism development"],
    featured: 4,
  },
  {
    id: "media-behaviour",
    title: "The role of media on tourists’ post-trip behavioural intentions: A Bangladesh perspective",
    year: 2020, type: "journal",
    authors: [ME, "Abdullah Al Muneem", "K. Wahab"],
    venue: "Jagannath University Journal of Business Studies", volume: "8", issue: "1 & 2", pages: "121–136",
    locations: ["national"], themes: ["destination"],
    keywords: ["Tourist behaviour", "Media"],
  },
  {
    id: "events-south-asia",
    title: "Tourism events in South Asia: Brief profiling of cultural celebrations",
    year: 2019, type: "chapter",
    authors: [ME, "Karabi Kabir", "Azizul Hassan"],
    venue: "Tourism Events in Asia", publisher: "Routledge", chapter: "2", pages: "20–35",
    setting: "South Asia", themes: ["destination"],
    summary: "A desk-based profile of traditional tourism events and cultural celebrations in South Asia, covering event tourism demand and supply, stakeholder collaboration and event planning.",
    method: "Desk-based literature and online resource analysis",
    keywords: ["Cultural celebrations", "Event tourism", "Stakeholder collaboration", "Event planning and management"],
  },
  {
    id: "forest-sundarbans",
    title: "Forest-based tourism in Bangladesh: Challenges unveiled for the Sundarbans",
    year: 2018, type: "journal",
    authors: ["Md. Ariful Hoque", "Easnin Ara", ME],
    venue: "European Journal of Business and Management", volume: "10", issue: "36", pages: "97–107",
    setting: "Sundarbans, Bangladesh", locations: ["sundarbans"], themes: ["destination", "policy", "sustainable"],
    summary: "Reports tourism-development challenges for policymakers: inadequate infrastructure, lack of planning and management, dominance of wealthy urban elites, insufficient training, limited local-authority support, security issues and fraudulent intermediaries.",
    method: "In-depth interviews; participant observation; published and unpublished secondary sources",
    keywords: ["Forest-based tourism", "Infrastructure", "Planning and management"],
  },
  {
    id: "rural-sdgs",
    title: "Can rural tourism promote sustainable development goals? Scoping rural tourism prospects in rustic Bangladesh",
    year: 2018, type: "journal",
    authors: [ME, "Abdullah Al Muneem", "Md. Ashikur Rahman Avi", "Sanjana Sobhan"],
    venue: "Rajshahi University Journal of Business Studies", volume: "11", issue: "1", pages: "131–144",
    setting: "Rural Bangladesh", locations: ["rural"], themes: ["sustainable", "community"],
    summary: "Examines rural tourism as an alternative to mass tourism and a potential mechanism for inclusive local development, drawing on rural lifestyles, traditions, culture, cuisine and crafts.",
    keywords: ["SDGs", "Local communities", "Rural lifestyles", "Culture", "Crafts"],
  },
  {
    id: "servqual",
    title: "Generic perceptibility on SERVQUAL dimension: A study on the behavioral aptitude of tourists on the service quality of the Guide Tours Limited",
    year: 2017, type: "journal",
    authors: ["Kamruzzaman, M.", ME],
    venue: "Journal of Business Studies", volume: "XXXVIII", issue: "1", pages: "135–149",
    themes: ["destination"],
    keywords: ["SERVQUAL", "Tourist behaviour", "Service quality", "Guided tours"],
  },
  {
    id: "cauthe-2017",
    title: "Proposing a framework to address sustainable tourism development and community wellbeing: A direction to fieldwork",
    year: 2017, type: "conference",
    authors: [ME, "David G. Simmons", "Michael C. Shone", "Nazmun N. Ratna"],
    venue: "27th Council for Australasian Tourism and Hospitality Education (CAUTHE) Annual Conference", pages: "438–448",
    setting: "Dunedin, New Zealand (conference)", themes: ["sustainable", "governance", "community"],
    note: "Peer-reviewed full paper.",
    keywords: ["Sustainable tourism development", "Community wellbeing"],
  },
  {
    id: "medical-tourism",
    title: "The development, nature, and impact of medical tourism in Bangladesh",
    year: 2015, type: "chapter",
    authors: ["Azizul Hassan", "M. U. Ahamed", ME],
    venue: "Current Issues and Emerging Trends in Medical Tourism", publisher: "IGI Global", editors: "M. Cooper, K. Vafadari & M. Hieda", pages: "294–309",
    locations: ["national"], themes: ["destination"],
    keywords: ["Medical tourism"],
  },
  {
    id: "climate-education",
    title: "Education in Emergency: A Climate Change Adaptation Agendum Towards the Socio-Economic Propagation of Bangladesh",
    year: 2013, type: "journal",
    authors: [ME, "Muhammad I.-U. Rahman", "M. S. Hossain"],
    venue: "Analele Universităţii din Oradea – Seria Geografie, Romania", volume: "XXIII", issue: "1", pages: "55–61", articleNo: "231107-606",
    locations: ["national"], themes: ["environment"],
    summary: "An earlier paper connecting climate change, adaptation, education and socio-economic development in Bangladesh.",
    keywords: ["Climate change", "Adaptation", "Education"],
  },
  {
    id: "ecotourism-dilemma",
    title: "A growing dilemma of tourism diffusion and sustainability: Wows and woes for Bangladesh eco-tourism!",
    year: 2012, type: "journal",
    authors: [ME, "Rokeya Binte Shahid"],
    venue: "UTMS Journal of Economics", volume: "3", issue: "1", pages: "57–69", url: "https://ideas.repec.org/a/ris/utmsje/0049.html",
    locations: ["national"], themes: ["sustainable", "destination"],
    summary: "A secondary-data based discussion of tourism diffusion, ecotourism and sustainability in Bangladesh, including environmental conservation, socio-economic impacts and the risks of unplanned tourism growth.",
    method: "Secondary-data based discussion",
    keywords: ["Tourism diffusion", "Ecotourism", "Environmental conservation", "Unplanned tourism growth"],
  },
  {
    id: "solar-energy",
    title: "Solar energy: The most promising alternative to mitigate power emergency of Bangladesh",
    year: 2012, type: "journal",
    authors: ["Julia, T.", "Hasan, M. M.", ME],
    venue: "Green University Review, Bangladesh", volume: "3", issue: "2", pages: "43–52",
    locations: ["national"], themes: ["environment"],
  },
  {
    id: "urban-waste",
    title: "Relationship between personality traits of the urban poor concerning solid waste management and household income and education",
    year: 2012, type: "journal",
    authors: ["Murad, M. W.", "Hasan, M. M.", ME],
    venue: "Interdisciplinary Description of Complex Systems", volume: "10", issue: "2", pages: "174–192",
    themes: ["environment"],
  },
  {
    id: "green-economics",
    title: "An emerging consensus on green economics: Lessons for Bangladesh",
    year: 2012, type: "journal",
    authors: ["Hasan, M. M.", "Julia, T.", ME],
    venue: "Business Review Bangladesh", volume: "1", issue: "1", pages: "31–49",
    locations: ["national"], themes: ["environment"],
  },
  {
    id: "policy-planning-book",
    title: "Tourism Policy and Planning in Bangladesh",
    year: 2020, type: "book",
    authors: [ME, "Azizul Hassan"],
    venue: "Springer", publisher: "Springer", doi: "10.1007/978-981-15-7014-8", url: links.springerBook,
    locations: ["national"], themes: ["policy", "destination"],
    note: "Edited volume (editors: Muhammad Shoeb-Ur-Rahman and Azizul Hassan).",
    summary: "An overview of tourism policy and planning in Bangladesh, examining policy, planning, legislation, marketing, education, research, regulation, administration and tourism development.",
    keywords: ["Tourism policy", "Planning", "Legislation", "Regulation", "Administration"],
  },
  {
    id: "investment-fdi",
    title: "Investment Decision-Making and Foreign Direct Investment in Tourism and Hospitality: Concepts Exposition and Implications for Bangladesh",
    year: 2022, type: "chapter",
    authors: [ME, "Kamrul Hasan Bhuiyan", "Azizul Hassan"],
    venue: "Tourism in Bangladesh: Investment and Development Perspectives", publisher: "Springer", pages: "13–25",
    locations: ["national"], themes: ["policy", "destination"],
    keywords: ["Investment", "Foreign direct investment"],
  },
  {
    id: "existing-products",
    title: "Existing Tourism Products and Service Offers in Bangladesh",
    year: 2020, type: "chapter",
    authors: ["Jameni Jabed Suchana", "Uchinlayen", ME],
    venue: "Tourism Marketing in Bangladesh: An Introduction", publisher: "Routledge", chapter: "2", pages: "31–41",
    locations: ["national"], themes: ["destination"],
    keywords: ["Tourism products", "Service offers"],
  },
  {
    id: "air-transport",
    title: "Tourism and Air Transport Sustainability in Bangladesh: The Role of Technology",
    year: 2020, type: "chapter",
    authors: ["N. A. A. Rahman", ME, "Azizul Hassan"],
    venue: "Tourism Marketing in Bangladesh: An Introduction", publisher: "Routledge", chapter: "3",
    locations: ["national"], themes: ["technology", "sustainable"],
    keywords: ["Air transport", "Technology", "Sustainability"],
  },
];

export const pubById = Object.fromEntries(publications.map((p) => [p.id, p])) as Record<string, Publication>;

export const typeLabel: Record<PubType, string> = {
  journal: "Journal article",
  book: "Edited book",
  chapter: "Book chapter",
  conference: "Conference paper",
};

export const typeLabelPlural: Record<PubType, string> = {
  journal: "Journal articles",
  book: "Books",
  chapter: "Book chapters",
  conference: "Conference papers",
};

/** Featured order recommended by the dossier (§22). */
export const featured = publications.filter((p) => p.featured).sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

/* ------------------------------------------------------------------ trajectory */

// Six phases from the dossier (§15). Year spans are not stated there; pages derive them from the representative works.

export const phases = [
  { n: 1, title: "Sustainability, environment & Bangladesh tourism", concepts: ["Green economics", "Climate adaptation", "Ecotourism", "Tourism diffusion"], pubs: ["ecotourism-dilemma"] },
  { n: 2, title: "Tourism development & community context", concepts: ["Rural tourism", "Sundarbans", "Service quality", "Cultural events"], pubs: ["forest-sundarbans", "rural-sdgs", "events-south-asia"] },
  { n: 3, title: "Co-management, social capital & community wellbeing", concepts: ["Capitals", "Co-management", "Community wellbeing", "Sustainable livelihoods"], pubs: ["co-management-framework", "social-cultural-capitals"] },
  { n: 4, title: "Crisis, resilience & destination transformation", concepts: ["Refugee crisis", "Destination transformation", "Crisis governance", "Urban tourism"], pubs: ["destination-repurposed", "governance-trembles", "beyond-survival"] },
  { n: 5, title: "Policy, technology & smart tourism", concepts: ["Tourism policy", "Digital marketing", "Technological adoption", "Smart tourism"], pubs: ["air-transport", "handicraft"], project: "smart-tourism" },
  { n: 6, title: "Ecological governance, justice & more-than-human concerns", concepts: ["Environmental justice", "Conservation politics", "Policy-induced vulnerability", "Human–nonhuman relations"], pubs: ["governing-fragility"] },
] as const;

/* ------------------------------------------------------------------ career & education */

export type Dated = { start: string; end?: string; startYear: number; endYear?: number };

export const positions = [
  { title: "Associate Professor", org: "University of Dhaka", unit: "Department of Tourism and Hospitality Management · Faculty of Business Studies", start: "30 December 2020", startYear: 2020.99, current: true, detail: ["Teaching", "Evaluating students", "Departmental meetings", "University duties assigned by departmental / university authorities"] },
  { title: "Assistant Professor", org: "University of Dhaka", unit: "Department of Tourism and Hospitality Management · Faculty of Business Studies", start: "15 December 2015", end: "29 December 2020", startYear: 2015.95, endYear: 2020.99 },
  { title: "Lecturer", org: "University of Dhaka", unit: "Department of Tourism and Hospitality Management · Faculty of Business Studies", start: "16 March 2013", end: "14 December 2015", startYear: 2013.2, endYear: 2015.95 },
  { title: "Lecturer and Program Coordinator of BBA Program", org: "Green University of Bangladesh", start: "20 May 2011", end: "15 March 2013", startYear: 2011.38, endYear: 2013.2, detail: ["Preparing and delivering lectures", "Evaluating students", "Attending meetings", "Conducting research", "Coordinating BBA program activities"] },
  { title: "Consultant", org: "Overseas Ambition Solutions", start: "1 January 2011", end: "1 May 2011", startYear: 2011.0, endYear: 2011.33, detail: ["Education marketing", "Customer care and counselling", "Participation in education fairs", "Liaison with foreign delegates"] },
];

export const education = [
  {
    degree: "PhD — Tourism Management", level: "Doctor of Philosophy · ISCED Level 8", org: "Lincoln University, New Zealand",
    start: "10 February 2015", end: "29 May 2019", startYear: 2015.11, endYear: 2019.41,
    thesis: "Co-management for Tourism Development and Community Wellbeing: The Case of Hill Tracts, Bangladesh",
    note: "The thesis places community wellbeing and tourism development inside a co-management/governance framework, a foundation for later publications on co-management, social and cultural capital, sustainable livelihoods, tourism resource governance and community-focused tourism development.",
  },
  {
    degree: "MBA — Tourism and Hospitality Management", level: "ISCED Level 7", org: "University of Dhaka",
    start: "25 November 2009", end: "30 November 2010", startYear: 2009.9, endYear: 2010.92,
    courses: ["Tourism and Hospitality: Theory & Practices", "Strategic Tourism Marketing", "Sustainable Tourism Development", "Business Research", "Service Marketing", "Tourism Marketing Communication", "Aviation and Flight Management", "Advanced Tourism Planning and Development", "Global Hospitality Management", "Travel Agency and Tour Operation Management"],
  },
  {
    degree: "BBA — Management Studies", level: "ISCED Level 6", org: "University of Dhaka",
    start: "25 October 2003", end: "30 October 2008", startYear: 2003.82, endYear: 2008.83,
    courses: ["Fundamentals of Management", "Business Law", "Business Communication", "Business Statistics", "Industrial Psychology", "Operations Management", "Human Resource Management", "Entrepreneurship Development", "International Trade", "Insurance and Risk Management", "Comparative Management", "Industrial Sociology", "Investment Management", "Microeconomics and Macroeconomics", "Cost Accounting", "Project Appraisal and Management", "Management Accounting", "Management Thoughts", "Management of Multinational Enterprises"],
  },
  { degree: "HSC", level: "Higher Secondary Certificate", org: "Dhaka College", start: "2000", end: "2002", startYear: 2000, endYear: 2002, courses: ["Statistics", "Principles of Business", "Accounting"], coursesLabel: "Elective subjects" },
  { degree: "SSC", level: "Secondary School Certificate", org: "Madhukhali Pilot High School", start: "1998", end: "2000", startYear: 1998, endYear: 2000 },
];

export const awards = [
  { year: "2015", title: "New Zealand Commonwealth Scholarship 2014", org: "New Zealand Ministry of Foreign Affairs and Trade (MFAT)", text: "Award year 2015. Funded his doctoral study at Lincoln University, New Zealand; administered by the New Zealand Ministry of Foreign Affairs and Trade." },
  { year: "2018", title: "ESD Research Writing Award", org: "Lincoln University, New Zealand", text: "Received for preparing a journal paper." },
  { year: "2019", title: "Dean's List", org: "Lincoln University, New Zealand", text: "His doctoral thesis was listed for the Dean's List." },
];

export const engagement = [
  { date: "April 2023", title: "Invited resource person — University of Wollongong, Australia", text: "Invited as a resource person to organize an online teaching programme for students of the University of Wollongong, Australia." },
];

export const service = [
  { title: "International Academic Advisor", org: "Smile for Human Rights", since: "December 2013", text: "Described in the CV as an online global human-rights movement." },
  { title: "Volunteer Consultant", org: "Community Ecotourism", since: "June 2010", text: "A private tour operating service concentrating on nature and responsible tourism; the role involved suggestions on environmentally friendly service design and delivery." },
];

export const projects = [
  {
    id: "smart-tourism",
    title: "Fostering a Smart Tourism Destination through Technological Adoption: Evidence from Bangladesh",
    funder: "University Grants Commission of Bangladesh (UGC)",
    start: "30 April 2025",
    status: "Active / recent",
    statusNote: "No completion date has been verified; the project is not described as completed.",
    investigators: [
      { role: "Principal Investigator", name: "Prof. Dr. Santus Kumar Deb" },
      { role: "Co-Investigator", name: "Mohammad Ruhual Amin" },
    ],
    source: "Listed on the University of Dhaka faculty profile.",
    bridges: { from: ["Destination development", "Governance", "Sustainability", "Tourism planning"], to: ["Smart tourism destinations", "Technological adoption", "Digitally enabled tourism management"] },
  },
];

/* ------------------------------------------------------------------ network */

export const collaborators = [
  { name: "David G. Simmons", affiliation: "Lincoln University, New Zealand", topics: ["Co-management", "Tourism resources", "Community wellbeing", "Sustainable tourism"], match: ["David G. Simmons"] },
  { name: "Michael C. Shone", affiliation: "Ara Institute of Canterbury, New Zealand", topics: ["Co-management", "Community wellbeing"], match: ["Michael C. Shone", "Michael Shone"] },
  { name: "Nazmun N. Ratna", affiliation: "Lincoln University, New Zealand", topics: ["Co-management", "Community wellbeing"], match: ["Nazmun N. Ratna"] },
  { name: "Abrar Faisal", affiliation: "Auckland University of Technology, New Zealand", topics: ["Crisis governance", "Resilience", "Urban tourism"], match: ["Abrar Faisal"] },
  { name: "Md Ariful Hoque", affiliation: "Jahangirnagar University, Bangladesh", topics: ["Refugee crisis", "Urban resilience", "Tourism governance"], match: ["Md Ariful Hoque", "Md. Ariful Hoque"] },
  { name: "Easnin Ara", affiliation: "BRAC University / previously Bangladesh University of Professionals", topics: ["Social capital", "Sundarbans", "ECA governance"], match: ["Easnin Ara"] },
  { name: "Azizul Hassan", topics: ["Edited book", "Book chapters"], match: ["Azizul Hassan"] },
];

export const sources = {
  cutoff: "30 September 2026",
  hierarchy: [
    "University of Dhaka faculty profile and official CV (biography, education, career, awards, historical publication list)",
    "Publisher / journal / DOI pages (publication metadata)",
    "ORCID, Google Scholar, ResearchGate, Academia (secondary scholarly profiles)",
  ],
};
