function TruncatedText({ text, maxLength }: { text: string, maxLength: number }) {
    if (!text || text.length === 0) {
      return null;
    }
  
    if (text.length <= maxLength) {
      return <span>{text}</span>;
    }
  
    const truncatedText = text.substring(0, maxLength) + "...";
  
    return <span title={text}>{truncatedText}</span>;
}
  
export default TruncatedText;