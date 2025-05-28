export function formatText(input: string): string {
  return input
    .split(' ')
    .map((word) => {
      if (/^[A-Z.]+$/.test(word)) {
        return word;
      }
      return word.replace(/([a-z])([A-Z])/g, '$1 $2');
    })
    .join(' ');
}