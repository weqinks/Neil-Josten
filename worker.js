const BOT_TOKEN = '9203882155:AAEyR1BByeKMgxKI0w4A6kZtCNI3qCYzmvk';

const SOUNDS = [
  {
    id: '1',
    title: 'Эндрилы',
    url: 'https://github.io'
  }
];

export default {
  async fetch(request) {
    if (request.method === 'POST') {
      const update = await request.json();

      if (update.inline_query) {
        const query = update.inline_query.query.toLowerCase();
        
        const results = SOUNDS
          .filter(s => s.title.toLowerCase().includes(query))
          .map(s => ({
            type: 'voice',
            id: s.id,
            voice_url: s.url,
            title: s.title
          }));

        await fetch(`https://telegram.org{BOT_TOKEN}/answerInlineQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inline_query_id: update.inline_query.id,
            results: results,
            cache_time: 10
          })
        });
      }
    }
    return new Response('OK');
  }
};
