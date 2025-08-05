// AI-First開発原則：Gemini 2.5 Flash採点API
// 環境変数: GEMINI_API_KEY, GEMINI_MODEL_NAME

export async function POST({ request }) {
  try {
    const { answer, question, lessonType, expectedAnswer } = await request.json();

    // 環境変数から設定を取得
    const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;
    const GEMINI_MODEL_NAME = import.meta.env.GEMINI_MODEL_NAME || 'gemini-2.5-flash';
    
    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({
        error: 'Gemini API key not configured'
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
JSON形式で返してください：
{
  "score": 数値,
  "feedback": {
    "grammar": "文法についてのフィードバック",
    "vocabulary": "語彙についてのフィードバック",
    "improvements": "改善点",
    "positives": "良かった点",
    "practice": "推奨される練習方法"
  },
  "correctedAnswer": "修正された回答例"
}
              `
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    
    // レスポンスからJSONを抽出
    let evaluationText = geminiData.candidates[0].content.parts[0].text;
    
    // JSONの抽出（コードブロックがある場合）
    const jsonMatch = evaluationText.match(/```json\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      evaluationText = jsonMatch[1];
    }
    
    // JSONとしてパース
    let evaluation;
    try {
      evaluation = JSON.parse(evaluationText);
    } catch (e) {
      // パースに失敗した場合、簡易的な評価を返す
      evaluation = {
        score: 70,
        feedback: {
          grammar: "評価を処理中にエラーが発生しました",
          vocabulary: "再度お試しください",
          improvements: "システムエラー",
          positives: "回答ありがとうございました",
          practice: "もう一度挑戦してみてください"
        },
        correctedAnswer: expectedAnswer
      };
    }

    return new Response(JSON.stringify({
      success: true,
      evaluation
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Evaluation error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to evaluate answer',
      details: error.message
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