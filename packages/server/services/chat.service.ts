import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';

// Implementation details
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

type ChatReponse = {
   id: string;
   message: string;
};

//  Public Interface
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatReponse> {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 100,
         previous_response_id:
            conversationRepository.getLastResponseId(conversationId),
      });

      conversationRepository.setLastResponseId(conversationId, response.id);

      return {
         id: response.id,
         message: response.output_text,
      };
   },
};
