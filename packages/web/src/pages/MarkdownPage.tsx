import ReactMarkdown from 'react-markdown';

const markdownText = `
# タイトル
**太字** *斜体* ~~取り消し線~~
- リスト1
- リスト2
`;

export const MarkdownPage = () => {
  return <ReactMarkdown>{markdownText}</ReactMarkdown>;
};
