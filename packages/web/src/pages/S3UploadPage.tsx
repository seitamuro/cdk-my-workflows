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

  const uploadFile = async (url: string, file: File) => {
    const formData = new FormData();
    const idToken = (await fetchAuthSession()).tokens?.idToken?.toString();

    formData.append('file', file);
    const res = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: idToken,
      },
    });

    console.log(res);
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
          >
            アップロード
          </button>
        </div>
      )}
    </div>
  );
};
