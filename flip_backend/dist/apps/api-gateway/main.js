/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api-gateway/src/api-gateway.module.ts":
/*!****************************************************!*\
  !*** ./apps/api-gateway/src/api-gateway.module.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiGatewayModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @app/config */ "./libs/config/src/index.ts");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./apps/api-gateway/src/auth/auth.module.ts");
const friendships_module_1 = __webpack_require__(/*! ./friendships/friendships.module */ "./apps/api-gateway/src/friendships/friendships.module.ts");
const microservices_module_1 = __webpack_require__(/*! ./microservices/microservices.module */ "./apps/api-gateway/src/microservices/microservices.module.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
let ApiGatewayModule = class ApiGatewayModule {
};
exports.ApiGatewayModule = ApiGatewayModule;
exports.ApiGatewayModule = ApiGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.GlobalConfigModule,
            src_1.LoggerModule,
            microservices_module_1.MicroservicesModule,
            auth_module_1.AuthModule,
            friendships_module_1.FriendshipsModule,
            exceptions_1.ExceptionsModule,
        ],
        controllers: [],
        providers: [],
    })
], ApiGatewayModule);


/***/ }),

/***/ "./apps/api-gateway/src/auth/auth.controller.ts":
/*!******************************************************!*\
  !*** ./apps/api-gateway/src/auth/auth.controller.ts ***!
  \******************************************************/
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
var AuthController_1;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const express_1 = __webpack_require__(/*! express */ "express");
const user_dto_1 = __webpack_require__(/*! libs/contracts/src/User/dtos/user.dto */ "./libs/contracts/src/User/dtos/user.dto.ts");
const auth_dto_1 = __webpack_require__(/*! @app/contracts/Auth/dto/auth.dto */ "./libs/contracts/src/Auth/dto/auth.dto.ts");
const auth_decorator_1 = __webpack_require__(/*! ./decorators/auth.decorator */ "./apps/api-gateway/src/auth/decorators/auth.decorator.ts");
const current_user_decorator_1 = __webpack_require__(/*! ./decorators/current-user.decorator */ "./apps/api-gateway/src/auth/decorators/current-user.decorator.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const config_1 = __webpack_require__(/*! @app/config */ "./libs/config/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
let AuthController = AuthController_1 = class AuthController {
    authClient;
    globalConfig;
    thrower;
    logger = new common_1.Logger(AuthController_1.name);
    constructor(authClient, globalConfig, thrower) {
        this.authClient = authClient;
        this.globalConfig = globalConfig;
        this.thrower = thrower;
    }
    async register(createUserDto) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.authClient.send({ cmd: 'register_user' }, createUserDto).pipe((0, rxjs_1.catchError)(error => {
                this.handleMicroserviceError(error, 'auth-service');
                return (0, rxjs_1.throwError)(() => error);
            })));
        }
        catch (error) {
            this.handleMicroserviceError(error, 'auth-service');
        }
    }
    async login(loginDto) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.authClient.send({ cmd: 'login_user' }, loginDto).pipe((0, rxjs_1.catchError)(error => {
                this.handleMicroserviceError(error, 'auth-service');
                return (0, rxjs_1.throwError)(() => error);
            })));
        }
        catch (error) {
            this.handleMicroserviceError(error, 'auth-service');
        }
    }
    async googleAuth() {
    }
    async googleCallback(req, res) {
        try {
            const googleUser = req.user;
            const authResult = await (0, rxjs_1.firstValueFrom)(this.authClient.send({ cmd: 'google_login' }, googleUser).pipe((0, rxjs_1.catchError)(error => {
                this.handleMicroserviceError(error, 'auth-service');
                return (0, rxjs_1.throwError)(() => error);
            })));
            if (!authResult?.access_token ||
                !authResult.access_token ||
                !authResult.refresh_token ||
                !authResult.user) {
                this.logger.error('Google OAuth - Incomplete auth result from auth service', authResult);
                return res.redirect(`${this.globalConfig.app.frontendUrl}/auth/error?error=internal_auth_error`);
            }
            const userJson = encodeURIComponent(JSON.stringify(authResult.user));
            const queryParams = [
                `access_token=${authResult.access_token}`,
                `refresh_token=${authResult.refresh_token}`,
            ];
            if (authResult.expires_in) {
                queryParams.push(`expires_in=${authResult.expires_in}`);
            }
            queryParams.push(`user=${userJson}`);
            const redirectUrl = `${this.globalConfig.app.frontendUrl}/auth/success?${queryParams.join('&')}`;
            res.redirect(redirectUrl);
        }
        catch (error) {
            this.logger.error('Erreur Google OAuth:', error);
            res.redirect(`${this.globalConfig.app.frontendUrl}/auth/error?error=internal_error`);
        }
    }
    async verifyGoogleIdToken(payload) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.authClient
                .send({ cmd: 'google_verify_id_token' }, payload.idToken)
                .pipe((0, rxjs_1.catchError)(error => {
                this.handleMicroserviceError(error, 'auth-service');
                return (0, rxjs_1.throwError)(() => error);
            })));
        }
        catch (error) {
            this.handleMicroserviceError(error, 'auth-service');
        }
    }
    async validateToken(payload) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.authClient
                .send({ cmd: 'validate_token' }, payload.token)
                .pipe((0, rxjs_1.catchError)(error => {
                this.handleMicroserviceError(error, 'auth-service');
                return (0, rxjs_1.throwError)(() => error);
            })));
        }
        catch (error) {
            this.handleMicroserviceError(error, 'auth-service');
        }
    }
    async refresh(payload) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.authClient
                .send({ cmd: 'refresh_token' }, payload.refreshToken)
                .pipe((0, rxjs_1.catchError)(error => {
                this.handleMicroserviceError(error, 'auth-service');
                return (0, rxjs_1.throwError)(() => error);
            })));
        }
        catch (error) {
            this.handleMicroserviceError(error, 'auth-service');
        }
    }
    logout(_userId) {
        return {
            message: 'Déconnexion réussie',
            success: true,
        };
    }
    checkAuth() {
        return { authenticated: true };
    }
    handleMicroserviceError(error, serviceName) {
        this.logger.error(`Erreur communication avec ${serviceName}:`, error);
        if (error?.code === 'ECONNREFUSED' || error?.message?.includes('ECONNREFUSED')) {
            this.thrower.throwMicroserviceConnection(serviceName, { originalError: error.message });
        }
        if (error?.status === 'error') {
            switch (error.code) {
                case 'AUTH_INVALID_CREDENTIALS':
                    this.thrower.throwInvalidCredentials({ microservice: serviceName });
                    break;
                case 'AUTH_USER_NOT_FOUND':
                    this.thrower.throwUserNotFound({ microservice: serviceName });
                    break;
                case 'AUTH_EMAIL_ALREADY_EXISTS':
                    this.thrower.throwEmailAlreadyExists({ microservice: serviceName });
                    break;
                case 'AUTH_GOOGLE_TOKEN_INVALID':
                    this.thrower.throwGoogleTokenInvalid({ microservice: serviceName });
                    break;
                case 'AUTH_TOKEN_INVALID':
                    this.thrower.throwInvalidToken({ microservice: serviceName });
                    break;
                case 'AUTH_TOKEN_EXPIRED':
                    this.thrower.throwTokenExpired({ microservice: serviceName });
                    break;
                default:
                    this.thrower.throwInternalError(error.message ?? "Erreur du service d'authentification", {
                        microservice: serviceName,
                        originalError: error,
                    });
            }
        }
        this.thrower.throwInternalError('Erreur interne du service', {
            microservice: serviceName,
            originalError: error,
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau compte utilisateur' }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Utilisateur créé avec succès',
        type: auth_dto_1.AuthResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email déjà utilisé' }),
    (0, auth_decorator_1.OptionalAuth)(),
    (0, src_1.Log)("Création d'un nouveau compte utilisateur", 'info'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Authentifier un utilisateur' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Connexion réussie avec tokens JWT',
        type: auth_dto_1.AuthResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Identifiants incorrects' }),
    (0, auth_decorator_1.OptionalAuth)(),
    (0, src_1.Log)('Authentification utilisateur', 'info'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof auth_dto_1.LoginDto !== "undefined" && auth_dto_1.LoginDto) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, swagger_1.ApiOperation)({
        summary: "Initier l'authentification Google OAuth 2.0",
        description: "Redirige automatiquement vers Google pour l'authentification.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 302,
        description: 'Redirection vers Google OAuth',
    }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, auth_decorator_1.OptionalAuth)(),
    (0, src_1.Log)('Authentification Google OAuth', 'info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, swagger_1.ApiOperation)({
        summary: 'Callback Google OAuth',
        description: 'Traite le retour de Google OAuth et redirige vers le frontend avec les tokens',
    }),
    (0, swagger_1.ApiResponse)({
        status: 302,
        description: 'Redirection vers le frontend avec tokens',
    }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    (0, auth_decorator_1.OptionalAuth)(),
    (0, src_1.Log)('Callback Google OAuth', 'info'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_j = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], AuthController.prototype, "googleCallback", null);
__decorate([
    (0, common_1.Post)('google/verify-id-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Vérifier un Google ID Token',
        description: "Vérifie un Google ID Token et retourne les tokens d'authentification de l'application",
    }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.VerifyGoogleIdTokenDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Token vérifié avec succès',
        type: auth_dto_1.AuthResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token Google invalide' }),
    (0, auth_decorator_1.OptionalAuth)(),
    (0, src_1.Log)('Vérification Google ID Token', 'info'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof auth_dto_1.VerifyGoogleIdTokenDto !== "undefined" && auth_dto_1.VerifyGoogleIdTokenDto) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], AuthController.prototype, "verifyGoogleIdToken", null);
__decorate([
    (0, common_1.Post)('validate-token'),
    (0, swagger_1.ApiOperation)({ summary: 'Valider un token JWT' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.TokenValidationDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Token valide',
        schema: {
            properties: {
                valid: { type: 'boolean' },
                user: { type: 'object' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token invalide' }),
    (0, src_1.Log)('Validation du token', 'info'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof auth_dto_1.TokenValidationDto !== "undefined" && auth_dto_1.TokenValidationDto) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], AuthController.prototype, "validateToken", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiOperation)({ summary: 'Renouveler un token JWT' }),
    (0, swagger_1.ApiBody)({ type: auth_dto_1.RefreshTokenDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Nouveau token généré',
        type: auth_dto_1.RefreshTokenResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token de refresh invalide' }),
    (0, src_1.Log)('Renouvellement du token', 'info'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof auth_dto_1.RefreshTokenDto !== "undefined" && auth_dto_1.RefreshTokenDto) === "function" ? _q : Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiOperation)({ summary: "Déconnecter l'utilisateur" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Déconnexion réussie',
        schema: {
            properties: {
                message: { type: 'string' },
                success: { type: 'boolean' },
            },
        },
    }),
    (0, auth_decorator_1.Auth)(),
    (0, src_1.Log)('Déconnexion réussie', 'info'),
    __param(0, (0, current_user_decorator_1.GetUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('check'),
    (0, swagger_1.ApiOperation)({ summary: "Vérifier le statut d'authentification" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Statut d'authentification",
        schema: {
            properties: {
                authenticated: { type: 'boolean' },
                user: { type: 'object', nullable: true },
            },
        },
    }),
    (0, auth_decorator_1.Auth)(),
    (0, src_1.Log)("Vérification du statut d'authentification", 'info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AuthController.prototype, "checkAuth", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof config_1.GlobalConfigService !== "undefined" && config_1.GlobalConfigService) === "function" ? _b : Object, typeof (_c = typeof exceptions_1.ExceptionThrower !== "undefined" && exceptions_1.ExceptionThrower) === "function" ? _c : Object])
], AuthController);


/***/ }),

/***/ "./apps/api-gateway/src/auth/auth.module.ts":
/*!**************************************************!*\
  !*** ./apps/api-gateway/src/auth/auth.module.ts ***!
  \**************************************************/
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
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/api-gateway/src/auth/auth.controller.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ./guards/jwt-auth.guard */ "./apps/api-gateway/src/auth/guards/jwt-auth.guard.ts");
const google_strategy_1 = __webpack_require__(/*! ./strategies/google.strategy */ "./apps/api-gateway/src/auth/strategies/google.strategy.ts");
const microservices_module_1 = __webpack_require__(/*! ../microservices/microservices.module */ "./apps/api-gateway/src/microservices/microservices.module.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [passport_1.PassportModule, microservices_module_1.MicroservicesModule, exceptions_1.ExceptionsModule],
        controllers: [auth_controller_1.AuthController],
        providers: [jwt_auth_guard_1.JwtAuthGuard, google_strategy_1.GoogleStrategy],
        exports: [jwt_auth_guard_1.JwtAuthGuard],
    })
], AuthModule);


/***/ }),

/***/ "./apps/api-gateway/src/auth/decorators/auth.decorator.ts":
/*!****************************************************************!*\
  !*** ./apps/api-gateway/src/auth/decorators/auth.decorator.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth = Auth;
exports.OptionalAuth = OptionalAuth;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const jwt_auth_guard_1 = __webpack_require__(/*! ../guards/jwt-auth.guard */ "./apps/api-gateway/src/auth/guards/jwt-auth.guard.ts");
function Auth() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiUnauthorizedResponse)({
        description: "Token d'authentification invalide ou manquant",
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 401 },
                message: { type: 'string', example: "Token d'authentification manquant" },
                error: { type: 'string', example: 'Unauthorized' },
            },
        },
    }));
}
function OptionalAuth() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiUnauthorizedResponse)({
        description: "Token d'authentification invalide (optionnel)",
    }));
}


