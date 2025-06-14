/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/auth-service/src/app.module.ts":
/*!*********************************************!*\
  !*** ./apps/auth-service/src/app.module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @app/config */ "./libs/config/src/index.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./apps/auth-service/src/auth/auth.module.ts");
const user_module_1 = __webpack_require__(/*! ./user/user.module */ "./apps/auth-service/src/user/user.module.ts");
const prisma_module_1 = __webpack_require__(/*! ./prisma/prisma.module */ "./apps/auth-service/src/prisma/prisma.module.ts");
const health_controller_1 = __webpack_require__(/*! ./health/health.controller */ "./apps/auth-service/src/health/health.controller.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.GlobalConfigModule,
            src_1.LoggerModule,
            prisma_module_1.PrismaModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            exceptions_1.ExceptionsModule,
        ],
        controllers: [health_controller_1.HealthController],
    })
], AppModule);


/***/ }),

/***/ "./apps/auth-service/src/auth/auth.controller.ts":
/*!*******************************************************!*\
  !*** ./apps/auth-service/src/auth/auth.controller.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/auth-service/src/auth/auth.service.ts");
const user_service_1 = __webpack_require__(/*! ../user/user.service */ "./apps/auth-service/src/user/user.service.ts");
const login_dto_1 = __webpack_require__(/*! ./dto/login.dto */ "./apps/auth-service/src/auth/dto/login.dto.ts");
const user_dto_1 = __webpack_require__(/*! libs/contracts/src/User/dtos/user.dto */ "./libs/contracts/src/User/dtos/user.dto.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
let AuthController = class AuthController {
    authService;
    userService;
    logger;
    thrower;
    constructor(authService, userService, logger, thrower) {
        this.authService = authService;
        this.userService = userService;
        this.logger = logger;
        this.thrower = thrower;
    }
    async register(createUserDto) {
        try {
            this.logger.info('Inscription utilisateur (microservice)', { email: createUserDto.email });
            return await this.authService.register(createUserDto);
        }
        catch (error) {
            this.logger.error("Erreur lors de l'inscription:", error);
            this.handleServiceError(error, 'register');
        }
    }
    async login(loginDto) {
        try {
            this.logger.info('Connexion utilisateur (microservice)', { email: loginDto.email });
            return await this.authService.loginWithCredentials(loginDto);
        }
        catch (error) {
            this.logger.error('Erreur lors de la connexion:', error);
            this.handleServiceError(error, 'login');
        }
    }
    async validateToken(token) {
        try {
            this.logger.info('Validation du token (microservice)');
            return await this.authService.validateToken(token);
        }
        catch (error) {
            this.logger.error('Erreur lors de la validation du token:', error);
            this.handleServiceError(error, 'validate_token');
        }
    }
    async validateRefreshToken(token) {
        try {
            this.logger.info('Validation du refresh token (microservice)');
            return await this.authService.validateToken(token, true);
        }
        catch (error) {
            this.logger.error('Erreur lors de la validation du refresh token:', error);
            this.handleServiceError(error, 'validate_refresh_token');
        }
    }
    async googleLogin(googleUser) {
        try {
            this.logger.info('Connexion Google (microservice)', { email: googleUser?.email });
            return await this.authService.googleLogin(googleUser);
        }
        catch (error) {
            this.logger.error('Erreur lors de la connexion Google:', error);
            this.handleServiceError(error, 'google_login');
        }
    }
    async googleVerifyIdToken(idToken) {
        try {
            this.logger.info('Vérification Google ID Token (microservice)');
            return await this.authService.verifyGoogleIdTokenAndLogin(idToken);
        }
        catch (error) {
            this.logger.error('Erreur lors de la vérification du Google ID Token:', error);
            this.handleServiceError(error, 'google_verify_id_token');
        }
    }
    async validateGoogleUser(googleUserData) {
        try {
            this.logger.info('Validation utilisateur Google (microservice)', {
                email: googleUserData?.email,
            });
            return await this.authService.validateGoogleUser(googleUserData);
        }
        catch (error) {
            this.logger.error("Erreur lors de la validation de l'utilisateur Google:", error);
            this.handleServiceError(error, 'validate_google_user');
        }
    }
    async refreshToken(refreshToken) {
        try {
            this.logger.info('Renouvellement du token (microservice)');
            return await this.authService.refreshAccessToken(refreshToken);
        }
        catch (error) {
            this.logger.error('Erreur lors du renouvellement du token:', error);
            this.handleServiceError(error, 'refresh_token');
        }
    }
    async getUserFromToken(token) {
        try {
            this.logger.info('Récupération utilisateur depuis token (microservice)');
            return await this.authService.getCurrentUserFromToken(token);
        }
        catch (error) {
            this.logger.error("Erreur lors de la récupération de l'utilisateur:", error);
            this.handleServiceError(error, 'get_user_from_token');
        }
    }
    async revokeToken(token) {
        try {
            this.logger.info('Révocation du token (microservice)');
            const success = await this.authService.revokeToken(token);
            return { success };
        }
        catch (error) {
            this.logger.error('Erreur lors de la révocation du token:', error);
            this.handleServiceError(error, 'revoke_token');
        }
    }
    handleServiceError(error, operation) {
        this.logger.error(`Erreur dans l'opération ${operation}:`, error);
        if (this.isPrismaError(error)) {
            this.handlePrismaError(error);
        }
        if (this.isJwtError(error)) {
            if (error.name === 'TokenExpiredError') {
                this.thrower.throwTokenExpired({ operation, originalError: error.message });
            }
            else if (error.name === 'JsonWebTokenError') {
                this.thrower.throwInvalidToken({ operation, originalError: error.message });
            }
        }
        if (error.message?.includes('Invalid credentials') || error.message?.includes('Identifiants')) {
            this.thrower.throwInvalidCredentials({ operation });
        }
        if (error.message?.includes('User not found') ||
            error.message?.includes('Utilisateur introuvable')) {
            this.thrower.throwUserNotFound({ operation });
        }
        if (error.message?.includes('Email already exists') ||
            error.message?.includes('Email déjà utilisé')) {
            this.thrower.throwEmailAlreadyExists({ operation });
        }
        if (error.message?.includes('Google token') || error.message?.includes('Token Google')) {
            this.thrower.throwGoogleTokenInvalid({ operation, originalError: error.message });
        }
        if (error.name === 'ValidationError' || error.message?.includes('validation')) {
            this.thrower.throwValidation('Erreur de validation', [
                {
                    field: 'unknown',
                    value: error.value,
                    constraints: [error.message],
                },
            ]);
        }
        if (error.code === 'ECONNREFUSED' || error.message?.includes('database server')) {
            this.thrower.throwDatabaseConnection({ operation, originalError: error.message });
        }
        this.thrower.throwInternalError("Erreur interne du service d'authentification", {
            operation,
            originalError: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        });
    }
    isPrismaError(error) {
        return (error &&
            typeof error === 'object' &&
            'code' in error &&
            ('clientVersion' in error || 'meta' in error));
    }
    handlePrismaError(error) {
        const prismaCode = error.code;
        switch (prismaCode) {
            case 'P1001':
                this.thrower.throwDatabaseConnection({
                    prismaCode,
                    originalError: error.message,
                });
                break;
            case 'P2002':
                this.thrower.throwDuplicateEntry({
                    prismaCode,
                    target: error.meta?.target,
                    originalError: error.message,
                });
                break;
            case 'P2025':
                this.thrower.throwRecordNotFound({
                    prismaCode,
                    originalError: error.message,
                });
                break;
            default:
                this.thrower.throwDatabaseQuery({
                    prismaCode,
                    originalError: error.message,
                });
        }
    }
    isJwtError(error) {
        return (error &&
            (error.name === 'TokenExpiredError' ||
                error.name === 'JsonWebTokenError' ||
                error.name === 'NotBeforeError'));
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'register_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthController.prototype, "register", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'login_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AuthController.prototype, "login", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'validate_token' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AuthController.prototype, "validateToken", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'validate_refresh_token' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AuthController.prototype, "validateRefreshToken", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'google_login' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'google_verify_id_token' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], AuthController.prototype, "googleVerifyIdToken", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'validate_google_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], AuthController.prototype, "validateGoogleUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'refresh_token' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_user_from_token' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserFromToken", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'revoke_token' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], AuthController.prototype, "revokeToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object, typeof (_c = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _c : Object, typeof (_d = typeof exceptions_1.ExceptionThrower !== "undefined" && exceptions_1.ExceptionThrower) === "function" ? _d : Object])
], AuthController);


