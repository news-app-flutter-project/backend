import { Configuration, OpenAIApi } from 'openai';
import { chatGptException } from '@/common/exceptions';

interface useChatGPTParam {
    title?: string;
    desc?: string;
    content?: string;
}

class UseChatGPT {
    private openai: OpenAIApi | null = null;
    private apiKey = process.env.OPENAI_API_KEY || '';
    constructor() {
        this.initializeChatGpt();
    }

    private initializeChatGpt(): void {
        const configuration = new Configuration({ apiKey: this.apiKey });
        this.openai = new OpenAIApi(configuration);
    }

    async getKeywords({ title, desc }: useChatGPTParam) {
        let prompt;
        prompt = `generate list of 5 (2 broad thema and 3 news specific topics) korean keywords which summarize the following texts: ${title}, ${desc}`;
        if (!title && !desc) {
            throw new Error('No input provided');
        }

        if (!this.openai) {
            throw new Error('OpenAI API not initialized');
        }
        try {
        } catch (err) {
            chatGptException(err);
        }
        const { data } = await this.openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 80,
            temperature: 0,
        });

        return data.choices[0].text;
    }
}

export default UseChatGPT;
