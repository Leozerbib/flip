/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/shop/src/prank-pack.service.ts":
/*!*********************************************!*\
  !*** ./apps/shop/src/prank-pack.service.ts ***!
  \*********************************************/
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrankPackService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma/prisma.service */ "./apps/shop/src/prisma/prisma.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
let PrankPackService = class PrankPackService {
    prisma;
    logger;
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
        this.logger.setContext('PrankPack.service');
    }
    async getAvailablePacksGroupedByType() {
        this.logger.info('Récupération des packs disponibles groupés par type');
        const currentDate = new Date();
        const packs = await this.prisma.prank_packs.findMany({
            where: {
                is_available: true,
                OR: [
                    { available_from: { lte: currentDate }, available_until: { gte: currentDate } },
                    { available_from: null, available_until: null },
                    { available_from: { lte: currentDate }, available_until: null },
                    { available_from: null, available_until: { gte: currentDate } },
                ],
            },
            orderBy: [{ required_user_level: 'asc' }, { cost_amount: 'asc' }],
        });
        this.logger.info(`${packs.length} packs disponibles trouvés`);
        const groupedPacks = {
            basic: [],
            event: [],
            limited: [],
            gift: [],
            promotional: [],
        };
        for (const pack of packs) {
            const mappedPack = this.mapPrankPackToInterface(pack);
            const packType = pack.pack_type ?? 'basic';
            if (groupedPacks[packType]) {
                groupedPacks[packType].push(mappedPack);
            }
        }
        return groupedPacks;
    }
    async getAvailablePacks() {
        this.logger.info('Récupération des packs disponibles');
        const currentDate = new Date();
        const packs = await this.prisma.prank_packs.findMany({
            where: {
                is_available: true,
                OR: [
                    { available_from: { lte: currentDate }, available_until: { gte: currentDate } },
                    { available_from: null, available_until: null },
                    { available_from: { lte: currentDate }, available_until: null },
                    { available_from: null, available_until: { gte: currentDate } },
                ],
            },
            orderBy: [{ required_user_level: 'asc' }, { cost_amount: 'asc' }],
        });
        this.logger.info(`${packs.length} packs disponibles trouvés`);
        return packs.map(pack => this.mapPrankPackToInterface(pack));
    }
    async getPackAvailablePranks(packId) {
        this.logger.info('Récupération des pranks disponibles pour le pack', {
            packId: packId.toString(),
        });
        const pack = await this.prisma.prank_packs.findUnique({
            where: { pack_id: packId },
            include: {
                pack_prank_pool: {
                    include: {
                        pranks: true,
                    },
                },
            },
        });
        if (!pack) {
            this.logger.warn('Pack non trouvé', { packId: packId.toString() });
            return null;
        }
        const pranksByRarity = {
            common: [],
            rare: [],
            extreme: [],
        };
        for (const poolEntry of pack.pack_prank_pool) {
            const prank = poolEntry.pranks;
            if (!prank.is_active) {
                continue;
            }
            const awardedPrank = {
                prank_id: prank.prank_id,
                name: prank.name,
                rarity: prank.rarity,
                description: prank.description,
                image_url: prank.image_url ?? undefined,
                quantity_awarded: 1,
                is_new: false,
            };
            pranksByRarity[prank.rarity].push(awardedPrank);
        }
        return {
            pack_id: pack.pack_id,
            pack_name: pack.name,
            available_pranks_by_rarity: pranksByRarity,
        };
    }
    async openMultiplePacks(userId, packId, quantity) {
        this.logger.info("Tentative d'ouverture de packs multiples", {
            userId: userId.toString(),
            packId: packId.toString(),
            quantity: quantity.toString(),
        });
        return await this.prisma.$transaction(async (prisma) => {
            const pack = await prisma.prank_packs.findUnique({
                where: { pack_id: packId },
            });
            if (!pack) {
                return {
                    success: false,
                    error_code: 'PACK_NOT_FOUND',
                    error_message: `Le pack avec l'ID ${packId} n'existe pas.`,
                };
            }
            const currentDate = new Date();
            const isAvailable = pack.is_available &&
                (!pack.available_from || pack.available_from <= currentDate) &&
                (!pack.available_until || pack.available_until >= currentDate);
            if (!isAvailable) {
                return {
                    success: false,
                    error_code: 'PACK_NOT_AVAILABLE',
                    error_message: `Le pack "${pack.name}" n'est pas disponible actuellement.`,
                };
            }
            const user = await prisma.users.findUnique({
                where: { user_id: parseInt(userId.toString()) },
                select: {
                    user_id: true,
                    username: true,
                    level: true,
                    game_coins: true,
                },
            });
            if (!user) {
                return {
                    success: false,
                    error_code: 'PACK_NOT_FOUND',
                    error_message: 'Utilisateur non trouvé.',
                };
            }
            if (pack.required_user_level && user.level < pack.required_user_level) {
                return {
                    success: false,
                    error_code: 'INSUFFICIENT_LEVEL',
                    error_message: `Niveau ${pack.required_user_level} requis pour ouvrir ce pack. Votre niveau actuel: ${user.level}.`,
                };
            }
            const totalCost = pack.cost_amount * quantity;
            if (pack.cost_currency_type === 'game_coins' && user.game_coins < totalCost) {
                return {
                    success: false,
                    error_code: 'INSUFFICIENT_CURRENCY',
                    error_message: `Coins insuffisants. Requis: ${totalCost}, disponible: ${user.game_coins}.`,
                };
            }
            if (pack.cost_currency_type === 'game_coins') {
                await prisma.users.update({
                    where: { user_id: parseInt(userId.toString()) },
                    data: { game_coins: user.game_coins - totalCost },
                });
            }
            const allBoosters = [];
            for (let packIndex = 0; packIndex < quantity; packIndex++) {
                const boosterResult = await this.openSingleBooster(prisma, userId, packId, pack, packIndex + 1);
                if (!boosterResult.success) {
                    this.logger.warn(`Erreur lors de l'ouverture du pack ${packIndex + 1}`);
                    continue;
                }
                allBoosters.push(...boosterResult.boosters);
            }
            const updatedUser = await prisma.users.findUnique({
                where: { user_id: parseInt(userId.toString()) },
                select: { game_coins: true },
            });
            if (!updatedUser) {
                return {
                    success: false,
                    error_code: 'PACK_NOT_FOUND',
                    error_message: 'Erreur lors de la récupération des données utilisateur.',
                };
            }
            this.logger.info('Packs multiples ouverts avec succès', {
                userId: userId.toString(),
                packId: packId.toString(),
                quantity: quantity.toString(),
                totalBoostersOpened: allBoosters.length.toString(),
            });
            return {
                success: true,
                total_packs_opened: quantity,
                all_boosters: allBoosters,
                remaining_currency: {
                    game_coins: updatedUser.game_coins,
                },
                pack_info: {
                    pack_id: pack.pack_id,
                    name: pack.name,
                    cost_amount: pack.cost_amount,
                    cost_currency_type: pack.cost_currency_type,
                },
            };
        });
    }
    async openPack(userId, packId) {
        this.logger.info("Tentative d'ouverture de pack", {
            userId: userId.toString(),
            packId: packId.toString(),
        });
        return await this.prisma.$transaction(async (prisma) => {
            const pack = await prisma.prank_packs.findUnique({
                where: { pack_id: packId },
            });
            if (!pack) {
                return {
                    success: false,
                    error_code: 'PACK_NOT_FOUND',
                    error_message: `Le pack avec l'ID ${packId} n'existe pas.`,
                };
            }
            const currentDate = new Date();
            const isAvailable = pack.is_available &&
                (!pack.available_from || pack.available_from <= currentDate) &&
                (!pack.available_until || pack.available_until >= currentDate);
            if (!isAvailable) {
                return {
                    success: false,
                    error_code: 'PACK_NOT_AVAILABLE',
                    error_message: `Le pack "${pack.name}" n'est pas disponible actuellement.`,
                };
            }
            const user = await prisma.users.findUnique({
                where: { user_id: parseInt(userId.toString()) },
                select: {
                    user_id: true,
                    username: true,
                    level: true,
                    game_coins: true,
                },
            });
            if (!user) {
                return {
                    success: false,
                    error_code: 'PACK_NOT_FOUND',
                    error_message: 'Utilisateur non trouvé.',
                };
            }
            if (pack.required_user_level && user.level < pack.required_user_level) {
                return {
                    success: false,
                    error_code: 'INSUFFICIENT_LEVEL',
                    error_message: `Niveau ${pack.required_user_level} requis pour ouvrir ce pack. Votre niveau actuel: ${user.level}.`,
                };
            }
            if (pack.cost_currency_type === 'game_coins' && user.game_coins < pack.cost_amount) {
                return {
                    success: false,
                    error_code: 'INSUFFICIENT_CURRENCY',
                    error_message: `Coins insuffisants. Requis: ${pack.cost_amount}, disponible: ${user.game_coins}.`,
                };
            }
            if (pack.cost_currency_type === 'game_coins') {
                await prisma.users.update({
                    where: { user_id: parseInt(userId.toString()) },
                    data: { game_coins: user.game_coins - pack.cost_amount },
                });
            }
            const boosterResult = await this.openSingleBooster(prisma, userId, packId, pack, 1);
            if (!boosterResult.success) {
                return boosterResult;
            }
            const updatedUser = await prisma.users.findUnique({
                where: { user_id: parseInt(userId.toString()) },
                select: { game_coins: true },
            });
            if (!updatedUser) {
                return {
                    success: false,
                    error_code: 'PACK_NOT_FOUND',
                    error_message: 'Erreur lors de la récupération des données utilisateur.',
                };
            }
            return {
                success: true,
                boosters: boosterResult.boosters,
                remaining_currency: {
                    game_coins: updatedUser.game_coins,
                },
                pack_info: {
                    pack_id: pack.pack_id,
                    name: pack.name,
                    cost_amount: pack.cost_amount,
                    cost_currency_type: pack.cost_currency_type,
                },
            };
        });
    }
    async openSingleBooster(prisma, userId, packId, pack, boosterNumber) {
        const awardedPranks = [];
        const rarityProbabilities = pack.rarity_probabilities;
        for (let i = 0; i < pack.number_of_pranks_awarded; i++) {
            const isLastCard = i === pack.number_of_pranks_awarded - 1;
            const probTable = isLastCard && rarityProbabilities.last_card
                ? rarityProbabilities.last_card
                : rarityProbabilities.basic;
            const rarity = this.selectRarityByProbability(probTable);
            const availablePranks = await prisma.pranks.findMany({
                where: {
                    rarity: rarity.toString(),
                    is_active: true,
                    pack_prank_pool: {
                        some: {
                            pack_id: packId,
                        },
                    },
                },
            });
            if (availablePranks.length === 0) {
                this.logger.error(`Aucun prank actif trouvé pour la rareté ${rarity} dans le pack ${packId}`);
                return {
                    success: false,
                    error_code: 'NO_ACTIVE_PRANKS',
                    error_message: `Aucun prank actif disponible pour la rareté ${rarity} dans ce pack.`,
                };
            }
            const selectedPrank = availablePranks[Math.floor(Math.random() * availablePranks.length)];
            const existingUserPrank = await prisma.user_pranks.findUnique({
                where: {
                    user_id_prank_id: {
                        user_id: parseInt(userId.toString()),
                        prank_id: selectedPrank.prank_id,
                    },
                },
            });
            let isNew = false;
            if (existingUserPrank) {
                await prisma.user_pranks.update({
                    where: {
                        user_id_prank_id: {
                            user_id: parseInt(userId.toString()),
                            prank_id: selectedPrank.prank_id,
                        },
                    },
                    data: { quantity: existingUserPrank.quantity + 1 },
                });
            }
            else {
                await prisma.user_pranks.create({
                    data: {
                        user_id: parseInt(userId.toString()),
                        prank_id: selectedPrank.prank_id,
                        quantity: 1,
                    },
                });
                isNew = true;
            }
            await prisma.pack_opening_log.create({
                data: {
                    user_id: parseInt(userId.toString()),
                    pack_id: packId,
                    prank_id: selectedPrank.prank_id,
                    rarity_awarded: rarity,
                },
            });
            awardedPranks.push({
                prank_id: selectedPrank.prank_id,
                name: selectedPrank.name,
                rarity: selectedPrank.rarity,
                description: selectedPrank.description,
                image_url: selectedPrank.image_url ?? undefined,
                quantity_awarded: 1,
                is_new: isNew,
            });
        }
        const boosterResult = {
            booster_id: boosterNumber,
            booster_name: `${pack.name} - Booster ${boosterNumber}`,
            awarded_pranks: awardedPranks,
        };
        return {
            success: true,
            boosters: [boosterResult],
            remaining_currency: { game_coins: 0 },
            pack_info: {
                pack_id: pack.pack_id,
                name: pack.name,
                cost_amount: pack.cost_amount,
                cost_currency_type: pack.cost_currency_type,
            },
        };
    }
    selectRarityByProbability(probabilities) {
        const random = Math.random();
        let cumulative = 0;
        const entries = [
            ['common', probabilities.common],
            ['rare', probabilities.rare],
            ['extreme', probabilities.extreme],
        ];
        for (const [rarity, probability] of entries) {
            cumulative += probability;
            if (random <= cumulative) {
                return rarity;
            }
        }
        return client_1.prank_rarity_enum.common;
    }
    mapPrankPackToInterface(pack) {
        return {
            pack_id: pack.pack_id,
            name: pack.name,
            description: pack.description ?? undefined,
            image_url: pack.image_url ?? undefined,
            cost_currency_type: pack.cost_currency_type,
            cost_amount: pack.cost_amount,
            number_of_pranks_awarded: pack.number_of_pranks_awarded,
            rarity_probabilities: pack.rarity_probabilities,
            is_available: pack.is_available ?? undefined,
            available_from: pack.available_from ?? undefined,
            available_until: pack.available_until ?? undefined,
            required_user_level: pack.required_user_level ?? undefined,
            created_at: pack.created_at ?? undefined,
            updated_at: pack.updated_at ?? undefined,
            pack_type: pack.pack_type,
        };
    }
};
exports.PrankPackService = PrankPackService;
exports.PrankPackService = PrankPackService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _b : Object])
], PrankPackService);