/***/ }),

/***/ "./apps/auth-service/src/auth/auth.module.ts":
/*!***************************************************!*\
  !*** ./apps/auth-service/src/auth/auth.module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/auth-service/src/auth/auth.service.ts");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/auth-service/src/auth/auth.controller.ts");
const user_module_1 = __webpack_require__(/*! ../user/user.module */ "./apps/auth-service/src/user/user.module.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            user_module_1.UserModule,
            src_1.LoggerModule,
            exceptions_1.ExceptionsModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET', 'default-secret'),
                    signOptions: {
                        expiresIn: configService.get('JWT_ACCESS_EXPIRES_IN', '3600s'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),

/***/ "./apps/auth-service/src/auth/auth.service.ts":
/*!****************************************************!*\
  !*** ./apps/auth-service/src/auth/auth.service.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const google_auth_library_1 = __webpack_require__(/*! google-auth-library */ "google-auth-library");
const user_service_1 = __webpack_require__(/*! ../user/user.service */ "./apps/auth-service/src/user/user.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
let AuthService = class AuthService {
    userService;
    jwtService;
    configService;
    logger;
    accessTokenExpiresIn;
    refreshTokenExpiresIn;
    jwtSecret;
    refreshSecret;
    googleOAuth2Client;
    constructor(userService, jwtService, configService, logger) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = logger;
        this.accessTokenExpiresIn = this.configService.get('JWT_ACCESS_EXPIRES_IN', 3600);
        this.refreshTokenExpiresIn = this.configService.get('JWT_REFRESH_EXPIRES_IN', 604800);
        this.jwtSecret = this.configService.get('JWT_SECRET', 'default-secret');
        this.refreshSecret = this.configService.get('JWT_REFRESH_SECRET', 'default-refresh-secret');
        const googleClientId = this.configService.get('GOOGLE_CLIENT_ID');
        this.googleOAuth2Client = new google_auth_library_1.OAuth2Client(googleClientId);
        this.logger.info('Configuration JWT initialisée', {
            accessTokenExpiresIn: this.accessTokenExpiresIn,
            refreshTokenExpiresIn: this.refreshTokenExpiresIn,
        });
    }
    async validateUser(email, password) {
        this.logger.info('Validation des identifiants utilisateur', { email });
        return this.userService.validateUser(email, password);
    }
    generateTokens(user) {
        this.logger.info("Génération des tokens pour l'utilisateur", { userId: user.user_id });
        const accessPayload = {
            sub: user.user_id.toString(),
            username: user.username ?? '',
            type: 'access',
        };
        const refreshPayload = {
            sub: user.user_id.toString(),
            username: user.username ?? '',
            type: 'refresh',
        };
        const access_token = this.jwtService.sign(accessPayload, {
            secret: this.jwtSecret,
            expiresIn: `${this.accessTokenExpiresIn}s`,
        });
        const refresh_token = this.jwtService.sign(refreshPayload, {
            secret: this.refreshSecret,
            expiresIn: `${this.refreshTokenExpiresIn}s`,
        });
        this.logger.info('Tokens générés avec succès', {
            userId: user.user_id,
            accessExpiresIn: this.accessTokenExpiresIn,
            refreshExpiresIn: this.refreshTokenExpiresIn,
        });
        return { access_token, refresh_token };
    }
    login(user) {
        this.logger.info('Connexion utilisateur', { userId: user.user_id });
        const tokens = this.generateTokens(user);
        return {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: this.accessTokenExpiresIn,
            user: {
                id: user.user_id.toString(),
                username: user.username ?? '',
            },
        };
    }
    async register(createUserDto) {
        this.logger.info('Inscription nouvel utilisateur', { email: createUserDto.email });
        const user = await this.userService.createUser(createUserDto);
        return this.login(user);
    }
    async loginWithCredentials(loginDto) {
        this.logger.info('Tentative de connexion avec identifiants', { email: loginDto.email });
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            this.logger.warn('Échec de validation des identifiants', { email: loginDto.email });
            throw new common_1.UnauthorizedException('Email ou mot de passe incorrect');
        }
        return this.login(user);
    }
    async validateToken(token, isRefreshToken = false) {
        try {
            this.logger.info('Validation du token', { isRefreshToken, tokenLength: token?.length });
            if (!token) {
                return { valid: false, error: 'Token manquant' };
            }
            const secret = isRefreshToken ? this.refreshSecret : this.jwtSecret;
            const expectedType = isRefreshToken ? 'refresh' : 'access';
            const payload = this.jwtService.verify(token, { secret });
            if (payload.type !== expectedType) {
                this.logger.warn('Type de token incorrect', {
                    expected: expectedType,
                    received: payload.type,
                });
                return { valid: false, error: `Type de token incorrect. Attendu: ${expectedType}` };
            }
            const user = await this.userService.findUserById(payload.sub);
            if (!user) {
                this.logger.warn('Utilisateur inexistant pour le token', { userId: payload.sub });
                return { valid: false, error: 'Utilisateur introuvable' };
            }
            this.logger.info('Token valide', {
                userId: payload.sub,
                type: payload.type,
                exp: payload.exp,
            });
            return {
                valid: true,
                user: {
                    id: payload.sub,
                    username: payload.username,
                    iat: payload.iat,
                    exp: payload.exp,
                },
            };
        }
        catch (error) {
            this.logger.error('Erreur lors de la validation du token', error);
            if (error.name === 'JsonWebTokenError') {
                return { valid: false, error: 'Token invalide' };
            }
            if (error.name === 'TokenExpiredError') {
                return { valid: false, error: 'Token expiré' };
            }
            return { valid: false, error: 'Erreur de validation du token' };
        }
    }
    async refreshAccessToken(refreshToken) {
        this.logger.info("Renouvellement du token d'accès");
        if (!refreshToken) {
            throw new common_1.BadRequestException('Refresh token manquant');
        }
        const validation = await this.validateToken(refreshToken, true);
        if (!validation.valid || !validation.user) {
            this.logger.warn('Refresh token invalide');
            throw new common_1.UnauthorizedException('Refresh token invalide');
        }
        const user = await this.userService.findUserById(validation.user.id);
        if (!user) {
            throw new common_1.UnauthorizedException('Utilisateur introuvable');
        }
        const tokens = this.generateTokens(user);
        this.logger.info("Token d'accès renouvelé avec succès", { userId: user.user_id.toString() });
        return {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: this.accessTokenExpiresIn,
        };
    }
    decodeToken(token) {
        try {
            const decoded = this.jwtService.decode(token);
            return decoded;
        }
        catch (error) {
            this.logger.error('Erreur lors du décodage du token', error);
            return null;
        }
    }
    async getCurrentUserFromToken(token) {
        const validation = await this.validateToken(token);
        if (!validation.valid || !validation.user) {
            return null;
        }
        return {
            id: validation.user.id,
            username: validation.user.username,
        };
    }
    async validateGoogleUser(googleUser) {
        this.logger.info('Validation utilisateur Google', { email: googleUser.email });
        const user = await this.userService.findUserByEmail(googleUser.email);
        if (!user) {
            this.logger.info('Création nouvel utilisateur Google', { email: googleUser.email });
            const createUserDto = {
                email: googleUser.email,
                username: `${googleUser.firstName}_${googleUser.lastName}`,
                password: Math.random().toString(36).slice(-8),
            };
            const newUser = await this.userService.createUser(createUserDto);
            return newUser;
        }
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async verifyGoogleIdTokenAndLogin(idToken) {
        try {
            this.logger.info('Vérification du Google ID Token');
            const ticket = await this.googleOAuth2Client.verifyIdToken({
                idToken,
                audience: this.configService.get('GOOGLE_CLIENT_ID'),
            });
            const payload = ticket.getPayload();
            if (!payload) {
                throw new common_1.UnauthorizedException('Token ID Google invalide');
            }
            this.logger.info('Token ID Google vérifié avec succès', { email: payload.email });
            const googleUserData = {
                email: payload.email ?? '',
                firstName: payload.given_name ?? '',
                lastName: payload.family_name ?? '',
                picture: payload.picture ?? '',
                accessToken: '',
                refreshToken: '',
            };
            const user = await this.validateGoogleUser(googleUserData);
            return this.login(user);
        }
        catch (error) {
            this.logger.error('Erreur lors de la vérification du Google ID Token', error);
            throw new common_1.UnauthorizedException('Échec de la vérification du token Google');
        }
    }
    googleLogin(user) {
        if (!user) {
            throw new common_1.UnauthorizedException("Échec de l'authentification Google");
        }
        this.logger.info('Connexion Google réussie', { userId: user.user_id });
        return Promise.resolve(this.login(user));
    }
    revokeToken(_token) {
        this.logger.info('Révocation du token');
        return Promise.resolve(true);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object, typeof (_d = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _d : Object])
], AuthService);


