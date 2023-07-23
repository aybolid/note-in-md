const TAG_PATTERN = /\+\[.*?\]/g;

export const removeTagsFromMD = (mdContent: string) => {
  return mdContent.replace(TAG_PATTERN, '');
};

export const getNoteTags = (mdContent: string) => {
  const rawTagsStr = mdContent.match(TAG_PATTERN);
  if (!rawTagsStr) return [];
  const tagsStrArr = rawTagsStr
    ? rawTagsStr.map((tag) =>
        tag.replace('+', '').replace('[', '').replace(']', '')
      )
    : [];
  const tagsStr = tagsStrArr.join(',');
  const tagsArr = tagsStr.split(',').map((tag) => tag.trim());
  return tagsArr;
};
