const TRUSTED_DOMAINS = [
  'capetown.travel',
  'capetownmagazine.com',
  'quicket.co.za',
  'ticketmaster.com',
  'meetup.com',
  'webtickets.co.za',
  'computicket.com',
  'cticc.co.za',
  'howler.co.za',
  'thegalileo.co.za',
  'grandafrica.com',
  'ozcf.co.za',
  'bayharbour.co.za',
  'theoldbiscuitmill.co.za',
  'parkrun.co.za',
  'first-thursdays.co.za',
  'zeitzmocaa.museum',
  'norvalfoundation.org',
  'sacato.co.za',
  'whatsonincapetown.com'
];

export function domainFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    return '';
  }
}

export function isTrustedSource(url) {
  const domain = domainFromUrl(url);
  return TRUSTED_DOMAINS.some((trusted) => domain === trusted || domain.endsWith(`.${trusted}`));
}

export function calculateReliability(event) {
  let score = 0;

  if (event.title) score += 0.2;
  if (event.startAt) score += 0.2;
  if (event.venue) score += 0.1;
  if (event.sourceUrl && isTrustedSource(event.sourceUrl)) score += 0.3;
  if (event.ticketsUrl && isTrustedSource(event.ticketsUrl)) score += 0.1;

  const start = new Date(event.startAt).getTime();
  if (Number.isFinite(start) && start > Date.now() - 24 * 60 * 60 * 1000) {
    score += 0.1;
  }

  return Number(Math.min(score, 1).toFixed(2));
}

export function validateEvent(event) {
  const issues = [];

  if (!event.title || event.title.trim().length < 4) {
    issues.push('title_missing');
  }

  if (!event.startAt || Number.isNaN(new Date(event.startAt).getTime())) {
    issues.push('invalid_start');
  }

  if (!event.sourceUrl) {
    issues.push('source_missing');
  }

  if (event.sourceUrl && !isTrustedSource(event.sourceUrl)) {
    issues.push('source_untrusted');
  }

  return {
    isValid: issues.length === 0,
    issues
  };
}
