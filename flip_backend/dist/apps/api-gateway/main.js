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
const microservices_module_1 = __webpack_require__(/*! ./microservices/microservices.module */ "./apps/api-gateway/src/microservices/microservices.module.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
let ApiGatewayModule = class ApiGatewayModule {
};
exports.ApiGatewayModule = ApiGatewayModule;
exports.ApiGatewayModule = ApiGatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.GlobalConfigModule, src_1.LoggerModule, microservices_module_1.MicroservicesModule, auth_module_1.AuthModule],
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
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
let AuthController = AuthController_1 = class AuthController {
    authClient;
    globalConfig;
    logger = new common_1.Logger(AuthController_1.name);
    constructor(authClient, globalConfig) {
        this.authClient = authClient;
        this.globalConfig = globalConfig;
    }
    async register(createUserDto) {
        return (0, rxjs_1.firstValueFrom)(this.authClient.send({ cmd: 'register_user' }, createUserDto));
    }
    async login(loginDto) {
        return (0, rxjs_1.firstValueFrom)(this.authClient.send({ cmd: 'login_user' }, loginDto));
    }
    async googleAuth() {
    }
    async googleCallback(req, res) {
        try {
            const googleUser = req.user;
            const authResult = await (0, rxjs_1.firstValueFrom)(this.authClient.send({ cmd: 'google_login' }, googleUser));
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
        return (0, rxjs_1.firstValueFrom)(this.authClient.send({ cmd: 'google_verify_id_token' }, payload.idToken));
    }
    async validateToken(payload) {
        return (0, rxjs_1.firstValueFrom)(this.authClient.send({ cmd: 'validate_token' }, payload.token));
    }
    async refresh(payload) {
        return (0, rxjs_1.firstValueFrom)(this.authClient.send({ cmd: 'refresh_token' }, payload.refreshToken));
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
    __metadata("design:paramtypes", [typeof (_c = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
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
    __metadata("design:paramtypes", [typeof (_e = typeof auth_dto_1.LoginDto !== "undefined" && auth_dto_1.LoginDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
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
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
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
    __metadata("design:paramtypes", [Object, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
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
    __metadata("design:paramtypes", [typeof (_k = typeof auth_dto_1.VerifyGoogleIdTokenDto !== "undefined" && auth_dto_1.VerifyGoogleIdTokenDto) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
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
    __metadata("design:paramtypes", [typeof (_m = typeof auth_dto_1.TokenValidationDto !== "undefined" && auth_dto_1.TokenValidationDto) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
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
    __metadata("design:paramtypes", [typeof (_p = typeof auth_dto_1.RefreshTokenDto !== "undefined" && auth_dto_1.RefreshTokenDto) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
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
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof config_1.GlobalConfigService !== "undefined" && config_1.GlobalConfigService) === "function" ? _b : Object])
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
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [passport_1.PassportModule, microservices_module_1.MicroservicesModule],
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
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
let ServicesController = class ServicesController {
    banqueClient;
    constructor(banqueClient) {
        this.banqueClient = banqueClient;
    }
    async createService(providerId, createServiceDto) {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'create_service' }, { providerId: parseInt(providerId), createServiceDto }));
    }
    async updateService(id, updateServiceDto) {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'update_service' }, { serviceId: parseInt(id), updateServiceDto }));
    }
    async deleteService(id) {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'delete_service' }, parseInt(id)));
    }
    async confirmService(id, beneficiaryId) {
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'confirm_service' }, { serviceId: parseInt(id), beneficiaryId: parseInt(beneficiaryId) }));
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
        const cleanedFilters = {
            ...filters,
            category_id: filters.category_id ? parseInt(filters.category_id.toString()) : undefined,
            provider_id: filters.provider_id ? parseInt(filters.provider_id.toString()) : undefined,
            beneficiary_id: filters.beneficiary_id ? parseInt(filters.beneficiary_id.toString()) : undefined,
            jeton_value_min: filters.jeton_value_min ? parseInt(filters.jeton_value_min.toString()) : undefined,
            jeton_value_max: filters.jeton_value_max ? parseInt(filters.jeton_value_max.toString()) : undefined,
            created_after: filters.created_after ? new Date(filters.created_after) : undefined,
            created_before: filters.created_before ? new Date(filters.created_before) : undefined,
        };
        return (0, rxjs_1.firstValueFrom)(this.banqueClient.send({ cmd: 'find_services_with_filters' }, cleanedFilters));
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
    (0, src_1.Log)(),
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
    (0, swagger_1.ApiOperation)({ summary: 'Récupérer les détails complets d\'un service' }),
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
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
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
    __metadata("design:paramtypes", [typeof (_p = typeof service_dto_1.CreateServiceCategoryDto !== "undefined" && service_dto_1.CreateServiceCategoryDto) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
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
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
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
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
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
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
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
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
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
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
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
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
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
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
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
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
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
        description: 'Refresh token pour renouveler le token d\'accès',
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
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
    __metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], ServiceFiltersDto.prototype, "created_after", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-12-31T23:59:59.999Z', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
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
exports.UserMissionStatusEnum = exports.ServiceStatusEnum = exports.PrankTypeEnum = exports.MissionTypeEnum = exports.FriendshipStatusEnum = exports.ExecutedPrankStatusEnum = void 0;
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
var UserMissionStatusEnum;
(function (UserMissionStatusEnum) {
    UserMissionStatusEnum["NOT_STARTED"] = "not_started";
    UserMissionStatusEnum["IN_PROGRESS"] = "in_progress";
    UserMissionStatusEnum["COMPLETED_PENDING_CLAIM"] = "completed_pending_claim";
    UserMissionStatusEnum["CLAIMED"] = "claimed";
    UserMissionStatusEnum["EXPIRED"] = "expired";
})(UserMissionStatusEnum || (exports.UserMissionStatusEnum = UserMissionStatusEnum = {}));


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
async function bootstrap() {
    const app = await core_1.NestFactory.create(api_gateway_module_1.ApiGatewayModule);
    const globalConfig = app.get(config_1.GlobalConfigService);
    app.enableCors();
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