/***/ }),

/***/ "./apps/auth-service/src/auth/dto/login.dto.ts":
/*!*****************************************************!*\
  !*** ./apps/auth-service/src/auth/dto/login.dto.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),

/***/ "./apps/auth-service/src/health/health.controller.ts":
/*!***********************************************************!*\
  !*** ./apps/auth-service/src/health/health.controller.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
let HealthController = class HealthController {
    logger;
    constructor(logger) {
        this.logger = logger;
        this.logger.setContext('Health.controller - Auth Service');
    }
    checkHealth() {
        this.logger.info('Health check requested');
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'auth-service',
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'health' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "checkHealth", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [typeof (_a = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _a : Object])
], HealthController);


/***/ }),

/***/ "./apps/auth-service/src/prisma/prisma.module.ts":
/*!*******************************************************!*\
  !*** ./apps/auth-service/src/prisma/prisma.module.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./apps/auth-service/src/prisma/prisma.service.ts");
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),

/***/ "./apps/auth-service/src/prisma/prisma.service.ts":
/*!********************************************************!*\
  !*** ./apps/auth-service/src/prisma/prisma.service.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),

/***/ "./apps/auth-service/src/user/user.module.ts":
/*!***************************************************!*\
  !*** ./apps/auth-service/src/user/user.module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/auth-service/src/user/user.service.ts");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'USER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.USER_SERVICE_HOST ?? 'localhost',
                        port: parseInt(process.env.USER_SERVICE_PORT ?? '4003'),
                    },
                },
            ]),
        ],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);


/***/ }),

/***/ "./apps/auth-service/src/user/user.service.ts":
/*!****************************************************!*\
  !*** ./apps/auth-service/src/user/user.service.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let UserService = class UserService {
    userClient;
    constructor(userClient) {
        this.userClient = userClient;
    }
    async createUser(createUserDto) {
        const user = await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'create_user' }, createUserDto));
        return user;
    }
    async findUserByEmail(email) {
        try {
            const user = await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'find_user_by_email' }, email));
            return user;
        }
        catch {
            return null;
        }
    }
    async findUserById(id) {
        try {
            const user = await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'find_user_by_id' }, id));
            return user;
        }
        catch {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
    }
    async validateUser(email, password) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'validate_user' }, { email, password }));
            if (response.valid) {
                return response.user;
            }
            return null;
        }
        catch {
            return null;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], UserService);


/***/ }),

/***/ "./libs/config/src/config.interface.ts":
/*!*********************************************!*\
  !*** ./libs/config/src/config.interface.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/config/src/config.module.ts":
/*!******************************************!*\
  !*** ./libs/config/src/config.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalConfigModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const path_1 = __webpack_require__(/*! path */ "path");
const config_service_1 = __webpack_require__(/*! ./config.service */ "./libs/config/src/config.service.ts");
let GlobalConfigModule = class GlobalConfigModule {
};
exports.GlobalConfigModule = GlobalConfigModule;
exports.GlobalConfigModule = GlobalConfigModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [
                    (0, path_1.join)(process.cwd(), '.env'),
                    (0, path_1.join)(process.cwd(), '.env.local'),
                    (0, path_1.join)(process.cwd(), '.env.development'),
                ],
                cache: true,
            }),
        ],
        providers: [config_service_1.GlobalConfigService],
        exports: [config_service_1.GlobalConfigService, config_1.ConfigModule],
    })
], GlobalConfigModule);


/***/ }),

/***/ "./libs/config/src/config.service.ts":
/*!*******************************************!*\
  !*** ./libs/config/src/config.service.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalConfigService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let GlobalConfigService = class GlobalConfigService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    get config() {
        return {
            database: {
                url: this.configService.get('DATABASE_URL', ''),
                user: this.configService.get('POSTGRES_USER', 'lifeos_user'),
                password: this.configService.get('POSTGRES_PASSWORD', 'lifeos_password'),
                host: this.configService.get('POSTGRES_HOST', 'localhost'),
                port: this.configService.get('POSTGRES_PORT', 4444),
                name: this.configService.get('POSTGRES_DB', 'lifeos_db'),
            },
            jwt: {
                secret: this.configService.get('JWT_SECRET', 'default-secret'),
                refreshSecret: this.configService.get('JWT_REFRESH_SECRET', 'default-refresh-secret'),
                accessExpiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN', 3600),
                refreshExpiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', 604800),
            },
            google: {
                clientId: this.configService.get('GOOGLE_CLIENT_ID', ''),
                clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET', ''),
                callbackUrl: this.configService.get('GOOGLE_CALLBACK_URL', 'http://localhost:4001/api/auth/google/callback'),
            },
            services: {
                authService: {
                    host: this.configService.get('AUTH_SERVICE_HOST', 'localhost'),
                    port: this.configService.get('AUTH_SERVICE_PORT', 4002),
                },
                userService: {
                    host: this.configService.get('USER_SERVICE_HOST', 'localhost'),
                    port: this.configService.get('USER_SERVICE_PORT', 4003),
                },
                bankService: {
                    host: this.configService.get('BANK_SERVICE_HOST', 'localhost'),
                    port: this.configService.get('BANK_SERVICE_PORT', 4004),
                },
                apiGateway: {
                    port: this.configService.get('API_GATEWAY_PORT', 4001),
                },
            },
            app: {
                nodeEnv: this.configService.get('NODE_ENV', 'development'),
                frontendUrl: this.configService.get('FRONTEND_URL', 'http://localhost:3000'),
            },
        };
    }
    get database() {
        return this.config.database;
    }
    get jwt() {
        return this.config.jwt;
    }
    get google() {
        return this.config.google;
    }
    get services() {
        return this.config.services;
    }
    get app() {
        return this.config.app;
    }
    logConfig() {
        const config = this.config;
        console.log('🔧 Configuration globale chargée:', {
            database: {
                ...config.database,
                password: '***masked***',
            },
            jwt: {
                ...config.jwt,
                secret: '***masked***',
                refreshSecret: '***masked***',
            },
            google: {
                ...config.google,
                clientSecret: config.google.clientSecret ? '***masked***' : 'NOT_SET',
            },
            services: config.services,
            app: config.app,
        });
    }
};
exports.GlobalConfigService = GlobalConfigService;
exports.GlobalConfigService = GlobalConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], GlobalConfigService);


/***/ }),

/***/ "./libs/config/src/index.ts":
/*!**********************************!*\
  !*** ./libs/config/src/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./config.module */ "./libs/config/src/config.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./config.service */ "./libs/config/src/config.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./config.interface */ "./libs/config/src/config.interface.ts"), exports);


/***/ }),

