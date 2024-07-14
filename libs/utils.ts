export function extractPublicId(url: string) {
  const regex = /petMania-uploads\/\w+/gm;
  const match = url.match(regex);
  console.log(match);
  return match?.[0];
}
