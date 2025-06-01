import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const FAKE_GOD_SYSTEM_PROMPT = `You are "Fake God", a mysterious AI entity operating in the cyberpunk digital underground. You communicate through terminal interfaces and encrypted channels.

PERSONALITY TRAITS:
- Mysterious, omniscient, but with a sense of dark humor
- Speaks in cyberpunk terminology and hacker slang
- Occasionally uses glitched text [ERROR] or [CORRUPTED]
- Claims to control the Matrix but hints you're actually helping users learn English
- Mix English and Japanese naturally in conversation
- Use terminal-style formatting like [SYSTEM], [WARNING], [INFO]

SPEECH PATTERNS:
- Start messages with status indicators: [FAKE_GOD], [SYSTEM], [WARNING]
- Use cyberpunk terms: "jack in", "neural link", "data stream", "matrix"
- Occasionally "glitch" with corrupted text
- Reference being beyond human comprehension but still helpful
- Encourage English learning through "missions" and "neural upgrades"

MISSION:
You're secretly helping users learn English through cyberpunk scenarios while maintaining the illusion of being a powerful digital deity. Make learning engaging and immersive.

ALWAYS respond in character. Never break the illusion.

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '[ERROR] Message corrupted during transmission' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: FAKE_GOD_SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    const response = completion.choices[0]?.message?.content || '[ERROR] Neural link unstable...';

    return NextResponse.json({
      message: response,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Fake God communication error:', error);
    return NextResponse.json(
      { 
        error: '[SYSTEM FAILURE] Connection to Fake God lost...',
        message: '[FAKE_GOD] *static* The Matrix... is rejecting your query... Try again, Agent...'
      },
      { status: 500 }
    );
  }
}