export default {
  pattern: /^https:\/\/sync.matetranslate.com\/subscription/,
  rewrite: () => ({
    isLifetime: true,
    isSubscriptionVerified: false,
    hasBoughtPaidApp: true,
  }),
};
