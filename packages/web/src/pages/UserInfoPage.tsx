import { useMyAuth } from "../hooks/useMyAuth";

export const UserInfoPage = () => {
  const { isAuthenticated, userId, currentUser, authSession } = useMyAuth();

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto",
    },
    section: {
      marginBottom: "20px",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      backgroundColor: "#303030",
    },
    title: {
      borderBottom: "2px solid #007bff",
      paddingBottom: "10px",
      marginBottom: "20px",
    },
    infoRow: {
      display: "flex",
      padding: "8px 0",
      borderBottom: "1px solid #eee",
    },
    label: {
      width: "200px",
      fontWeight: "bold",
    },
    value: {
      flex: 1,
      wordBreak: "break-all",
      overflowWrap: "break-word",
    } as const,
  };

  if (!isAuthenticated) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>ユーザー情報</h1>
        <p>ログインしていません。</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>ユーザー情報</h1>

      <div style={styles.section}>
        <h2>基本情報</h2>
        <div style={styles.infoRow}>
          <span style={styles.label}>認証状態</span>
          <span style={styles.value}>{isAuthenticated ? "認証済み" : "未認証"}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>ユーザーID</span>
          <span style={styles.value}>{userId || "取得できません"}</span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>ユーザー名</span>
          <span style={styles.value}>{currentUser?.username || "取得できません"}</span>
        </div>
      </div>

      <div style={styles.section}>
        <h2>認証トークン情報</h2>
        <div style={styles.infoRow}>
          <span style={styles.label}>アクセストークン</span>
          <span style={styles.value}>
            {authSession?.tokens?.accessToken.toString() || "なし"}
          </span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>IDトークン</span>
          <span style={styles.value}>
            {authSession?.tokens?.idToken ? authSession?.tokens?.idToken.toString() : "なし"}
          </span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>IDトークン文字列</span>
          <span style={styles.value}>
            {authSession?.tokens?.idToken?.toString() || "取得できません"}
          </span>
        </div>
        <div style={styles.infoRow}>
          <span style={styles.label}>ユーザーサブ</span>
          <span style={styles.value}>{authSession?.tokens?.idToken?.payload?.sub || "取得できません"}</span>
        </div>
      </div>
    </div >
  );
};
