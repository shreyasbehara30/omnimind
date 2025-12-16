"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.getProductById = exports.updateContext = exports.addMessage = exports.getSession = void 0;
const products_1 = require("../data/products");
const sessions = {};
const getSession = (sessionId) => {
    if (!sessions[sessionId]) {
        sessions[sessionId] = {
            id: sessionId,
            history: [],
            context: { cart: [] }
        };
    }
    return sessions[sessionId];
};
exports.getSession = getSession;
const addMessage = (sessionId, message) => {
    const session = (0, exports.getSession)(sessionId);
    session.history.push(message);
};
exports.addMessage = addMessage;
const updateContext = (sessionId, update) => {
    const session = (0, exports.getSession)(sessionId);
    session.context = Object.assign(Object.assign({}, session.context), update);
};
exports.updateContext = updateContext;
const getProductById = (id) => {
    return products_1.PRODUCTS.find(p => p.id === id);
};
exports.getProductById = getProductById;
const searchProducts = (query) => {
    const lowerQuery = query.toLowerCase();
    return products_1.PRODUCTS.filter(p => {
        var _a;
        return p.name.toLowerCase().includes(lowerQuery) ||
            (((_a = p.description) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '').includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery);
    });
};
exports.searchProducts = searchProducts;