/***/ }),

/***/ "./apps/shop/src/prisma/prisma.module.ts":
/*!***********************************************!*\
  !*** ./apps/shop/src/prisma/prisma.module.ts ***!
  \***********************************************/
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
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./apps/shop/src/prisma/prisma.service.ts");
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

/***/ "./apps/shop/src/prisma/prisma.service.ts":
/*!************************************************!*\
  !*** ./apps/shop/src/prisma/prisma.service.ts ***!
  \************************************************/
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
        console.log('✅ Connexion à la base de données PostgreSQL établie (Shop Service)');
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),

/***/ "./apps/shop/src/shop.controller.ts":
/*!******************************************!*\
  !*** ./apps/shop/src/shop.controller.ts ***!
  \******************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShopController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const shop_service_1 = __webpack_require__(/*! ./shop.service */ "./apps/shop/src/shop.service.ts");
const prank_pack_service_1 = __webpack_require__(/*! ./prank-pack.service */ "./apps/shop/src/prank-pack.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
let ShopController = class ShopController {
    shopService;
    prankPackService;
    logger;
    constructor(shopService, prankPackService, logger) {
        this.shopService = shopService;
        this.prankPackService = prankPackService;
        this.logger = logger;
        this.logger.setContext('Shop.controller');
    }
    async getAvailablePrankPacks() {
        this.logger.info('Récupération des packs de pranks disponibles (microservice)');
        return this.prankPackService.getAvailablePacks();
    }
    async getAvailablePrankPacksGrouped() {
        this.logger.info('Récupération des packs de pranks groupés par type (microservice)');
        return this.prankPackService.getAvailablePacksGroupedByType();
    }
    async getPackAvailablePranks(payload) {
        this.logger.info('Récupération des pranks disponibles dans un pack (microservice)', {
            packId: payload.packId.toString(),
        });
        return this.prankPackService.getPackAvailablePranks(payload.packId);
    }
    async openPrankPack(payload) {
        this.logger.info('Ouverture de pack de pranks (microservice)', {
            userId: payload.userId.toString(),
            packId: payload.packId.toString(),
        });
        return this.prankPackService.openPack(payload.userId, payload.packId);
    }
    async openMultiplePrankPacks(payload) {
        this.logger.info('Ouverture de packs multiples de pranks (microservice)', {
            userId: payload.userId.toString(),
            packId: payload.packId.toString(),
            quantity: payload.quantity.toString(),
        });
        return this.prankPackService.openMultiplePacks(payload.userId, payload.packId, payload.quantity);
    }
};
exports.ShopController = ShopController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_available_prank_packs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ShopController.prototype, "getAvailablePrankPacks", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_available_prank_packs_grouped' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ShopController.prototype, "getAvailablePrankPacksGrouped", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_pack_available_pranks' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ShopController.prototype, "getPackAvailablePranks", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'open_prank_pack' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ShopController.prototype, "openPrankPack", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'open_multiple_prank_packs' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ShopController.prototype, "openMultiplePrankPacks", null);
exports.ShopController = ShopController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof shop_service_1.ShopService !== "undefined" && shop_service_1.ShopService) === "function" ? _a : Object, typeof (_b = typeof prank_pack_service_1.PrankPackService !== "undefined" && prank_pack_service_1.PrankPackService) === "function" ? _b : Object, typeof (_c = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _c : Object])
], ShopController);


