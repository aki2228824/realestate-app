// 物件一覧画面（Supabaseからデータ取得・CRUD操作）
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../supabase'
import PropertyForm from '../components/PropertyForm'
import styles from './Properties.module.css'

export default function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState([])
  const [fetchLoading, setFetchLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState('')

  // フォームの表示制御（null=非表示, 'new'=新規, object=編集対象物件）
  const [formTarget, setFormTarget] = useState(null)

  // ログインユーザーの物件一覧を取得
  const fetchProperties = async () => {
    setFetchLoading(true)
    setError('')
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      setError('物件の取得に失敗しました')
    } else {
      setProperties(data)
    }
    setFetchLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // 物件を新規登録または更新する
  const handleFormSubmit = async ({ name, rent, area, layout }) => {
    setFormLoading(true)
    setError('')

    if (formTarget === 'new') {
      // INSERT：user_idはRLSポリシーの検証対象なので必ずセットする
      const { error } = await supabase
        .from('properties')
        .insert({ name, rent, area, layout, user_id: user.id })
      if (error) setError('登録に失敗しました')
    } else {
      // UPDATE：対象IDの物件を更新
      const { error } = await supabase
        .from('properties')
        .update({ name, rent, area, layout })
        .eq('id', formTarget.id)
      if (error) setError('更新に失敗しました')
    }

    setFormLoading(false)
    setFormTarget(null)
    fetchProperties()
  }

  // 物件を削除する
  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか？')) return
    setError('')
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)
    if (error) {
      setError('削除に失敗しました')
    } else {
      // 画面を再取得せず、ローカルの状態から除去して即時反映
      setProperties((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>不動産管理アプリ</h1>
        <div className={styles.headerRight}>
          <span className={styles.email}>{user?.email}</span>
          <button onClick={handleSignOut} className={styles.logoutButton}>
            ログアウト
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.toolbar}>
          <div>
            <h2 className={styles.sectionTitle}>物件一覧</h2>
            {!fetchLoading && (
              <p className={styles.count}>{properties.length}件の物件</p>
            )}
          </div>
          <button onClick={() => setFormTarget('new')} className={styles.addButton}>
            ＋ 物件を登録
          </button>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {fetchLoading ? (
          <p className={styles.loadingText}>読み込み中...</p>
        ) : properties.length === 0 ? (
          <div className={styles.empty}>
            <p>まだ物件が登録されていません。</p>
            <button onClick={() => setFormTarget('new')} className={styles.addButton}>
              最初の物件を登録する
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {properties.map((property) => (
              <div key={property.id} className={styles.card}>
                <div className={styles.cardType}>{property.layout}</div>
                <h3 className={styles.cardName}>{property.name}</h3>
                <p className={styles.cardArea}>📍 {property.area}</p>
                <p className={styles.cardRent}>
                  <span className={styles.rentAmount}>
                    ¥{property.rent.toLocaleString()}
                  </span>
                  <span className={styles.rentUnit}> / 月</span>
                </p>
                <div className={styles.cardActions}>
                  {/* 編集ボタン：クリックで該当物件データをフォームにセット */}
                  <button
                    onClick={() => setFormTarget(property)}
                    className={styles.editButton}
                  >
                    編集
                  </button>
                  {/* 削除ボタン：確認ダイアログ後にDELETE */}
                  <button
                    onClick={() => handleDelete(property.id)}
                    className={styles.deleteButton}
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* フォームモーダル：formTargetがセットされているときのみ表示 */}
      {formTarget !== null && (
        <PropertyForm
          property={formTarget === 'new' ? null : formTarget}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormTarget(null)}
          loading={formLoading}
        />
      )}
    </div>
  )
}
