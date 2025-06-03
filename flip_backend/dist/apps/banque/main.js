/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/banque/src/banque.controller.ts":
/*!**********************************************!*\
  !*** ./apps/banque/src/banque.controller.ts ***!
  \**********************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BanqueController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const banque_service_1 = __webpack_require__(/*! ./banque.service */ "./apps/banque/src/banque.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const service_dto_1 = __webpack_require__(/*! @app/contracts/Service/dtos/service.dto */ "./libs/contracts/src/Service/dtos/service.dto.ts");
const service_interface_1 = __webpack_require__(/*! @app/contracts/Service/interfaces/service.interface */ "./libs/contracts/src/Service/interfaces/service.interface.ts");
let BanqueController = class BanqueController {
    banqueService;
    logger;
    constructor(banqueService, logger) {
        this.banqueService = banqueService;
        this.logger = logger;
        this.logger.setContext('Banque.controller');
    }
    async createService(payload) {
        this.logger.info('Création service (microservice)', {
            providerId: payload.providerId,
            beneficiaryId: payload.createServiceDto.beneficiary_id,
        });
        return this.banqueService.createService(payload.providerId, payload.createServiceDto);
    }
    async updateService(payload) {
        this.logger.info('Mise à jour service (microservice)', { serviceId: payload.serviceId });
        return this.banqueService.updateService(payload.serviceId, payload.updateServiceDto);
    }
    async deleteService(serviceId) {
        this.logger.info('Suppression service (microservice)', { serviceId });
        return this.banqueService.deleteService(serviceId);
    }
    async confirmService(payload) {
        this.logger.info('Confirmation service (microservice)', {
            serviceId: payload.serviceId,
            beneficiaryId: payload.beneficiaryId,
        });
        return this.banqueService.confirmService(payload.serviceId, payload.beneficiaryId);
    }
    async repayServiceWithService(payload) {
        this.logger.info('Remboursement service par service (microservice)', {
            serviceId: payload.serviceId,
            repaymentServiceId: payload.repaymentServiceId,
        });
        return this.banqueService.repayServiceWithService(payload.serviceId, payload.repaymentServiceId);
    }
    async findServiceById(serviceId) {
        this.logger.info('Recherche service par ID (microservice)', { serviceId });
        return this.banqueService.findServiceById(serviceId);
    }
    async getServiceWithDetails(serviceId) {
        this.logger.info('Récupération détails service (microservice)', { serviceId });
        return this.banqueService.getServiceWithDetails(serviceId);
    }
    async findServicesWithFilters(filters) {
        this.logger.info('Recherche services avec filtres (microservice)', { filters });
        return this.banqueService.findServicesWithFilters(filters);
    }
    async getServiceStats() {
        this.logger.info('Récupération statistiques services (microservice)');
        return this.banqueService.getServiceStats();
    }
    async createServiceCategory(createCategoryDto) {
        this.logger.info('Création catégorie service (microservice)', { name: createCategoryDto.name });
        return this.banqueService.createServiceCategory(createCategoryDto);
    }
    async getAllServiceCategories() {
        this.logger.info('Récupération toutes catégories (microservice)');
        return this.banqueService.getAllServiceCategories();
    }
    async getServiceCategoryById(categoryId) {
        this.logger.info('Récupération catégorie par ID (microservice)', { categoryId });
        return this.banqueService.getServiceCategoryById(categoryId);
    }
    async health() {
        this.logger.info('Health check (microservice)');
        return {
            status: 'healthy',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.BanqueController = BanqueController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], BanqueController.prototype, "createService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], BanqueController.prototype, "updateService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], BanqueController.prototype, "deleteService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'confirm_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], BanqueController.prototype, "confirmService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'repay_service_with_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], BanqueController.prototype, "repayServiceWithService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_service_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], BanqueController.prototype, "findServiceById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_service_with_details' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], BanqueController.prototype, "getServiceWithDetails", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_services_with_filters' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof service_interface_1.IServiceFilters !== "undefined" && service_interface_1.IServiceFilters) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], BanqueController.prototype, "findServicesWithFilters", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_service_stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], BanqueController.prototype, "getServiceStats", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_service_category' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof service_dto_1.CreateServiceCategoryDto !== "undefined" && service_dto_1.CreateServiceCategoryDto) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], BanqueController.prototype, "createServiceCategory", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_all_service_categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], BanqueController.prototype, "getAllServiceCategories", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_service_category_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], BanqueController.prototype, "getServiceCategoryById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'banque_service_health' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], BanqueController.prototype, "health", null);