/***/ }),

/***/ "./apps/api-gateway/src/auth/decorators/current-user.decorator.ts":
/*!************************************************************************!*\
  !*** ./apps/api-gateway/src/auth/decorators/current-user.decorator.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUserName = exports.GetUserId = exports.CurrentUser = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
exports.GetUserId = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.id;
});
exports.GetUserName = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.username ?? request.user?.firstName;
});


/***/ }),

/***/ "./apps/api-gateway/src/auth/guards/jwt-auth.guard.ts":
/*!************************************************************!*\
  !*** ./apps/api-gateway/src/auth/guards/jwt-auth.guard.ts ***!
  \************************************************************/
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
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let JwtAuthGuard = class JwtAuthGuard {
    authClient;
    constructor(authClient) {
        this.authClient = authClient;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new common_1.UnauthorizedException("Token d'authentification manquant");
        }
        const token = authHeader.replace('Bearer ', '');
        try {
            const validation = await (0, rxjs_1.firstValueFrom)(this.authClient.send({ cmd: 'validate_token' }, token));
            if (!validation.valid || !validation.user) {
                throw new common_1.UnauthorizedException(validation.error ?? 'Token invalide');
            }
            request.user = validation.user;
            return true;
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Erreur de validation du token');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ }),

/***/ "./apps/api-gateway/src/auth/interceptors/user-enrichment.interceptor.ts":
/*!*******************************************************************************!*\
  !*** ./apps/api-gateway/src/auth/interceptors/user-enrichment.interceptor.ts ***!
  \*******************************************************************************/
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
exports.UserEnrichmentInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
let UserEnrichmentInterceptor = class UserEnrichmentInterceptor {
    userClient;
    logger = new src_1.LoggerService();
    constructor(userClient) {
        this.userClient = userClient;
        this.logger.setContext('USER_ENRICHMENT_INTERCEPTOR');
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        if (request.user?.id && !request.user.enriched) {
            try {
                const completeUser = await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'find_user_by_id' }, request.user.id));
                request.user = {
                    ...request.user,
                    ...completeUser,
                    enriched: true,
                };
            }
            catch (error) {
                this.logger.error("Erreur lors de l'enrichissement de l'utilisateur", error);
            }
        }
        return next.handle().pipe((0, operators_1.tap)(() => {
        }));
    }
};
exports.UserEnrichmentInterceptor = UserEnrichmentInterceptor;
exports.UserEnrichmentInterceptor = UserEnrichmentInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], UserEnrichmentInterceptor);


/***/ }),

/***/ "./apps/api-gateway/src/auth/strategies/google.strategy.ts":
/*!*****************************************************************!*\
  !*** ./apps/api-gateway/src/auth/strategies/google.strategy.ts ***!
  \*****************************************************************/
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_google_oauth20_1 = __webpack_require__(/*! passport-google-oauth20 */ "passport-google-oauth20");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const config_1 = __webpack_require__(/*! @app/config */ "./libs/config/src/index.ts");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    authClient;
    globalConfig;
    constructor(authClient, globalConfig) {
        const googleConfig = globalConfig.google;
        const options = {
            clientID: googleConfig.clientId,
            clientSecret: googleConfig.clientSecret,
            callbackURL: googleConfig.callbackUrl,
            scope: ['email', 'profile'],
        };
        console.log('🔍 Google OAuth Configuration:', {
            clientID: options.clientID,
            callbackURL: options.callbackURL,
            hasClientSecret: !!options.clientSecret,
            scope: options.scope,
        });
        super(options);
        this.authClient = authClient;
        this.globalConfig = globalConfig;
    }
    async validate(accessToken, refreshToken, profile, done) {
        try {
            const googleUser = {
                email: profile.emails[0].value,
                firstName: profile.name.givenName ?? '',
                lastName: profile.name.familyName ?? '',
                picture: profile.photos[0]?.value ?? '',
                accessToken,
                refreshToken,
                googleId: profile.id,
            };
            const user = await (0, rxjs_1.firstValueFrom)(this.authClient.send({ cmd: 'validate_google_user' }, googleUser));
            done(null, user);
        }
        catch (error) {
            done(error, false);
        }
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof config_1.GlobalConfigService !== "undefined" && config_1.GlobalConfigService) === "function" ? _b : Object])
], GoogleStrategy);


/***/ }),

/***/ "./apps/api-gateway/src/friendships/friendships.controller.ts":
/*!********************************************************************!*\
  !*** ./apps/api-gateway/src/friendships/friendships.controller.ts ***!
  \********************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendshipsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const jwt_auth_guard_1 = __webpack_require__(/*! ../auth/guards/jwt-auth.guard */ "./apps/api-gateway/src/auth/guards/jwt-auth.guard.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const friendship_dto_1 = __webpack_require__(/*! @app/contracts/Friendship/dtos/friendship.dto */ "./libs/contracts/src/Friendship/dtos/friendship.dto.ts");
