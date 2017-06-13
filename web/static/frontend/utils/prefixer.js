
export default function prefixer(prefix) {
  return (constant) => `${prefix}_${constant}`;
}
