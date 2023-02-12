// example module
export default {
  url: "https://httpbin.org/user-agent$",
  rewrite: (body: Body) => ({
    ...body,
    test: "rewrite test",
  }),
};