const current_user_decorator_1 = __webpack_require__(/*! ../auth/decorators/current-user.decorator */ "./apps/api-gateway/src/auth/decorators/current-user.decorator.ts");
const auth_interface_1 = __webpack_require__(/*! @app/contracts/Auth/interfaces/auth.interface */ "./libs/contracts/src/Auth/interfaces/auth.interface.ts");
let FriendshipsController = class FriendshipsController {
    userService;
    logger;
    exceptionThrower;
    constructor(userService, logger, exceptionThrower) {
        this.userService = userService;
        this.logger = logger;
        this.exceptionThrower = exceptionThrower;
        this.logger.setContext('FRIENDSHIPS.controller');
    }
    async sendFriendshipRequest(user, createFriendshipDto) {
        this.logger.info('Envoi demande amitié', {
            userId: user.id,
            targetId: createFriendshipDto.user_two_id,
        });
        try {
            const result = await this.userService
                .send({ cmd: 'create_friendship_request' }, { userId: user.id, createFriendshipDto })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(error => {
                this.logger.error('Erreur envoi demande amitié', error.message);
                return this.handleMicroserviceError(error);
            }))
                .toPromise();
            this.logger.info('Demande amitié envoyée avec succès', {
                userId: user.id,
                friendshipId: result.friendship_id,
            });
            return result;
        }
        catch (error) {
            this.logger.error("Erreur lors de l'envoi de la demande", error.message);
            throw error;
        }
    }
    async acceptFriendshipRequest(user, acceptFriendshipDto) {
        this.logger.info('Acceptation demande amitié', {
            userId: user.id,
            friendshipId: acceptFriendshipDto.friendship_id,
        });
        try {
            const result = await this.userService
                .send({ cmd: 'accept_friendship_request' }, { userId: user.id, acceptFriendshipDto })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(error => {
                this.logger.error('Erreur acceptation demande', error.message);
                return this.handleMicroserviceError(error);
            }))
                .toPromise();
            this.logger.info('Demande acceptée avec succès', {
                userId: user.id,
                friendshipId: acceptFriendshipDto.friendship_id,
            });
            return result;
        }
        catch (error) {
            this.logger.error("Erreur lors de l'acceptation", error.message);
            throw error;
        }
    }
    async declineFriendshipRequest(user, declineFriendshipDto) {
        this.logger.info('Refus demande amitié', {
            userId: user.id,
            friendshipId: declineFriendshipDto.friendship_id,
        });
        try {
            const result = await this.userService
                .send({ cmd: 'decline_friendship_request' }, { userId: user.id, declineFriendshipDto })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(error => {
                this.logger.error('Erreur refus demande', error.message);
                return this.handleMicroserviceError(error);
            }))
                .toPromise();
            this.logger.info('Demande refusée avec succès', {
                userId: user.id,
                friendshipId: declineFriendshipDto.friendship_id,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur lors du refus', error.message);
            throw error;
        }
    }
    async getUserFriends(user, page = 1, limit = 20) {
        this.logger.info('Récupération amis utilisateur', {
            userId: user.id,
            page,
            limit,
        });
        try {
            const result = await this.userService
                .send({ cmd: 'get_user_friends' }, { userId: user.id, page, limit })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(error => {
                this.logger.error('Erreur récupération amis', error.message);
                return this.handleMicroserviceError(error);
            }))
                .toPromise();
            this.logger.info('Amis récupérés avec succès', {
                userId: user.id,
                friendsCount: result.length,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur lors de la récupération des amis', error.message);
            throw error;
        }
    }
    async removeFriend(user, friendId) {
        this.logger.info('Suppression ami', {
            userId: user.id,
            friendId,
        });
        try {
            const result = await this.userService
                .send({ cmd: 'remove_friend' }, { userId: user.id, friendId })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(error => {
                this.logger.error('Erreur suppression ami', error.message);
                return this.handleMicroserviceError(error);
            }))
                .toPromise();
            this.logger.info('Ami supprimé avec succès', {
                userId: user.id,
                friendId,
            });
            return result;
        }
        catch (error) {
            this.logger.error("Erreur lors de la suppression de l'ami", error.message);
            throw error;
        }
    }
    async getReceivedFriendshipRequests(user, page = 1, limit = 20) {
        this.logger.info('Récupération demandes reçues', {
            userId: user.id,
            page,
            limit,
        });
        try {
            const result = await this.userService
                .send({ cmd: 'get_received_friendship_requests' }, { userId: user.id, page, limit })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(error => {
                this.logger.error('Erreur récupération demandes reçues', error.message);
                return this.handleMicroserviceError(error);
            }))
                .toPromise();
            this.logger.info('Demandes reçues récupérées avec succès', {
                userId: user.id,
                requestsCount: result.length,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur lors de la récupération des demandes reçues', error.message);
            throw error;
        }
    }
    async getSentFriendshipRequests(user, page = 1, limit = 20) {
        this.logger.info('Récupération demandes envoyées', {
            userId: user.id,
            page,
            limit,
        });
        try {
            const result = await this.userService
                .send({ cmd: 'get_sent_friendship_requests' }, { userId: user.id, page, limit })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(error => {
                this.logger.error('Erreur récupération demandes envoyées', error.message);
                return this.handleMicroserviceError(error);
            }))
                .toPromise();
            this.logger.info('Demandes envoyées récupérées avec succès', {
                userId: user.id,
                requestsCount: result.length,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur lors de la récupération des demandes envoyées', error.message);
            throw error;
        }
    }
    async blockUser(user, blockUserDto) {
        this.logger.info('Blocage utilisateur', {
            userId: user.id,
            targetId: blockUserDto.user_id,
        });
        try {
            const result = await this.userService
                .send({ cmd: 'block_user' }, { userId: user.id, blockUserDto })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(error => {
                this.logger.error('Erreur blocage utilisateur', error.message);
                return this.handleMicroserviceError(error);
            }))
                .toPromise();
            this.logger.info('Utilisateur bloqué avec succès', {
                userId: user.id,
                targetId: blockUserDto.user_id,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur lors du blocage', error.message);
            throw error;
        }
    }
    async unblockUser(user, unblockUserDto) {
        this.logger.info('Déblocage utilisateur', {
            userId: user.id,
            targetId: unblockUserDto.user_id,
        });
        try {
            const result = await this.userService
                .send({ cmd: 'unblock_user' }, { userId: user.id, unblockUserDto })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(error => {
                this.logger.error('Erreur déblocage utilisateur', error.message);
                return this.handleMicroserviceError(error);
            }))
                .toPromise();
            this.logger.info('Utilisateur débloqué avec succès', {
                userId: user.id,
                targetId: unblockUserDto.user_id,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur lors du déblocage', error.message);
            throw error;
        }
    }
    async getFriendshipStats(user) {
        this.logger.info('Récupération stats amitié', {
            userId: user.id,
        });
        try {
            const result = await this.userService
                .send({ cmd: 'get_friendship_stats' }, user.id)
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(error => {
                this.logger.error('Erreur récupération stats', error.message);
                return this.handleMicroserviceError(error);
            }))
                .toPromise();
            this.logger.info('Stats récupérées avec succès', {
                userId: user.id,
                totalFriends: result.total_friends,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur lors de la récupération des stats', error.message);
            throw error;
        }
    }
    async getMutualFriends(user, otherUserId) {
        this.logger.info('Récupération amis en commun', {
            userId: user.id,
            otherUserId,
        });
        try {
            const result = await this.userService
                .send({ cmd: 'get_mutual_friends' }, { userId: user.id, otherUserId })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(error => {
                this.logger.error('Erreur récupération amis en commun', error.message);
                return this.handleMicroserviceError(error);
            }))
                .toPromise();
            this.logger.info('Amis en commun récupérés avec succès', {
                userId: user.id,
                otherUserId,
                mutualCount: result.length,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur lors de la récupération des amis en commun', error.message);
            throw error;
        }
    }
    async getFriendshipSuggestions(user, limit = 10) {
        this.logger.info('Récupération suggestions amitié', {
            userId: user.id,
            limit,
        });
        try {
            const result = await this.userService
                .send({ cmd: 'get_friendship_suggestions' }, { userId: user.id, limit })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(error => {
                this.logger.error('Erreur récupération suggestions', error.message);
                return this.handleMicroserviceError(error);
            }))
                .toPromise();
            this.logger.info('Suggestions récupérées avec succès', {
                userId: user.id,
                suggestionsCount: result.length,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur lors de la récupération des suggestions', error.message);
            throw error;
        }
    }
    async getFriendshipStatus(user, otherUserId) {
        this.logger.info('Vérification statut amitié', {
            userId: user.id,
            otherUserId,
        });
        try {
            const result = await this.userService
                .send({ cmd: 'get_friendship_status' }, { userId: user.id, otherUserId })
                .pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)(error => {
                this.logger.error('Erreur vérification statut', error.message);
                return this.handleMicroserviceError(error);
            }))
                .toPromise();
            this.logger.info('Statut vérifié avec succès', {
                userId: user.id,
                otherUserId,
                status: result.status,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur lors de la vérification du statut', error.message);
            throw error;
        }
    }
    handleMicroserviceError(error) {
        if (error.code === 'ECONNREFUSED') {
            this.exceptionThrower.throwMicroserviceConnection('user-service', {
                originalError: error.message,
            });
        }
        if (error.response) {
            const { message, statusCode } = error.response;
            switch (statusCode) {
                case 400:
                    this.exceptionThrower.throwValidation(message, [
                        {
                            field: 'unknown',
                            value: null,
                            constraints: [message],
                        },
                    ]);
                    break;
                case 404:
                    this.exceptionThrower.throwRecordNotFound(message);
                    break;
                case 409:
                    this.exceptionThrower.throwBusinessRule(message, 'FRIENDSHIP_CONFLICT');
                    break;
                case 403:
                    this.exceptionThrower.throwForbidden(message);
                    break;
                default:
                    this.exceptionThrower.throwInternalError(message);
            }
        }
        return (0, rxjs_1.throwError)(error);
    }
};
exports.FriendshipsController = FriendshipsController;
__decorate([
    (0, common_1.Post)('request'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: "Envoyer une demande d'amitié" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Demande d'amitié envoyée avec succès",
        type: friendship_dto_1.FriendshipResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Relation existante' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _d : Object, typeof (_e = typeof friendship_dto_1.CreateFriendshipDto !== "undefined" && friendship_dto_1.CreateFriendshipDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], FriendshipsController.prototype, "sendFriendshipRequest", null);
__decorate([
    (0, common_1.Post)('accept'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Accepter une demande d'amitié" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Demande d'amitié acceptée avec succès",
        type: friendship_dto_1.FriendshipResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Demande non trouvée' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Non autorisé' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _f : Object, typeof (_g = typeof friendship_dto_1.AcceptFriendshipDto !== "undefined" && friendship_dto_1.AcceptFriendshipDto) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], FriendshipsController.prototype, "acceptFriendshipRequest", null);
__decorate([
    (0, common_1.Post)('decline'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Refuser une demande d'amitié" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Demande refusée avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Demande non trouvée' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Non autorisé' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _h : Object, typeof (_j = typeof friendship_dto_1.DeclineFriendshipDto !== "undefined" && friendship_dto_1.DeclineFriendshipDto) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], FriendshipsController.prototype, "declineFriendshipRequest", null);
__decorate([
    (0, common_1.Get)('friends'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir la liste des amis' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 20 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Liste des amis récupérée avec succès',
        type: [friendship_dto_1.FriendDto],
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _k : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FriendshipsController.prototype, "getUserFriends", null);
__decorate([
    (0, common_1.Delete)('friends/:friendId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un ami' }),
    (0, swagger_1.ApiParam)({ name: 'friendId', type: Number, description: "ID de l'ami à supprimer" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ami supprimé avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Amitié non trouvée' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('friendId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _l : Object, Number]),
    __metadata("design:returntype", Promise)
], FriendshipsController.prototype, "removeFriend", null);
__decorate([
    (0, common_1.Get)('requests/received'),
    (0, swagger_1.ApiOperation)({ summary: "Obtenir les demandes d'amitié reçues" }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 20 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Demandes reçues récupérées avec succès',
        type: [friendship_dto_1.FriendshipRequestDto],
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _m : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FriendshipsController.prototype, "getReceivedFriendshipRequests", null);
__decorate([
    (0, common_1.Get)('requests/sent'),
    (0, swagger_1.ApiOperation)({ summary: "Obtenir les demandes d'amitié envoyées" }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 20 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Demandes envoyées récupérées avec succès',
        type: [friendship_dto_1.FriendshipRequestDto],
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page', new common_1.ParseIntPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _o : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FriendshipsController.prototype, "getSentFriendshipRequests", null);
__decorate([
    (0, common_1.Post)('block'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Bloquer un utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Utilisateur bloqué avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Données invalides' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _p : Object, typeof (_q = typeof friendship_dto_1.BlockUserDto !== "undefined" && friendship_dto_1.BlockUserDto) === "function" ? _q : Object]),
    __metadata("design:returntype", Promise)
], FriendshipsController.prototype, "blockUser", null);
__decorate([
    (0, common_1.Post)('unblock'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Débloquer un utilisateur' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Utilisateur débloqué avec succès' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Relation non trouvée' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _r : Object, typeof (_s = typeof friendship_dto_1.UnblockUserDto !== "undefined" && friendship_dto_1.UnblockUserDto) === "function" ? _s : Object]),
    __metadata("design:returntype", Promise)
], FriendshipsController.prototype, "unblockUser", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: "Obtenir les statistiques d'amitié" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Statistiques récupérées avec succès',
        type: friendship_dto_1.FriendshipStatsDto,
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _t : Object]),
    __metadata("design:returntype", Promise)
], FriendshipsController.prototype, "getFriendshipStats", null);
__decorate([
    (0, common_1.Get)('mutual/:otherUserId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtenir les amis en commun avec un utilisateur' }),
    (0, swagger_1.ApiParam)({ name: 'otherUserId', type: Number, description: "ID de l'autre utilisateur" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Amis en commun récupérés avec succès',
        type: [friendship_dto_1.FriendDto],
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('otherUserId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_u = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _u : Object, Number]),
    __metadata("design:returntype", Promise)
], FriendshipsController.prototype, "getMutualFriends", null);
__decorate([
    (0, common_1.Get)('suggestions'),
    (0, swagger_1.ApiOperation)({ summary: "Obtenir des suggestions d'amitié" }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Suggestions récupérées avec succès',
        type: [friendship_dto_1.FriendDto],
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('limit', new common_1.ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _v : Object, Object]),
    __metadata("design:returntype", Promise)
], FriendshipsController.prototype, "getFriendshipSuggestions", null);
__decorate([
    (0, common_1.Get)('status/:otherUserId'),
    (0, swagger_1.ApiOperation)({ summary: "Vérifier le statut d'amitié avec un utilisateur" }),
    (0, swagger_1.ApiParam)({ name: 'otherUserId', type: Number, description: "ID de l'autre utilisateur" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Statut récupéré avec succès',
        schema: {
            type: 'object',
            properties: {
                status: {
                    type: 'string',
                    nullable: true,
                    enum: ['pending', 'accepted', 'declined', 'blocked'],
                },
                friendship_id: { type: 'number' },
            },
        },
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('otherUserId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_w = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _w : Object, Number]),
    __metadata("design:returntype", Promise)
], FriendshipsController.prototype, "getFriendshipStatus", null);
exports.FriendshipsController = FriendshipsController = __decorate([
    (0, swagger_1.ApiTags)('Friendships'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('friendships'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _b : Object, typeof (_c = typeof exceptions_1.ExceptionThrower !== "undefined" && exceptions_1.ExceptionThrower) === "function" ? _c : Object])
], FriendshipsController);


/***/ }),

/***/ "./apps/api-gateway/src/friendships/friendships.module.ts":
/*!****************************************************************!*\
  !*** ./apps/api-gateway/src/friendships/friendships.module.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendshipsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const friendships_controller_1 = __webpack_require__(/*! ./friendships.controller */ "./apps/api-gateway/src/friendships/friendships.controller.ts");
const microservices_module_1 = __webpack_require__(/*! ../microservices/microservices.module */ "./apps/api-gateway/src/microservices/microservices.module.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
let FriendshipsModule = class FriendshipsModule {
};
exports.FriendshipsModule = FriendshipsModule;
exports.FriendshipsModule = FriendshipsModule = __decorate([
    (0, common_1.Module)({
        imports: [microservices_module_1.MicroservicesModule, exceptions_1.ExceptionsModule],
        controllers: [friendships_controller_1.FriendshipsController],
    })
], FriendshipsModule);


/***/ }),

/***/ "./apps/api-gateway/src/health/health.controller.ts":
/*!**********************************************************!*\
  !*** ./apps/api-gateway/src/health/health.controller.ts ***!
  \**********************************************************/
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let HealthController = class HealthController {
    authClient;
    userClient;
    bankClient;
    constructor(authClient, userClient, bankClient) {
        this.authClient = authClient;
        this.userClient = userClient;
        this.bankClient = bankClient;
    }
    async check() {
        const services = {};
        try {
            console.log('🔍 Auth Health', this.authClient);
            const authHealth = await (0, rxjs_1.firstValueFrom)(this.authClient.send({ cmd: 'health' }, {}).pipe((0, rxjs_1.timeout)(2000), (0, rxjs_1.catchError)(() => (0, rxjs_1.of)({ status: 'unavailable' }))));
            services.authService = authHealth.status ?? 'unavailable';
        }
        catch {
            services.authService = 'unavailable';
        }
        try {
            console.log('🔍 User Health', this.userClient);
            const userHealth = await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'health' }, {}).pipe((0, rxjs_1.timeout)(2000), (0, rxjs_1.catchError)(() => (0, rxjs_1.of)({ status: 'unavailable' }))));
            services.userService = userHealth.status ?? 'unavailable';
        }
        catch {
            services.userService = 'unavailable';
        }
        try {
            console.log('🔍 Bank Health', this.bankClient);
            const bankHealth = await (0, rxjs_1.firstValueFrom)(this.bankClient.send({ cmd: 'health' }, {}).pipe((0, rxjs_1.timeout)(2000), (0, rxjs_1.catchError)(() => (0, rxjs_1.of)({ status: 'unavailable' }))));
            services.bankService = bankHealth.status ?? 'unavailable';
        }
        catch {
            services.bankService = 'unavailable';
        }
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'api-gateway',
            services,
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Vérifier l'état de santé de l'API Gateway" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Service opérationnel',
        schema: {
            type: 'object',
            properties: {
                status: { type: 'string', example: 'ok' },
                timestamp: { type: 'string', format: 'date-time' },
                service: { type: 'string', example: 'api-gateway' },
                services: {
                    type: 'object',
                    properties: {
                        authService: { type: 'string', example: 'ok' },
                    },
                },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('health'),
    (0, common_1.Controller)('health'),
    __param(0, (0, common_1.Inject)('AUTH_SERVICE')),
    __param(1, (0, common_1.Inject)('USER_SERVICE')),
    __param(2, (0, common_1.Inject)('BANQUE_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _c : Object])
], HealthController);


/***/ }),

/***/ "./apps/api-gateway/src/microservices/microservices.module.ts":
/*!********************************************************************!*\
  !*** ./apps/api-gateway/src/microservices/microservices.module.ts ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MicroservicesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const auth_controller_1 = __webpack_require__(/*! ../auth/auth.controller */ "./apps/api-gateway/src/auth/auth.controller.ts");
const health_controller_1 = __webpack_require__(/*! ../health/health.controller */ "./apps/api-gateway/src/health/health.controller.ts");
const users_controller_1 = __webpack_require__(/*! ../users/users.controller */ "./apps/api-gateway/src/users/users.controller.ts");
const services_controller_1 = __webpack_require__(/*! ../services/services.controller */ "./apps/api-gateway/src/services/services.controller.ts");
const user_enrichment_interceptor_1 = __webpack_require__(/*! ../auth/interceptors/user-enrichment.interceptor */ "./apps/api-gateway/src/auth/interceptors/user-enrichment.interceptor.ts");
let MicroservicesModule = class MicroservicesModule {
};
exports.MicroservicesModule = MicroservicesModule;
exports.MicroservicesModule = MicroservicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'AUTH_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.AUTH_SERVICE_HOST ?? 'localhost',
                        port: parseInt(process.env.AUTH_SERVICE_PORT ?? '4002'),
                    },
                },
                {
                    name: 'USER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.USER_SERVICE_HOST ?? 'localhost',
                        port: parseInt(process.env.USER_SERVICE_PORT ?? '4003'),
                    },
                },
                {
                    name: 'BANQUE_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: process.env.BANQUE_SERVICE_HOST ?? 'localhost',
                        port: parseInt(process.env.BANQUE_SERVICE_PORT ?? '4004'),
                    },
                },
            ]),
        ],
        controllers: [auth_controller_1.AuthController, health_controller_1.HealthController, users_controller_1.UsersController, services_controller_1.ServicesController],
        providers: [user_enrichment_interceptor_1.UserEnrichmentInterceptor],
        exports: [microservices_1.ClientsModule],
    })
], MicroservicesModule);


/***/ }),

/***/ "./apps/api-gateway/src/services/services.controller.ts":
/*!**************************************************************!*\
  !*** ./apps/api-gateway/src/services/services.controller.ts ***!
  \**************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicesController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const service_dto_1 = __webpack_require__(/*! @app/contracts/Service/dtos/service.dto */ "./libs/contracts/src/Service/dtos/service.dto.ts");
const auth_decorator_1 = __webpack_require__(/*! ../auth/decorators/auth.decorator */ "./apps/api-gateway/src/auth/decorators/auth.decorator.ts");
const current_user_decorator_1 = __webpack_require__(/*! ../auth/decorators/current-user.decorator */ "./apps/api-gateway/src/auth/decorators/current-user.decorator.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const auth_interface_1 = __webpack_require__(/*! @app/contracts/Auth/interfaces/auth.interface */ "./libs/contracts/src/Auth/interfaces/auth.interface.ts");
let ServicesController = class ServicesController {
    banqueClient;
    constructor(banqueClient) {
        this.banqueClient = banqueClient;
    }
    async createService(providerId, createServiceDto) {
        const result = await (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'create_service' }, { providerId: parseInt(providerId), createServiceDto }));
        return result;
    }
    async updateService(id, updateServiceDto) {
        const result = await (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'update_service' }, { serviceId: parseInt(id), updateServiceDto }));
        return result;
    }
    async deleteService(id) {
        const result = await (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'delete_service' }, parseInt(id)));
        return result;
    }
    async confirmService(id, beneficiaryId) {
        const result = await (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'confirm_service' }, { serviceId: parseInt(id), beneficiaryId: parseInt(beneficiaryId) }));
        return result;
    }
    async repayServiceWithService(serviceId, repaymentServiceId) {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'repay_service_with_service' }, { serviceId: parseInt(serviceId), repaymentServiceId: parseInt(repaymentServiceId) }));
    }
    async findServiceById(id) {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'find_service_by_id' }, parseInt(id)));
    }
    async getServiceWithDetails(id) {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'get_service_with_details' }, parseInt(id)));
    }
    async findServicesWithFilters(filters) {
        console.log('filters', filters);
        const cleanedFilters = {
            ...filters,
            page: filters.page ? parseInt(filters.page.toString()) : 1,
            limit: filters.limit ? parseInt(filters.limit.toString()) : 20,
            category_id: filters.category_id ? parseInt(filters.category_id.toString()) : undefined,
            provider_id: filters.provider_id ? parseInt(filters.provider_id.toString()) : undefined,
            beneficiary_id: filters.beneficiary_id
                ? parseInt(filters.beneficiary_id.toString())
                : undefined,
            jeton_value_min: filters.jeton_value_min
                ? parseInt(filters.jeton_value_min.toString())
                : undefined,
            jeton_value_max: filters.jeton_value_max
                ? parseInt(filters.jeton_value_max.toString())
                : undefined,
            created_after: filters.created_after ? new Date(filters.created_after) : undefined,
            created_before: filters.created_before ? new Date(filters.created_before) : undefined,
        };
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'find_services_with_filters' }, cleanedFilters));
    }
    async getUserServices(user, page, limit) {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'get_user_services' }, { userId: user.id, page, limit }));
    }
    async getUserPranks(user, page, limit) {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'get_user_pranks' }, { userId: user.id, page, limit }));
    }
    async getServiceStats() {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'get_service_stats' }, {}));
    }
    async createServiceCategory(createCategoryDto) {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'create_service_category' }, createCategoryDto));
    }
    async getAllServiceCategories() {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'get_all_service_categories' }, {}));
    }
    async getServiceCategoryById(id) {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'get_service_category_by_id' }, parseInt(id)));
    }
    async healthCheck() {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'banque_service_health' }, {}));
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, common_1.Post)(),
    (0, src_1.Log)('Création service', 'info'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouveau service' }),
    (0, swagger_1.ApiBody)({ type: service_dto_1.CreateServiceDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Service créé avec succès',
        type: service_dto_1.ServiceResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Données invalides' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' }),
    __param(0, (0, current_user_decorator_1.GetUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof service_dto_1.CreateServiceDto !== "undefined" && service_dto_1.CreateServiceDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ServicesController.prototype, "createService", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, src_1.Log)('Mise à jour service', 'info'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un service' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du service' }),
    (0, swagger_1.ApiBody)({ type: service_dto_1.UpdateServiceDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Service mis à jour avec succès',
        type: service_dto_1.ServiceResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Service non trouvé' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Service non modifiable' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof service_dto_1.UpdateServiceDto !== "undefined" && service_dto_1.UpdateServiceDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ServicesController.prototype, "updateService", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, src_1.Log)('Suppression service', 'info'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un service' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du service' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Service supprimé avec succès' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Service non trouvé' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Service non supprimable' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ServicesController.prototype, "deleteService", null);
__decorate([
    (0, common_1.Post)(':id/confirm'),
    (0, src_1.Log)('Confirmation service', 'info'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Confirmer un service' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du service' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Service confirmé avec succès',
        type: service_dto_1.ServiceResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Service non trouvé' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.FORBIDDEN, description: 'Seul le bénéficiaire peut confirmer' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.GetUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ServicesController.prototype, "confirmService", null);
__decorate([
    (0, common_1.Post)(':id/repay/:repaymentServiceId'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Rembourser un service par un autre service' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du service à rembourser' }),
    (0, swagger_1.ApiParam)({ name: 'repaymentServiceId', description: 'ID du service de remboursement' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Service remboursé avec succès',
        type: service_dto_1.ServiceResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Service non trouvé' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Remboursement invalide' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('repaymentServiceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ServicesController.prototype, "repayServiceWithService", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un service par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du service' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Service trouvé',
        type: service_dto_1.ServiceResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Service non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ServicesController.prototype, "findServiceById", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: "Récupérer les détails complets d'un service" }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID du service' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Détails du service récupérés',
        type: service_dto_1.ServiceWithDetailsDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Service non trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], ServicesController.prototype, "getServiceWithDetails", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Rechercher des services avec filtres' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, description: 'Statut du service' }),
    (0, swagger_1.ApiQuery)({
        name: 'type',
        enum: ['service', 'prank'],
        required: false,
        description: 'Type de service (service ou prank)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        type: String,
        required: false,
        description: 'Numéro de page pour la pagination',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        type: String,
        required: false,
        description: "Nombre d'éléments par page",
    }),
    (0, swagger_1.ApiQuery)({ name: 'category_id', required: false, description: 'ID de la catégorie' }),
    (0, swagger_1.ApiQuery)({ name: 'provider_id', required: false, description: 'ID du fournisseur' }),
    (0, swagger_1.ApiQuery)({ name: 'beneficiary_id', required: false, description: 'ID du bénéficiaire' }),
    (0, swagger_1.ApiQuery)({ name: 'jeton_value_min', required: false, description: 'Valeur minimale en jetons' }),
    (0, swagger_1.ApiQuery)({ name: 'jeton_value_max', required: false, description: 'Valeur maximale en jetons' }),
    (0, swagger_1.ApiQuery)({ name: 'created_after', required: false, description: 'Créé après cette date' }),
    (0, swagger_1.ApiQuery)({ name: 'created_before', required: false, description: 'Créé avant cette date' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Services trouvés',
        type: [service_dto_1.ServiceWithDetailsDto],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof service_dto_1.ServiceFiltersDto !== "undefined" && service_dto_1.ServiceFiltersDto) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], ServicesController.prototype, "findServicesWithFilters", null);
__decorate([
    (0, common_1.Get)('user/services'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: "Récupérer les services d'un utilisateur" }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: "ID de l'utilisateur" }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Services récupérés',
        type: [service_dto_1.ServiceWithDetailsDto],
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _o : Object, String, String]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], ServicesController.prototype, "getUserServices", null);
__decorate([
    (0, common_1.Get)('user/pranks'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: "Récupérer les pranks d'un utilisateur" }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: "ID de l'utilisateur" }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Pranks récupérés',
        type: [service_dto_1.ServiceWithDetailsDto],
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _q : Object, String, String]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], ServicesController.prototype, "getUserPranks", null);
__decorate([
    (0, common_1.Get)('stats/global'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les statistiques globales des services' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Statistiques récupérées',
        type: service_dto_1.ServiceStatsDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], ServicesController.prototype, "getServiceStats", null);
__decorate([
    (0, common_1.Post)('categories'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une catégorie de service' }),
    (0, swagger_1.ApiBody)({ type: service_dto_1.CreateServiceCategoryDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Catégorie créée avec succès',
        type: service_dto_1.ServiceCategoryDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CONFLICT, description: 'Catégorie déjà existante' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof service_dto_1.CreateServiceCategoryDto !== "undefined" && service_dto_1.CreateServiceCategoryDto) === "function" ? _t : Object]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], ServicesController.prototype, "createServiceCategory", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer toutes les catégories de service' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Catégories récupérées',
        type: [service_dto_1.ServiceCategoryDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], ServicesController.prototype, "getAllServiceCategories", null);
__decorate([
    (0, common_1.Get)('categories/:id'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer une catégorie par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID de la catégorie' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Catégorie trouvée',
        type: service_dto_1.ServiceCategoryDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Catégorie non trouvée' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], ServicesController.prototype, "getServiceCategoryById", null);
__decorate([
    (0, common_1.Get)('health/check'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Vérifier la santé du service banque' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Service en bonne santé',
        schema: {
            type: 'object',
            properties: {
                status: { type: 'string' },
                timestamp: { type: 'string' },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_x = typeof Promise !== "undefined" && Promise) === "function" ? _x : Object)
], ServicesController.prototype, "healthCheck", null);
exports.ServicesController = ServicesController = __decorate([
    (0, swagger_1.ApiTags)('services'),
    (0, common_1.Controller)('services'),
    __param(0, (0, common_1.Inject)('BANQUE_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], ServicesController);


/***/ }),

/***/ "./apps/api-gateway/src/users/users.controller.ts":
/*!********************************************************!*\
  !*** ./apps/api-gateway/src/users/users.controller.ts ***!
  \********************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const user_dto_1 = __webpack_require__(/*! @app/contracts/User/dtos/user.dto */ "./libs/contracts/src/User/dtos/user.dto.ts");
const auth_decorator_1 = __webpack_require__(/*! ../auth/decorators/auth.decorator */ "./apps/api-gateway/src/auth/decorators/auth.decorator.ts");
const current_user_decorator_1 = __webpack_require__(/*! ../auth/decorators/current-user.decorator */ "./apps/api-gateway/src/auth/decorators/current-user.decorator.ts");
const auth_interface_1 = __webpack_require__(/*! @app/contracts/Auth/interfaces/auth.interface */ "./libs/contracts/src/Auth/interfaces/auth.interface.ts");
const user_enrichment_interceptor_1 = __webpack_require__(/*! ../auth/interceptors/user-enrichment.interceptor */ "./apps/api-gateway/src/auth/interceptors/user-enrichment.interceptor.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
let UsersController = class UsersController {
    userClient;
    constructor(userClient) {
        this.userClient = userClient;
    }
    async createUser(createUserDto) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'create_user' }, createUserDto));
    }
    async updateUser(id, updateUserDto) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'update_user' }, { userId: id, updateUserDto }));
    }
    async deleteUser(id) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'delete_user' }, id));
    }
    getCurrentUser(user) {
        return user;
    }
    async findUserById(id) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'find_user_by_id' }, id));
    }
    async findUserByEmail(email) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'find_user_by_email' }, email));
    }
    async findUserByUsername(username) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'find_user_by_username' }, username));
    }
    async searchUsers(searchTerm, page = '1', limit = '10', currentUser) {
        const pageNum = Math.max(1, parseInt(page) || 1);
        const limitNum = Math.min(50, Math.max(1, parseInt(limit) || 20));
        const result = await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'search_users' }, {
            searchTerm,
            page: pageNum,
            limit: limitNum,
            excludeUserId: currentUser.id.toString(),
        }));
        return {
            ...result,
            page: pageNum,
            limit: limitNum,
        };
    }
    async getUserProfile(userId) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'get_user_profile' }, userId));
    }
    async getUserStats(userId) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'get_user_stats' }, userId));
    }
    async validateUser(payload) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'validate_user' }, payload));
    }
    async addUserXP(userId, body) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'add_user_xp' }, { userId, xpAmount: body.xpAmount }));
    }
    async addUserCoins(userId, body) {
        return (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'add_user_coins' }, { userId, coinAmount: body.coinAmount }));
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un nouvel utilisateur' }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Utilisateur créé avec succès',
        type: user_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Données invalides' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CONFLICT, description: 'Email ou username déjà utilisé' }),
    (0, src_1.Log)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Mettre à jour un utilisateur' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: "ID de l'utilisateur" }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Utilisateur mis à jour avec succès',
        type: user_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CONFLICT, description: 'Email ou username déjà utilisé' }),
    (0, src_1.Log)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof user_dto_1.UpdateUserDto !== "undefined" && user_dto_1.UpdateUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un utilisateur' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: "ID de l'utilisateur" }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Utilisateur supprimé avec succès' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' }),
    (0, src_1.Log)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: "Récupérer les informations complètes de l'utilisateur connecté" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Informations utilisateur enrichies récupérées avec succès',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                firstName: { type: 'string' },
                lastName: { type: 'string' },
                username: { type: 'string' },
                level: { type: 'number' },
                xp_points: { type: 'number' },
                game_coins: { type: 'number' },
                profile_picture_url: { type: 'string', nullable: true },
            },
        },
    }),
    (0, src_1.Log)('Récupération des informations utilisateur connecté', 'info'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _h : Object)
], UsersController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Get)('id/:id'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un utilisateur par ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: "ID de l'utilisateur" }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Utilisateur trouvé',
        type: user_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' }),
    (0, src_1.Log)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UsersController.prototype, "findUserById", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer un utilisateur par email' }),
    (0, swagger_1.ApiParam)({ name: 'email', description: "Email de l'utilisateur" }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Utilisateur trouvé',
        type: user_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' }),
    (0, src_1.Log)(),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UsersController.prototype, "findUserByEmail", null);
