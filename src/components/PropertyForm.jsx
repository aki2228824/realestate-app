// 物件の新規登録・編集フォーム（モーダル）
import { useState, useEffect } from 'react'
import styles from './PropertyForm.module.css'

// 間取りの選択肢
const LAYOUT_OPTIONS = ['1R', '1K', '1DK', '1LDK', '2K', '2DK', '2LDK', '3LDK', '4LDK以上']

export default function PropertyForm({ property, onSubmit, onCancel, loading }) {
  const [name, setName] = useState('')
  const [rent, setRent] = useState('')
  const [area, setArea] = useState('')
  const [layout, setLayout] = useState('1K')

  // 編集時は既存データをフォームに反映
  useEffect(() => {
    if (property) {
      setName(property.name)
      setRent(String(property.rent))
      setArea(property.area)
      setLayout(property.layout)
    }
  }, [property])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name, rent: parseInt(rent, 10), area, layout })
  }

  const isEdit = Boolean(property)

  return (
    // モーダル背景クリックでキャンセル
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{isEdit ? '物件を編集' : '物件を登録'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            物件名
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              placeholder="例：グランドパレス渋谷"
              required
            />
          </label>
          <label className={styles.label}>
            家賃（円）
            <input
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              className={styles.input}
              placeholder="例：120000"
              min="1"
              required
            />
          </label>
          <label className={styles.label}>
            エリア名
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className={styles.input}
              placeholder="例：東京都渋谷区"
              required
            />
          </label>
          <label className={styles.label}>
            間取り
            <select
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              className={styles.select}
            >
              {LAYOUT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>
          <div className={styles.actions}>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              キャンセル
            </button>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? '保存中...' : isEdit ? '更新する' : '登録する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
