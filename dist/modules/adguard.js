"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    pattern: /^https:\/\/mobile-api.adguard.com\/api\/1.0\/ios_validate_receipt$/,
    rewrite: () => ({
        products: [
            {
                product_id: "com.adguard.lifetimePurchase",
                premium_status: "ACTIVE",
            },
        ],
    }),
};