__decorate([
    (0, common_1.Get)('username/:username'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: "Récupérer un utilisateur par nom d'utilisateur" }),
    (0, swagger_1.ApiParam)({ name: 'username', description: "Nom d'utilisateur" }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Utilisateur trouvé',
        type: user_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' }),
    (0, src_1.Log)(),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], UsersController.prototype, "findUserByUsername", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Rechercher des utilisateurs' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Résultats de recherche avec pagination',
        schema: {
            type: 'object',
            properties: {
                users: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/UserResponseDto' },
                },
                total: { type: 'number', description: 'Nombre total de résultats' },
                hasMore: { type: 'boolean', description: "Indique s'il y a plus de résultats" },
                page: { type: 'number', description: 'Page actuelle' },
                limit: { type: 'number', description: "Nombre d'éléments par page" },
            },
        },
    }),
    (0, src_1.Log)(),
    __param(0, (0, common_1.Query)('query')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, typeof (_m = typeof auth_interface_1.ICurrentUser !== "undefined" && auth_interface_1.ICurrentUser) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], UsersController.prototype, "searchUsers", null);
__decorate([
    (0, common_1.Get)('profile/:userId'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: "Récupérer le profil public d'un utilisateur" }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: "ID de l'utilisateur" }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Profil utilisateur récupéré',
        type: user_dto_1.UserProfileDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' }),
    (0, src_1.Log)(),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], UsersController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Get)('stats/:userId'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: "Récupérer les statistiques d'un utilisateur" }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: "ID de l'utilisateur" }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Statistiques utilisateur récupérées',
        type: user_dto_1.UserStatsDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' }),
    (0, src_1.Log)(),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], UsersController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.Post)('validate'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Valider les identifiants utilisateur' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
                password: { type: 'string', minLength: 6, example: 'motdepasse123' },
            },
            required: ['email', 'password'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Validation des identifiants',
        schema: {
            type: 'object',
            properties: {
                valid: { type: 'boolean' },
                user: { type: 'object' },
                error: { type: 'string' },
            },
        },
    }),
    (0, src_1.Log)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], UsersController.prototype, "validateUser", null);
