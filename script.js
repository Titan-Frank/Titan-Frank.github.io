const data = window.siteData;

if (!data) {
  throw new Error("siteData is missing.");
}

const byId = (id) => document.getElementById(id);

const text = (id, value) => {
  const node = byId(id);
  if (node) {
    node.textContent = value;
  }
};

const link = (id, value) => {
  const node = byId(id);
  if (node && value?.href) {
    node.href = value.href;
    node.textContent = "";
    node.append(document.createTextNode(value.label), arrowIcon());
  }
};

document.title = data.meta.title;
document
  .querySelector('meta[name="description"]')
  ?.setAttribute("content", data.meta.description);
document
  .querySelector('meta[property="og:title"]')
  ?.setAttribute("content", data.meta.title);
document
  .querySelector('meta[property="og:description"]')
  ?.setAttribute("content", data.meta.description);
document
  .querySelector('meta[property="og:image"]')
  ?.setAttribute("content", data.meta.image);

text("brand-mark", data.profile.initials);
text("brand-text", data.profile.name);
text("hero-eyebrow", data.profile.eyebrow);
text("hero-title", data.profile.name);
text("hero-lead", data.profile.lead);
text("focus-copy", data.profile.focus);
text("about-copy", data.profile.about);
text("contact-copy", data.profile.contactCopy);
text("footer-text", data.meta.footer);

const heroPortrait = byId("hero-portrait");
if (heroPortrait) {
  heroPortrait.src = data.meta.image;
  heroPortrait.alt = `GitHub avatar of ${data.profile.name}`;
}

link("primary-link", data.profile.primaryAction);
link("secondary-link", data.profile.secondaryAction);

const statList = byId("stat-list");
data.profile.stats.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = item;
  statList.append(li);
});

const availabilityList = byId("availability-list");
data.profile.availability.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = item;
  availabilityList.append(li);
});

const strengthList = byId("strength-list");
data.profile.strengths.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = item;
  strengthList.append(li);
});

const toolList = byId("tool-list");
data.profile.tools.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = item;
  toolList.append(li);
});

const projectGrid = byId("project-grid");
data.projects.forEach((project) => {
  const card = document.createElement("article");
  card.className = "project-card";

  const meta = document.createElement("p");
  meta.className = "project-meta";
  meta.textContent = project.meta;

  const title = document.createElement("h3");
  title.textContent = project.title;

  const copy = document.createElement("p");
  copy.className = "project-copy";
  copy.textContent = project.description;

  const tags = document.createElement("ul");
  tags.className = "tag-list";
  project.tags.forEach((tag) => {
    const li = document.createElement("li");
    li.textContent = tag;
    tags.append(li);
  });

  const links = document.createElement("div");
  links.className = "project-links";
  project.links.forEach((item) => {
    const a = document.createElement("a");
    a.href = item.href;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.append(document.createTextNode(item.label), arrowIcon());
    links.append(a);
  });

  card.append(meta, title, copy, tags, links);
  projectGrid.append(card);
});

const timelineList = byId("timeline-list");
data.timeline.forEach((item) => {
  const row = document.createElement("article");
  row.className = "timeline-item";

  const year = document.createElement("p");
  year.className = "timeline-year";
  year.textContent = item.year;

  const content = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = item.title;
  const copy = document.createElement("p");
  copy.className = "timeline-copy";
  copy.textContent = item.description;

  content.append(title, copy);
  row.append(year, content);
  timelineList.append(row);
});

const contactLinks = byId("contact-links");
data.contacts.forEach((item) => {
  const isEmail = item.href.startsWith("mailto:");
  const a = document.createElement("a");
  a.href = item.href;
  a.target = isEmail ? "_self" : "_blank";
  a.rel = isEmail ? "" : "noreferrer";
  a.append(document.createTextNode(item.label), arrowIcon());
  contactLinks.append(a);
});

const githubLink = byId("github-link");
const githubContact = data.contacts.find((item) => item.label.toLowerCase() === "github");
if (githubContact) {
  githubLink.href = githubContact.href;
}

function arrowIcon() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("link-icon");

  const pathA = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathA.setAttribute("d", "M7 17 17 7");
  const pathB = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathB.setAttribute("d", "M7 7h10v10");

  svg.append(pathA, pathB);
  return svg;
}