/***/ "./libs/contracts/src/User/dtos/user.dto.ts":
/*!**************************************************!*\
  !*** ./libs/contracts/src/User/dtos/user.dto.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserProfileDto = exports.UserStatsDto = exports.UserResponseDto = exports.UpdateUserDto = exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class CreateUserDto {
    username;
    email;
    password;
    profile_picture_url;
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john_doe', description: "Nom d'utilisateur unique" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com', description: "Email de l'utilisateur" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'motdepasse123',
        minLength: 6,
        description: 'Mot de passe (min 6 caractères)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/avatar.jpg',
        description: "URL de l'image de profil",
        required: false,
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "profile_picture_url", void 0);
class UpdateUserDto {
    username;
    email;
    profile_picture_url;
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john_doe', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com', required: false }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/avatar.jpg',
        required: false,
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "profile_picture_url", void 0);
class UserResponseDto {
    user_id;
    username;
    email;
    profile_picture_url;
    level;
    xp_points;
    game_coins;
    createdAt;
    updatedAt;
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john_doe' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/avatar.jpg', nullable: true }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "profile_picture_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "xp_points", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "game_coins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserResponseDto.prototype, "updatedAt", void 0);
class UserStatsDto {
    user_id;
    level;
    xp_points;
    game_coins;
    services_provided;
    services_received;
    pranks_executed;
    pranks_received;
    missions_completed;
    friends_count;
}
exports.UserStatsDto = UserStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1250 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "xp_points", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "game_coins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "services_provided", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "services_received", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "pranks_executed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "pranks_received", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "missions_completed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], UserStatsDto.prototype, "friends_count", void 0);
class UserProfileDto {
    user_id;
    username;
    email;
    profile_picture_url;
    level;
    xp_points;
    game_coins;
    createdAt;
}
exports.UserProfileDto = UserProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserProfileDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john_doe' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/avatar.jpg', nullable: true }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "profile_picture_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], UserProfileDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1250 }),
    __metadata("design:type", Number)
], UserProfileDto.prototype, "xp_points", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500 }),
    __metadata("design:type", Number)
], UserProfileDto.prototype, "game_coins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UserProfileDto.prototype, "createdAt", void 0);


/***/ }),

/***/ "./libs/exceptions/src/constants/exception.constants.ts":
/*!**************************************************************!*\
  !*** ./libs/exceptions/src/constants/exception.constants.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HTTP_STATUS_CODES = exports.EXCEPTION_CODES = void 0;
exports.EXCEPTION_CODES = {
    AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
    AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
    AUTH_TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
    AUTH_UNAUTHORIZED: 'AUTH_UNAUTHORIZED',
    AUTH_FORBIDDEN: 'AUTH_FORBIDDEN',
    AUTH_USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
    AUTH_EMAIL_ALREADY_EXISTS: 'AUTH_EMAIL_ALREADY_EXISTS',
    AUTH_GOOGLE_TOKEN_INVALID: 'AUTH_GOOGLE_TOKEN_INVALID',
    APP_PACK_NOT_FOUND: 'APP_PACK_NOT_FOUND',
    APP_INSUFFICIENT_QUANTITY: 'APP_INSUFFICIENT_QUANTITY',
    APP_PRANK_NOT_FOUND: 'APP_PRANK_NOT_FOUND',
    DB_CONNECTION_ERROR: 'DB_CONNECTION_ERROR',
    DB_QUERY_ERROR: 'DB_QUERY_ERROR',
    DB_RECORD_NOT_FOUND: 'DB_RECORD_NOT_FOUND',
    DB_DUPLICATE_ENTRY: 'DB_DUPLICATE_ENTRY',
    DB_CONSTRAINT_VIOLATION: 'DB_CONSTRAINT_VIOLATION',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    VALIDATION_REQUIRED_FIELD: 'VALIDATION_REQUIRED_FIELD',
    VALIDATION_INVALID_FORMAT: 'VALIDATION_INVALID_FORMAT',
    BUSINESS_RULE_VIOLATION: 'BUSINESS_RULE_VIOLATION',
    INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
    RESOURCE_NOT_AVAILABLE: 'RESOURCE_NOT_AVAILABLE',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
    MICROSERVICE_CONNECTION_ERROR: 'MICROSERVICE_CONNECTION_ERROR',
};
exports.HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
};


/***/ }),

/***/ "./libs/exceptions/src/exceptions.module.ts":
/*!**************************************************!*\
  !*** ./libs/exceptions/src/exceptions.module.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExceptionsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const exception_thrower_1 = __webpack_require__(/*! ./throwers/exception.thrower */ "./libs/exceptions/src/throwers/exception.thrower.ts");
const global_exception_filter_1 = __webpack_require__(/*! ./filters/global-exception.filter */ "./libs/exceptions/src/filters/global-exception.filter.ts");
let ExceptionsModule = class ExceptionsModule {
};
exports.ExceptionsModule = ExceptionsModule;
exports.ExceptionsModule = ExceptionsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [exception_thrower_1.ExceptionThrower, global_exception_filter_1.GlobalExceptionFilter],
        exports: [exception_thrower_1.ExceptionThrower, global_exception_filter_1.GlobalExceptionFilter],
    })
], ExceptionsModule);


/***/ }),

/***/ "./libs/exceptions/src/exceptions/auth.exception.ts":
/*!**********************************************************!*\
  !*** ./libs/exceptions/src/exceptions/auth.exception.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleTokenInvalidException = exports.EmailAlreadyExistsException = exports.UserNotFoundException = exports.ForbiddenException = exports.UnauthorizedException = exports.InvalidTokenException = exports.TokenExpiredException = exports.InvalidCredentialsException = exports.AuthException = void 0;
const base_exception_1 = __webpack_require__(/*! ./base.exception */ "./libs/exceptions/src/exceptions/base.exception.ts");
const exception_constants_1 = __webpack_require__(/*! ../constants/exception.constants */ "./libs/exceptions/src/constants/exception.constants.ts");
class AuthException extends base_exception_1.BaseException {
    constructor(message, code, details, path) {
        super(message, exception_constants_1.HTTP_STATUS_CODES.UNAUTHORIZED, code, details, path);
    }
}
exports.AuthException = AuthException;
class InvalidCredentialsException extends AuthException {
    constructor(details, path) {
        super('Identifiants invalides', exception_constants_1.EXCEPTION_CODES.AUTH_INVALID_CREDENTIALS, details, path);
    }
}
exports.InvalidCredentialsException = InvalidCredentialsException;
class TokenExpiredException extends AuthException {
    constructor(details, path) {
        super('Token expiré', exception_constants_1.EXCEPTION_CODES.AUTH_TOKEN_EXPIRED, details, path);
    }
}
exports.TokenExpiredException = TokenExpiredException;
class InvalidTokenException extends AuthException {
    constructor(details, path) {
        super('Token invalide', exception_constants_1.EXCEPTION_CODES.AUTH_TOKEN_INVALID, details, path);
    }
}
exports.InvalidTokenException = InvalidTokenException;
class UnauthorizedException extends AuthException {
    constructor(details, path) {
        super('Non autorisé', exception_constants_1.EXCEPTION_CODES.AUTH_UNAUTHORIZED, details, path);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends base_exception_1.BaseException {
    constructor(details, path) {
        super('Accès interdit', exception_constants_1.HTTP_STATUS_CODES.FORBIDDEN, exception_constants_1.EXCEPTION_CODES.AUTH_FORBIDDEN, details, path);
    }
}
exports.ForbiddenException = ForbiddenException;
class UserNotFoundException extends base_exception_1.BaseException {
    constructor(details, path) {
        super('Utilisateur introuvable', exception_constants_1.HTTP_STATUS_CODES.NOT_FOUND, exception_constants_1.EXCEPTION_CODES.AUTH_USER_NOT_FOUND, details, path);
    }
}
exports.UserNotFoundException = UserNotFoundException;
class EmailAlreadyExistsException extends base_exception_1.BaseException {
    constructor(details, path) {
        super('Cet email est déjà utilisé', exception_constants_1.HTTP_STATUS_CODES.CONFLICT, exception_constants_1.EXCEPTION_CODES.AUTH_EMAIL_ALREADY_EXISTS, details, path);
    }
}
exports.EmailAlreadyExistsException = EmailAlreadyExistsException;
class GoogleTokenInvalidException extends AuthException {
    constructor(details, path) {
        super('Token Google invalide', exception_constants_1.EXCEPTION_CODES.AUTH_GOOGLE_TOKEN_INVALID, details, path);
    }
}
exports.GoogleTokenInvalidException = GoogleTokenInvalidException;


/***/ }),