__decorate([
    (0, common_1.Post)(':userId/xp'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: "Ajouter de l'XP à un utilisateur" }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: "ID de l'utilisateur" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                xpAmount: { type: 'number', minimum: 1, example: 50 },
            },
            required: ['xpAmount'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'XP ajouté avec succès',
        type: user_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' }),
    (0, src_1.Log)(),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], UsersController.prototype, "addUserXP", null);
__decorate([
    (0, common_1.Post)(':userId/coins'),
    (0, auth_decorator_1.Auth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Ajouter des coins à un utilisateur' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: "ID de l'utilisateur" }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                coinAmount: { type: 'number', minimum: 1, example: 100 },
            },
            required: ['coinAmount'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Coins ajoutés avec succès',
        type: user_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Utilisateur non trouvé' }),
    (0, src_1.Log)(),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], UsersController.prototype, "addUserCoins", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseInterceptors)(user_enrichment_interceptor_1.UserEnrichmentInterceptor),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], UsersController);


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

/***/ "./libs/contracts/src/Auth/dto/auth.dto.ts":
/*!*************************************************!*\
  !*** ./libs/contracts/src/Auth/dto/auth.dto.ts ***!
  \*************************************************/
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
exports.VerifyGoogleIdTokenDto = exports.RefreshTokenResponseDto = exports.RefreshTokenDto = exports.TokenValidationDto = exports.AuthResponseDto = exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const user_dto_1 = __webpack_require__(/*! ../../User/dtos/user.dto */ "./libs/contracts/src/User/dtos/user.dto.ts");
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john.doe@example.com',
        description: 'Email de connexion',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'motdepasse123', description: 'Mot de passe' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class AuthResponseDto {
    access_token;
    refresh_token;
    expires_in;
    user;
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "refresh_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3600, description: 'Durée de validité en secondes' }),
    __metadata("design:type", Number)
], AuthResponseDto.prototype, "expires_in", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_dto_1.UserResponseDto }),
    __metadata("design:type", typeof (_a = typeof user_dto_1.UserResponseDto !== "undefined" && user_dto_1.UserResponseDto) === "function" ? _a : Object)
], AuthResponseDto.prototype, "user", void 0);
class TokenValidationDto {
    token;
}
exports.TokenValidationDto = TokenValidationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TokenValidationDto.prototype, "token", void 0);
class RefreshTokenDto {
    refreshToken;
}
exports.RefreshTokenDto = RefreshTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Refresh token pour renouveler le token d'accès",
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "refreshToken", void 0);
class RefreshTokenResponseDto {
    access_token;
    refresh_token;
    expires_in;
}
exports.RefreshTokenResponseDto = RefreshTokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
    __metadata("design:type", String)
], RefreshTokenResponseDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
    __metadata("design:type", String)
], RefreshTokenResponseDto.prototype, "refresh_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3600, description: 'Durée de validité en secondes' }),
    __metadata("design:type", Number)
], RefreshTokenResponseDto.prototype, "expires_in", void 0);
class VerifyGoogleIdTokenDto {
    idToken;
}
exports.VerifyGoogleIdTokenDto = VerifyGoogleIdTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Google ID Token à vérifier',
        example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRmNzJkN...',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VerifyGoogleIdTokenDto.prototype, "idToken", void 0);


