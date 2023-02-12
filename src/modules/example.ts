// example module
export default {
  url: "http://httpbin.org/user-agent$",
  rewrite: (body: Body) => ({
    ...body,
    test: "rewrite test",
  }),
};
