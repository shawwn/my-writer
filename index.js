OpenAI = require('tensorfork-openai-api')
api = new OpenAI()

toplevel = async () => {
  const engines = (await api.list_engines()).data.data.map(({ id }) => id)
  console.log(engines)
  const engine = engines[0];
  while (true) {
    let prompt = 'Hello, my name is';
    while (true) {
      prompt = (await api.complete({prompt: prompt, frequency_penalty: 0.85, temperature: 0.6, echo: true})).data.choices[0].text;
      console.log('------------------');
      console.log(prompt.split('<|endoftext|>')[0]);
      if (prompt.indexOf('<|endoftext|>') >= 0) {
        break;
      }
    }
  }
};

toplevel()