/***/ }),

/***/ "./libs/contracts/src/Auth/interfaces/auth.interface.ts":
/*!**************************************************************!*\
  !*** ./libs/contracts/src/Auth/interfaces/auth.interface.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/contracts/src/Friendship/dtos/friendship.dto.ts":
/*!**************************************************************!*\
  !*** ./libs/contracts/src/Friendship/dtos/friendship.dto.ts ***!
  \**************************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeclineFriendshipDto = exports.AcceptFriendshipDto = exports.UnblockUserDto = exports.BlockUserDto = exports.FriendSearchFiltersDto = exports.FriendshipFiltersDto = exports.FriendshipStatsDto = exports.FriendshipRequestDto = exports.FriendDto = exports.FriendshipWithDetailsDto = exports.FriendshipResponseDto = exports.UpdateFriendshipDto = exports.CreateFriendshipDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_types_1 = __webpack_require__(/*! ../../types/common.types */ "./libs/contracts/src/types/common.types.ts");
class CreateFriendshipDto {
    user_two_id;
}
exports.CreateFriendshipDto = CreateFriendshipDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: "ID de l'utilisateur à ajouter en ami" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateFriendshipDto.prototype, "user_two_id", void 0);
class UpdateFriendshipDto {
    status;
}
exports.UpdateFriendshipDto = UpdateFriendshipDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.FriendshipStatusEnum, description: "Nouveau statut de l'amitié" }),
    (0, class_validator_1.IsEnum)(common_types_1.FriendshipStatusEnum),
    __metadata("design:type", typeof (_a = typeof common_types_1.FriendshipStatusEnum !== "undefined" && common_types_1.FriendshipStatusEnum) === "function" ? _a : Object)
], UpdateFriendshipDto.prototype, "status", void 0);
class FriendshipResponseDto {
    friendship_id;
    user_one_id;
    user_two_id;
    status;
    action_user_id;
    requested_at;
    accepted_at;
    updated_at;
}
exports.FriendshipResponseDto = FriendshipResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], FriendshipResponseDto.prototype, "friendship_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], FriendshipResponseDto.prototype, "user_one_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], FriendshipResponseDto.prototype, "user_two_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.FriendshipStatusEnum }),
    __metadata("design:type", typeof (_b = typeof common_types_1.FriendshipStatusEnum !== "undefined" && common_types_1.FriendshipStatusEnum) === "function" ? _b : Object)
], FriendshipResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], FriendshipResponseDto.prototype, "action_user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], FriendshipResponseDto.prototype, "requested_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', nullable: true }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], FriendshipResponseDto.prototype, "accepted_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], FriendshipResponseDto.prototype, "updated_at", void 0);
class FriendshipWithDetailsDto extends FriendshipResponseDto {
    user_one;
    user_two;
    action_user;
}
exports.FriendshipWithDetailsDto = FriendshipWithDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            user_id: { type: 'number', example: 1 },
            username: { type: 'string', example: 'john_doe' },
            profile_picture_url: {
                type: 'string',
                example: 'https://example.com/avatar.jpg',
                nullable: true,
            },
            level: { type: 'number', example: 5 },
        },
    }),
    __metadata("design:type", Object)
], FriendshipWithDetailsDto.prototype, "user_one", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            user_id: { type: 'number', example: 2 },
            username: { type: 'string', example: 'jane_doe' },
            profile_picture_url: {
                type: 'string',
                example: 'https://example.com/avatar2.jpg',
                nullable: true,
            },
            level: { type: 'number', example: 3 },
        },
    }),
    __metadata("design:type", Object)
], FriendshipWithDetailsDto.prototype, "user_two", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            user_id: { type: 'number', example: 1 },
            username: { type: 'string', example: 'john_doe' },
            profile_picture_url: {
                type: 'string',
                example: 'https://example.com/avatar.jpg',
                nullable: true,
            },
        },
    }),
    __metadata("design:type", Object)
], FriendshipWithDetailsDto.prototype, "action_user", void 0);
class FriendDto {
    user_id;
    username;
    profile_picture_url;
    level;
    xp_points;
    game_coins;
    friendship_status;
    friendship_since;
    mutual_friends_count;
}
exports.FriendDto = FriendDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], FriendDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jane_doe' }),
    __metadata("design:type", String)
], FriendDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/avatar2.jpg', nullable: true }),
    __metadata("design:type", String)
], FriendDto.prototype, "profile_picture_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7 }),
    __metadata("design:type", Number)
], FriendDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2150 }),
    __metadata("design:type", Number)
], FriendDto.prototype, "xp_points", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 750 }),
    __metadata("design:type", Number)
], FriendDto.prototype, "game_coins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.FriendshipStatusEnum }),
    __metadata("design:type", typeof (_f = typeof common_types_1.FriendshipStatusEnum !== "undefined" && common_types_1.FriendshipStatusEnum) === "function" ? _f : Object)
], FriendDto.prototype, "friendship_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', nullable: true }),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], FriendDto.prototype, "friendship_since", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, nullable: true }),
    __metadata("design:type", Number)
], FriendDto.prototype, "mutual_friends_count", void 0);
class FriendshipRequestDto {
    friendship_id;
    requester;
    requested_at;
    mutual_friends_count;
}
exports.FriendshipRequestDto = FriendshipRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], FriendshipRequestDto.prototype, "friendship_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            user_id: { type: 'number', example: 3 },
            username: { type: 'string', example: 'alice_smith' },
            profile_picture_url: {
                type: 'string',
                example: 'https://example.com/avatar3.jpg',
                nullable: true,
            },
            level: { type: 'number', example: 4 },
        },
    }),
    __metadata("design:type", Object)
], FriendshipRequestDto.prototype, "requester", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], FriendshipRequestDto.prototype, "requested_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, nullable: true }),
    __metadata("design:type", Number)
], FriendshipRequestDto.prototype, "mutual_friends_count", void 0);
class FriendshipStatsDto {
    total_friends;
    pending_requests_sent;
    pending_requests_received;
    blocked_users;
    mutual_friends_avg;
    friendship_requests_today;
}
exports.FriendshipStatsDto = FriendshipStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], FriendshipStatsDto.prototype, "total_friends", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], FriendshipStatsDto.prototype, "pending_requests_sent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], FriendshipStatsDto.prototype, "pending_requests_received", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], FriendshipStatsDto.prototype, "blocked_users", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3.2 }),
    __metadata("design:type", Number)
], FriendshipStatsDto.prototype, "mutual_friends_avg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], FriendshipStatsDto.prototype, "friendship_requests_today", void 0);
class FriendshipFiltersDto {
    status;
    user_id;
    action_user_id;
    requested_after;
    requested_before;
    accepted_after;
    accepted_before;
}
exports.FriendshipFiltersDto = FriendshipFiltersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.FriendshipStatusEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.FriendshipStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_j = typeof common_types_1.FriendshipStatusEnum !== "undefined" && common_types_1.FriendshipStatusEnum) === "function" ? _j : Object)
], FriendshipFiltersDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FriendshipFiltersDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FriendshipFiltersDto.prototype, "action_user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object)
], FriendshipFiltersDto.prototype, "requested_after", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-12-31T23:59:59.999Z', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_l = typeof Date !== "undefined" && Date) === "function" ? _l : Object)
], FriendshipFiltersDto.prototype, "requested_before", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_m = typeof Date !== "undefined" && Date) === "function" ? _m : Object)
], FriendshipFiltersDto.prototype, "accepted_after", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-12-31T23:59:59.999Z', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_o = typeof Date !== "undefined" && Date) === "function" ? _o : Object)
], FriendshipFiltersDto.prototype, "accepted_before", void 0);
class FriendSearchFiltersDto {
    username;
    level_min;
    level_max;
    exclude_friends;
    exclude_blocked;
    mutual_friends_min;
}
exports.FriendSearchFiltersDto = FriendSearchFiltersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john', description: "Recherche par nom d'utilisateur", required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FriendSearchFiltersDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Niveau minimum', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FriendSearchFiltersDto.prototype, "level_min", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Niveau maximum', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FriendSearchFiltersDto.prototype, "level_max", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Exclure les amis existants', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], FriendSearchFiltersDto.prototype, "exclude_friends", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Exclure les utilisateurs bloqués', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], FriendSearchFiltersDto.prototype, "exclude_blocked", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: "Nombre minimum d'amis en commun", required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], FriendSearchFiltersDto.prototype, "mutual_friends_min", void 0);
class BlockUserDto {
    user_id;
}
exports.BlockUserDto = BlockUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: "ID de l'utilisateur à bloquer" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BlockUserDto.prototype, "user_id", void 0);
class UnblockUserDto {
    user_id;
}
exports.UnblockUserDto = UnblockUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: "ID de l'utilisateur à débloquer" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UnblockUserDto.prototype, "user_id", void 0);
class AcceptFriendshipDto {
    friendship_id;
}
exports.AcceptFriendshipDto = AcceptFriendshipDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "ID de la demande d'amitié à accepter" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AcceptFriendshipDto.prototype, "friendship_id", void 0);
class DeclineFriendshipDto {
    friendship_id;
}
exports.DeclineFriendshipDto = DeclineFriendshipDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "ID de la demande d'amitié à refuser" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DeclineFriendshipDto.prototype, "friendship_id", void 0);


