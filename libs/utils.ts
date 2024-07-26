export function extractPublicId(url: string) {
  const regex = /petMania-uploads\/\w+/gm;
  const match = url.match(regex);
  return match?.[0];
}

export function extractPublicIds(
  urls: {
    url: string;
  }[]
) {
  let singleString = "";
  urls.forEach((url) => {
    singleString += url.url;
  });

  const regex = /petMania-uploads\/\w+/gm;
  const match = singleString.match(regex);
  return match;
}
