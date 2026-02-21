import { config } from '../config/index.js';

export async function enrichEventWithAI(event) {
  if (!config.openAiApiKey) {
    return {
      ...event,
      ai: {
        used: false,
        reason: 'OPENAI_API_KEY missing'
      }
    };
  }

  const prompt = [
    'Normalize the event into concise fields.',
    'Return strict JSON with keys: shortDescription, tags(3), category.',
    `title: ${event.title}`,
    `description: ${event.description || ''}`,
    `venue: ${event.venue || ''}`
  ].join('\n');

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.openAiApiKey}`
    },
    body: JSON.stringify({
      model: config.openAiModel,
      input: prompt,
      max_output_tokens: 200
    })
  });

  if (!response.ok) {
    return {
      ...event,
      ai: {
        used: true,
        reason: `openai_error_${response.status}`
      }
    };
  }

  const body = await response.json();
  const content = body.output_text || '';

  try {
    const parsed = JSON.parse(content);
    return {
      ...event,
      description: parsed.shortDescription || event.description,
      category: parsed.category || event.category,
      tags: Array.isArray(parsed.tags) ? parsed.tags : event.tags,
      ai: {
        used: true
      }
    };
  } catch {
    return {
      ...event,
      ai: {
        used: true,
        reason: 'invalid_json_from_ai'
      }
    };
  }
}