exports.BanqueController = BanqueController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof banque_service_1.BanqueService !== "undefined" && banque_service_1.BanqueService) === "function" ? _a : Object, typeof (_b = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _b : Object])
], BanqueController);


/***/ }),

/***/ "./apps/banque/src/banque.module.ts":
/*!******************************************!*\
  !*** ./apps/banque/src/banque.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BanqueModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const banque_controller_1 = __webpack_require__(/*! ./banque.controller */ "./apps/banque/src/banque.controller.ts");
const banque_service_1 = __webpack_require__(/*! ./banque.service */ "./apps/banque/src/banque.service.ts");
const health_controller_1 = __webpack_require__(/*! ./health/health.controller */ "./apps/banque/src/health/health.controller.ts");
const prisma_module_1 = __webpack_require__(/*! ./prisma/prisma.module */ "./apps/banque/src/prisma/prisma.module.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const config_1 = __webpack_require__(/*! @app/config */ "./libs/config/src/index.ts");
let BanqueModule = class BanqueModule {
};
exports.BanqueModule = BanqueModule;
exports.BanqueModule = BanqueModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.GlobalConfigModule, src_1.LoggerModule, prisma_module_1.PrismaModule],
        controllers: [banque_controller_1.BanqueController, health_controller_1.HealthController],
        providers: [banque_service_1.BanqueService],
        exports: [banque_service_1.BanqueService],
    })
], BanqueModule);


/***/ }),

