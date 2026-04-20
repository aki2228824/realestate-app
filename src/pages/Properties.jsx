// 物件一覧画面（ログイン後に表示）
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import styles from './Properties.module.css'

// ダミー物件データ
const PROPERTIES = [
  { id: 1, name: 'グランドパレス渋谷', rent: 180000, area: '東京都渋谷区', type: '1LDK', size: 42 },
  { id: 2, name: 'サンライズマンション新宿', rent: 120000, area: '東京都新宿区', type: '1K', size: 28 },
  { id: 3, name: 'ブルースカイ横浜', rent: 95000, area: '神奈川県横浜市', type: '1K', size: 25 },
  { id: 4, name: 'オーシャンビュー湘南', rent: 210000, area: '神奈川県藤沢市', type: '2LDK', size: 65 },
  { id: 5, name: 'グリーンヒルズ吉祥寺', rent: 155000, area: '東京都武蔵野市', type: '1LDK', size: 38 },
  { id: 6, name: 'コージーネスト池袋', rent: 88000, area: '東京都豊島区', type: '1K', size: 22 },
]

export default function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

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
        <h2 className={styles.sectionTitle}>物件一覧</h2>
        <p className={styles.count}>{PROPERTIES.length}件の物件</p>
        <div className={styles.grid}>
          {PROPERTIES.map((property) => (
            <div key={property.id} className={styles.card}>
              <div className={styles.cardType}>{property.type}</div>
              <h3 className={styles.cardName}>{property.name}</h3>
              <p className={styles.cardArea}>📍 {property.area}</p>
              <p className={styles.cardSize}>{property.size}㎡</p>
              <p className={styles.cardRent}>
                <span className={styles.rentAmount}>
                  ¥{property.rent.toLocaleString()}
                </span>
                <span className={styles.rentUnit}> / 月</span>
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
