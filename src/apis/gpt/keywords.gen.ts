import { Configuration, OpenAIApi } from "openai";

interface useChatGPTParam {
  title?: string;
  desc?: string;
  content?: string;
}

class UseChatGPT {
  private openai: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({ apiKey });
    this.openai = new OpenAIApi(configuration);
  }

  async getKeywords({ title, desc, content }: useChatGPTParam) {
    let prompt;
    if (title) {
      prompt = `list 3 korean keywords related to this text: ${title}.`;
    } else if (desc) {
      prompt = `list 3 korean keywords related to this text: ${desc}`;
    } else if (content) {
      prompt = `list 2 keywords in korean related to the content: ${content}`;
    } else {
      throw new Error("No input provided");
    }

    const { data } = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 80,
      temperature: 0,
    });

    return data.choices[0].text;
  }
}

export default UseChatGPT;