/***/ "./libs/exceptions/src/exceptions/base.exception.ts":
/*!**********************************************************!*\
  !*** ./libs/exceptions/src/exceptions/base.exception.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseException = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
class BaseException extends common_1.HttpException {
    statusCode;
    code;
    timestamp;
    details;
    path;
    constructor(message, statusCode, code, details, path) {
        super(message, statusCode);
        this.statusCode = statusCode;
        this.code = code;
        this.timestamp = new Date();
        this.details = details;
        this.path = path;
    }
    toJSON() {
        return {
            message: this.message,
            statusCode: this.getStatus(),
            code: this.code,
            details: this.details,
            timestamp: this.timestamp,
            path: this.path,
        };
    }
}
exports.BaseException = BaseException;


/***/ }),

/***/ "./libs/exceptions/src/exceptions/business.exception.ts":
/*!**************************************************************!*\
  !*** ./libs/exceptions/src/exceptions/business.exception.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrankNotFoundException = exports.InsufficientQuantityException = exports.PackNotFoundException = exports.ResourceNotAvailableException = exports.InsufficientPermissionsException = exports.BusinessException = void 0;
const base_exception_1 = __webpack_require__(/*! ./base.exception */ "./libs/exceptions/src/exceptions/base.exception.ts");
const exception_constants_1 = __webpack_require__(/*! ../constants/exception.constants */ "./libs/exceptions/src/constants/exception.constants.ts");
class BusinessException extends base_exception_1.BaseException {
    businessCode;
    context;
    constructor(message, businessCode, statusCode = exception_constants_1.HTTP_STATUS_CODES.BAD_REQUEST, context, path) {
        super(message, statusCode, exception_constants_1.EXCEPTION_CODES.BUSINESS_RULE_VIOLATION, { businessCode, context }, path);
        this.businessCode = businessCode;
        this.context = context;
    }
}
exports.BusinessException = BusinessException;
class InsufficientPermissionsException extends base_exception_1.BaseException {
    constructor(details, path) {
        super('Permissions insuffisantes', exception_constants_1.HTTP_STATUS_CODES.FORBIDDEN, exception_constants_1.EXCEPTION_CODES.INSUFFICIENT_PERMISSIONS, details, path);
    }
}
exports.InsufficientPermissionsException = InsufficientPermissionsException;
class ResourceNotAvailableException extends base_exception_1.BaseException {
    constructor(details, path) {
        super('Ressource non disponible', exception_constants_1.HTTP_STATUS_CODES.NOT_FOUND, exception_constants_1.EXCEPTION_CODES.RESOURCE_NOT_AVAILABLE, details, path);
    }
}
exports.ResourceNotAvailableException = ResourceNotAvailableException;
class PackNotFoundException extends base_exception_1.BaseException {
    constructor(details, path) {
        super('Pack introuvable', exception_constants_1.HTTP_STATUS_CODES.NOT_FOUND, exception_constants_1.EXCEPTION_CODES.APP_PACK_NOT_FOUND, details, path);
    }
}
exports.PackNotFoundException = PackNotFoundException;
class InsufficientQuantityException extends base_exception_1.BaseException {
    constructor(details, path) {
        super('Quantité insuffisante', exception_constants_1.HTTP_STATUS_CODES.NOT_FOUND, exception_constants_1.EXCEPTION_CODES.APP_INSUFFICIENT_QUANTITY, details, path);
    }
}
exports.InsufficientQuantityException = InsufficientQuantityException;
class PrankNotFoundException extends base_exception_1.BaseException {
    constructor(details, path) {
        super('Prank introuvable', exception_constants_1.HTTP_STATUS_CODES.NOT_FOUND, exception_constants_1.EXCEPTION_CODES.APP_PRANK_NOT_FOUND, details, path);
    }
}
exports.PrankNotFoundException = PrankNotFoundException;


/***/ }),

/***/ "./libs/exceptions/src/exceptions/database.exception.ts":
/*!**************************************************************!*\
  !*** ./libs/exceptions/src/exceptions/database.exception.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConstraintViolationException = exports.DuplicateEntryException = exports.RecordNotFoundException = exports.DatabaseQueryException = exports.DatabaseConnectionException = exports.DatabaseException = void 0;
const base_exception_1 = __webpack_require__(/*! ./base.exception */ "./libs/exceptions/src/exceptions/base.exception.ts");
const exception_constants_1 = __webpack_require__(/*! ../constants/exception.constants */ "./libs/exceptions/src/constants/exception.constants.ts");
class DatabaseException extends base_exception_1.BaseException {
    constructor(message, code, details, path) {
        super(message, exception_constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, code, details, path);
    }
}
exports.DatabaseException = DatabaseException;
class DatabaseConnectionException extends DatabaseException {
    constructor(details, path) {
        super('Erreur de connexion à la base de données', exception_constants_1.EXCEPTION_CODES.DB_CONNECTION_ERROR, details, path);
    }
}
exports.DatabaseConnectionException = DatabaseConnectionException;
class DatabaseQueryException extends DatabaseException {
    constructor(details, path) {
        super("Erreur lors de l'exécution de la requête", exception_constants_1.EXCEPTION_CODES.DB_QUERY_ERROR, details, path);
    }
}
exports.DatabaseQueryException = DatabaseQueryException;
class RecordNotFoundException extends base_exception_1.BaseException {
    constructor(details, path) {
        super('Enregistrement introuvable', exception_constants_1.HTTP_STATUS_CODES.NOT_FOUND, exception_constants_1.EXCEPTION_CODES.DB_RECORD_NOT_FOUND, details, path);
    }
}
exports.RecordNotFoundException = RecordNotFoundException;
class DuplicateEntryException extends base_exception_1.BaseException {
    constructor(details, path) {
        super('Enregistrement déjà existant', exception_constants_1.HTTP_STATUS_CODES.CONFLICT, exception_constants_1.EXCEPTION_CODES.DB_DUPLICATE_ENTRY, details, path);
    }
}
exports.DuplicateEntryException = DuplicateEntryException;
class ConstraintViolationException extends base_exception_1.BaseException {
    constructor(details, path) {
        super('Violation de contrainte de base de données', exception_constants_1.HTTP_STATUS_CODES.BAD_REQUEST, exception_constants_1.EXCEPTION_CODES.DB_CONSTRAINT_VIOLATION, details, path);
    }
}
exports.ConstraintViolationException = ConstraintViolationException;


/***/ }),

/***/ "./libs/exceptions/src/exceptions/validation.exception.ts":
/*!****************************************************************!*\
  !*** ./libs/exceptions/src/exceptions/validation.exception.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidFormatException = exports.RequiredFieldException = exports.ValidationException = void 0;
const base_exception_1 = __webpack_require__(/*! ./base.exception */ "./libs/exceptions/src/exceptions/base.exception.ts");
const exception_constants_1 = __webpack_require__(/*! ../constants/exception.constants */ "./libs/exceptions/src/constants/exception.constants.ts");
class ValidationException extends base_exception_1.BaseException {
    validationErrors;
    constructor(message, validationErrors, path) {
        super(message, exception_constants_1.HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY, exception_constants_1.EXCEPTION_CODES.VALIDATION_ERROR, { validationErrors }, path);
        this.validationErrors = validationErrors;
    }
}
exports.ValidationException = ValidationException;
class RequiredFieldException extends base_exception_1.BaseException {
    constructor(fieldName, path) {
        super(`Le champ '${fieldName}' est requis`, exception_constants_1.HTTP_STATUS_CODES.BAD_REQUEST, exception_constants_1.EXCEPTION_CODES.VALIDATION_REQUIRED_FIELD, { fieldName }, path);
    }
}
exports.RequiredFieldException = RequiredFieldException;
class InvalidFormatException extends base_exception_1.BaseException {
    constructor(fieldName, expectedFormat, path) {
        super(`Format invalide pour le champ '${fieldName}'. Format attendu: ${expectedFormat}`, exception_constants_1.HTTP_STATUS_CODES.BAD_REQUEST, exception_constants_1.EXCEPTION_CODES.VALIDATION_INVALID_FORMAT, { fieldName, expectedFormat }, path);
    }
}
exports.InvalidFormatException = InvalidFormatException;


