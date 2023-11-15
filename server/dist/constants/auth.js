"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVALID_REFRESH_TOKEN_MESSAGE = exports.REFRESH_TOKEN_EXPIRATION_TIME = exports.ACCESS_TOKEN_EXPIRATION_TIME = exports.INVALID_PASSWORD_MESSAGE = exports.USER_ALREADY_EXISTS_MESSAGE = exports.REGISTER_USERNAME_MAX_MESSAGE = exports.REGISTER_USERNAME_MIN_MESSAGE = exports.REGISTER_PASSWORD_MAX_MESSAGE = exports.REGISTER_PASSWORD_MIN_MESSAGE = exports.USERNAME_MAX_LENGTH = exports.USERNAME_MIN_LENGTH = exports.PASSWORD_MAX_LENGTH = exports.PASSWORD_MIN_LENGTH = void 0;
exports.PASSWORD_MIN_LENGTH = 8;
exports.PASSWORD_MAX_LENGTH = 100;
exports.USERNAME_MIN_LENGTH = 4;
exports.USERNAME_MAX_LENGTH = 50;
exports.REGISTER_PASSWORD_MIN_MESSAGE = `Password must be at least ${exports.PASSWORD_MIN_LENGTH} characters long`;
exports.REGISTER_PASSWORD_MAX_MESSAGE = `Password cannot exceed ${exports.PASSWORD_MAX_LENGTH} characters in length`;
exports.REGISTER_USERNAME_MIN_MESSAGE = `Username must be at least ${exports.USERNAME_MIN_LENGTH} characters long`;
exports.REGISTER_USERNAME_MAX_MESSAGE = `Username cannot exceed ${exports.USERNAME_MAX_LENGTH} characters in length`;
exports.USER_ALREADY_EXISTS_MESSAGE = "User already exists";
exports.INVALID_PASSWORD_MESSAGE = "Invalid Password";
exports.ACCESS_TOKEN_EXPIRATION_TIME = "30m";
exports.REFRESH_TOKEN_EXPIRATION_TIME = "7d";
exports.INVALID_REFRESH_TOKEN_MESSAGE = "Invalid refresh token";
//# sourceMappingURL=auth.js.map