/***/ "./apps/banque/src/banque.service.ts":
/*!*******************************************!*\
  !*** ./apps/banque/src/banque.service.ts ***!
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BanqueService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma/prisma.service */ "./apps/banque/src/prisma/prisma.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const common_types_1 = __webpack_require__(/*! @app/contracts/types/common.types */ "./libs/contracts/src/types/common.types.ts");
let BanqueService = class BanqueService {
    prisma;
    logger;
    constructor(prisma, logger) {
        this.prisma = prisma;
        this.logger = logger;
        this.logger.setContext('Banque.service');
    }
    async createService(providerId, createServiceDto) {
        this.logger.info("Création d'un nouveau service", {
            providerId,
            beneficiaryId: createServiceDto.beneficiary_id,
            jetonValue: createServiceDto.jeton_value,
        });
        const [provider, beneficiary] = await Promise.all([
            this.prisma.user.findUnique({ where: { user_id: providerId } }),
            this.prisma.user.findUnique({ where: { user_id: createServiceDto.beneficiary_id } }),
        ]);
        if (!provider) {
            throw new common_1.NotFoundException('Fournisseur de service non trouvé');
        }
        if (!beneficiary) {
            throw new common_1.NotFoundException('Bénéficiaire du service non trouvé');
        }
        if (providerId === createServiceDto.beneficiary_id) {
            throw new common_1.BadRequestException('Un utilisateur ne peut pas se rendre service à lui-même');
        }
        if (createServiceDto.category_id) {
            const category = await this.prisma.service_categories.findUnique({
                where: { category_id: createServiceDto.category_id },
            });
            if (!category) {
                throw new common_1.NotFoundException('Catégorie de service non trouvée');
            }
        }
        try {
            const service = await this.prisma.services.create({
                data: {
                    provider_id: providerId,
                    beneficiary_id: createServiceDto.beneficiary_id,
                    category_id: createServiceDto.category_id,
                    description: createServiceDto.description,
                    jeton_value: createServiceDto.jeton_value,
                    status: common_types_1.ServiceStatusEnum.PENDING_CONFIRMATION,
                },
            });
            this.logger.info('Service créé avec succès', { serviceId: service.service_id });
            return service;
        }
        catch (error) {
            this.logger.error('Erreur lors de la création du service', error);
            throw new common_1.BadRequestException('Erreur lors de la création du service');
        }
    }
    async updateService(serviceId, updateServiceDto) {
        this.logger.info('Mise à jour du service', { serviceId });
        const service = await this.findServiceById(serviceId);
        if (!service) {
            throw new common_1.NotFoundException('Service non trouvé');
        }
        if (service.status !== common_types_1.ServiceStatusEnum.PENDING_CONFIRMATION) {
            throw new common_1.ForbiddenException('Ce service ne peut plus être modifié');
        }
        if (updateServiceDto.category_id) {
            const category = await this.prisma.service_categories.findUnique({
                where: { category_id: updateServiceDto.category_id },
            });
            if (!category) {
                throw new common_1.NotFoundException('Catégorie de service non trouvée');
            }
        }
        try {
            const updatedService = await this.prisma.services.update({
                where: { service_id: serviceId },
                data: {
                    ...updateServiceDto,
                    updated_at: new Date(),
                },
            });
            this.logger.info('Service mis à jour avec succès', { serviceId });
            return updatedService;
        }
        catch (error) {
            this.logger.error('Erreur lors de la mise à jour', error);
            throw new common_1.BadRequestException('Erreur lors de la mise à jour');
        }
    }
    async deleteService(serviceId) {
        this.logger.info('Suppression du service', { serviceId });
        const service = await this.findServiceById(serviceId);
        if (!service) {
            throw new common_1.NotFoundException('Service non trouvé');
        }
        if (service.status !== common_types_1.ServiceStatusEnum.PENDING_CONFIRMATION) {
            throw new common_1.ForbiddenException('Ce service ne peut plus être supprimé');
        }
        try {
            await this.prisma.services.delete({
                where: { service_id: serviceId },
            });
            this.logger.info('Service supprimé avec succès', { serviceId });
            return { message: 'Service supprimé avec succès' };
        }
        catch (error) {
            this.logger.error('Erreur lors de la suppression', error);
            throw new common_1.BadRequestException('Erreur lors de la suppression');
        }
    }
    async confirmService(serviceId, beneficiaryId) {
        this.logger.info('Confirmation du service', { serviceId, beneficiaryId });
        const service = await this.findServiceById(serviceId);
        if (!service) {
            throw new common_1.NotFoundException('Service non trouvé');
        }
        if (service.beneficiary_id !== beneficiaryId) {
            throw new common_1.ForbiddenException('Seul le bénéficiaire peut confirmer ce service');
        }
        if (service.status !== common_types_1.ServiceStatusEnum.PENDING_CONFIRMATION) {
            throw new common_1.BadRequestException('Ce service ne peut plus être confirmé');
        }
        try {
            const confirmedService = await this.prisma.services.update({
                where: { service_id: serviceId },
                data: {
                    status: common_types_1.ServiceStatusEnum.CONFIRMED_UNPAID,
                    confirmed_at: new Date(),
                    updated_at: new Date(),
                },
            });
            this.logger.info('Service confirmé avec succès', { serviceId });
            return confirmedService;
        }
        catch (error) {
            this.logger.error('Erreur lors de la confirmation', error);
            throw new common_1.BadRequestException('Erreur lors de la confirmation');
        }
    }
    async repayServiceWithService(serviceId, repaymentServiceId) {
        this.logger.info('Remboursement du service par un autre service', {
            serviceId,
            repaymentServiceId,
        });
        const [service, repaymentService] = await Promise.all([
            this.findServiceById(serviceId),
            this.findServiceById(repaymentServiceId),
        ]);
        if (!service) {
            throw new common_1.NotFoundException('Service original non trouvé');
        }
        if (!repaymentService) {
            throw new common_1.NotFoundException('Service de remboursement non trouvé');
        }
        if (service.status !== common_types_1.ServiceStatusEnum.CONFIRMED_UNPAID) {
            throw new common_1.BadRequestException('Le service doit être confirmé et non payé pour être remboursé');
        }
        if (repaymentService.status !== common_types_1.ServiceStatusEnum.CONFIRMED_UNPAID) {
            throw new common_1.BadRequestException('Le service de remboursement doit être confirmé');
        }
        if (service.beneficiary_id !== repaymentService.provider_id) {
            throw new common_1.BadRequestException('Le débiteur du service original doit fournir le service de remboursement');
        }
        try {
            const repaidService = await this.prisma.services.update({
                where: { service_id: serviceId },
                data: {
                    status: common_types_1.ServiceStatusEnum.REPAID_BY_SERVICE,
                    repayment_service_id: repaymentServiceId,
                    repaid_at: new Date(),
                    updated_at: new Date(),
                },
            });
            this.logger.info('Service remboursé avec succès', { serviceId, repaymentServiceId });
            return repaidService;
        }
        catch (error) {
            this.logger.error('Erreur lors du remboursement', error);
            throw new common_1.BadRequestException('Erreur lors du remboursement');
        }
    }
    async findServiceById(serviceId) {
        try {
            const service = await this.prisma.services.findUnique({
                where: { service_id: serviceId },
            });
            return service;
        }
        catch (error) {
            this.logger.error('Erreur lors de la recherche par ID', error);
            return null;
        }
    }
    async getServiceWithDetails(serviceId) {
        this.logger.info('Récupération des détails du service', { serviceId });
        try {
            const service = await this.prisma.services.findUnique({
                where: { service_id: serviceId },
                include: {
                    users_services_provider_idTousers: {
                        select: {
                            user_id: true,
                            username: true,
                            profile_picture_url: true,
                        },
                    },
                    users_services_beneficiary_idTousers: {
                        select: {
                            user_id: true,
                            username: true,
                            profile_picture_url: true,
                        },
                    },
                    service_categories: true,
                    services: true,
                    executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks: {
                        include: {
                            pranks: {
                                select: {
                                    prank_id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });
            if (!service) {
                return null;
            }
            const result = {
                ...service,
                provider: {
                    user_id: service.users_services_provider_idTousers.user_id,
                    username: service.users_services_provider_idTousers.username,
                    profile_picture_url: service.users_services_provider_idTousers.profile_picture_url ?? '',
                },
                beneficiary: {
                    user_id: service.users_services_beneficiary_idTousers.user_id,
                    username: service.users_services_beneficiary_idTousers.username,
                    profile_picture_url: service.users_services_beneficiary_idTousers.profile_picture_url ?? '',
                },
                category: service.service_categories,
                repayment_service: service.services,
                executed_prank_repayment: service.executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks
                    ? {
                        executed_prank_id: service.executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks
                            .executed_prank_id,
                        chosen_prank_id: service.executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks
                            .chosen_prank_id,
                        prank_name: service.executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks
                            .pranks.name,
                    }
                    : undefined,
            };
            return result;
        }
        catch (error) {
            this.logger.error('Erreur lors de la récupération des détails', error);
            return null;
        }
    }
    async findServicesWithFilters(filters) {
        this.logger.info('Recherche de services avec filtres', { filters });
        const whereClause = {};
        if (filters.status) {
            whereClause.status = filters.status;
        }
        if (filters.category_id) {
            whereClause.category_id = filters.category_id;
        }
        if (filters.provider_id) {
            whereClause.provider_id = filters.provider_id;
        }
        if (filters.beneficiary_id) {
            whereClause.beneficiary_id = filters.beneficiary_id;
        }
        if (filters.jeton_value_min || filters.jeton_value_max) {
            whereClause.jeton_value = {};
            if (filters.jeton_value_min) {
                whereClause.jeton_value.gte = filters.jeton_value_min;
            }
            if (filters.jeton_value_max) {
                whereClause.jeton_value.lte = filters.jeton_value_max;
            }
        }
        if (filters.created_after || filters.created_before) {
            whereClause.created_at = {};
            if (filters.created_after) {
                whereClause.created_at.gte = filters.created_after;
            }
            if (filters.created_before) {
                whereClause.created_at.lte = filters.created_before;
            }
        }
        try {
            const services = await this.prisma.services.findMany({
                where: whereClause,
                include: {
                    users_services_provider_idTousers: {
                        select: {
                            user_id: true,
                            username: true,
                            profile_picture_url: true,
                        },
                    },
                    users_services_beneficiary_idTousers: {
                        select: {
                            user_id: true,
                            username: true,
                            profile_picture_url: true,
                        },
                    },
                    service_categories: true,
                    services: true,
                    executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks: {
                        include: {
                            pranks: {
                                select: {
                                    prank_id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            return services.map(service => ({
                ...service,
                provider: {
                    user_id: service.users_services_provider_idTousers.user_id,
                    username: service.users_services_provider_idTousers.username,
                    profile_picture_url: service.users_services_provider_idTousers.profile_picture_url,
                },
                beneficiary: {
                    user_id: service.users_services_beneficiary_idTousers.user_id,
                    username: service.users_services_beneficiary_idTousers.username,
                    profile_picture_url: service.users_services_beneficiary_idTousers.profile_picture_url,
                },
                category: service.service_categories,
                repayment_service: service.services,
                executed_prank_repayment: service.executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks
                    ? {
                        executed_prank_id: service.executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks
                            .executed_prank_id,
                        chosen_prank_id: service.executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks
                            .chosen_prank_id,
                        prank_name: service.executed_pranks_services_executed_prank_id_repaymentToexecuted_pranks
                            .pranks.name,
                    }
                    : undefined,
            }));
        }
        catch (e) {
            this.logger.error('Erreur lors de la recherche filtrée', e);
            return [];
        }
    }
    async getServiceStats() {
        this.logger.info('Récupération des statistiques des services');
        try {
            const [totalServices, statusStats, valueStats] = await Promise.all([
                this.prisma.services.count(),
                this.prisma.services.groupBy({
                    by: ['status'],
                    _count: {
                        service_id: true,
                    },
                }),
                this.prisma.services.aggregate({
                    _sum: {
                        jeton_value: true,
                    },
                    _avg: {
                        jeton_value: true,
                    },
                }),
            ]);
            const pendingServices = statusStats.find(s => s.status === common_types_1.ServiceStatusEnum.PENDING_CONFIRMATION)?._count
                .service_id ?? 0;
            const confirmedServices = statusStats.find(s => s.status === common_types_1.ServiceStatusEnum.CONFIRMED_UNPAID)?._count.service_id ??
                0;
            const repaidServices = statusStats
                .filter(s => s.status === common_types_1.ServiceStatusEnum.REPAID_BY_SERVICE ||
                s.status === common_types_1.ServiceStatusEnum.REPAID_BY_PRANK)
                .reduce((sum, s) => sum + s._count.service_id, 0);
            return {
                total_services: totalServices,
                pending_services: pendingServices,
                confirmed_services: confirmedServices,
                repaid_services: repaidServices,
                total_jeton_value: valueStats._sum.jeton_value ?? 0,
                average_jeton_value: Math.round(valueStats._avg.jeton_value ?? 0),
            };
        }
        catch (error) {
            this.logger.error('Erreur lors de la récupération des statistiques', error);
            throw new common_1.BadRequestException('Erreur lors de la récupération des statistiques');
        }
    }
    async createServiceCategory(createCategoryDto) {
        this.logger.info("Création d'une catégorie de service", { name: createCategoryDto.name });
        try {
            const category = await this.prisma.service_categories.create({
                data: createCategoryDto,
            });
            this.logger.info('Catégorie créée avec succès', { categoryId: category.category_id });
            return category;
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Une catégorie avec ce nom existe déjà');
            }
            this.logger.error('Erreur lors de la création de la catégorie', error);
            throw new common_1.BadRequestException('Erreur lors de la création de la catégorie');
        }
    }
    async getAllServiceCategories() {
        try {
            return (await this.prisma.service_categories.findMany({
                orderBy: {
                    name: 'asc',
                },
            }));
        }
        catch (error) {
            this.logger.error('Erreur lors de la récupération des catégories', error);
            return [];
        }
    }
    async getServiceCategoryById(categoryId) {
        try {
            return (await this.prisma.service_categories.findUnique({
                where: { category_id: categoryId },
            }));
        }
        catch (e) {
            this.logger.error('Erreur lors de la recherche de catégorie', e);
            return null;
        }
    }
};
exports.BanqueService = BanqueService;
exports.BanqueService = BanqueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _b : Object])
], BanqueService);


/***/ }),

/***/ "./apps/banque/src/health/health.controller.ts":
/*!*****************************************************!*\
  !*** ./apps/banque/src/health/health.controller.ts ***!
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
        this.logger.setContext('Health.controller - Banque Service');
    }
    healthCheck() {
        this.logger.info('Health check requested');
        return {
            status: 'ok',
            service: 'banque-service',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'health' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], HealthController.prototype, "healthCheck", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _a : Object])
], HealthController);


/***/ }),

/***/ "./apps/banque/src/prisma/prisma.module.ts":
/*!*************************************************!*\
  !*** ./apps/banque/src/prisma/prisma.module.ts ***!
  \*************************************************/
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
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./apps/banque/src/prisma/prisma.service.ts");
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

/***/ "./apps/banque/src/prisma/prisma.service.ts":
/*!**************************************************!*\
  !*** ./apps/banque/src/prisma/prisma.service.ts ***!
  \**************************************************/
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
        console.log('✅ Connexion à la base de données PostgreSQL établie (Banque Service)');
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

/***/ "./libs/contracts/src/Service/interfaces/service.interface.ts":
/*!********************************************************************!*\
  !*** ./libs/contracts/src/Service/interfaces/service.interface.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


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
/*!*********************************!*\
  !*** ./apps/banque/src/main.ts ***!
  \*********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const banque_module_1 = __webpack_require__(/*! ./banque.module */ "./apps/banque/src/banque.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(banque_module_1.BanqueModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: process.env.BANQUE_SERVICE_HOST ?? 'localhost',
            port: parseInt(process.env.BANQUE_SERVICE_PORT ?? '4004'),
        },
    });
    await app.listen();
    console.log('🏦 Banque Service is running on port 4004');
}
bootstrap();

})();

/******/ })()
;