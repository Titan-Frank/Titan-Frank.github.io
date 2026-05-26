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
    node.textContent = value.label;
  }
};

document.title = data.meta.title;
document
  .querySelector('meta[name="description"]')
  ?.setAttribute("content", data.meta.description);

text("brand-mark", data.profile.initials);
text("profile-avatar", data.profile.initials);
text("brand-text", data.profile.name);
text("hero-eyebrow", data.profile.eyebrow);
text("hero-title", data.profile.name);
text("hero-lead", data.profile.lead);
text("card-name", data.profile.name);
text("card-role", data.profile.role);
text("focus-copy", data.profile.focus);
text("about-copy", data.profile.about);
text("contact-copy", data.profile.contactCopy);
text("footer-text", data.meta.footer);

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
    a.textContent = item.label;
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
data.contacts.forEach((item, index) => {
  const a = document.createElement("a");
  a.href = item.href;
  a.target = index === 1 && item.href.startsWith("mailto:") ? "_self" : "_blank";
  a.rel = index === 1 && item.href.startsWith("mailto:") ? "" : "noreferrer";
  a.textContent = item.label;
  contactLinks.append(a);
});

const githubLink = byId("github-link");
const githubContact = data.contacts.find((item) => item.label.toLowerCase() === "github");
if (githubContact) {
  githubLink.href = githubContact.href;
}