/***/ }),

/***/ "./libs/contracts/src/Service/dtos/service.dto.ts":
/*!********************************************************!*\
  !*** ./libs/contracts/src/Service/dtos/service.dto.ts ***!
  \********************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceFiltersDto = exports.ServiceStatsDto = exports.ServiceWithDetailsDto = exports.ServiceResponseDto = exports.CreateServiceCategoryDto = exports.ServiceCategoryDto = exports.UpdateServiceDto = exports.CreateServiceDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_types_1 = __webpack_require__(/*! ../../types/common.types */ "./libs/contracts/src/types/common.types.ts");
class CreateServiceDto {
    beneficiary_id;
    category_id;
    description;
    jeton_value;
}
exports.CreateServiceDto = CreateServiceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID du bénéficiaire du service' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "beneficiary_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID de la catégorie de service', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "category_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Aider à déménager', description: 'Description du service' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, description: 'Valeur en jetons du service' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "jeton_value", void 0);
class UpdateServiceDto {
    category_id;
    description;
    jeton_value;
    status;
}
exports.UpdateServiceDto = UpdateServiceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateServiceDto.prototype, "category_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Description mise à jour', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateServiceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 75, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateServiceDto.prototype, "jeton_value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.ServiceStatusEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.ServiceStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof common_types_1.ServiceStatusEnum !== "undefined" && common_types_1.ServiceStatusEnum) === "function" ? _a : Object)
], UpdateServiceDto.prototype, "status", void 0);
class ServiceCategoryDto {
    category_id;
    name;
    icon_url;
    description;
}
exports.ServiceCategoryDto = ServiceCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ServiceCategoryDto.prototype, "category_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Déménagement' }),
    __metadata("design:type", String)
], ServiceCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/icons/moving.svg', nullable: true }),
    __metadata("design:type", String)
], ServiceCategoryDto.prototype, "icon_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Services liés au déménagement', nullable: true }),
    __metadata("design:type", String)
], ServiceCategoryDto.prototype, "description", void 0);
class CreateServiceCategoryDto {
    name;
    icon_url;
    description;
}
exports.CreateServiceCategoryDto = CreateServiceCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Déménagement', description: 'Nom de la catégorie' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateServiceCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/icons/moving.svg', required: false }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateServiceCategoryDto.prototype, "icon_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Services liés au déménagement', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateServiceCategoryDto.prototype, "description", void 0);
class ServiceResponseDto {
    service_id;
    provider_id;
    beneficiary_id;
    category_id;
    description;
    jeton_value;
    status;
    created_at;
    confirmed_at;
    repaid_at;
    repayment_service_id;
    executed_prank_id_repayment;
    updated_at;
}
exports.ServiceResponseDto = ServiceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ServiceResponseDto.prototype, "service_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ServiceResponseDto.prototype, "provider_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], ServiceResponseDto.prototype, "beneficiary_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, nullable: true }),
    __metadata("design:type", Number)
], ServiceResponseDto.prototype, "category_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Aider à déménager' }),
    __metadata("design:type", String)
], ServiceResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], ServiceResponseDto.prototype, "jeton_value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.ServiceStatusEnum }),
    __metadata("design:type", typeof (_b = typeof common_types_1.ServiceStatusEnum !== "undefined" && common_types_1.ServiceStatusEnum) === "function" ? _b : Object)
], ServiceResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ServiceResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', nullable: true }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ServiceResponseDto.prototype, "confirmed_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', nullable: true }),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], ServiceResponseDto.prototype, "repaid_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, nullable: true }),
    __metadata("design:type", Number)
], ServiceResponseDto.prototype, "repayment_service_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, nullable: true }),
    __metadata("design:type", Number)
], ServiceResponseDto.prototype, "executed_prank_id_repayment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], ServiceResponseDto.prototype, "updated_at", void 0);
class ServiceWithDetailsDto extends ServiceResponseDto {
    provider;
    beneficiary;
    category;
}
exports.ServiceWithDetailsDto = ServiceWithDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            user_id: { type: 'number', example: 1 },
            username: { type: 'string', example: 'john_doe' },
            profile_picture_url: {
                type: 'string',
                example: 'https://example.com/avatar.jpg',
                nullable: true,
            },
        },
    }),
    __metadata("design:type", Object)
], ServiceWithDetailsDto.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            user_id: { type: 'number', example: 2 },
            username: { type: 'string', example: 'jane_doe' },
            profile_picture_url: {
                type: 'string',
                example: 'https://example.com/avatar2.jpg',
                nullable: true,
            },
        },
    }),
    __metadata("design:type", Object)
], ServiceWithDetailsDto.prototype, "beneficiary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => ServiceCategoryDto, nullable: true }),
    __metadata("design:type", ServiceCategoryDto)
], ServiceWithDetailsDto.prototype, "category", void 0);
class ServiceStatsDto {
    total_services;
    pending_services;
    confirmed_services;
    repaid_services;
    total_jeton_value;
    average_jeton_value;
}
exports.ServiceStatsDto = ServiceStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], ServiceStatsDto.prototype, "total_services", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15 }),
    __metadata("design:type", Number)
], ServiceStatsDto.prototype, "pending_services", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], ServiceStatsDto.prototype, "confirmed_services", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 35 }),
    __metadata("design:type", Number)
], ServiceStatsDto.prototype, "repaid_services", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2500 }),
    __metadata("design:type", Number)
], ServiceStatsDto.prototype, "total_jeton_value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], ServiceStatsDto.prototype, "average_jeton_value", void 0);
class ServiceFiltersDto {
    status;
    type;
    page;
    limit;
    category_id;
    provider_id;
    beneficiary_id;
    jeton_value_min;
    jeton_value_max;
    created_after;
    created_before;
}
exports.ServiceFiltersDto = ServiceFiltersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.ServiceStatusEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.ServiceStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_g = typeof common_types_1.ServiceStatusEnum !== "undefined" && common_types_1.ServiceStatusEnum) === "function" ? _g : Object)
], ServiceFiltersDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.ServiceTypeEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.ServiceTypeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_h = typeof common_types_1.ServiceTypeEnum !== "undefined" && common_types_1.ServiceTypeEnum) === "function" ? _h : Object)
], ServiceFiltersDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ServiceFiltersDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '20', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ServiceFiltersDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ServiceFiltersDto.prototype, "category_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ServiceFiltersDto.prototype, "provider_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ServiceFiltersDto.prototype, "beneficiary_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ServiceFiltersDto.prototype, "jeton_value_min", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ServiceFiltersDto.prototype, "jeton_value_max", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
], ServiceFiltersDto.prototype, "created_after", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-12-31T23:59:59.999Z', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object)
], ServiceFiltersDto.prototype, "created_before", void 0);


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

