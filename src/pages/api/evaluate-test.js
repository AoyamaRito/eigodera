// テスト用の簡易評価API（Gemini APIを使わない）

export async function POST({ request }) {
  try {
    const { answer, question, lessonType, expectedAnswer } = await request.json();
    
    console.log('Test evaluation request:', { answer, question, lessonType });
    
    // 簡単な評価ロジック（実際の評価の代わり）
    const answerLength = answer.trim().length;
    const hasCapital = /^[A-Z]/.test(answer.trim());
    const hasPeriod = answer.trim().endsWith('.');
    const wordCount = answer.trim().split(/\s+/).length;
    
    // スコア計算
    let score = 50; // 基本点
    if (answerLength > 10) score += 20;
    if (hasCapital) score += 10;
    if (hasPeriod) score += 10;
    if (wordCount >= 3) score += 10;
    
    // モック評価結果
    const evaluation = {
      score: Math.min(score, 100),
      feedback: {
        grammar: hasCapital ? "文の最初が大文字で始まっています。良いですね！" : "文の最初は大文字で始めましょう。",
        vocabulary: wordCount >= 5 ? "適切な語彙数です。" : "もう少し詳しく書いてみましょう。",
        improvements: hasPeriod ? "文末のピリオドも正しく使われています。" : "文末にはピリオド(.)を付けましょう。",
        positives: "英語で書こうとする姿勢が素晴らしいです！",
        practice: "毎日少しずつ練習を続けることが大切です。"
      },
      correctedAnswer: expectedAnswer || "Sample correct answer would go here."
    };
    
    return new Response(JSON.stringify({
      success: true,
      evaluation,
      mode: 'test'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Test evaluation error:', error);
    return new Response(JSON.stringify({
      error: 'Test evaluation failed',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({
    message: 'Test Evaluation API is running',
    mode: 'test-mode-no-gemini'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}