function cleanText(value = '') {
  return String(value).toLowerCase().trim();
}

export function normalizePlaceType(value = '') {
  const source = cleanText(value);
  if (!source) return '';

  const normalized = source.replace(/\s+/g, '_');

  if (['beach', 'coast', 'coastal'].includes(normalized)) return 'beach';
  if (['winery', 'wine_farm', 'wine_estate'].includes(normalized)) return 'winery';
  if (['mall', 'shopping_mall'].includes(normalized)) return 'mall';
  if (['exhibition', 'expo', 'exhibition_complex', 'convention_center'].includes(normalized)) return 'exhibition_complex';
  if (['stadium', 'arena', 'track'].includes(normalized)) return 'stadium';
  if (['theatre', 'theater', 'concert_hall'].includes(normalized)) return 'theatre';
  if (['gallery', 'museum'].includes(normalized)) return 'gallery';
  if (['club', 'night_club', 'nightclub', 'bar'].includes(normalized)) return 'club';
  if (['shopping_district', 'shopping_street'].includes(normalized)) return 'shopping_district';
  if (['community_hub', 'community_center'].includes(normalized)) return 'community_hub';
  if (['studio', 'dance_studio'].includes(normalized)) return 'studio';
  if (['market'].includes(normalized)) return 'market';
  if (['park', 'garden'].includes(normalized)) return 'park';
  if (['waterfront'].includes(normalized)) return 'waterfront';

  return normalized;
}

export function inferPlaceType(venue = '', address = '') {
  const blob = `${cleanText(venue)} ${cleanText(address)}`;

  if (!blob) return 'other';

  if (/beach|clifton|camps bay|llandudno|shore|coast/.test(blob)) return 'beach';
  if (/wine|estate|vineyard|winery|farm/.test(blob)) return 'winery';
  if (/mall|shopping|century city|canal walk/.test(blob)) return 'mall';
  if (/gallery|museum|zeitz|norval/.test(blob)) return 'gallery';
  if (/club|bar|brewery|district|long street/.test(blob)) return 'club';
  if (/woodstock|observatory|lower main|kloof|long street/.test(blob)) return 'shopping_district';
  if (/community|hub|center/.test(blob)) return 'community_hub';
  if (/studio|dance/.test(blob)) return 'studio';
  if (/cticc|convention|expo|exhibition|conference|hall 8|foreshore/.test(blob)) return 'exhibition_complex';
  if (/stadium|track|common fields|cricket club|sports field/.test(blob)) return 'stadium';
  if (/theatre|theater|hall|artscape|baxter/.test(blob)) return 'theatre';
  if (/market/.test(blob)) return 'market';
  if (/garden|park/.test(blob)) return 'park';
  if (/waterfront/.test(blob)) return 'waterfront';

  return 'other';
}