/***/ "./libs/contracts/src/types/common.types.ts":
/*!**************************************************!*\
  !*** ./libs/contracts/src/types/common.types.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserMissionStatusEnum = exports.ServiceTypeEnum = exports.ServiceStatusEnum = exports.PrankTypeEnum = exports.MissionTypeEnum = exports.FriendshipStatusEnum = exports.ExecutedPrankStatusEnum = void 0;
var ExecutedPrankStatusEnum;
(function (ExecutedPrankStatusEnum) {
    ExecutedPrankStatusEnum["PROPOSED_BY_DEBTOR"] = "proposed_by_debtor";
    ExecutedPrankStatusEnum["PROPOSED_BY_CREDITOR"] = "proposed_by_creditor";
    ExecutedPrankStatusEnum["ACCEPTED_BY_TARGET"] = "accepted_by_target";
    ExecutedPrankStatusEnum["EXECUTED_PENDING_VALIDATION"] = "executed_pending_validation";
    ExecutedPrankStatusEnum["VALIDATED_BY_TARGET_COMPLETED"] = "validated_by_target_completed";
    ExecutedPrankStatusEnum["REJECTED"] = "rejected";
    ExecutedPrankStatusEnum["FAILED_EXECUTION"] = "failed_execution";
})(ExecutedPrankStatusEnum || (exports.ExecutedPrankStatusEnum = ExecutedPrankStatusEnum = {}));
var FriendshipStatusEnum;
(function (FriendshipStatusEnum) {
    FriendshipStatusEnum["PENDING"] = "pending";
    FriendshipStatusEnum["ACCEPTED"] = "accepted";
    FriendshipStatusEnum["DECLINED"] = "declined";
    FriendshipStatusEnum["BLOCKED"] = "blocked";
})(FriendshipStatusEnum || (exports.FriendshipStatusEnum = FriendshipStatusEnum = {}));
var MissionTypeEnum;
(function (MissionTypeEnum) {
    MissionTypeEnum["RENDER_SERVICES"] = "render_services";
    MissionTypeEnum["REPAY_DEBTS_PRANK"] = "repay_debts_prank";
    MissionTypeEnum["REPAY_DEBTS_SERVICE"] = "repay_debts_service";
    MissionTypeEnum["INVITE_FRIENDS"] = "invite_friends";
    MissionTypeEnum["REACH_LEVEL"] = "reach_level";
    MissionTypeEnum["USE_X_PRANK_TYPE"] = "use_x_prank_type";
    MissionTypeEnum["PERFORM_X_SERVICES_CATEGORY"] = "perform_x_services_category";
})(MissionTypeEnum || (exports.MissionTypeEnum = MissionTypeEnum = {}));
var PrankTypeEnum;
(function (PrankTypeEnum) {
    PrankTypeEnum["DECLARATIVE"] = "declarative";
    PrankTypeEnum["IN_APP_COSMETIC"] = "in_app_cosmetic";
    PrankTypeEnum["IN_APP_LOCK"] = "in_app_lock";
    PrankTypeEnum["NOTIFICATION_SPAM"] = "notification_spam";
    PrankTypeEnum["EXTERNAL_ACTION"] = "external_action";
})(PrankTypeEnum || (exports.PrankTypeEnum = PrankTypeEnum = {}));
var ServiceStatusEnum;
(function (ServiceStatusEnum) {
    ServiceStatusEnum["PENDING_CONFIRMATION"] = "pending_confirmation";
    ServiceStatusEnum["CONFIRMED_UNPAID"] = "confirmed_unpaid";
    ServiceStatusEnum["REPAID_BY_SERVICE"] = "repaid_by_service";
    ServiceStatusEnum["REPAID_BY_PRANK"] = "repaid_by_prank";
    ServiceStatusEnum["CANCELLED"] = "cancelled";
    ServiceStatusEnum["DISPUTED"] = "disputed";
})(ServiceStatusEnum || (exports.ServiceStatusEnum = ServiceStatusEnum = {}));
var ServiceTypeEnum;
(function (ServiceTypeEnum) {
    ServiceTypeEnum["SERVICE"] = "service";
    ServiceTypeEnum["PRANK"] = "prank";
})(ServiceTypeEnum || (exports.ServiceTypeEnum = ServiceTypeEnum = {}));
var UserMissionStatusEnum;
(function (UserMissionStatusEnum) {
    UserMissionStatusEnum["NOT_STARTED"] = "not_started";
    UserMissionStatusEnum["IN_PROGRESS"] = "in_progress";
    UserMissionStatusEnum["COMPLETED_PENDING_CLAIM"] = "completed_pending_claim";
    UserMissionStatusEnum["CLAIMED"] = "claimed";
    UserMissionStatusEnum["EXPIRED"] = "expired";
})(UserMissionStatusEnum || (exports.UserMissionStatusEnum = UserMissionStatusEnum = {}));


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
exports.ResourceNotAvailableException = exports.InsufficientPermissionsException = exports.BusinessException = void 0;
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

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "passport-google-oauth20":
/*!******************************************!*\
  !*** external "passport-google-oauth20" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("passport-google-oauth20");

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
/*!**************************************!*\
  !*** ./apps/api-gateway/src/main.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const api_gateway_module_1 = __webpack_require__(/*! ./api-gateway.module */ "./apps/api-gateway/src/api-gateway.module.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const config_1 = __webpack_require__(/*! @app/config */ "./libs/config/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(api_gateway_module_1.ApiGatewayModule);
    const globalConfig = app.get(config_1.GlobalConfigService);
    app.enableCors();
    app.useGlobalFilters(app.get(exceptions_1.GlobalExceptionFilter));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('LifeOS API Gateway')
        .setDescription("API Gateway pour l'écosystème LifeOS - Architecture Microservices")
        .setVersion('1.0')
        .addBearerAuth()
        .addServer('http://localhost:4001', 'API Gateway')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'LifeOS API Documentation',
        customfavIcon: '/favicon.ico',
        customCss: '.swagger-ui .topbar { display: none }',
    });
    const port = globalConfig.services.apiGateway.port;
    await app.listen(port);
    const logger = app.get(src_1.LoggerService);
    logger.setContext('API.main');
    logger.info(`🌐 API Gateway is running on port ${port}`);
    logger.info(`📖 API Documentation: http://localhost:${port}/api`);
    logger.info(`🔍 Swagger UI: http://localhost:${port}/api`);
}
void bootstrap();

})();

/******/ })()
;