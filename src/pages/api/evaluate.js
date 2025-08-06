// AI-First開発原則：Gemini 2.5 Flash採点API
// 環境変数: GEMINI_API_KEY, GEMINI_MODEL_NAME

export async function POST({ request }) {
  try {
    const { answer, question, lessonType, expectedAnswer } = await request.json();
    
    console.log('Evaluation request:', { answer, question, lessonType });

    // 環境変数から設定を取得
    const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;
    const GEMINI_MODEL_NAME = import.meta.env.GEMINI_MODEL_NAME || 'gemini-2.5-flash';
    
    console.log('API Key configured:', !!GEMINI_API_KEY);
    console.log('Model name:', GEMINI_MODEL_NAME);
    
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return new Response(JSON.stringify({
        error: 'Gemini API key not configured',
        details: 'Please set GEMINI_API_KEY environment variable'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Gemini APIへのリクエスト
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `
あなたは英語学習プラットフォーム「英語の駆け込み寺」の採点AIです。
学習者の回答を評価し、建設的なフィードバックを提供してください。

レッスンタイプ: ${lessonType}
問題: ${question}
期待される回答例: ${expectedAnswer}
学習者の回答: ${answer}

以下の形式で評価してください：

1. 正確性スコア（0-100点）
2. 文法の正確性
3. 語彙の適切さ
4. 改善点
5. 良かった点
6. 推奨される練習方法

回答は日本語で、初級者にも分かりやすく説明してください。
              `
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
            response_mime_type: "application/json",
            response_schema: {
              type: "object",
              properties: {
                score: {
                  type: "number",
                  minimum: 0,
                  maximum: 100
                },
                feedback: {
                  type: "object",
                  properties: {
                    grammar: { type: "string" },
                    vocabulary: { type: "string" },
                    improvements: { type: "string" },
                    positives: { type: "string" },
                    practice: { type: "string" }
                  },
                  required: ["grammar", "vocabulary", "improvements", "positives", "practice"]
                },
                correctedAnswer: { type: "string" }
              },
              required: ["score", "feedback", "correctedAnswer"]
            }
          }
        })
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', geminiResponse.status, errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status} - ${errorText}`);
    }

    const geminiData = await geminiResponse.json();
    
    // response_mime_typeを使用しているため、直接JSONとして返される
    const evaluation = geminiData.candidates[0].content.parts[0].text 
      ? JSON.parse(geminiData.candidates[0].content.parts[0].text)
      : geminiData.candidates[0].content.parts[0];

    return new Response(JSON.stringify({
      success: true,
      evaluation
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Evaluation error:', error);
    console.error('Error stack:', error.stack);
    
    // エラーメッセージをより詳細に
    let errorMessage = 'Failed to evaluate answer';
    let errorDetails = error.message;
    
    if (error.message.includes('API key')) {
      errorMessage = 'API key configuration error';
      errorDetails = 'GEMINI_API_KEY environment variable is not set or invalid';
    } else if (error.message.includes('fetch')) {
      errorMessage = 'Network error';
      errorDetails = 'Failed to connect to Gemini API';
    }
    
    return new Response(JSON.stringify({
      error: errorMessage,
      details: errorDetails,
      debug: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({
    message: 'Evaluation API is running',
    model: import.meta.env.GEMINI_MODEL_NAME || 'gemini-2.5-flash'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}