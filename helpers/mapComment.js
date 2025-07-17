export const mapComment = (comment) => {
  return {
    id: comment.id,
    author: comment.author.login,
    content: comment.content,
    publishedAt: comment.createdAt,
  };
};
