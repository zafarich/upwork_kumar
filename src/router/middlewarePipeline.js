function middlewarePipeline(context, middlewares, index) {
  const nextMiddleware = middlewares[index];
  if (!nextMiddleware) {
    return context.next;
  }
  return () => {
    const nextPipeline = middlewarePipeline(context, middlewares, index + 1);
    nextMiddleware({ ...context, next: nextPipeline });
  };
}
export default middlewarePipeline;
