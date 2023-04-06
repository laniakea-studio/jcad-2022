export const useSetPageTitle = (title) => {
  return {
    tags: [
      {
        tagName: "title",
        content: `${title} • jcad.fi`,
      },
    ],
  };
};
