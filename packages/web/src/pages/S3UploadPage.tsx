import { fetchAuthSession } from '@aws-amplify/auth';
import axios from 'axios';
import { CSSProperties, useState } from 'react';

const styles: Record<string, CSSProperties> = {
  container: {
    width: '100%',
    minHeight: '300px',
    padding: '20px',
  },
  dropZone: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: '24px',
    zIndex: 1000,
  },
};

export const S3UploadPage = () => {
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const uploadSingleFile = async (url: string, file: File, idToken: string) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: idToken,
        },
      });
      return res;
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
      throw error;
    }
  };

  const uploadFile = async (url: string, file: File) => {
    try {
      setIsUploading(true);
      const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();
      if (!idToken) throw new Error('認証トークンが取得できませんでした');

      const res = await uploadSingleFile(url, file, idToken);
      console.log(`${file.name} のアップロードが完了しました:`, res);
      alert(`${file.name} のアップロードが完了しました`);
    } catch (error) {
      console.error('アップロードエラー:', error);
      alert('アップロードに失敗しました');
    } finally {
      setIsUploading(false);
    }
  };

  const uploadFiles = async (url: string, files: File[]) => {
    try {
      setIsUploading(true);
      const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();
      if (!idToken) throw new Error('認証トークンが取得できませんでした');

      const uploadPromises = files.map((file) => uploadSingleFile(url, file, idToken));
      const results = await Promise.all(uploadPromises);

      console.log('すべてのファイルのアップロードが完了しました:', results);
      alert('すべてのファイルのアップロードが完了しました');
    } catch (error) {
      console.error('アップロードエラー:', error);
      alert('アップロードに失敗しました');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      style={styles.container}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h1>Upload to S3</h1>
      <div>ファイルをドラッグ＆ドロップしてアップロード</div>

      {isOver && <div style={styles.dropZone}>ファイルをドロップしてください</div>}

      {files.length > 0 && (
        <div>
          <h2>アップロード予定のファイル:</h2>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name} ({Math.round(file.size / 1024)} KB)
              </li>
            ))}
          </ul>
          <button
            onClick={() => uploadFile(`${import.meta.env.VITE_API_ENDPOINT}/s3-upload`, files[0])}
            disabled={isUploading}
          >
            {isUploading ? 'アップロード中...' : 'アップロード(1つ)'}
          </button>
          <button
            onClick={() => uploadFiles(`${import.meta.env.VITE_API_ENDPOINT}/s3-upload`, files)}
            disabled={isUploading}
          >
            {isUploading ? 'アップロード中...' : 'アップロード(すべて)'}
          </button>
        </div>
      )}
    </div>
  );
};
