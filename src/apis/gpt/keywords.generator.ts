import { Configuration, OpenAIApi } from "openai";
import { chatGptException } from "@/common/exceptions";

interface useChatGPTParam {
  title?: string;
  desc?: string;
  content?: string;
}

class UseChatGPT {
  private openai: OpenAIApi | null = null;
  private apiKey = process.env.OPENAI_API_KEY || "";
  constructor() {
    this.initializeChatGpt();
  }

  private initializeChatGpt(): void {
    const configuration = new Configuration({ apiKey: this.apiKey });
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

    if (!this.openai) {
      throw new Error("OpenAI API not initialized");
    }
    try {
    } catch (err) {
      chatGptException(err);
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