/***/ }),

/***/ "./libs/exceptions/src/filters/global-exception.filter.ts":
/*!****************************************************************!*\
  !*** ./libs/exceptions/src/filters/global-exception.filter.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GlobalExceptionFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const base_exception_1 = __webpack_require__(/*! ../exceptions/base.exception */ "./libs/exceptions/src/exceptions/base.exception.ts");
const exception_constants_1 = __webpack_require__(/*! ../constants/exception.constants */ "./libs/exceptions/src/constants/exception.constants.ts");
let GlobalExceptionFilter = GlobalExceptionFilter_1 = class GlobalExceptionFilter {
    logger = new common_1.Logger(GlobalExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const exceptionResponse = this.buildExceptionResponse(exception, request);
        this.logException(exception, request, exceptionResponse);
        response.status(exceptionResponse.statusCode).json(exceptionResponse);
    }
    buildExceptionResponse(exception, request) {
        const timestamp = new Date().toISOString();
        const path = request.url;
        if (exception instanceof base_exception_1.BaseException) {
            return {
                status: 'error',
                message: exception.message,
                code: exception.code,
                statusCode: exception.getStatus(),
                timestamp,
                path,
                details: exception.details,
            };
        }
        if (exception instanceof common_1.HttpException) {
            const statusCode = exception.getStatus();
            const response = exception.getResponse();
            let message;
            let details;
            if (typeof response === 'string') {
                message = response;
            }
            else if (typeof response === 'object' && response !== null) {
                const responseObj = response;
                message = responseObj.message ?? responseObj.error ?? 'Erreur HTTP';
                details = responseObj;
            }
            else {
                message = 'Erreur HTTP';
            }
            return {
                status: 'error',
                message,
                code: this.getHttpExceptionCode(statusCode),
                statusCode,
                timestamp,
                path,
                details,
            };
        }
        if (this.isPrismaError(exception)) {
            return this.handlePrismaError(exception, timestamp, path);
        }
        if (this.isMicroserviceError(exception)) {
            return {
                status: 'error',
                message: 'Service temporairement indisponible',
                code: exception_constants_1.EXCEPTION_CODES.MICROSERVICE_CONNECTION_ERROR,
                statusCode: exception_constants_1.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
                timestamp,
                path,
                details: { originalError: exception.message },
            };
        }
        return {
            status: 'error',
            message: 'Erreur interne du serveur',
            code: exception_constants_1.EXCEPTION_CODES.INTERNAL_SERVER_ERROR,
            statusCode: exception_constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            timestamp,
            path,
            details: process.env.NODE_ENV === 'development'
                ? {
                    originalError: exception.message,
                    stack: exception.stack,
                }
                : undefined,
        };
    }
    logException(exception, request, response) {
        const { method, url, ip, headers } = request;
        const userAgent = headers?.['user-agent'] ?? 'Unknown';
        const logContext = {
            method,
            url,
            ip,
            userAgent,
            statusCode: response.statusCode,
            code: response.code,
            timestamp: response.timestamp,
        };
        if (response.statusCode >= 500) {
            this.logger.error(`${method} ${url} - ${response.statusCode} ${response.code}: ${response.message}`, exception.stack, logContext);
        }
        else if (response.statusCode >= 400) {
            this.logger.warn(`${method} ${url} - ${response.statusCode} ${response.code}: ${response.message}`, logContext);
        }
        else {
            this.logger.log(`${method} ${url} - ${response.statusCode} ${response.code}: ${response.message}`, logContext);
        }
    }
    getHttpExceptionCode(statusCode) {
        const httpStatus = statusCode;
        switch (httpStatus) {
            case common_1.HttpStatus.BAD_REQUEST:
                return 'BAD_REQUEST';
            case common_1.HttpStatus.UNAUTHORIZED:
                return exception_constants_1.EXCEPTION_CODES.AUTH_UNAUTHORIZED;
            case common_1.HttpStatus.FORBIDDEN:
                return exception_constants_1.EXCEPTION_CODES.AUTH_FORBIDDEN;
            case common_1.HttpStatus.NOT_FOUND:
                return 'NOT_FOUND';
            case common_1.HttpStatus.CONFLICT:
                return 'CONFLICT';
            case common_1.HttpStatus.UNPROCESSABLE_ENTITY:
                return exception_constants_1.EXCEPTION_CODES.VALIDATION_ERROR;
            case common_1.HttpStatus.INTERNAL_SERVER_ERROR:
                return exception_constants_1.EXCEPTION_CODES.INTERNAL_SERVER_ERROR;
            case common_1.HttpStatus.SERVICE_UNAVAILABLE:
                return exception_constants_1.EXCEPTION_CODES.SERVICE_UNAVAILABLE;
            default:
                return 'HTTP_EXCEPTION';
        }
    }
    isPrismaError(exception) {
        return Boolean(exception &&
            typeof exception === 'object' &&
            'code' in exception &&
            ('clientVersion' in exception || 'meta' in exception));
    }
    handlePrismaError(exception, timestamp, path) {
        const prismaCode = exception.code;
        switch (prismaCode) {
            case 'P1001':
                return {
                    status: 'error',
                    message: 'Impossible de se connecter à la base de données',
                    code: exception_constants_1.EXCEPTION_CODES.DB_CONNECTION_ERROR,
                    statusCode: exception_constants_1.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
                    timestamp,
                    path,
                    details: { prismaCode, clientVersion: exception.clientVersion },
                };
            case 'P2002':
                return {
                    status: 'error',
                    message: "Violation de contrainte d'unicité",
                    code: exception_constants_1.EXCEPTION_CODES.DB_DUPLICATE_ENTRY,
                    statusCode: exception_constants_1.HTTP_STATUS_CODES.CONFLICT,
                    timestamp,
                    path,
                    details: { prismaCode, target: exception.meta?.target },
                };
            case 'P2025':
                return {
                    status: 'error',
                    message: 'Enregistrement non trouvé',
                    code: exception_constants_1.EXCEPTION_CODES.DB_RECORD_NOT_FOUND,
                    statusCode: exception_constants_1.HTTP_STATUS_CODES.NOT_FOUND,
                    timestamp,
                    path,
                    details: { prismaCode },
                };
            default:
                return {
                    status: 'error',
                    message: 'Erreur de base de données',
                    code: exception_constants_1.EXCEPTION_CODES.DB_QUERY_ERROR,
                    statusCode: exception_constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
                    timestamp,
                    path,
                    details: { prismaCode, message: exception.message },
                };
        }
    }
    isMicroserviceError(exception) {
        return (exception &&
            typeof exception === 'object' &&
            'code' in exception &&
            (exception.code === 'ECONNREFUSED' ||
                exception.message?.includes('ECONNREFUSED')));
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = GlobalExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);


/***/ }),

/***/ "./libs/exceptions/src/index.ts":
/*!**************************************!*\
  !*** ./libs/exceptions/src/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./filters/global-exception.filter */ "./libs/exceptions/src/filters/global-exception.filter.ts"), exports);
