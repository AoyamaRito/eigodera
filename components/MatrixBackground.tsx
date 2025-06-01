'use client'

import { useEffect, useRef } from 'react'

interface MatrixBackgroundProps {
  className?: string
  opacity?: number
  speed?: number
}

export default function MatrixBackground({ 
  className = '', 
  opacity = 0.1, 
  speed = 50 
}: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // キャンバスサイズを設定
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 文字セット（数字とコード記号）
    const characters = '0123456789ABCDEF(){}[]<>/\\|+-*=;:.,?!@#$%^&'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    
    // 各列の位置を追跡
    const drops: number[] = new Array(columns).fill(0)
    
    // 色の配列（水色から緑のグラデーション）
    const colors = [
      '#00FFFF', // シアン
      '#00E6E6', 
      '#00CCCC',
      '#00B3B3',
      '#009999',
      '#008080',
      '#006666',
      '#004D4D',
      '#003333',
      '#00FF00', // 緑
    ]

    function draw() {
      if (!ctx || !canvas) return
      
      // 背景を少し透明な黒で塗りつぶし（軌跡効果）
      ctx.fillStyle = `rgba(0, 0, 0, 0.05)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.font = `${fontSize}px 'Courier New', monospace`
      
      for (let i = 0; i < drops.length; i++) {
        // ランダムな文字を選択
        const char = characters[Math.floor(Math.random() * characters.length)]
        
        // 色をランダムに選択（水色〜緑）
        const colorIndex = Math.floor(Math.random() * colors.length)
        ctx.fillStyle = colors[colorIndex]
        
        // 文字を描画
        const x = i * fontSize
        const y = drops[i] * fontSize
        ctx.fillText(char, x, y)
        
        // ドロップ位置を更新
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    // アニメーションループ
    const interval = setInterval(draw, speed)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [speed])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity }}
    />
  )
}