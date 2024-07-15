export function extractPublicId(url: string) {
  const regex = /petMania-uploads\/\w+/gm;
  const match = url.match(regex);
  return match?.[0];
}