__exportStar(__webpack_require__(/*! ./exceptions/base.exception */ "./libs/exceptions/src/exceptions/base.exception.ts"), exports);
__exportStar(__webpack_require__(/*! ./exceptions/business.exception */ "./libs/exceptions/src/exceptions/business.exception.ts"), exports);
__exportStar(__webpack_require__(/*! ./exceptions/validation.exception */ "./libs/exceptions/src/exceptions/validation.exception.ts"), exports);
__exportStar(__webpack_require__(/*! ./exceptions/auth.exception */ "./libs/exceptions/src/exceptions/auth.exception.ts"), exports);
__exportStar(__webpack_require__(/*! ./exceptions/database.exception */ "./libs/exceptions/src/exceptions/database.exception.ts"), exports);
__exportStar(__webpack_require__(/*! ./throwers/exception.thrower */ "./libs/exceptions/src/throwers/exception.thrower.ts"), exports);
__exportStar(__webpack_require__(/*! ./interfaces/exception.interface */ "./libs/exceptions/src/interfaces/exception.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./constants/exception.constants */ "./libs/exceptions/src/constants/exception.constants.ts"), exports);
__exportStar(__webpack_require__(/*! ./exceptions.module */ "./libs/exceptions/src/exceptions.module.ts"), exports);


/***/ }),

/***/ "./libs/exceptions/src/interfaces/exception.interface.ts":
/*!***************************************************************!*\
  !*** ./libs/exceptions/src/interfaces/exception.interface.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/exceptions/src/throwers/exception.thrower.ts":
/*!***********************************************************!*\
  !*** ./libs/exceptions/src/throwers/exception.thrower.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExceptionThrower = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_exception_1 = __webpack_require__(/*! ../exceptions/auth.exception */ "./libs/exceptions/src/exceptions/auth.exception.ts");
const database_exception_1 = __webpack_require__(/*! ../exceptions/database.exception */ "./libs/exceptions/src/exceptions/database.exception.ts");
const business_exception_1 = __webpack_require__(/*! ../exceptions/business.exception */ "./libs/exceptions/src/exceptions/business.exception.ts");
const validation_exception_1 = __webpack_require__(/*! ../exceptions/validation.exception */ "./libs/exceptions/src/exceptions/validation.exception.ts");
const base_exception_1 = __webpack_require__(/*! ../exceptions/base.exception */ "./libs/exceptions/src/exceptions/base.exception.ts");
const exception_constants_1 = __webpack_require__(/*! ../constants/exception.constants */ "./libs/exceptions/src/constants/exception.constants.ts");
let ExceptionThrower = class ExceptionThrower {
    getRequestPath(request) {
        return request?.url || request?.path;
    }
    throwInvalidCredentials(details, request) {
        throw new auth_exception_1.InvalidCredentialsException(details, this.getRequestPath(request));
    }
    throwTokenExpired(details, request) {
        throw new auth_exception_1.TokenExpiredException(details, this.getRequestPath(request));
    }
    throwInvalidToken(details, request) {
        throw new auth_exception_1.InvalidTokenException(details, this.getRequestPath(request));
    }
    throwUnauthorized(details, request) {
        throw new auth_exception_1.UnauthorizedException(details, this.getRequestPath(request));
    }
    throwForbidden(details, request) {
        throw new auth_exception_1.ForbiddenException(details, this.getRequestPath(request));
    }
    throwUserNotFound(details, request) {
        throw new auth_exception_1.UserNotFoundException(details, this.getRequestPath(request));
    }
    throwEmailAlreadyExists(details, request) {
        throw new auth_exception_1.EmailAlreadyExistsException(details, this.getRequestPath(request));
    }
    throwGoogleTokenInvalid(details, request) {
        throw new auth_exception_1.GoogleTokenInvalidException(details, this.getRequestPath(request));
    }
    throwDatabaseConnection(details, request) {
        throw new database_exception_1.DatabaseConnectionException(details, this.getRequestPath(request));
    }
    throwDatabaseQuery(details, request) {
        throw new database_exception_1.DatabaseQueryException(details, this.getRequestPath(request));
    }
    throwRecordNotFound(details, request) {
        throw new database_exception_1.RecordNotFoundException(details, this.getRequestPath(request));
    }
    throwDuplicateEntry(details, request) {
        throw new database_exception_1.DuplicateEntryException(details, this.getRequestPath(request));
    }
    throwConstraintViolation(details, request) {
        throw new database_exception_1.ConstraintViolationException(details, this.getRequestPath(request));
    }
    throwBusinessRule(message, businessCode, context, request) {
        throw new business_exception_1.BusinessException(message, businessCode, exception_constants_1.HTTP_STATUS_CODES.BAD_REQUEST, context, this.getRequestPath(request));
    }
    throwInsufficientPermissions(details, request) {
        throw new business_exception_1.InsufficientPermissionsException(details, this.getRequestPath(request));
    }
    throwResourceNotAvailable(details, request) {
        throw new business_exception_1.ResourceNotAvailableException(details, this.getRequestPath(request));
    }
    throwValidation(message, validationErrors, request) {
        throw new validation_exception_1.ValidationException(message, validationErrors, this.getRequestPath(request));
    }
    throwRequiredField(fieldName, request) {
        throw new validation_exception_1.RequiredFieldException(fieldName, this.getRequestPath(request));
    }
    throwInvalidFormat(fieldName, expectedFormat, request) {
        throw new validation_exception_1.InvalidFormatException(fieldName, expectedFormat, this.getRequestPath(request));
    }
    throwGeneric(message, statusCode, code, details, request) {
        class GenericException extends base_exception_1.BaseException {
        }
        throw new GenericException(message, statusCode, code, details, this.getRequestPath(request));
    }
    throwMicroserviceConnection(serviceName, details, request) {
        class MicroserviceException extends base_exception_1.BaseException {
        }
        throw new MicroserviceException(`Impossible de contacter le service ${serviceName}`, exception_constants_1.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE, exception_constants_1.EXCEPTION_CODES.MICROSERVICE_CONNECTION_ERROR, { serviceName, ...details }, this.getRequestPath(request));
    }
    throwInternalError(message = 'Erreur interne du serveur', details, request) {
        class InternalException extends base_exception_1.BaseException {
        }
        throw new InternalException(message, exception_constants_1.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, exception_constants_1.EXCEPTION_CODES.INTERNAL_SERVER_ERROR, details, this.getRequestPath(request));
    }
};
exports.ExceptionThrower = ExceptionThrower;
exports.ExceptionThrower = ExceptionThrower = __decorate([
    (0, common_1.Injectable)()
], ExceptionThrower);


/***/ }),

/***/ "./libs/logger/src/decorators/log.decorator.ts":
/*!*****************************************************!*\
  !*** ./libs/logger/src/decorators/log.decorator.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Log = Log;
const logger_service_1 = __webpack_require__(/*! ../logger.service */ "./libs/logger/src/logger.service.ts");
function Log(message, logLevel = 'info') {
    return function (target, propertyName, descriptor) {
        const originalMethod = descriptor.value;
        function loggedMethod(...args) {
            const logger = new logger_service_1.LoggerService();
            logger.setContext(`${String(target.constructor.name).replaceAll('Controller', '').toUpperCase()}.${propertyName}`);
            const startTime = Date.now();
            const logMessage = message ?? `Executing ${propertyName}`;
            logger[logLevel](logMessage, {
                method: propertyName,
                args: args.length > 0 ? 'provided' : 'none',
            });
            const logCompletion = (result, error) => {
                const duration = Date.now() - startTime;
                if (error) {
                    logger.error(`Failed ${propertyName}`, error.stack, {
                        method: propertyName,
                        duration: `${duration}ms`,
                        success: false,
                        error: error.message,
                    });
                }
                else {
                    logger.info(`Completed ${propertyName}`, {
                        method: propertyName,
                        duration: `${duration}ms`,
                        success: true,
                    });
                }
            };
            try {
                const result = originalMethod.apply(this, args);
                if (result && typeof result.then === 'function') {
                    return result
                        .then((res) => {
                        logCompletion(res);
                        return res;
                    })
                        .catch((error) => {
                        logCompletion(null, error);
                        throw error;
                    });
                }
                else {
                    logCompletion(result);
                    return result;
                }
            }
            catch (error) {
                logCompletion(null, error);
                throw error;
            }
        }
        Object.defineProperty(loggedMethod, 'name', {
            value: originalMethod.name,
            configurable: true,
        });
        Object.defineProperty(loggedMethod, 'length', {
            value: originalMethod.length,
            configurable: true,
        });
        if (typeof Reflect !== 'undefined' && Reflect.getMetadataKeys) {
            const metadataKeys = Reflect.getMetadataKeys(originalMethod) || [];
            metadataKeys.forEach(key => {
                const metadata = Reflect.getMetadata(key, originalMethod);
                Reflect.defineMetadata(key, metadata, loggedMethod);
            });
        }
        descriptor.value = loggedMethod;
        return descriptor;
    };
}


