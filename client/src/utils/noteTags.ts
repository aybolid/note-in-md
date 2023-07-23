export const getTags = (content: string, regExp: RegExp) => {
  const matches = content.match(regExp);
  if (!matches) return [];

  const tagsStringsArray = matches.map((tagString) =>
    tagString.replace('+[', '').replace(']', '')
  );
  const tagsArrays = tagsStringsArray.map((tagString) => tagString.split(','));
  console.log('tagsArrays: ', tagsArrays);
  const tags = tagsArrays.reduce(
    (acc, curr) => [...acc, ...curr.map((tag) => tag.trim())],
    []
  );
  return [...new Set(tags)];
};
