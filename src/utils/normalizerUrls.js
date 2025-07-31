export function normalizeUrls(text) {
  // Convert www.example.com to https://www.example.com
  const withHttpsLinks = text.replace(
    /(^|\s)(www\.[^\s]+)/g,
    (_, prefix, url) => `${prefix}https://${url}`
  );

  // Convert raw emails to markdown mailto: links
  const withEmailLinks = withHttpsLinks.replace(
    /(^|\s)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,})/gi,
    (_, prefix, email) => `${prefix}[${email}](mailto:${email})`
  );

  return withEmailLinks;
}