/***/ }),

/***/ "./apps/shop/src/shop.module.ts":
/*!**************************************!*\
  !*** ./apps/shop/src/shop.module.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShopModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const shop_controller_1 = __webpack_require__(/*! ./shop.controller */ "./apps/shop/src/shop.controller.ts");
const shop_service_1 = __webpack_require__(/*! ./shop.service */ "./apps/shop/src/shop.service.ts");
const prank_pack_service_1 = __webpack_require__(/*! ./prank-pack.service */ "./apps/shop/src/prank-pack.service.ts");
const prisma_module_1 = __webpack_require__(/*! ./prisma/prisma.module */ "./apps/shop/src/prisma/prisma.module.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
let ShopModule = class ShopModule {
};
exports.ShopModule = ShopModule;
exports.ShopModule = ShopModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, src_1.LoggerModule],
        controllers: [shop_controller_1.ShopController],
        providers: [shop_service_1.ShopService, prank_pack_service_1.PrankPackService],
    })
], ShopModule);


/***/ }),

/***/ "./apps/shop/src/shop.service.ts":
/*!***************************************!*\
  !*** ./apps/shop/src/shop.service.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ShopService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let ShopService = class ShopService {
    getHello() {
        return 'Hello World!';
    }
};
exports.ShopService = ShopService;
exports.ShopService = ShopService = __decorate([
    (0, common_1.Injectable)()
], ShopService);


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

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

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
/*!*******************************!*\
  !*** ./apps/shop/src/main.ts ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const shop_module_1 = __webpack_require__(/*! ./shop.module */ "./apps/shop/src/shop.module.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(shop_module_1.ShopModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: process.env.SHOP_SERVICE_HOST ?? 'localhost',
            port: parseInt(process.env.SHOP_SERVICE_PORT ?? '4005'),
        },
    });
    const logger = app.get(src_1.LoggerService);
    logger.setContext('Shop.main');
    await app.listen();
    logger.info(`🛒 Shop Service is running on port ${process.env.SHOP_SERVICE_PORT ?? '4005'}`);
}
bootstrap().catch(error => {
    console.error('❌ Erreur lors du démarrage du Shop Service:', error);
    process.exit(1);
});

})();

/******/ })()
;