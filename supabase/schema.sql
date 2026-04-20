-- =====================================================
-- 不動産管理アプリ：propertiesテーブル定義
-- Supabase の SQL Editor に貼り付けて実行してください
-- =====================================================

-- 物件テーブルの作成
CREATE TABLE IF NOT EXISTS properties (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT        NOT NULL,           -- 物件名
  rent       INTEGER     NOT NULL CHECK (rent > 0), -- 家賃（円）
  area       TEXT        NOT NULL,           -- エリア名
  layout     TEXT        NOT NULL,           -- 間取り（例：1LDK）
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Row Level Security（RLS）の設定
-- 自分が登録した物件のみ操作可能にする
-- =====================================================

-- RLSを有効化
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- SELECT：自分の物件のみ取得可能
CREATE POLICY "自分の物件のみ取得"
  ON properties FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT：自分のuser_idでのみ登録可能
CREATE POLICY "自分の物件のみ登録"
  ON properties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE：自分の物件のみ更新可能
CREATE POLICY "自分の物件のみ更新"
  ON properties FOR UPDATE
  USING (auth.uid() = user_id);

-- DELETE：自分の物件のみ削除可能
CREATE POLICY "自分の物件のみ削除"
  ON properties FOR DELETE
  USING (auth.uid() = user_id);
