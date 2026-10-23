/** Internal link that works both at the domain root and under the GitHub Pages subfolder. */
export function url(path = ''): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;
