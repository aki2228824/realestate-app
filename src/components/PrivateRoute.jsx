// 認証済みユーザーのみアクセス可能なルートコンポーネント
// 未ログインの場合はログイン画面にリダイレクト
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  // セッション確認中はローディングを表示
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p style={{ color: '#64748b' }}>読み込み中...</p>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}
