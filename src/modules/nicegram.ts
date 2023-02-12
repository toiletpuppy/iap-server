export default {
  pattern: /^https?:\/\/restore-access.indream.app\/restoreAccess\?id=\w+$/,
  rewrite: () => ({
    data: {
      premiumAccess: true,
    },
  }),
};