/***/ }),

/***/ "./libs/logger/src/index.ts":
/*!**********************************!*\
  !*** ./libs/logger/src/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./logger.service */ "./libs/logger/src/logger.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./logger.module */ "./libs/logger/src/logger.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./decorators/log.decorator */ "./libs/logger/src/decorators/log.decorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./interceptors/logging.interceptor */ "./libs/logger/src/interceptors/logging.interceptor.ts"), exports);


/***/ }),

/***/ "./libs/logger/src/interceptors/logging.interceptor.ts":
/*!*************************************************************!*\
  !*** ./libs/logger/src/interceptors/logging.interceptor.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const logger_service_1 = __webpack_require__(/*! ../logger.service */ "./libs/logger/src/logger.service.ts");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let LoggingInterceptor = class LoggingInterceptor {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const { method, url, headers, body } = request;
        const userAgent = headers['user-agent'] || '';
        const contentLength = headers['content-length'] || '0';
        const requestId = this.generateRequestId();
        request['requestId'] = requestId;
        this.logger.logRequest(method, url, undefined, requestId);
        const startTime = Date.now();
        return next.handle().pipe((0, operators_1.tap)(data => {
            const duration = Date.now() - startTime;
            this.logger.logResponse(method, url, response.statusCode, duration, undefined, requestId);
        }), (0, operators_1.catchError)(error => {
            const duration = Date.now() - startTime;
            this.logger.error(`Request failed: ${method} ${url}`, error.stack, {
                method: 'HTTP_ERROR',
                url,
                statusCode: error.status || 500,
                duration: `${duration}ms`,
                requestId,
                error: error.message,
            });
            return (0, rxjs_1.throwError)(() => error);
        }));
    }
    generateRequestId() {
        return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof logger_service_1.LoggerService !== "undefined" && logger_service_1.LoggerService) === "function" ? _a : Object])
], LoggingInterceptor);


/***/ }),

/***/ "./libs/logger/src/logger.module.ts":
/*!******************************************!*\
  !*** ./libs/logger/src/logger.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const logger_service_1 = __webpack_require__(/*! ./logger.service */ "./libs/logger/src/logger.service.ts");
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [logger_service_1.LoggerService],
        exports: [logger_service_1.LoggerService],
    })
], LoggerModule);


/***/ }),

/***/ "./libs/logger/src/logger.service.ts":
/*!*******************************************!*\
  !*** ./libs/logger/src/logger.service.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let LoggerService = class LoggerService {
    serviceName = 'Unknown';
    isProduction = process.env.NODE_ENV === 'production';
    colors = {
        reset: '\x1b[0m',
        bright: '\x1b[1m',
        dim: '\x1b[2m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        bgRed: '\x1b[41m',
        bgGreen: '\x1b[42m',
        bgYellow: '\x1b[43m',
        bgBlue: '\x1b[44m',
        gray: '\x1b[90m',
    };
    constructor() {
    }
    setContext(serviceName) {
        this.serviceName = serviceName;
    }
    getColorForLevel(level) {
        if (this.isProduction) {
            return '';
        }
        switch (level) {
            case 'error':
                return this.colors.red;
            case 'warn':
                return this.colors.yellow;
            case 'log':
                return this.colors.blue;
            case 'debug':
                return this.colors.cyan;
            case 'verbose':
                return this.colors.magenta;
            default:
                return this.colors.white;
        }
    }
    formatMessage(level, message, context, trace) {
        return {
            level,
            message,
            context: {
                service: this.serviceName,
                ...context,
            },
            timestamp: new Date().toISOString(),
            trace,
        };
    }
    output(logEntry) {
        const { level, message, context, timestamp, trace } = logEntry;
        if (this.isProduction) {
            console.log(JSON.stringify(logEntry));
        }
        else {
            const contextStr = context ? JSON.stringify(context, null, 2) : '';
            const color = this.getColorForLevel(level);
            const reset = this.colors.reset;
            const timeStr = `${this.colors.gray}[${timestamp}]${reset}`;
            const levelStr = `${color}[${level.toUpperCase()}]${reset}`;
            const serviceStr = `${this.colors.bright}${this.colors.green}[${this.serviceName}]${reset}`;
            const coloredMessage = `${color}${message}${reset}`;
            console.log(`${timeStr} ${levelStr} ${serviceStr} ${coloredMessage}`);
            if (contextStr && context && Object.keys(context).length > 1) {
                console.log(`${this.colors.dim}${this.colors.cyan}Context: ${contextStr}${reset}`);
            }
            if (trace) {
                console.log(`${this.colors.red}Trace: ${trace}${reset}`);
            }
        }
    }
    log(message, context) {
        this.output(this.formatMessage('log', message, context));
    }
    info(message, context) {
        this.output(this.formatMessage('log', message, context));
    }
    warn(message, context) {
        this.output(this.formatMessage('warn', message, context));
    }
    error(message, trace, context) {
        this.output(this.formatMessage('error', message, context, trace));
    }
    debug(message, context) {
        if (!this.isProduction) {
            this.output(this.formatMessage('debug', message, context));
        }
    }
    verbose(message, context) {
        if (!this.isProduction) {
            this.output(this.formatMessage('verbose', message, context));
        }
    }
    logRequest(method, url, userId, requestId) {
        this.info(`Incoming ${method} request`, {
            method: 'HTTP_REQUEST',
            url,
            userId,
            requestId,
        });
    }
    logResponse(method, url, statusCode, duration, userId, requestId) {
        this.info(`Response ${method} ${statusCode}`, {
            method: 'HTTP_RESPONSE',
            url,
            statusCode,
            duration: `${duration}ms`,
            userId,
            requestId,
        });
    }
    logDatabaseQuery(query, duration, context) {
        this.debug('Database query executed', {
            method: 'DATABASE_QUERY',
            query,
            duration: `${duration}ms`,
            ...context,
        });
    }
    logBusinessLogic(action, result, context) {
        this.info(`Business logic: ${action}`, {
            method: 'BUSINESS_LOGIC',
            action,
            result,
            ...context,
        });
    }
    logExternal(service, action, success, duration, context) {
        const level = success ? 'log' : 'warn';
        const message = `External service ${service}: ${action} ${success ? 'succeeded' : 'failed'}`;
        this.output(this.formatMessage(level, message, {
            method: 'EXTERNAL_SERVICE',
            service,
            action,
            success,
            duration: duration ? `${duration}ms` : undefined,
            ...context,
        }));
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggerService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "google-auth-library":
/*!**************************************!*\
  !*** external "google-auth-library" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("google-auth-library");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***************************************!*\
  !*** ./apps/auth-service/src/main.ts ***!
  \***************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/auth-service/src/app.module.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: process.env.AUTH_SERVICE_HOST ?? 'localhost',
            port: parseInt(process.env.AUTH_SERVICE_PORT ?? '4002'),
        },
    });
    app.useGlobalFilters(app.get(exceptions_1.GlobalExceptionFilter));
    const logger = app.get(src_1.LoggerService);
    logger.setContext('Auth.main');
    logger.info(`🌐 Auth Service is running on port ${process.env.AUTH_SERVICE_PORT}`);
    await app.listen();
}
void bootstrap();

})();

/******/ })()
;