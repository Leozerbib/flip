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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BanqueController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const banque_service_1 = __webpack_require__(/*! ./banque.service */ "./apps/banque/src/banque.service.ts");
const service_service_1 = __webpack_require__(/*! ./service/service.service */ "./apps/banque/src/service/service.service.ts");
const prank_service_1 = __webpack_require__(/*! ./prank/prank.service */ "./apps/banque/src/prank/prank.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const service_dto_1 = __webpack_require__(/*! @app/contracts/Service/dtos/service.dto */ "./libs/contracts/src/Service/dtos/service.dto.ts");
const service_interface_1 = __webpack_require__(/*! @app/contracts/Service/interfaces/service.interface */ "./libs/contracts/src/Service/interfaces/service.interface.ts");
const prank_interface_1 = __webpack_require__(/*! @app/contracts/Prank/interfaces/prank.interface */ "./libs/contracts/src/Prank/interfaces/prank.interface.ts");
let BanqueController = class BanqueController {
    banqueService;
    serviceService;
    prankService;
    logger;
    constructor(banqueService, serviceService, prankService, logger) {
        this.banqueService = banqueService;
        this.serviceService = serviceService;
        this.prankService = prankService;
        this.logger = logger;
        this.logger.setContext('Banque.controller');
    }
    async createService(payload) {
        this.logger.info('Délégation création service au ServiceService');
        try {
            const result = await this.serviceService.createService(payload.providerId, payload.createServiceDto);
            this.logger.info('Service créé avec succès (microservice)', {
                serviceId: result.service_id,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur création service (microservice)', error);
            throw error;
        }
    }
    async updateService(payload) {
        this.logger.info('Délégation mise à jour service au ServiceService');
        try {
            const result = await this.serviceService.updateService(payload.serviceId, payload.updateServiceDto);
            this.logger.info('Service mis à jour avec succès (microservice)', {
                serviceId: payload.serviceId,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur mise à jour service (microservice)', error);
            throw error;
        }
    }
    async deleteService(serviceId) {
        this.logger.info('Délégation suppression service au ServiceService');
        try {
            const result = await this.serviceService.deleteService(serviceId);
            this.logger.info('Service supprimé avec succès (microservice)', { serviceId });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur suppression service (microservice)', error);
            throw error;
        }
    }
    async confirmService(payload) {
        this.logger.info('Délégation confirmation service au ServiceService');
        try {
            const result = await this.serviceService.confirmService(payload.serviceId, payload.beneficiaryId);
            this.logger.info('Service confirmé avec succès (microservice)', {
                serviceId: payload.serviceId,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur confirmation service (microservice)', error);
            throw error;
        }
    }
    async repayServiceWithService(payload) {
        this.logger.info('Délégation remboursement service au ServiceService');
        try {
            const result = await this.serviceService.repayServiceWithService(payload.serviceId, payload.repaymentServiceId);
            this.logger.info('Remboursement effectué avec succès (microservice)', {
                serviceId: payload.serviceId,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur remboursement service (microservice)', error);
            throw error;
        }
    }
    async findServiceById(serviceId) {
        this.logger.info('Délégation recherche service au ServiceService');
        try {
            const result = await this.serviceService.findServiceById(serviceId);
            if (result) {
                this.logger.info('Service trouvé (microservice)', { serviceId });
            }
            else {
                this.logger.warn('Service non trouvé (microservice)', { serviceId });
            }
            return result;
        }
        catch (error) {
            this.logger.error('Erreur recherche service (microservice)', error);
            throw error;
        }
    }
    async getServiceWithDetails(serviceId) {
        this.logger.info('Délégation détails service au ServiceService');
        try {
            const result = await this.serviceService.getServiceWithDetails(serviceId);
            if (result) {
                this.logger.info('Détails service récupérés (microservice)', { serviceId });
            }
            else {
                this.logger.warn('Service non trouvé pour détails (microservice)', { serviceId });
            }
            return result;
        }
        catch (error) {
            this.logger.error('Erreur récupération détails service (microservice)', error);
            throw error;
        }
    }
    async findServicesWithFilters(filters) {
        this.logger.info('Délégation recherche services filtrés au ServiceService');
        try {
            const result = await this.serviceService.findServicesWithFilters(filters);
            this.logger.info('Services récupérés avec filtres (microservice)', {
                resultCount: result.length,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur recherche services avec filtres (microservice)', error);
            throw error;
        }
    }
    async getServiceStats() {
        this.logger.info('Délégation statistiques services au ServiceService');
        try {
            const result = await this.serviceService.getServiceStats();
            this.logger.info('Statistiques services récupérées (microservice)', {
                totalServices: result.total_services,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur récupération statistiques services (microservice)', error);
            throw error;
        }
    }
    async createServiceCategory(createCategoryDto) {
        this.logger.info('Délégation création catégorie au ServiceService');
        try {
            const result = await this.serviceService.createServiceCategory(createCategoryDto);
            this.logger.info('Catégorie service créée avec succès (microservice)', {
                categoryId: result.category_id,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur création catégorie service (microservice)', error);
            throw error;
        }
    }
    async getAllServiceCategories() {
        this.logger.info('Délégation récupération catégories au ServiceService');
        try {
            const result = await this.serviceService.getAllServiceCategories();
            this.logger.info('Catégories récupérées (microservice)', {
                categoriesCount: result.length,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur récupération catégories (microservice)', error);
            throw error;
        }
    }
    async getServiceCategoryById(categoryId) {
        this.logger.info('Délégation récupération catégorie par ID au ServiceService');
        try {
            const result = await this.serviceService.getServiceCategoryById(categoryId);
            if (result) {
                this.logger.info('Catégorie trouvée (microservice)', { categoryId });
            }
            else {
                this.logger.warn('Catégorie non trouvée (microservice)', { categoryId });
            }
            return result;
        }
        catch (error) {
            this.logger.error('Erreur récupération catégorie (microservice)', error);
            throw error;
        }
    }
    async updatePrank(payload) {
        this.logger.info('Délégation mise à jour prank au PrankService');
        try {
            const result = await this.prankService.updatePrank(payload.prankId, payload.updatePrankDto);
            this.logger.info('Prank mis à jour avec succès (microservice)', {
                prankId: payload.prankId,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur mise à jour prank (microservice)', error);
            throw error;
        }
    }
    async deletePrank(prankId) {
        this.logger.info('Délégation suppression prank au PrankService');
        try {
            const result = await this.prankService.deletePrank(prankId);
            this.logger.info('Prank supprimé avec succès (microservice)', { prankId });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur suppression prank (microservice)', error);
            throw error;
        }
    }
    async findPrankById(prankId) {
        this.logger.info('Délégation recherche prank au PrankService');
        try {
            const result = await this.prankService.findPrankById(prankId);
            if (result) {
                this.logger.info('Prank trouvé (microservice)', { prankId });
            }
            else {
                this.logger.warn('Prank non trouvé (microservice)', { prankId });
            }
            return result;
        }
        catch (error) {
            this.logger.error('Erreur recherche prank (microservice)', error);
            throw error;
        }
    }
    async findPranksWithFilters(filters) {
        this.logger.info('Délégation recherche pranks filtrés au PrankService');
        try {
            const result = await this.prankService.findPranksWithFilters(filters);
            this.logger.info('Pranks récupérés avec filtres (microservice)', {
                resultCount: result.length,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur recherche pranks avec filtres (microservice)', error);
            throw error;
        }
    }
    async getPrankStats() {
        this.logger.info('Délégation statistiques pranks au PrankService');
        try {
            const result = await this.prankService.getPrankStats();
            this.logger.info('Statistiques pranks récupérées (microservice)', {
                totalPranks: result.total_pranks,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur récupération statistiques pranks (microservice)', error);
            throw error;
        }
    }
    async createExecutedPrank(payload) {
        this.logger.info('Délégation création exécution prank au PrankService');
        try {
            const result = await this.prankService.createExecutedPrank(payload.executorId, payload.createExecutedPrankDto);
            this.logger.info('Exécution prank créée avec succès (microservice)', {
                executedPrankId: result.executed_prank_id,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur création exécution prank (microservice)', error);
            throw error;
        }
    }
    async updateExecutedPrank(payload) {
        this.logger.info('Délégation mise à jour exécution prank au PrankService');
        try {
            const result = await this.prankService.updateExecutedPrank(payload.executedPrankId, payload.updateExecutedPrankDto);
            this.logger.info('Exécution prank mise à jour avec succès (microservice)', {
                executedPrankId: payload.executedPrankId,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur mise à jour exécution prank (microservice)', error);
            throw error;
        }
    }
    async findExecutedPrankById(executedPrankId) {
        this.logger.info('Délégation recherche exécution prank au PrankService');
        try {
            const result = await this.prankService.findExecutedPrankById(executedPrankId);
            if (result) {
                this.logger.info('Exécution prank trouvée (microservice)', { executedPrankId });
            }
            else {
                this.logger.warn('Exécution prank non trouvée (microservice)', { executedPrankId });
            }
            return result;
        }
        catch (error) {
            this.logger.error('Erreur recherche exécution prank (microservice)', error);
            throw error;
        }
    }
    async getExecutedPrankWithDetails(executedPrankId) {
        this.logger.info('Délégation détails exécution prank au PrankService');
        try {
            const result = await this.prankService.getExecutedPrankWithDetails(executedPrankId);
            if (result) {
                this.logger.info('Détails exécution prank récupérés (microservice)', { executedPrankId });
            }
            else {
                this.logger.warn('Exécution prank non trouvée pour détails (microservice)', {
                    executedPrankId,
                });
            }
            return result;
        }
        catch (error) {
            this.logger.error('Erreur récupération détails exécution prank (microservice)', error);
            throw error;
        }
    }
    async findExecutedPranksWithFilters(filters) {
        this.logger.info('Délégation recherche exécutions pranks filtrées au PrankService');
        try {
            const result = await this.prankService.findExecutedPranksWithFilters(filters);
            this.logger.info('Exécutions pranks récupérées avec filtres (microservice)', {
                resultCount: result.length,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur recherche exécutions pranks avec filtres (microservice)', error);
            throw error;
        }
    }
    async getUserServices(payload) {
        this.logger.info('Récupération services utilisateur (microservice)', {
            userId: payload.userId.toString(),
        });
        return await this.banqueService.getUserServices(payload.userId, payload.page, payload.limit);
    }
    async getUserPranks(payload) {
        this.logger.info('Récupération pranks utilisateur (microservice)', {
            userId: payload.userId.toString(),
        });
        return await this.banqueService.getUserPranks(payload.userId, payload.page, payload.limit);
    }
    async repayServiceWithPrank(payload) {
        this.logger.info('Remboursement service par prank (microservice)', {
            serviceId: payload.serviceId,
            executedPrankId: payload.executedPrankId,
        });
        try {
            const result = await this.banqueService.repayServiceWithPrank(payload.serviceId, payload.executedPrankId);
            this.logger.info('Service remboursé par prank avec succès (microservice)', {
                serviceId: payload.serviceId,
                executedPrankId: payload.executedPrankId,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur remboursement service par prank (microservice)', error);
            throw error;
        }
    }
    async getDashboardStats() {
        this.logger.info('Récupération statistiques dashboard (microservice)');
        try {
            const result = await this.banqueService.getDashboardStats();
            this.logger.info('Statistiques dashboard récupérées (microservice)', {
                totalRepayments: result.combined.total_repayments,
                pendingActions: result.combined.pending_actions,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur récupération statistiques dashboard (microservice)', error);
            throw error;
        }
    }
};
exports.BanqueController = BanqueController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], BanqueController.prototype, "createService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], BanqueController.prototype, "updateService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], BanqueController.prototype, "deleteService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'confirm_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], BanqueController.prototype, "confirmService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'repay_service_with_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], BanqueController.prototype, "repayServiceWithService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_service_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], BanqueController.prototype, "findServiceById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_service_with_details' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], BanqueController.prototype, "getServiceWithDetails", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_services_with_filters' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof service_interface_1.IServiceFilters !== "undefined" && service_interface_1.IServiceFilters) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], BanqueController.prototype, "findServicesWithFilters", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_service_stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], BanqueController.prototype, "getServiceStats", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_service_category' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof service_dto_1.CreateServiceCategoryDto !== "undefined" && service_dto_1.CreateServiceCategoryDto) === "function" ? _q : Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], BanqueController.prototype, "createServiceCategory", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_all_service_categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], BanqueController.prototype, "getAllServiceCategories", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_service_category_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], BanqueController.prototype, "getServiceCategoryById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_prank' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], BanqueController.prototype, "updatePrank", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_prank' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], BanqueController.prototype, "deletePrank", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_prank_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], BanqueController.prototype, "findPrankById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_pranks_with_filters' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_x = typeof prank_interface_1.IPrankFilters !== "undefined" && prank_interface_1.IPrankFilters) === "function" ? _x : Object]),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], BanqueController.prototype, "findPranksWithFilters", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_prank_stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_z = typeof Promise !== "undefined" && Promise) === "function" ? _z : Object)
], BanqueController.prototype, "getPrankStats", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_executed_prank' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_0 = typeof Promise !== "undefined" && Promise) === "function" ? _0 : Object)
], BanqueController.prototype, "createExecutedPrank", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_executed_prank' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_1 = typeof Promise !== "undefined" && Promise) === "function" ? _1 : Object)
], BanqueController.prototype, "updateExecutedPrank", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_executed_prank_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_2 = typeof Promise !== "undefined" && Promise) === "function" ? _2 : Object)
], BanqueController.prototype, "findExecutedPrankById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_executed_prank_with_details' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_3 = typeof Promise !== "undefined" && Promise) === "function" ? _3 : Object)
], BanqueController.prototype, "getExecutedPrankWithDetails", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_executed_pranks_with_filters' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_4 = typeof prank_interface_1.IExecutedPrankFilters !== "undefined" && prank_interface_1.IExecutedPrankFilters) === "function" ? _4 : Object]),
    __metadata("design:returntype", typeof (_5 = typeof Promise !== "undefined" && Promise) === "function" ? _5 : Object)
], BanqueController.prototype, "findExecutedPranksWithFilters", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_user_services' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_6 = typeof Promise !== "undefined" && Promise) === "function" ? _6 : Object)
], BanqueController.prototype, "getUserServices", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_user_pranks' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_7 = typeof Promise !== "undefined" && Promise) === "function" ? _7 : Object)
], BanqueController.prototype, "getUserPranks", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'repay_service_with_prank' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_8 = typeof Promise !== "undefined" && Promise) === "function" ? _8 : Object)
], BanqueController.prototype, "repayServiceWithPrank", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_dashboard_stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_9 = typeof Promise !== "undefined" && Promise) === "function" ? _9 : Object)
], BanqueController.prototype, "getDashboardStats", null);
exports.BanqueController = BanqueController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof banque_service_1.BanqueService !== "undefined" && banque_service_1.BanqueService) === "function" ? _a : Object, typeof (_b = typeof service_service_1.ServiceService !== "undefined" && service_service_1.ServiceService) === "function" ? _b : Object, typeof (_c = typeof prank_service_1.PrankService !== "undefined" && prank_service_1.PrankService) === "function" ? _c : Object, typeof (_d = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _d : Object])
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
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const banque_controller_1 = __webpack_require__(/*! ./banque.controller */ "./apps/banque/src/banque.controller.ts");
const banque_service_1 = __webpack_require__(/*! ./banque.service */ "./apps/banque/src/banque.service.ts");
const health_controller_1 = __webpack_require__(/*! ./health/health.controller */ "./apps/banque/src/health/health.controller.ts");
const prisma_module_1 = __webpack_require__(/*! ./prisma/prisma.module */ "./apps/banque/src/prisma/prisma.module.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const config_1 = __webpack_require__(/*! @app/config */ "./libs/config/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
const prank_controller_1 = __webpack_require__(/*! ./prank/prank.controller */ "./apps/banque/src/prank/prank.controller.ts");
const service_controller_1 = __webpack_require__(/*! ./service/service.controller */ "./apps/banque/src/service/service.controller.ts");
const prank_service_1 = __webpack_require__(/*! ./prank/prank.service */ "./apps/banque/src/prank/prank.service.ts");
const service_service_1 = __webpack_require__(/*! ./service/service.service */ "./apps/banque/src/service/service.service.ts");
let BanqueModule = class BanqueModule {
};
exports.BanqueModule = BanqueModule;
exports.BanqueModule = BanqueModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.GlobalConfigModule,
            src_1.LoggerModule,
            prisma_module_1.PrismaModule,
            exceptions_1.ExceptionsModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'USER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 4003,
                    },
                },
            ]),
        ],
        controllers: [banque_controller_1.BanqueController, health_controller_1.HealthController, prank_controller_1.PrankController, service_controller_1.ServiceController],
        providers: [banque_service_1.BanqueService, prank_service_1.PrankService, service_service_1.ServiceService],
        exports: [banque_service_1.BanqueService, prank_service_1.PrankService, service_service_1.ServiceService],
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BanqueService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const prisma_service_1 = __webpack_require__(/*! ./prisma/prisma.service */ "./apps/banque/src/prisma/prisma.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
const service_service_1 = __webpack_require__(/*! ./service/service.service */ "./apps/banque/src/service/service.service.ts");
const prank_service_1 = __webpack_require__(/*! ./prank/prank.service */ "./apps/banque/src/prank/prank.service.ts");
const contracts_1 = __webpack_require__(/*! @app/contracts */ "./libs/contracts/src/index.ts");
let BanqueService = class BanqueService {
    prisma;
    logger;
    exceptionThrower;
    serviceService;
    prankService;
    userClient;
    constructor(prisma, logger, exceptionThrower, serviceService, prankService, userClient) {
        this.prisma = prisma;
        this.logger = logger;
        this.exceptionThrower = exceptionThrower;
        this.serviceService = serviceService;
        this.prankService = prankService;
        this.userClient = userClient;
        this.logger.setContext('Banque.service');
    }
    async getUserServices(userId, page, limit) {
        this.logger.info('Récupération des services utilisateur (via banque)', {
            userId: userId.toString(),
        });
        return await this.serviceService.getUserServices(userId, page, limit);
    }
    async getUserPranks(userId, page, limit) {
        this.logger.info('Récupération des pranks utilisateur (via banque)', {
            userId: userId.toString(),
        });
        try {
            const pranks = await this.prisma.services.findMany({
                where: {
                    OR: [
                        { beneficiary_id: parseInt(userId.toString()) },
                        { provider_id: parseInt(userId.toString()) },
                    ],
                    executed_prank_id_repayment: {
                        not: null,
                    },
                },
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
                skip: (parseInt(page) - 1) * parseInt(limit),
                take: parseInt(limit),
                orderBy: {
                    repaid_at: 'desc',
                },
            });
            return pranks.map(service => ({
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
        catch (error) {
            this.logger.error('Erreur lors de la récupération des pranks utilisateur', error);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'get_user_pranks',
                originalError: error.message,
            });
        }
    }
    async repayServiceWithPrank(serviceId, executedPrankId) {
        this.logger.info('Remboursement du service par un prank', {
            serviceId,
            executedPrankId,
        });
        const [service, executedPrank] = await Promise.all([
            this.serviceService.findServiceById(serviceId),
            this.prankService.findExecutedPrankById(executedPrankId),
        ]);
        if (!service) {
            this.exceptionThrower.throwRecordNotFound('Service non trouvé');
        }
        if (!executedPrank) {
            this.exceptionThrower.throwRecordNotFound('Prank exécuté non trouvé');
        }
        if (service.status !== contracts_1.ServiceStatusEnum.CONFIRMED_UNPAID) {
            this.exceptionThrower.throwValidation('Le service doit être confirmé et non payé pour être remboursé', [
                {
                    field: 'serviceId',
                    value: serviceId,
                    constraints: [service.status],
                },
            ]);
        }
        if (executedPrank.status !== contracts_1.ExecutedPrankStatusEnum.VALIDATED_BY_TARGET_COMPLETED) {
            this.exceptionThrower.throwValidation('Le prank doit être validé et complété', [
                {
                    field: 'executedPrankId',
                    value: executedPrankId,
                    constraints: [executedPrank.status],
                },
            ]);
        }
        if (executedPrank.service_being_repaid_id !== serviceId) {
            this.exceptionThrower.throwValidation('Le prank exécuté doit concerner le remboursement de ce service', [
                {
                    field: 'serviceId',
                    value: serviceId,
                    constraints: [executedPrank.service_being_repaid_id.toString()],
                },
            ]);
        }
        try {
            const repaidService = await this.prisma.services.update({
                where: { service_id: serviceId },
                data: {
                    status: 'repaid_by_prank',
                    executed_prank_id_repayment: executedPrankId,
                    repaid_at: new Date(),
                    updated_at: new Date(),
                },
            });
            this.logger.info('Service remboursé par prank avec succès', { serviceId, executedPrankId });
            return await this.serviceService.getServiceWithDetails(serviceId);
        }
        catch (error) {
            this.logger.error('Erreur lors du remboursement par prank', error);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'repay_service_with_prank',
                originalError: error.message,
            });
        }
    }
    async getDashboardStats() {
        this.logger.info('Récupération des statistiques dashboard combinées');
        try {
            const [serviceStats, prankStats, repaymentStats] = await Promise.all([
                this.serviceService.getServiceStats(),
                this.prankService.getPrankStats(),
                this.prisma.services.groupBy({
                    by: ['status'],
                    _count: {
                        service_id: true,
                    },
                    where: {
                        status: {
                            in: ['repaid_by_service', 'repaid_by_prank'],
                        },
                    },
                }),
            ]);
            const servicesRepayments = repaymentStats.find(s => s.status === 'repaid_by_service')?._count.service_id ?? 0;
            const pranksRepayments = repaymentStats.find(s => s.status === 'repaid_by_prank')?._count.service_id ?? 0;
            return {
                services: serviceStats,
                pranks: prankStats,
                combined: {
                    total_repayments: servicesRepayments + pranksRepayments,
                    services_repayments: servicesRepayments,
                    pranks_repayments: pranksRepayments,
                    pending_actions: serviceStats.pending_services + prankStats.pending_executions,
                },
            };
        }
        catch (error) {
            this.logger.error('Erreur lors de la récupération des statistiques dashboard', error);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'get_dashboard_stats',
                originalError: error.message,
            });
        }
    }
    async findUserById(userId) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'find_user_by_id' }, userId.toString()));
        }
        catch (error) {
            this.logger.error('Erreur récupération utilisateur', error);
            return null;
        }
    }
};
exports.BanqueService = BanqueService;
exports.BanqueService = BanqueService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _b : Object, typeof (_c = typeof exceptions_1.ExceptionThrower !== "undefined" && exceptions_1.ExceptionThrower) === "function" ? _c : Object, typeof (_d = typeof service_service_1.ServiceService !== "undefined" && service_service_1.ServiceService) === "function" ? _d : Object, typeof (_e = typeof prank_service_1.PrankService !== "undefined" && prank_service_1.PrankService) === "function" ? _e : Object, typeof (_f = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _f : Object])
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

/***/ "./apps/banque/src/prank/prank.controller.ts":
/*!***************************************************!*\
  !*** ./apps/banque/src/prank/prank.controller.ts ***!
  \***************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrankController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const prank_service_1 = __webpack_require__(/*! ./prank.service */ "./apps/banque/src/prank/prank.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const prank_interface_1 = __webpack_require__(/*! @app/contracts/Prank/interfaces/prank.interface */ "./libs/contracts/src/Prank/interfaces/prank.interface.ts");
let PrankController = class PrankController {
    prankService;
    logger;
    constructor(prankService, logger) {
        this.prankService = prankService;
        this.logger = logger;
        this.logger.setContext('Prank.controller');
    }
    async updatePrank(payload) {
        this.logger.info('Mise à jour prank (microservice)', {
            prankId: payload.prankId,
            updateFields: Object.keys(payload.updatePrankDto),
        });
        try {
            const result = await this.prankService.updatePrank(payload.prankId, payload.updatePrankDto);
            this.logger.info('Prank mis à jour avec succès (microservice)', {
                prankId: payload.prankId,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur mise à jour prank (microservice)', error);
            throw error;
        }
    }
    async deletePrank(prankId) {
        this.logger.info('Suppression prank (microservice)', { prankId });
        try {
            const result = await this.prankService.deletePrank(prankId);
            this.logger.info('Prank supprimé avec succès (microservice)', { prankId });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur suppression prank (microservice)', error);
            throw error;
        }
    }
    async findPrankById(prankId) {
        this.logger.info('Recherche prank par ID (microservice)', { prankId });
        try {
            const result = await this.prankService.findPrankById(prankId);
            if (result) {
                this.logger.info('Prank trouvé (microservice)', { prankId });
            }
            else {
                this.logger.warn('Prank non trouvé (microservice)', { prankId });
            }
            return result;
        }
        catch (error) {
            this.logger.error('Erreur recherche prank (microservice)', error);
            throw error;
        }
    }
    async findPranksWithFilters(filters) {
        this.logger.info('Recherche pranks avec filtres (microservice)', {
            filters: {
                type: filters.type,
                isActive: filters.is_active,
                requiresProof: filters.requires_proof,
                rarity: filters.rarity,
            },
        });
        try {
            const result = await this.prankService.findPranksWithFilters(filters);
            this.logger.info('Pranks récupérés avec filtres (microservice)', {
                resultCount: result.length,
                filters: {
                    type: filters.type,
                    isActive: filters.is_active,
                    rarity: filters.rarity,
                },
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur recherche pranks avec filtres (microservice)', error);
            throw error;
        }
    }
    async getPrankStats() {
        this.logger.info('Récupération statistiques pranks (microservice)');
        try {
            const result = await this.prankService.getPrankStats();
            this.logger.info('Statistiques pranks récupérées (microservice)', {
                totalPranks: result.total_pranks,
                activePranks: result.active_pranks,
                totalExecutions: result.total_executions,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur récupération statistiques pranks (microservice)', error);
            throw error;
        }
    }
    async createExecutedPrank(payload) {
        this.logger.info('Création exécution prank (microservice)', {
            executorId: payload.executorId,
            prankId: payload.createExecutedPrankDto.chosen_prank_id,
            targetId: payload.createExecutedPrankDto.target_id,
        });
        try {
            const result = await this.prankService.createExecutedPrank(payload.executorId, payload.createExecutedPrankDto);
            this.logger.info('Exécution prank créée avec succès (microservice)', {
                executedPrankId: result.executed_prank_id,
                executorId: payload.executorId,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur création exécution prank (microservice)', error);
            throw error;
        }
    }
    async updateExecutedPrank(payload) {
        this.logger.info('Mise à jour exécution prank (microservice)', {
            executedPrankId: payload.executedPrankId,
            updateFields: Object.keys(payload.updateExecutedPrankDto),
        });
        try {
            const result = await this.prankService.updateExecutedPrank(payload.executedPrankId, payload.updateExecutedPrankDto);
            this.logger.info('Exécution prank mise à jour avec succès (microservice)', {
                executedPrankId: payload.executedPrankId,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur mise à jour exécution prank (microservice)', error);
            throw error;
        }
    }
    async findExecutedPrankById(executedPrankId) {
        this.logger.info('Recherche exécution prank par ID (microservice)', { executedPrankId });
        try {
            const result = await this.prankService.findExecutedPrankById(executedPrankId);
            if (result) {
                this.logger.info('Exécution prank trouvée (microservice)', { executedPrankId });
            }
            else {
                this.logger.warn('Exécution prank non trouvée (microservice)', { executedPrankId });
            }
            return result;
        }
        catch (error) {
            this.logger.error('Erreur recherche exécution prank (microservice)', error);
            throw error;
        }
    }
    async getExecutedPrankWithDetails(executedPrankId) {
        this.logger.info('Récupération détails exécution prank (microservice)', { executedPrankId });
        try {
            const result = await this.prankService.getExecutedPrankWithDetails(executedPrankId);
            if (result) {
                this.logger.info('Détails exécution prank récupérés (microservice)', { executedPrankId });
            }
            else {
                this.logger.warn('Exécution prank non trouvée pour détails (microservice)', {
                    executedPrankId,
                });
            }
            return result;
        }
        catch (error) {
            this.logger.error('Erreur récupération détails exécution prank (microservice)', error);
            throw error;
        }
    }
    async findExecutedPranksWithFilters(filters) {
        this.logger.info('Recherche exécutions pranks avec filtres (microservice)', {
            filters: {
                status: filters.status,
                executorId: filters.executor_id,
                targetId: filters.target_id,
                prankId: filters.chosen_prank_id,
            },
        });
        try {
            const result = await this.prankService.findExecutedPranksWithFilters(filters);
            this.logger.info('Exécutions pranks récupérées avec filtres (microservice)', {
                resultCount: result.length,
                filters: {
                    status: filters.status,
                    executorId: filters.executor_id,
                },
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur recherche exécutions pranks avec filtres (microservice)', error);
            throw error;
        }
    }
};
exports.PrankController = PrankController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_prank' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PrankController.prototype, "updatePrank", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_prank' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], PrankController.prototype, "deletePrank", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_prank_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], PrankController.prototype, "findPrankById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_pranks_with_filters' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof prank_interface_1.IPrankFilters !== "undefined" && prank_interface_1.IPrankFilters) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], PrankController.prototype, "findPranksWithFilters", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_prank_stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], PrankController.prototype, "getPrankStats", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_executed_prank' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], PrankController.prototype, "createExecutedPrank", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_executed_prank' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], PrankController.prototype, "updateExecutedPrank", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_executed_prank_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], PrankController.prototype, "findExecutedPrankById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_executed_prank_with_details' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], PrankController.prototype, "getExecutedPrankWithDetails", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_executed_pranks_with_filters' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof prank_interface_1.IExecutedPrankFilters !== "undefined" && prank_interface_1.IExecutedPrankFilters) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], PrankController.prototype, "findExecutedPranksWithFilters", null);
exports.PrankController = PrankController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prank_service_1.PrankService !== "undefined" && prank_service_1.PrankService) === "function" ? _a : Object, typeof (_b = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _b : Object])
], PrankController);


/***/ }),

/***/ "./apps/banque/src/prank/prank.service.ts":
/*!************************************************!*\
  !*** ./apps/banque/src/prank/prank.service.ts ***!
  \************************************************/
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrankService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./apps/banque/src/prisma/prisma.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
const common_types_1 = __webpack_require__(/*! @app/contracts/types/common.types */ "./libs/contracts/src/types/common.types.ts");
let PrankService = class PrankService {
    prisma;
    logger;
    exceptionThrower;
    userClient;
    constructor(prisma, logger, exceptionThrower, userClient) {
        this.prisma = prisma;
        this.logger = logger;
        this.exceptionThrower = exceptionThrower;
        this.userClient = userClient;
        this.logger.setContext('Prank.service');
    }
    async updatePrank(prankId, updatePrankDto) {
        this.logger.info('Mise à jour du prank', { prankId });
        const prank = await this.findPrankById(prankId);
        if (!prank) {
            this.exceptionThrower.throwRecordNotFound('Prank non trouvé');
        }
        try {
            const updatedPrank = await this.prisma.pranks.update({
                where: { prank_id: prankId },
                data: updatePrankDto,
            });
            this.logger.info('Prank mis à jour avec succès', { prankId });
            return updatedPrank;
        }
        catch (error) {
            if (error.code === 'P2002') {
                this.exceptionThrower.throwDuplicateEntry('Un prank avec ce nom existe déjà');
            }
            this.logger.error('Erreur lors de la mise à jour du prank', error);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'update_prank',
                originalError: error.message,
            });
        }
    }
    async deletePrank(prankId) {
        this.logger.info('Suppression du prank', { prankId });
        const prank = await this.findPrankById(prankId);
        if (!prank) {
            this.exceptionThrower.throwRecordNotFound('Prank non trouvé');
        }
        const activePranks = await this.prisma.executed_pranks.count({
            where: {
                chosen_prank_id: prankId,
                status: {
                    in: [
                        common_types_1.ExecutedPrankStatusEnum.PROPOSED_BY_DEBTOR,
                        common_types_1.ExecutedPrankStatusEnum.PROPOSED_BY_CREDITOR,
                        common_types_1.ExecutedPrankStatusEnum.ACCEPTED_BY_TARGET,
                        common_types_1.ExecutedPrankStatusEnum.EXECUTED_PENDING_VALIDATION,
                    ],
                },
            },
        });
        if (activePranks > 0) {
            this.exceptionThrower.throwValidation('Ce prank ne peut pas être supprimé car il y a des exécutions en cours', [
                {
                    field: 'prankId',
                    value: prankId,
                    constraints: [`${activePranks} exécutions actives`],
                },
            ]);
        }
        try {
            await this.prisma.pranks.delete({
                where: { prank_id: prankId },
            });
            this.logger.info('Prank supprimé avec succès', { prankId });
            return { message: 'Prank supprimé avec succès' };
        }
        catch (error) {
            this.logger.error('Erreur lors de la suppression du prank', error);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'delete_prank',
                originalError: error.message,
            });
        }
    }
    async createExecutedPrank(executorId, createExecutedPrankDto) {
        this.logger.info("Création d'une nouvelle exécution de prank", {
            executorId,
            prankId: createExecutedPrankDto.chosen_prank_id,
            targetId: createExecutedPrankDto.target_id,
        });
        const service = await this.prisma.services.findUnique({
            where: { service_id: createExecutedPrankDto.service_being_repaid_id },
        });
        if (!service) {
            this.exceptionThrower.throwRecordNotFound('Service à rembourser non trouvé');
        }
        if (service.status !== common_types_1.ServiceStatusEnum.CONFIRMED_UNPAID) {
            this.exceptionThrower.throwValidation('Le service doit être confirmé et non payé pour être remboursé par un prank', [
                {
                    field: 'serviceId',
                    value: createExecutedPrankDto.service_being_repaid_id,
                    constraints: [service.status],
                },
            ]);
        }
        const prank = await this.findPrankById(createExecutedPrankDto.chosen_prank_id);
        if (!prank) {
            this.exceptionThrower.throwRecordNotFound('Prank non trouvé');
        }
        if (!prank.is_active) {
            this.exceptionThrower.throwValidation("Ce prank n'est plus actif", [
                {
                    field: 'prankId',
                    value: createExecutedPrankDto.chosen_prank_id,
                    constraints: ['inactive'],
                },
            ]);
        }
        const [executor, target] = await Promise.all([
            this.findUserById(executorId),
            this.findUserById(createExecutedPrankDto.target_id),
        ]);
        if (!executor) {
            this.exceptionThrower.throwRecordNotFound('Exécuteur non trouvé');
        }
        if (!target) {
            this.exceptionThrower.throwRecordNotFound('Cible du prank non trouvée');
        }
        if (executorId === createExecutedPrankDto.target_id) {
            this.exceptionThrower.throwValidation("Un utilisateur ne peut pas s'exécuter un prank à lui-même", [
                {
                    field: 'executorId',
                    value: executorId,
                    constraints: [createExecutedPrankDto.target_id.toString()],
                },
            ]);
        }
        const isValidRepayment = (service.beneficiary_id === executorId &&
            service.provider_id === createExecutedPrankDto.target_id) ||
            (service.provider_id === executorId &&
                service.beneficiary_id === createExecutedPrankDto.target_id);
        if (!isValidRepayment) {
            this.exceptionThrower.throwValidation('Le prank doit être exécuté entre les parties impliquées dans le service', [
                {
                    field: 'serviceParties',
                    value: `${service.provider_id}-${service.beneficiary_id}`,
                    constraints: [`${executorId}-${createExecutedPrankDto.target_id}`],
                },
            ]);
        }
        try {
            const executedPrank = await this.prisma.executed_pranks.create({
                data: {
                    service_being_repaid_id: createExecutedPrankDto.service_being_repaid_id,
                    chosen_prank_id: createExecutedPrankDto.chosen_prank_id,
                    executor_id: executorId,
                    target_id: createExecutedPrankDto.target_id,
                    jeton_value_paid: createExecutedPrankDto.jeton_value_paid,
                    status: createExecutedPrankDto.status ?? common_types_1.ExecutedPrankStatusEnum.PROPOSED_BY_DEBTOR,
                },
            });
            this.logger.info('Exécution de prank créée avec succès', {
                executedPrankId: executedPrank.executed_prank_id,
            });
            return executedPrank;
        }
        catch (error) {
            this.logger.error("Erreur lors de la création de l'exécution de prank", error);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'create_executed_prank',
                originalError: error.message,
            });
        }
    }
    async updateExecutedPrank(executedPrankId, updateExecutedPrankDto) {
        this.logger.info("Mise à jour de l'exécution de prank", { executedPrankId });
        const executedPrank = await this.findExecutedPrankById(executedPrankId);
        if (!executedPrank) {
            this.exceptionThrower.throwRecordNotFound('Exécution de prank non trouvée');
        }
        try {
            const updatedExecutedPrank = await this.prisma.executed_pranks.update({
                where: { executed_prank_id: executedPrankId },
                data: {
                    ...updateExecutedPrankDto,
                    updated_at: new Date(),
                    ...(updateExecutedPrankDto.status ===
                        common_types_1.ExecutedPrankStatusEnum.VALIDATED_BY_TARGET_COMPLETED
                        ? { validated_at: new Date() }
                        : {}),
                },
            });
            this.logger.info('Exécution de prank mise à jour avec succès', { executedPrankId });
            return updatedExecutedPrank;
        }
        catch (error) {
            this.logger.error("Erreur lors de la mise à jour de l'exécution de prank", error);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'update_executed_prank',
                originalError: error.message,
            });
        }
    }
    async findPrankById(prankId) {
        try {
            const prank = await this.prisma.pranks.findUnique({
                where: { prank_id: prankId },
            });
            return prank;
        }
        catch (error) {
            this.logger.error('Erreur lors de la recherche de prank par ID', error);
            return null;
        }
    }
    async findExecutedPrankById(executedPrankId) {
        try {
            const executedPrank = await this.prisma.executed_pranks.findUnique({
                where: { executed_prank_id: executedPrankId },
            });
            return executedPrank;
        }
        catch (error) {
            this.logger.error("Erreur lors de la recherche d'exécution de prank par ID", error);
            return null;
        }
    }
    async findPranksWithFilters(filters) {
        this.logger.info('Recherche de pranks avec filtres', { filters });
        const whereClause = {};
        if (filters.type) {
            whereClause.type = filters.type;
        }
        if (typeof filters.is_active === 'boolean') {
            whereClause.is_active = filters.is_active;
        }
        if (typeof filters.requires_proof === 'boolean') {
            whereClause.requires_proof = filters.requires_proof;
        }
        if (filters.rarity) {
            whereClause.rarity = filters.rarity;
        }
        if (filters.jeton_cost_min || filters.jeton_cost_max) {
            whereClause.default_jeton_cost_equivalent = {};
            if (filters.jeton_cost_min) {
                whereClause.default_jeton_cost_equivalent.gte = filters.jeton_cost_min;
            }
            if (filters.jeton_cost_max) {
                whereClause.default_jeton_cost_equivalent.lte = filters.jeton_cost_max;
            }
        }
        try {
            const pranks = await this.prisma.pranks.findMany({
                where: whereClause,
                orderBy: {
                    created_at: 'desc',
                },
            });
            return pranks;
        }
        catch (error) {
            this.logger.error('Erreur lors de la recherche filtrée de pranks', error);
            return [];
        }
    }
    async getExecutedPrankWithDetails(executedPrankId) {
        this.logger.info("Récupération des détails de l'exécution de prank", { executedPrankId });
        try {
            const executedPrank = await this.prisma.executed_pranks.findUnique({
                where: { executed_prank_id: executedPrankId },
                include: {
                    pranks: true,
                    users_executed_pranks_executor_idTousers: {
                        select: {
                            user_id: true,
                            username: true,
                            profile_picture_url: true,
                        },
                    },
                    users_executed_pranks_target_idTousers: {
                        select: {
                            user_id: true,
                            username: true,
                            profile_picture_url: true,
                        },
                    },
                    services_executed_pranks_service_being_repaid_idToservices: {
                        select: {
                            service_id: true,
                            description: true,
                            jeton_value: true,
                        },
                    },
                },
            });
            if (!executedPrank) {
                return null;
            }
            const result = {
                executed_prank_id: executedPrank.executed_prank_id,
                chosen_prank_id: executedPrank.chosen_prank_id,
                executor_id: executedPrank.executor_id,
                target_id: executedPrank.target_id,
                service_being_repaid_id: executedPrank.service_being_repaid_id,
                status: executedPrank.status,
                proof_url: executedPrank.proof_url ?? undefined,
                executed_at: executedPrank.executed_at ?? undefined,
                validated_at: executedPrank.validated_at ?? undefined,
                jeton_value_paid: executedPrank.jeton_value_paid,
                prank: executedPrank.pranks,
                executor: {
                    user_id: executedPrank.users_executed_pranks_executor_idTousers.user_id,
                    username: executedPrank.users_executed_pranks_executor_idTousers.username,
                    profile_picture_url: executedPrank.users_executed_pranks_executor_idTousers.profile_picture_url ?? '',
                },
                target: {
                    user_id: executedPrank.users_executed_pranks_target_idTousers.user_id,
                    username: executedPrank.users_executed_pranks_target_idTousers.username,
                    profile_picture_url: executedPrank.users_executed_pranks_target_idTousers.profile_picture_url ?? '',
                },
                service_being_repaid: {
                    service_id: executedPrank.services_executed_pranks_service_being_repaid_idToservices.service_id,
                    description: executedPrank.services_executed_pranks_service_being_repaid_idToservices.description,
                    jeton_value: executedPrank.services_executed_pranks_service_being_repaid_idToservices.jeton_value,
                },
            };
            return result;
        }
        catch (error) {
            this.logger.error("Erreur lors de la récupération des détails de l'exécution de prank", error);
            return null;
        }
    }
    async findExecutedPranksWithFilters(filters) {
        this.logger.info("Recherche d'exécutions de pranks avec filtres", { filters });
        const whereClause = {};
        if (filters.status) {
            whereClause.status = filters.status;
        }
        if (filters.executor_id) {
            whereClause.executor_id = filters.executor_id;
        }
        if (filters.target_id) {
            whereClause.target_id = filters.target_id;
        }
        if (filters.chosen_prank_id) {
            whereClause.chosen_prank_id = filters.chosen_prank_id;
        }
        if (filters.service_being_repaid_id) {
            whereClause.service_being_repaid_id = filters.service_being_repaid_id;
        }
        if (filters.executed_after || filters.executed_before) {
            whereClause.executed_at = {};
            if (filters.executed_after) {
                whereClause.executed_at.gte = filters.executed_after;
            }
            if (filters.executed_before) {
                whereClause.executed_at.lte = filters.executed_before;
            }
        }
        try {
            const executedPranks = await this.prisma.executed_pranks.findMany({
                where: whereClause,
                include: {
                    pranks: true,
                    users_executed_pranks_executor_idTousers: {
                        select: {
                            user_id: true,
                            username: true,
                            profile_picture_url: true,
                        },
                    },
                    users_executed_pranks_target_idTousers: {
                        select: {
                            user_id: true,
                            username: true,
                            profile_picture_url: true,
                        },
                    },
                    services_executed_pranks_service_being_repaid_idToservices: {
                        select: {
                            service_id: true,
                            description: true,
                            jeton_value: true,
                        },
                    },
                },
                orderBy: {
                    executed_at: 'desc',
                },
            });
            return executedPranks.map(executedPrank => ({
                executed_prank_id: executedPrank.executed_prank_id,
                chosen_prank_id: executedPrank.chosen_prank_id,
                executor_id: executedPrank.executor_id,
                target_id: executedPrank.target_id,
                service_being_repaid_id: executedPrank.service_being_repaid_id,
                status: executedPrank.status,
                proof_url: executedPrank.proof_url ?? undefined,
                executed_at: executedPrank.executed_at ?? undefined,
                validated_at: executedPrank.validated_at ?? undefined,
                jeton_value_paid: executedPrank.jeton_value_paid,
                prank: executedPrank.pranks,
                executor: {
                    user_id: executedPrank.users_executed_pranks_executor_idTousers.user_id,
                    username: executedPrank.users_executed_pranks_executor_idTousers.username,
                    profile_picture_url: executedPrank.users_executed_pranks_executor_idTousers.profile_picture_url ?? '',
                },
                target: {
                    user_id: executedPrank.users_executed_pranks_target_idTousers.user_id,
                    username: executedPrank.users_executed_pranks_target_idTousers.username,
                    profile_picture_url: executedPrank.users_executed_pranks_target_idTousers.profile_picture_url ?? '',
                },
                service_being_repaid: {
                    service_id: executedPrank.services_executed_pranks_service_being_repaid_idToservices.service_id,
                    description: executedPrank.services_executed_pranks_service_being_repaid_idToservices.description,
                    jeton_value: executedPrank.services_executed_pranks_service_being_repaid_idToservices.jeton_value,
                },
            }));
        }
        catch (error) {
            this.logger.error("Erreur lors de la recherche filtrée d'exécutions de pranks", error);
            return [];
        }
    }
    async getPrankStats() {
        this.logger.info('Récupération des statistiques des pranks');
        try {
            const [totalPranks, activePranks, executionStats, valueStats] = await Promise.all([
                this.prisma.pranks.count(),
                this.prisma.pranks.count({ where: { is_active: true } }),
                this.prisma.executed_pranks.groupBy({
                    by: ['status'],
                    _count: {
                        executed_prank_id: true,
                    },
                }),
                this.prisma.executed_pranks.aggregate({
                    _sum: {
                        jeton_value_paid: true,
                    },
                    _avg: {
                        jeton_value_paid: true,
                    },
                    _count: {
                        executed_prank_id: true,
                    },
                }),
            ]);
            const pendingExecutions = executionStats
                .filter(s => s.status === common_types_1.ExecutedPrankStatusEnum.PROPOSED_BY_DEBTOR ||
                s.status === common_types_1.ExecutedPrankStatusEnum.PROPOSED_BY_CREDITOR ||
                s.status === common_types_1.ExecutedPrankStatusEnum.ACCEPTED_BY_TARGET ||
                s.status === common_types_1.ExecutedPrankStatusEnum.EXECUTED_PENDING_VALIDATION)
                .reduce((sum, s) => sum + s._count.executed_prank_id, 0);
            const completedExecutions = executionStats
                .filter(s => s.status === common_types_1.ExecutedPrankStatusEnum.VALIDATED_BY_TARGET_COMPLETED)
                .reduce((sum, s) => sum + s._count.executed_prank_id, 0);
            return {
                total_pranks: totalPranks,
                active_pranks: activePranks,
                total_executions: valueStats._count.executed_prank_id,
                pending_executions: pendingExecutions,
                completed_executions: completedExecutions,
                total_jeton_value_executed: valueStats._sum.jeton_value_paid ?? 0,
                average_jeton_cost: Math.round(valueStats._avg.jeton_value_paid ?? 0),
            };
        }
        catch (error) {
            this.logger.error('Erreur lors de la récupération des statistiques des pranks', error);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'get_prank_stats',
                originalError: error.message,
            });
        }
    }
    async findUserById(userId) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'find_user_by_id' }, userId.toString()));
        }
        catch (error) {
            this.logger.error('Erreur récupération utilisateur', error);
            return null;
        }
    }
};
exports.PrankService = PrankService;
exports.PrankService = PrankService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _b : Object, typeof (_c = typeof exceptions_1.ExceptionThrower !== "undefined" && exceptions_1.ExceptionThrower) === "function" ? _c : Object, typeof (_d = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _d : Object])
], PrankService);


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

/***/ "./apps/banque/src/service/service.controller.ts":
/*!*******************************************************!*\
  !*** ./apps/banque/src/service/service.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const service_service_1 = __webpack_require__(/*! ./service.service */ "./apps/banque/src/service/service.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const service_dto_1 = __webpack_require__(/*! @app/contracts/Service/dtos/service.dto */ "./libs/contracts/src/Service/dtos/service.dto.ts");
const service_interface_1 = __webpack_require__(/*! @app/contracts/Service/interfaces/service.interface */ "./libs/contracts/src/Service/interfaces/service.interface.ts");
let ServiceController = class ServiceController {
    serviceService;
    logger;
    constructor(serviceService, logger) {
        this.serviceService = serviceService;
        this.logger = logger;
        this.logger.setContext('Service.controller');
    }
    async createService(payload) {
        this.logger.info('Création service (microservice)', {
            providerId: payload.providerId,
            beneficiaryId: payload.createServiceDto.beneficiary_id,
            jetonValue: payload.createServiceDto.jeton_value,
        });
        try {
            const result = await this.serviceService.createService(payload.providerId, payload.createServiceDto);
            this.logger.info('Service créé avec succès (microservice)', {
                serviceId: result.service_id,
                providerId: payload.providerId,
                beneficiaryId: payload.createServiceDto.beneficiary_id,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur création service (microservice)', error);
            throw error;
        }
    }
    async updateService(payload) {
        this.logger.info('Mise à jour service (microservice)', {
            serviceId: payload.serviceId,
            updateFields: Object.keys(payload.updateServiceDto),
        });
        try {
            const result = await this.serviceService.updateService(payload.serviceId, payload.updateServiceDto);
            this.logger.info('Service mis à jour avec succès (microservice)', {
                serviceId: payload.serviceId,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur mise à jour service (microservice)', error);
            throw error;
        }
    }
    async deleteService(serviceId) {
        this.logger.info('Suppression service (microservice)', { serviceId });
        try {
            const result = await this.serviceService.deleteService(serviceId);
            this.logger.info('Service supprimé avec succès (microservice)', { serviceId });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur suppression service (microservice)', error);
            throw error;
        }
    }
    async confirmService(payload) {
        this.logger.info('Confirmation service (microservice)', {
            serviceId: payload.serviceId,
            beneficiaryId: payload.beneficiaryId,
        });
        try {
            const result = await this.serviceService.confirmService(payload.serviceId, payload.beneficiaryId);
            this.logger.info('Service confirmé avec succès (microservice)', {
                serviceId: payload.serviceId,
                beneficiaryId: payload.beneficiaryId,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur confirmation service (microservice)', error);
            throw error;
        }
    }
    async repayServiceWithService(payload) {
        this.logger.info('Remboursement service par service (microservice)', {
            serviceId: payload.serviceId,
            repaymentServiceId: payload.repaymentServiceId,
        });
        try {
            const result = await this.serviceService.repayServiceWithService(payload.serviceId, payload.repaymentServiceId);
            this.logger.info('Remboursement effectué avec succès (microservice)', {
                serviceId: payload.serviceId,
                repaymentServiceId: payload.repaymentServiceId,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur remboursement service (microservice)', error);
            throw error;
        }
    }
    async findServiceById(serviceId) {
        this.logger.info('Recherche service par ID (microservice)', { serviceId });
        try {
            const result = await this.serviceService.findServiceById(serviceId);
            if (result) {
                this.logger.info('Service trouvé (microservice)', { serviceId });
            }
            else {
                this.logger.warn('Service non trouvé (microservice)', { serviceId });
            }
            return result;
        }
        catch (error) {
            this.logger.error('Erreur recherche service (microservice)', error);
            throw error;
        }
    }
    async getServiceWithDetails(serviceId) {
        this.logger.info('Récupération détails service (microservice)', { serviceId });
        try {
            const result = await this.serviceService.getServiceWithDetails(serviceId);
            if (result) {
                this.logger.info('Détails service récupérés (microservice)', { serviceId });
            }
            else {
                this.logger.warn('Service non trouvé pour détails (microservice)', { serviceId });
            }
            return result;
        }
        catch (error) {
            this.logger.error('Erreur récupération détails service (microservice)', error);
            throw error;
        }
    }
    async findServicesWithFilters(filters) {
        this.logger.info('Recherche services avec filtres (microservice)', {
            filters: {
                status: filters.status,
                categoryId: filters.category_id,
                providerId: filters.provider_id,
                beneficiaryId: filters.beneficiary_id,
            },
        });
        try {
            const result = await this.serviceService.findServicesWithFilters(filters);
            this.logger.info('Services récupérés avec filtres (microservice)', {
                resultCount: result.length,
                filters: {
                    status: filters.status,
                    categoryId: filters.category_id,
                },
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur recherche services avec filtres (microservice)', error);
            throw error;
        }
    }
    async getUserServices(payload) {
        this.logger.info('Récupération services utilisateur (microservice)', {
            userId: payload.userId.toString(),
        });
        return await this.serviceService.getUserServices(payload.userId, payload.page, payload.limit);
    }
    async getServiceStats() {
        this.logger.info('Récupération statistiques services (microservice)');
        try {
            const result = await this.serviceService.getServiceStats();
            this.logger.info('Statistiques services récupérées (microservice)', {
                totalServices: result.total_services,
                pendingServices: result.pending_services,
                confirmedServices: result.confirmed_services,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur récupération statistiques services (microservice)', error);
            throw error;
        }
    }
    async createServiceCategory(createCategoryDto) {
        this.logger.info('Création catégorie service (microservice)', { name: createCategoryDto.name });
        try {
            const result = await this.serviceService.createServiceCategory(createCategoryDto);
            this.logger.info('Catégorie service créée avec succès (microservice)', {
                categoryId: result.category_id,
                name: result.name,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur création catégorie service (microservice)', error);
            throw error;
        }
    }
    async getAllServiceCategories() {
        this.logger.info('Récupération toutes catégories (microservice)');
        try {
            const result = await this.serviceService.getAllServiceCategories();
            this.logger.info('Catégories récupérées (microservice)', {
                categoriesCount: result.length,
            });
            return result;
        }
        catch (error) {
            this.logger.error('Erreur récupération catégories (microservice)', error);
            throw error;
        }
    }
    async getServiceCategoryById(categoryId) {
        this.logger.info('Récupération catégorie par ID (microservice)', { categoryId });
        try {
            const result = await this.serviceService.getServiceCategoryById(categoryId);
            if (result) {
                this.logger.info('Catégorie trouvée (microservice)', {
                    categoryId,
                    name: result.name,
                });
            }
            else {
                this.logger.warn('Catégorie non trouvée (microservice)', { categoryId });
            }
            return result;
        }
        catch (error) {
            this.logger.error('Erreur récupération catégorie (microservice)', error);
            throw error;
        }
    }
};
exports.ServiceController = ServiceController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ServiceController.prototype, "createService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ServiceController.prototype, "updateService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ServiceController.prototype, "deleteService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'confirm_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ServiceController.prototype, "confirmService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'repay_service_with_service' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ServiceController.prototype, "repayServiceWithService", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_service_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ServiceController.prototype, "findServiceById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_service_with_details' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ServiceController.prototype, "getServiceWithDetails", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_services_with_filters' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof service_interface_1.IServiceFilters !== "undefined" && service_interface_1.IServiceFilters) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ServiceController.prototype, "findServicesWithFilters", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_user_services' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], ServiceController.prototype, "getUserServices", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_service_stats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], ServiceController.prototype, "getServiceStats", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_service_category' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof service_dto_1.CreateServiceCategoryDto !== "undefined" && service_dto_1.CreateServiceCategoryDto) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], ServiceController.prototype, "createServiceCategory", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_all_service_categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], ServiceController.prototype, "getAllServiceCategories", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_service_category_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], ServiceController.prototype, "getServiceCategoryById", null);
exports.ServiceController = ServiceController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof service_service_1.ServiceService !== "undefined" && service_service_1.ServiceService) === "function" ? _a : Object, typeof (_b = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _b : Object])
], ServiceController);


/***/ }),

/***/ "./apps/banque/src/service/service.service.ts":
/*!****************************************************!*\
  !*** ./apps/banque/src/service/service.service.ts ***!
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./apps/banque/src/prisma/prisma.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
const common_types_1 = __webpack_require__(/*! @app/contracts/types/common.types */ "./libs/contracts/src/types/common.types.ts");
let ServiceService = class ServiceService {
    prisma;
    logger;
    exceptionThrower;
    userClient;
    constructor(prisma, logger, exceptionThrower, userClient) {
        this.prisma = prisma;
        this.logger = logger;
        this.exceptionThrower = exceptionThrower;
        this.userClient = userClient;
        this.logger.setContext('Service.service');
    }
    async createService(providerId, createServiceDto) {
        this.logger.info("Création d'un nouveau service", {
            providerId,
            beneficiaryId: createServiceDto.beneficiary_id,
            jetonValue: createServiceDto.jeton_value,
        });
        const [provider, beneficiary] = await Promise.all([
            this.findUserById(providerId),
            this.findUserById(createServiceDto.beneficiary_id),
        ]);
        if (!provider) {
            this.exceptionThrower.throwRecordNotFound('Fournisseur de service non trouvé');
        }
        if (!beneficiary) {
            this.exceptionThrower.throwRecordNotFound('Bénéficiaire du service non trouvé');
        }
        if (providerId === createServiceDto.beneficiary_id) {
            this.exceptionThrower.throwValidation('Un utilisateur ne peut pas se rendre service à lui-même', [
                {
                    field: 'providerId',
                    value: providerId,
                    constraints: [createServiceDto.beneficiary_id.toString()],
                },
            ]);
        }
        const friendshipStatus = await this.checkFriendshipStatus(providerId, createServiceDto.beneficiary_id);
        if (friendshipStatus !== 'accepted') {
            this.exceptionThrower.throwForbidden("Un service ne peut être créé qu'entre amis");
        }
        if (createServiceDto.category_id) {
            const category = await this.prisma.service_categories.findUnique({
                where: { category_id: createServiceDto.category_id },
            });
            if (!category) {
                this.exceptionThrower.throwRecordNotFound('Catégorie de service non trouvée');
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
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'create_service',
                originalError: error.message,
            });
        }
    }
    async updateService(serviceId, updateServiceDto) {
        this.logger.info('Mise à jour du service', { serviceId });
        const service = await this.findServiceById(serviceId);
        if (!service) {
            this.exceptionThrower.throwRecordNotFound('Service non trouvé');
        }
        if (service.status !== common_types_1.ServiceStatusEnum.PENDING_CONFIRMATION) {
            this.exceptionThrower.throwForbidden('Ce service ne peut plus être modifié');
        }
        if (updateServiceDto.category_id) {
            const category = await this.prisma.service_categories.findUnique({
                where: { category_id: updateServiceDto.category_id },
            });
            if (!category) {
                this.exceptionThrower.throwRecordNotFound('Catégorie de service non trouvée');
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
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'update_service',
                originalError: error.message,
            });
        }
    }
    async deleteService(serviceId) {
        this.logger.info('Suppression du service', { serviceId });
        const service = await this.findServiceById(serviceId);
        if (!service) {
            this.exceptionThrower.throwRecordNotFound('Service non trouvé');
        }
        if (service.status !== common_types_1.ServiceStatusEnum.PENDING_CONFIRMATION) {
            this.exceptionThrower.throwForbidden('Ce service ne peut plus être supprimé');
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
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'delete_service',
                originalError: error.message,
            });
        }
    }
    async confirmService(serviceId, beneficiaryId) {
        this.logger.info('Confirmation du service', { serviceId, beneficiaryId });
        const service = await this.findServiceById(serviceId);
        if (!service) {
            this.exceptionThrower.throwRecordNotFound('Service non trouvé');
        }
        if (service.beneficiary_id !== beneficiaryId) {
            this.exceptionThrower.throwForbidden('Seul le bénéficiaire peut confirmer ce service');
        }
        if (service.status !== common_types_1.ServiceStatusEnum.PENDING_CONFIRMATION) {
            this.exceptionThrower.throwValidation('Ce service ne peut plus être confirmé', [
                {
                    field: 'serviceId',
                    value: serviceId,
                    constraints: [service.status],
                },
            ]);
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
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'confirm_service',
                originalError: error.message,
            });
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
            this.exceptionThrower.throwRecordNotFound('Service original non trouvé');
        }
        if (!repaymentService) {
            this.exceptionThrower.throwRecordNotFound('Service de remboursement non trouvé');
        }
        if (service.status !== common_types_1.ServiceStatusEnum.CONFIRMED_UNPAID) {
            this.exceptionThrower.throwValidation('Le service doit être confirmé et non payé pour être remboursé', [
                {
                    field: 'serviceId',
                    value: serviceId,
                    constraints: [service.status],
                },
            ]);
        }
        if (repaymentService.status !== common_types_1.ServiceStatusEnum.CONFIRMED_UNPAID) {
            this.exceptionThrower.throwValidation('Le service de remboursement doit être confirmé', [
                {
                    field: 'repaymentServiceId',
                    value: repaymentServiceId,
                    constraints: [repaymentService.status],
                },
            ]);
        }
        if (service.beneficiary_id !== repaymentService.provider_id) {
            this.exceptionThrower.throwValidation('Le débiteur du service original doit fournir le service de remboursement', [
                {
                    field: 'serviceId',
                    value: serviceId,
                    constraints: [service.beneficiary_id.toString()],
                },
            ]);
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
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'repay_service',
                originalError: error.message,
            });
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
    async getUserServices(userId, page, limit) {
        this.logger.info('Récupération des services utilisateur', { userId: userId.toString() });
        try {
            const services = await this.prisma.services.findMany({
                where: {
                    OR: [
                        { beneficiary_id: parseInt(userId.toString()) },
                        { provider_id: parseInt(userId.toString()) },
                    ],
                },
                skip: (parseInt(page) - 1) * parseInt(limit),
                take: parseInt(limit),
            });
            return services;
        }
        catch (error) {
            this.logger.error('Erreur lors de la récupération des services', error);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'get_user_services',
                originalError: error.message,
            });
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
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'get_service_stats',
                originalError: error.message,
            });
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
                this.exceptionThrower.throwDuplicateEntry('Une catégorie avec ce nom existe déjà');
            }
            this.logger.error('Erreur lors de la création de la catégorie', error);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'create_service_category',
                originalError: error.message,
            });
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
    async findUserById(userId) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'find_user_by_id' }, userId.toString()));
        }
        catch (error) {
            this.logger.error('Erreur récupération utilisateur', error);
            return null;
        }
    }
    async checkFriendshipStatus(userId1, userId2) {
        try {
            return await (0, rxjs_1.firstValueFrom)(this.userClient.send({ cmd: 'check_friendship_status' }, { userId: userId1, otherUserId: userId2 }));
        }
        catch (error) {
            this.logger.error('Erreur vérification amitié', error);
            return null;
        }
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _b : Object, typeof (_c = typeof exceptions_1.ExceptionThrower !== "undefined" && exceptions_1.ExceptionThrower) === "function" ? _c : Object, typeof (_d = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _d : Object])
], ServiceService);


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

/***/ "./libs/contracts/src/Friendship/interfaces/friendship.interface.ts":
/*!**************************************************************************!*\
  !*** ./libs/contracts/src/Friendship/interfaces/friendship.interface.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/contracts/src/Mission/dtos/mission.dto.ts":
/*!********************************************************!*\
  !*** ./libs/contracts/src/Mission/dtos/mission.dto.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserMissionFiltersDto = exports.MissionFiltersDto = exports.MissionStatsDto = exports.UserMissionWithDetailsDto = exports.MissionWithDetailsDto = exports.UserMissionResponseDto = exports.UpdateUserMissionDto = exports.CreateUserMissionDto = exports.MissionResponseDto = exports.UpdateMissionDto = exports.CreateMissionDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_types_1 = __webpack_require__(/*! ../../types/common.types */ "./libs/contracts/src/types/common.types.ts");
class CreateMissionDto {
    title;
    description;
    type;
    target_value;
    xp_reward;
    coins_reward;
    jeton_reward;
    prank_reward_id;
    is_active;
    is_repeatable;
    repeat_cooldown_hours;
    unlock_level_required;
}
exports.CreateMissionDto = CreateMissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Premier Service', description: 'Titre de la mission' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMissionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Rendre votre premier service à un ami',
        description: 'Description de la mission',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMissionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.MissionTypeEnum, description: 'Type de mission' }),
    (0, class_validator_1.IsEnum)(common_types_1.MissionTypeEnum),
    __metadata("design:type", typeof (_a = typeof common_types_1.MissionTypeEnum !== "undefined" && common_types_1.MissionTypeEnum) === "function" ? _a : Object)
], CreateMissionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Valeur cible pour compléter la mission',
        required: false,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMissionDto.prototype, "target_value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Récompense XP' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMissionDto.prototype, "xp_reward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, description: 'Récompense en pièces' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMissionDto.prototype, "coins_reward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Récompense en jetons' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMissionDto.prototype, "jeton_reward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID du prank récompense', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMissionDto.prototype, "prank_reward_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Mission active', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateMissionDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Mission répétable', required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateMissionDto.prototype, "is_repeatable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 24, description: 'Cooldown en heures avant répétition', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMissionDto.prototype, "repeat_cooldown_hours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Niveau requis pour débloquer', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMissionDto.prototype, "unlock_level_required", void 0);
class UpdateMissionDto {
    title;
    description;
    type;
    target_value;
    xp_reward;
    coins_reward;
    jeton_reward;
    prank_reward_id;
    is_active;
    is_repeatable;
    repeat_cooldown_hours;
    unlock_level_required;
}
exports.UpdateMissionDto = UpdateMissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Titre mis à jour', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMissionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Description mise à jour', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMissionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.MissionTypeEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.MissionTypeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof common_types_1.MissionTypeEnum !== "undefined" && common_types_1.MissionTypeEnum) === "function" ? _b : Object)
], UpdateMissionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMissionDto.prototype, "target_value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMissionDto.prototype, "xp_reward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 75, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMissionDto.prototype, "coins_reward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMissionDto.prototype, "jeton_reward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMissionDto.prototype, "prank_reward_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateMissionDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateMissionDto.prototype, "is_repeatable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 48, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMissionDto.prototype, "repeat_cooldown_hours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateMissionDto.prototype, "unlock_level_required", void 0);
class MissionResponseDto {
    mission_id;
    title;
    description;
    type;
    target_value;
    xp_reward;
    coins_reward;
    jeton_reward;
    prank_reward_id;
    is_active;
    is_repeatable;
    repeat_cooldown_hours;
    unlock_level_required;
    created_at;
}
exports.MissionResponseDto = MissionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], MissionResponseDto.prototype, "mission_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Premier Service' }),
    __metadata("design:type", String)
], MissionResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rendre votre premier service à un ami', nullable: true }),
    __metadata("design:type", String)
], MissionResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.MissionTypeEnum }),
    __metadata("design:type", typeof (_c = typeof common_types_1.MissionTypeEnum !== "undefined" && common_types_1.MissionTypeEnum) === "function" ? _c : Object)
], MissionResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, nullable: true }),
    __metadata("design:type", Number)
], MissionResponseDto.prototype, "target_value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], MissionResponseDto.prototype, "xp_reward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], MissionResponseDto.prototype, "coins_reward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], MissionResponseDto.prototype, "jeton_reward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, nullable: true }),
    __metadata("design:type", Number)
], MissionResponseDto.prototype, "prank_reward_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], MissionResponseDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], MissionResponseDto.prototype, "is_repeatable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 24, nullable: true }),
    __metadata("design:type", Number)
], MissionResponseDto.prototype, "repeat_cooldown_hours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, nullable: true }),
    __metadata("design:type", Number)
], MissionResponseDto.prototype, "unlock_level_required", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], MissionResponseDto.prototype, "created_at", void 0);
class CreateUserMissionDto {
    user_id;
    mission_id;
    progress;
    status;
}
exports.CreateUserMissionDto = CreateUserMissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "ID de l'utilisateur" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserMissionDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID de la mission' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserMissionDto.prototype, "mission_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'Progression initiale', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUserMissionDto.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.UserMissionStatusEnum, description: 'Statut initial', required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.UserMissionStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_e = typeof common_types_1.UserMissionStatusEnum !== "undefined" && common_types_1.UserMissionStatusEnum) === "function" ? _e : Object)
], CreateUserMissionDto.prototype, "status", void 0);
class UpdateUserMissionDto {
    progress;
    status;
}
exports.UpdateUserMissionDto = UpdateUserMissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateUserMissionDto.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.UserMissionStatusEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.UserMissionStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_f = typeof common_types_1.UserMissionStatusEnum !== "undefined" && common_types_1.UserMissionStatusEnum) === "function" ? _f : Object)
], UpdateUserMissionDto.prototype, "status", void 0);
class UserMissionResponseDto {
    user_mission_id;
    user_id;
    mission_id;
    progress;
    status;
    started_at;
    completed_at;
    claimed_at;
    last_progress_at;
}
exports.UserMissionResponseDto = UserMissionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserMissionResponseDto.prototype, "user_mission_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserMissionResponseDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserMissionResponseDto.prototype, "mission_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], UserMissionResponseDto.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.UserMissionStatusEnum }),
    __metadata("design:type", typeof (_g = typeof common_types_1.UserMissionStatusEnum !== "undefined" && common_types_1.UserMissionStatusEnum) === "function" ? _g : Object)
], UserMissionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', nullable: true }),
    __metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], UserMissionResponseDto.prototype, "started_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', nullable: true }),
    __metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
], UserMissionResponseDto.prototype, "completed_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', nullable: true }),
    __metadata("design:type", typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object)
], UserMissionResponseDto.prototype, "claimed_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", typeof (_l = typeof Date !== "undefined" && Date) === "function" ? _l : Object)
], UserMissionResponseDto.prototype, "last_progress_at", void 0);
class MissionWithDetailsDto extends MissionResponseDto {
    prank_reward;
    user_progress;
}
exports.MissionWithDetailsDto = MissionWithDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            prank_id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'Chanter en public' },
            description: { type: 'string', example: 'Chanter une chanson en public' },
        },
        nullable: true,
    }),
    __metadata("design:type", Object)
], MissionWithDetailsDto.prototype, "prank_reward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            progress: { type: 'number', example: 2 },
            status: { enum: common_types_1.UserMissionStatusEnum },
            started_at: { type: 'string', format: 'date-time', nullable: true },
            completed_at: { type: 'string', format: 'date-time', nullable: true },
            claimed_at: { type: 'string', format: 'date-time', nullable: true },
        },
        nullable: true,
    }),
    __metadata("design:type", Object)
], MissionWithDetailsDto.prototype, "user_progress", void 0);
class UserMissionWithDetailsDto extends UserMissionResponseDto {
    mission;
    user;
}
exports.UserMissionWithDetailsDto = UserMissionWithDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: MissionResponseDto }),
    __metadata("design:type", MissionResponseDto)
], UserMissionWithDetailsDto.prototype, "mission", void 0);
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
], UserMissionWithDetailsDto.prototype, "user", void 0);
class MissionStatsDto {
    total_missions;
    active_missions;
    completed_missions;
    available_missions;
    total_xp_rewards;
    total_coins_rewards;
    total_jeton_rewards;
    completion_rate;
}
exports.MissionStatsDto = MissionStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], MissionStatsDto.prototype, "total_missions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45 }),
    __metadata("design:type", Number)
], MissionStatsDto.prototype, "active_missions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12 }),
    __metadata("design:type", Number)
], MissionStatsDto.prototype, "completed_missions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8 }),
    __metadata("design:type", Number)
], MissionStatsDto.prototype, "available_missions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2500 }),
    __metadata("design:type", Number)
], MissionStatsDto.prototype, "total_xp_rewards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500 }),
    __metadata("design:type", Number)
], MissionStatsDto.prototype, "total_coins_rewards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 300 }),
    __metadata("design:type", Number)
], MissionStatsDto.prototype, "total_jeton_rewards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 75.5 }),
    __metadata("design:type", Number)
], MissionStatsDto.prototype, "completion_rate", void 0);
class MissionFiltersDto {
    type;
    is_active;
    is_repeatable;
    unlock_level_max;
    xp_reward_min;
    xp_reward_max;
    coins_reward_min;
    coins_reward_max;
    jeton_reward_min;
    jeton_reward_max;
}
exports.MissionFiltersDto = MissionFiltersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.MissionTypeEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.MissionTypeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_m = typeof common_types_1.MissionTypeEnum !== "undefined" && common_types_1.MissionTypeEnum) === "function" ? _m : Object)
], MissionFiltersDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MissionFiltersDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], MissionFiltersDto.prototype, "is_repeatable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], MissionFiltersDto.prototype, "unlock_level_max", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], MissionFiltersDto.prototype, "xp_reward_min", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], MissionFiltersDto.prototype, "xp_reward_max", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], MissionFiltersDto.prototype, "coins_reward_min", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 250, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], MissionFiltersDto.prototype, "coins_reward_max", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], MissionFiltersDto.prototype, "jeton_reward_min", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], MissionFiltersDto.prototype, "jeton_reward_max", void 0);
class UserMissionFiltersDto {
    status;
    user_id;
    mission_id;
    mission_type;
    started_after;
    started_before;
    completed_after;
    completed_before;
}
exports.UserMissionFiltersDto = UserMissionFiltersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.UserMissionStatusEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.UserMissionStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_o = typeof common_types_1.UserMissionStatusEnum !== "undefined" && common_types_1.UserMissionStatusEnum) === "function" ? _o : Object)
], UserMissionFiltersDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UserMissionFiltersDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UserMissionFiltersDto.prototype, "mission_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.MissionTypeEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.MissionTypeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_p = typeof common_types_1.MissionTypeEnum !== "undefined" && common_types_1.MissionTypeEnum) === "function" ? _p : Object)
], UserMissionFiltersDto.prototype, "mission_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_q = typeof Date !== "undefined" && Date) === "function" ? _q : Object)
], UserMissionFiltersDto.prototype, "started_after", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-12-31T23:59:59.999Z', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_r = typeof Date !== "undefined" && Date) === "function" ? _r : Object)
], UserMissionFiltersDto.prototype, "started_before", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_s = typeof Date !== "undefined" && Date) === "function" ? _s : Object)
], UserMissionFiltersDto.prototype, "completed_after", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-12-31T23:59:59.999Z', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_t = typeof Date !== "undefined" && Date) === "function" ? _t : Object)
], UserMissionFiltersDto.prototype, "completed_before", void 0);


/***/ }),

/***/ "./libs/contracts/src/Mission/interfaces/mission.interface.ts":
/*!********************************************************************!*\
  !*** ./libs/contracts/src/Mission/interfaces/mission.interface.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/contracts/src/Prank/dtos/prank.dto.ts":
/*!****************************************************!*\
  !*** ./libs/contracts/src/Prank/dtos/prank.dto.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExecutedPrankFiltersDto = exports.PrankStatsDto = exports.PrankFiltersDto = exports.ExecutedPrankWithDetailsDto = exports.ExecutedPrankResponseDto = exports.UpdateExecutedPrankDto = exports.CreateExecutedPrankDto = exports.PrankResponseDto = exports.UpdatePrankDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_types_1 = __webpack_require__(/*! ../../types/common.types */ "./libs/contracts/src/types/common.types.ts");
class UpdatePrankDto {
    name;
    description;
    default_jeton_cost_equivalent;
    xp_reward_executor;
    xp_reward_target;
    coins_reward_executor;
    coins_reward_target;
    type;
    config_details_json;
    requires_proof;
    is_active;
    image_url;
    rarity;
}
exports.UpdatePrankDto = UpdatePrankDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nom mis à jour', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrankDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Description mise à jour', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrankDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePrankDto.prototype, "default_jeton_cost_equivalent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePrankDto.prototype, "xp_reward_executor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePrankDto.prototype, "xp_reward_target", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePrankDto.prototype, "coins_reward_executor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePrankDto.prototype, "coins_reward_target", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.PrankTypeEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.PrankTypeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof common_types_1.PrankTypeEnum !== "undefined" && common_types_1.PrankTypeEnum) === "function" ? _a : Object)
], UpdatePrankDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { duration: '2 minutes' }, required: false }),
    (0, class_validator_1.IsJSON)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePrankDto.prototype, "config_details_json", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdatePrankDto.prototype, "requires_proof", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdatePrankDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/prank-image.jpg', required: false }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePrankDto.prototype, "image_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.PrankRarityEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.PrankRarityEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof common_types_1.PrankRarityEnum !== "undefined" && common_types_1.PrankRarityEnum) === "function" ? _b : Object)
], UpdatePrankDto.prototype, "rarity", void 0);
class PrankResponseDto {
    prank_id;
    name;
    description;
    default_jeton_cost_equivalent;
    xp_reward_executor;
    xp_reward_target;
    coins_reward_executor;
    coins_reward_target;
    type;
    config_details_json;
    requires_proof;
    is_active;
    created_at;
    image_url;
    rarity;
}
exports.PrankResponseDto = PrankResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PrankResponseDto.prototype, "prank_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Chanter en public' }),
    __metadata("design:type", String)
], PrankResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Chanter une chanson en public pendant 1 minute' }),
    __metadata("design:type", String)
], PrankResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], PrankResponseDto.prototype, "default_jeton_cost_equivalent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, nullable: true }),
    __metadata("design:type", Number)
], PrankResponseDto.prototype, "xp_reward_executor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, nullable: true }),
    __metadata("design:type", Number)
], PrankResponseDto.prototype, "xp_reward_target", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, nullable: true }),
    __metadata("design:type", Number)
], PrankResponseDto.prototype, "coins_reward_executor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, nullable: true }),
    __metadata("design:type", Number)
], PrankResponseDto.prototype, "coins_reward_target", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.PrankTypeEnum }),
    __metadata("design:type", typeof (_c = typeof common_types_1.PrankTypeEnum !== "undefined" && common_types_1.PrankTypeEnum) === "function" ? _c : Object)
], PrankResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { duration: '1 minute', location: 'public' }, nullable: true }),
    __metadata("design:type", Object)
], PrankResponseDto.prototype, "config_details_json", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], PrankResponseDto.prototype, "requires_proof", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], PrankResponseDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], PrankResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/prank-image.jpg', nullable: true }),
    __metadata("design:type", String)
], PrankResponseDto.prototype, "image_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.PrankRarityEnum }),
    __metadata("design:type", typeof (_e = typeof common_types_1.PrankRarityEnum !== "undefined" && common_types_1.PrankRarityEnum) === "function" ? _e : Object)
], PrankResponseDto.prototype, "rarity", void 0);
class CreateExecutedPrankDto {
    service_being_repaid_id;
    chosen_prank_id;
    target_id;
    jeton_value_paid;
    status;
}
exports.CreateExecutedPrankDto = CreateExecutedPrankDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID du service à rembourser' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExecutedPrankDto.prototype, "service_being_repaid_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID du prank choisi' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExecutedPrankDto.prototype, "chosen_prank_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'ID de la cible' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateExecutedPrankDto.prototype, "target_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25, description: 'Valeur en jetons payée' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateExecutedPrankDto.prototype, "jeton_value_paid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.ExecutedPrankStatusEnum, description: 'Statut initial', required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.ExecutedPrankStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_f = typeof common_types_1.ExecutedPrankStatusEnum !== "undefined" && common_types_1.ExecutedPrankStatusEnum) === "function" ? _f : Object)
], CreateExecutedPrankDto.prototype, "status", void 0);
class UpdateExecutedPrankDto {
    status;
    proof_url;
    execution_details_json;
}
exports.UpdateExecutedPrankDto = UpdateExecutedPrankDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.ExecutedPrankStatusEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.ExecutedPrankStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_g = typeof common_types_1.ExecutedPrankStatusEnum !== "undefined" && common_types_1.ExecutedPrankStatusEnum) === "function" ? _g : Object)
], UpdateExecutedPrankDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/proof.jpg', required: false }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateExecutedPrankDto.prototype, "proof_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { location: 'Paris', duration: '2 minutes' }, required: false }),
    (0, class_validator_1.IsJSON)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateExecutedPrankDto.prototype, "execution_details_json", void 0);
class ExecutedPrankResponseDto {
    executed_prank_id;
    service_being_repaid_id;
    chosen_prank_id;
    executor_id;
    target_id;
    jeton_value_paid;
    status;
    proof_url;
    execution_details_json;
    executed_at;
    validated_at;
    updated_at;
}
exports.ExecutedPrankResponseDto = ExecutedPrankResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ExecutedPrankResponseDto.prototype, "executed_prank_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ExecutedPrankResponseDto.prototype, "service_being_repaid_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ExecutedPrankResponseDto.prototype, "chosen_prank_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], ExecutedPrankResponseDto.prototype, "executor_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], ExecutedPrankResponseDto.prototype, "target_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], ExecutedPrankResponseDto.prototype, "jeton_value_paid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.ExecutedPrankStatusEnum }),
    __metadata("design:type", typeof (_h = typeof common_types_1.ExecutedPrankStatusEnum !== "undefined" && common_types_1.ExecutedPrankStatusEnum) === "function" ? _h : Object)
], ExecutedPrankResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/proof.jpg', nullable: true }),
    __metadata("design:type", String)
], ExecutedPrankResponseDto.prototype, "proof_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { location: 'Paris', duration: '2 minutes' }, nullable: true }),
    __metadata("design:type", Object)
], ExecutedPrankResponseDto.prototype, "execution_details_json", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', nullable: true }),
    __metadata("design:type", typeof (_j = typeof Date !== "undefined" && Date) === "function" ? _j : Object)
], ExecutedPrankResponseDto.prototype, "executed_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', nullable: true }),
    __metadata("design:type", typeof (_k = typeof Date !== "undefined" && Date) === "function" ? _k : Object)
], ExecutedPrankResponseDto.prototype, "validated_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z' }),
    __metadata("design:type", typeof (_l = typeof Date !== "undefined" && Date) === "function" ? _l : Object)
], ExecutedPrankResponseDto.prototype, "updated_at", void 0);
class ExecutedPrankWithDetailsDto extends ExecutedPrankResponseDto {
    prank;
    executor;
    target;
    service_being_repaid;
}
exports.ExecutedPrankWithDetailsDto = ExecutedPrankWithDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: PrankResponseDto }),
    __metadata("design:type", PrankResponseDto)
], ExecutedPrankWithDetailsDto.prototype, "prank", void 0);
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
], ExecutedPrankWithDetailsDto.prototype, "executor", void 0);
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
], ExecutedPrankWithDetailsDto.prototype, "target", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'object',
        properties: {
            service_id: { type: 'number', example: 1 },
            description: { type: 'string', example: 'Aider à déménager' },
            jeton_value: { type: 'number', example: 50 },
        },
    }),
    __metadata("design:type", Object)
], ExecutedPrankWithDetailsDto.prototype, "service_being_repaid", void 0);
class PrankFiltersDto {
    type;
    is_active;
    requires_proof;
    jeton_cost_min;
    jeton_cost_max;
    rarity;
}
exports.PrankFiltersDto = PrankFiltersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.PrankTypeEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.PrankTypeEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_m = typeof common_types_1.PrankTypeEnum !== "undefined" && common_types_1.PrankTypeEnum) === "function" ? _m : Object)
], PrankFiltersDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], PrankFiltersDto.prototype, "is_active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], PrankFiltersDto.prototype, "requires_proof", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PrankFiltersDto.prototype, "jeton_cost_min", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PrankFiltersDto.prototype, "jeton_cost_max", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.PrankRarityEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.PrankRarityEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_o = typeof common_types_1.PrankRarityEnum !== "undefined" && common_types_1.PrankRarityEnum) === "function" ? _o : Object)
], PrankFiltersDto.prototype, "rarity", void 0);
class PrankStatsDto {
    total_pranks;
    active_pranks;
    total_executions;
    pending_executions;
    completed_executions;
    total_jeton_value_executed;
    average_jeton_cost;
}
exports.PrankStatsDto = PrankStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], PrankStatsDto.prototype, "total_pranks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 35 }),
    __metadata("design:type", Number)
], PrankStatsDto.prototype, "active_pranks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120 }),
    __metadata("design:type", Number)
], PrankStatsDto.prototype, "total_executions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15 }),
    __metadata("design:type", Number)
], PrankStatsDto.prototype, "pending_executions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 105 }),
    __metadata("design:type", Number)
], PrankStatsDto.prototype, "completed_executions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2500 }),
    __metadata("design:type", Number)
], PrankStatsDto.prototype, "total_jeton_value_executed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], PrankStatsDto.prototype, "average_jeton_cost", void 0);
class ExecutedPrankFiltersDto {
    status;
    executor_id;
    target_id;
    chosen_prank_id;
    service_being_repaid_id;
    executed_after;
    executed_before;
}
exports.ExecutedPrankFiltersDto = ExecutedPrankFiltersDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_types_1.ExecutedPrankStatusEnum, required: false }),
    (0, class_validator_1.IsEnum)(common_types_1.ExecutedPrankStatusEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_p = typeof common_types_1.ExecutedPrankStatusEnum !== "undefined" && common_types_1.ExecutedPrankStatusEnum) === "function" ? _p : Object)
], ExecutedPrankFiltersDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ExecutedPrankFiltersDto.prototype, "executor_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ExecutedPrankFiltersDto.prototype, "target_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ExecutedPrankFiltersDto.prototype, "chosen_prank_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ExecutedPrankFiltersDto.prototype, "service_being_repaid_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00.000Z', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_q = typeof Date !== "undefined" && Date) === "function" ? _q : Object)
], ExecutedPrankFiltersDto.prototype, "executed_after", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-12-31T23:59:59.999Z', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_r = typeof Date !== "undefined" && Date) === "function" ? _r : Object)
], ExecutedPrankFiltersDto.prototype, "executed_before", void 0);


/***/ }),

/***/ "./libs/contracts/src/Prank/interfaces/prank.interface.ts":
/*!****************************************************************!*\
  !*** ./libs/contracts/src/Prank/interfaces/prank.interface.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/contracts/src/PrankPack/dtos/prank-pack.dto.ts":
/*!*************************************************************!*\
  !*** ./libs/contracts/src/PrankPack/dtos/prank-pack.dto.ts ***!
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OpenMultiplePacksDto = exports.PackOpeningErrorDto = exports.PackAvailablePranksDto = exports.MultiplePackOpeningResultDto = exports.PackOpeningResultDto = exports.RemainingCurrencyDto = exports.PackInfoDto = exports.BoosterOpeningResultDto = exports.AwardedPrankDto = exports.PacksByTypeDto = exports.PrankPackDto = exports.PackRarityProbabilitiesDto = exports.RarityProbabilitiesDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const prank_pack_interface_1 = __webpack_require__(/*! ../interfaces/prank-pack.interface */ "./libs/contracts/src/PrankPack/interfaces/prank-pack.interface.ts");
class RarityProbabilitiesDto {
    common;
    rare;
    extreme;
}
exports.RarityProbabilitiesDto = RarityProbabilitiesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Probabilité pour les pranks communs', example: 0.7 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1),
    __metadata("design:type", Number)
], RarityProbabilitiesDto.prototype, "common", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Probabilité pour les pranks rares', example: 0.25 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1),
    __metadata("design:type", Number)
], RarityProbabilitiesDto.prototype, "rare", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Probabilité pour les pranks extrêmes', example: 0.05 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1),
    __metadata("design:type", Number)
], RarityProbabilitiesDto.prototype, "extreme", void 0);
class PackRarityProbabilitiesDto {
    basic;
    last_card;
}
exports.PackRarityProbabilitiesDto = PackRarityProbabilitiesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Probabilités de base pour toutes les cartes',
        type: RarityProbabilitiesDto,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RarityProbabilitiesDto),
    __metadata("design:type", RarityProbabilitiesDto)
], PackRarityProbabilitiesDto.prototype, "basic", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Probabilités spéciales pour la dernière carte (packs multiples)',
        type: RarityProbabilitiesDto,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RarityProbabilitiesDto),
    __metadata("design:type", RarityProbabilitiesDto)
], PackRarityProbabilitiesDto.prototype, "last_card", void 0);
class PrankPackDto {
    pack_id;
    name;
    description;
    image_url;
    cost_currency_type;
    cost_amount;
    number_of_pranks_awarded;
    rarity_probabilities;
    is_available;
    available_from;
    available_until;
    required_user_level;
    pack_type;
}
exports.PrankPackDto = PrankPackDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID unique du pack' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankPackDto.prototype, "pack_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du pack' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrankPackDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Description du pack' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrankPackDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "URL de l'image du pack" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrankPackDto.prototype, "image_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type de devise nécessaire', enum: client_1.currency_type_enum }),
    (0, class_validator_1.IsEnum)(client_1.currency_type_enum),
    __metadata("design:type", typeof (_a = typeof client_1.currency_type_enum !== "undefined" && client_1.currency_type_enum) === "function" ? _a : Object)
], PrankPackDto.prototype, "cost_currency_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Coût du pack' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankPackDto.prototype, "cost_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Nombre de pranks attribués à l'ouverture" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankPackDto.prototype, "number_of_pranks_awarded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Probabilités de rareté', type: PackRarityProbabilitiesDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PackRarityProbabilitiesDto),
    __metadata("design:type", PackRarityProbabilitiesDto)
], PrankPackDto.prototype, "rarity_probabilities", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Indique si le pack est disponible' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PrankPackDto.prototype, "is_available", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date de début de disponibilité' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], PrankPackDto.prototype, "available_from", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Date de fin de disponibilité' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], PrankPackDto.prototype, "available_until", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Niveau utilisateur requis' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankPackDto.prototype, "required_user_level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type du pack', enum: prank_pack_interface_1.PackType }),
    (0, class_validator_1.IsEnum)(prank_pack_interface_1.PackType),
    __metadata("design:type", typeof (_d = typeof prank_pack_interface_1.PackType !== "undefined" && prank_pack_interface_1.PackType) === "function" ? _d : Object)
], PrankPackDto.prototype, "pack_type", void 0);
class PacksByTypeDto {
    basic;
    event;
    limited;
    gift;
    promotional;
}
exports.PacksByTypeDto = PacksByTypeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Packs de base', type: [PrankPackDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PrankPackDto),
    __metadata("design:type", Array)
], PacksByTypeDto.prototype, "basic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Packs événement', type: [PrankPackDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PrankPackDto),
    __metadata("design:type", Array)
], PacksByTypeDto.prototype, "event", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Packs limités', type: [PrankPackDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PrankPackDto),
    __metadata("design:type", Array)
], PacksByTypeDto.prototype, "limited", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Packs cadeaux', type: [PrankPackDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PrankPackDto),
    __metadata("design:type", Array)
], PacksByTypeDto.prototype, "gift", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Packs promotionnels', type: [PrankPackDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PrankPackDto),
    __metadata("design:type", Array)
], PacksByTypeDto.prototype, "promotional", void 0);
class AwardedPrankDto {
    prank_id;
    name;
    rarity;
    description;
    image_url;
    quantity_awarded;
    is_new;
}
exports.AwardedPrankDto = AwardedPrankDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du prank' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AwardedPrankDto.prototype, "prank_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du prank' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AwardedPrankDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rareté du prank', enum: client_1.prank_rarity_enum }),
    (0, class_validator_1.IsEnum)(client_1.prank_rarity_enum),
    __metadata("design:type", typeof (_e = typeof client_1.prank_rarity_enum !== "undefined" && client_1.prank_rarity_enum) === "function" ? _e : Object)
], AwardedPrankDto.prototype, "rarity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description du prank' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AwardedPrankDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "URL de l'image du prank" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AwardedPrankDto.prototype, "image_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantité attribuée' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AwardedPrankDto.prototype, "quantity_awarded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Indique si c'est un nouveau prank pour l'utilisateur" }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AwardedPrankDto.prototype, "is_new", void 0);
class BoosterOpeningResultDto {
    booster_id;
    booster_name;
    awarded_pranks;
}
exports.BoosterOpeningResultDto = BoosterOpeningResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du booster' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BoosterOpeningResultDto.prototype, "booster_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du booster' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BoosterOpeningResultDto.prototype, "booster_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pranks attribués dans ce booster', type: [AwardedPrankDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AwardedPrankDto),
    __metadata("design:type", Array)
], BoosterOpeningResultDto.prototype, "awarded_pranks", void 0);
class PackInfoDto {
    pack_id;
    name;
    cost_amount;
    cost_currency_type;
}
exports.PackInfoDto = PackInfoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du pack' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PackInfoDto.prototype, "pack_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du pack' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PackInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Coût du pack' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PackInfoDto.prototype, "cost_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type de devise', enum: client_1.currency_type_enum }),
    (0, class_validator_1.IsEnum)(client_1.currency_type_enum),
    __metadata("design:type", typeof (_f = typeof client_1.currency_type_enum !== "undefined" && client_1.currency_type_enum) === "function" ? _f : Object)
], PackInfoDto.prototype, "cost_currency_type", void 0);
class RemainingCurrencyDto {
    game_coins;
}
exports.RemainingCurrencyDto = RemainingCurrencyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Coins de jeu restants' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RemainingCurrencyDto.prototype, "game_coins", void 0);
class PackOpeningResultDto {
    success;
    boosters;
    remaining_currency;
    pack_info;
}
exports.PackOpeningResultDto = PackOpeningResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Indique si l'ouverture a réussi" }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PackOpeningResultDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Boosters obtenus (groupés par booster)',
        type: [BoosterOpeningResultDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BoosterOpeningResultDto),
    __metadata("design:type", Array)
], PackOpeningResultDto.prototype, "boosters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Devise restante après achat', type: RemainingCurrencyDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RemainingCurrencyDto),
    __metadata("design:type", RemainingCurrencyDto)
], PackOpeningResultDto.prototype, "remaining_currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Informations sur le pack ouvert', type: PackInfoDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PackInfoDto),
    __metadata("design:type", PackInfoDto)
], PackOpeningResultDto.prototype, "pack_info", void 0);
class MultiplePackOpeningResultDto {
    success;
    total_packs_opened;
    all_boosters;
    remaining_currency;
    pack_info;
}
exports.MultiplePackOpeningResultDto = MultiplePackOpeningResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Indique si l'ouverture a réussi" }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MultiplePackOpeningResultDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre total de packs ouverts' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MultiplePackOpeningResultDto.prototype, "total_packs_opened", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tous les boosters obtenus de tous les packs',
        type: [BoosterOpeningResultDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BoosterOpeningResultDto),
    __metadata("design:type", Array)
], MultiplePackOpeningResultDto.prototype, "all_boosters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Devise restante après achat', type: RemainingCurrencyDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RemainingCurrencyDto),
    __metadata("design:type", RemainingCurrencyDto)
], MultiplePackOpeningResultDto.prototype, "remaining_currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Informations sur le pack ouvert', type: PackInfoDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PackInfoDto),
    __metadata("design:type", PackInfoDto)
], MultiplePackOpeningResultDto.prototype, "pack_info", void 0);
class PackAvailablePranksDto {
    pack_id;
    pack_name;
    available_pranks_by_rarity;
}
exports.PackAvailablePranksDto = PackAvailablePranksDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du pack' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PackAvailablePranksDto.prototype, "pack_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du pack' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PackAvailablePranksDto.prototype, "pack_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pranks disponibles groupés par rareté',
        type: 'object',
        properties: {
            common: { type: 'array', items: { $ref: '#/components/schemas/AwardedPrankDto' } },
            rare: { type: 'array', items: { $ref: '#/components/schemas/AwardedPrankDto' } },
            extreme: { type: 'array', items: { $ref: '#/components/schemas/AwardedPrankDto' } },
        },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], PackAvailablePranksDto.prototype, "available_pranks_by_rarity", void 0);
class PackOpeningErrorDto {
    success;
    error_code;
    error_message;
}
exports.PackOpeningErrorDto = PackOpeningErrorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Indique que l'ouverture a échoué", default: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PackOpeningErrorDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Code d'erreur",
        enum: [
            'PACK_NOT_FOUND',
            'PACK_NOT_AVAILABLE',
            'INSUFFICIENT_LEVEL',
            'INSUFFICIENT_CURRENCY',
            'NO_ACTIVE_PRANKS',
            'INSUFFICIENT_PACKS',
        ],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PackOpeningErrorDto.prototype, "error_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Message d'erreur descriptif" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PackOpeningErrorDto.prototype, "error_message", void 0);
class OpenMultiplePacksDto {
    quantity;
}
exports.OpenMultiplePacksDto = OpenMultiplePacksDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de packs à ouvrir', minimum: 1, maximum: 50 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], OpenMultiplePacksDto.prototype, "quantity", void 0);


/***/ }),

/***/ "./libs/contracts/src/PrankPack/interfaces/prank-pack.interface.ts":
/*!*************************************************************************!*\
  !*** ./libs/contracts/src/PrankPack/interfaces/prank-pack.interface.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PackType = void 0;
var PackType;
(function (PackType) {
    PackType["basic"] = "basic";
    PackType["event"] = "event";
    PackType["limited"] = "limited";
    PackType["gift"] = "gift";
    PackType["promotional"] = "promotional";
})(PackType || (exports.PackType = PackType = {}));


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

/***/ "./libs/contracts/src/Service/interfaces/service.interface.ts":
/*!********************************************************************!*\
  !*** ./libs/contracts/src/Service/interfaces/service.interface.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/contracts/src/User/dtos/user-inventory.dto.ts":
/*!************************************************************!*\
  !*** ./libs/contracts/src/User/dtos/user-inventory.dto.ts ***!
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemovePackFromInventoryResultDto = exports.RemovePackFromInventoryDto = exports.AddPackToInventoryResultDto = exports.AddPackToInventoryDto = exports.UserPackInventoryStatsDto = exports.UserPackInventoryDto = exports.PackTypeStatsDto = exports.UserPackInventoryItemDto = exports.PackDetailsDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
class PackDetailsDto {
    packId;
    name;
    description;
    imageUrl;
    costCurrencyType;
    costAmount;
    numberOfPranksAwarded;
    packType;
    isAvailable;
    requiredUserLevel;
}
exports.PackDetailsDto = PackDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du pack' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PackDetailsDto.prototype, "packId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du pack' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PackDetailsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Description du pack' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PackDetailsDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "URL de l'image du pack" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PackDetailsDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type de devise', enum: client_1.currency_type_enum }),
    (0, class_validator_1.IsEnum)(client_1.currency_type_enum),
    __metadata("design:type", typeof (_a = typeof client_1.currency_type_enum !== "undefined" && client_1.currency_type_enum) === "function" ? _a : Object)
], PackDetailsDto.prototype, "costCurrencyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Coût du pack' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PackDetailsDto.prototype, "costAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de pranks attribués' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PackDetailsDto.prototype, "numberOfPranksAwarded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type du pack', enum: client_1.pack_type_enum }),
    (0, class_validator_1.IsEnum)(client_1.pack_type_enum),
    __metadata("design:type", typeof (_b = typeof client_1.pack_type_enum !== "undefined" && client_1.pack_type_enum) === "function" ? _b : Object)
], PackDetailsDto.prototype, "packType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Disponibilité du pack' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PackDetailsDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Niveau utilisateur requis' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PackDetailsDto.prototype, "requiredUserLevel", void 0);
class UserPackInventoryItemDto {
    userPackInventoryId;
    userId;
    packId;
    quantity;
    acquiredAt;
    pack;
}
exports.UserPackInventoryItemDto = UserPackInventoryItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID de l'élément d'inventaire" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserPackInventoryItemDto.prototype, "userPackInventoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID de l'utilisateur" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserPackInventoryItemDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du pack' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserPackInventoryItemDto.prototype, "packId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantité possédée' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UserPackInventoryItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Date d'acquisition" }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UserPackInventoryItemDto.prototype, "acquiredAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Détails du pack', type: PackDetailsDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PackDetailsDto),
    __metadata("design:type", PackDetailsDto)
], UserPackInventoryItemDto.prototype, "pack", void 0);
class PackTypeStatsDto {
    count;
    totalQuantity;
}
exports.PackTypeStatsDto = PackTypeStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de types de packs différents' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PackTypeStatsDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantité totale de packs de ce type' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PackTypeStatsDto.prototype, "totalQuantity", void 0);
class UserPackInventoryDto {
    totalPacks;
    packsByType;
    allPacks;
}
exports.UserPackInventoryDto = UserPackInventoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre total de packs' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserPackInventoryDto.prototype, "totalPacks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Packs groupés par type',
        type: 'object',
        additionalProperties: {
            type: 'array',
            items: { $ref: '#/components/schemas/UserPackInventoryItemDto' },
        },
    }),
    __metadata("design:type", Object)
], UserPackInventoryDto.prototype, "packsByType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tous les packs', type: [UserPackInventoryItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UserPackInventoryItemDto),
    __metadata("design:type", Array)
], UserPackInventoryDto.prototype, "allPacks", void 0);
class UserPackInventoryStatsDto {
    totalPacks;
    totalValue;
    packsByType;
}
exports.UserPackInventoryStatsDto = UserPackInventoryStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre total de packs' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserPackInventoryStatsDto.prototype, "totalPacks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Valeur totale des packs' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserPackInventoryStatsDto.prototype, "totalValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Statistiques par type de pack',
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/PackTypeStatsDto' },
    }),
    __metadata("design:type", Object)
], UserPackInventoryStatsDto.prototype, "packsByType", void 0);
class AddPackToInventoryDto {
    packId;
    quantity = 1;
}
exports.AddPackToInventoryDto = AddPackToInventoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du pack à ajouter' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddPackToInventoryDto.prototype, "packId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantité à ajouter', default: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AddPackToInventoryDto.prototype, "quantity", void 0);
class AddPackToInventoryResultDto {
    success;
    item;
    error;
}
exports.AddPackToInventoryResultDto = AddPackToInventoryResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Succès de la opération' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddPackToInventoryResultDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Élément ajouté', type: UserPackInventoryItemDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UserPackInventoryItemDto),
    __metadata("design:type", UserPackInventoryItemDto)
], AddPackToInventoryResultDto.prototype, "item", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Message d'erreur" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddPackToInventoryResultDto.prototype, "error", void 0);
class RemovePackFromInventoryDto {
    packId;
    quantity = 1;
}
exports.RemovePackFromInventoryDto = RemovePackFromInventoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du pack à retirer' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RemovePackFromInventoryDto.prototype, "packId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantité à retirer', default: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], RemovePackFromInventoryDto.prototype, "quantity", void 0);
class RemovePackFromInventoryResultDto {
    success;
    remainingQuantity;
    error;
}
exports.RemovePackFromInventoryResultDto = RemovePackFromInventoryResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Succès de la opération' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RemovePackFromInventoryResultDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantité restante' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RemovePackFromInventoryResultDto.prototype, "remainingQuantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Message d'erreur" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RemovePackFromInventoryResultDto.prototype, "error", void 0);


/***/ }),

/***/ "./libs/contracts/src/User/dtos/user-pranks.dto.ts":
/*!*********************************************************!*\
  !*** ./libs/contracts/src/User/dtos/user-pranks.dto.ts ***!
  \*********************************************************/
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
exports.RemovePrankFromCollectionResultDto = exports.RemovePrankFromCollectionDto = exports.AddPrankToCollectionResultDto = exports.AddPrankToCollectionDto = exports.UserPrankFiltersDto = exports.UserPranksStatsDto = exports.UserPranksCollectionDto = exports.PrankTypeStatsDto = exports.PrankRarityStatsDto = exports.UserPrankItemDto = exports.PrankDetailsDto = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
class PrankDetailsDto {
    prankId;
    name;
    description;
    imageUrl;
    type;
    rarity;
    defaultJetonCostEquivalent;
    xpRewardExecutor;
    xpRewardTarget;
    coinsRewardExecutor;
    coinsRewardTarget;
    requiresProof;
    isActive;
}
exports.PrankDetailsDto = PrankDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du prank' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankDetailsDto.prototype, "prankId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nom du prank' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrankDetailsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description du prank' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrankDetailsDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "URL de l'image du prank" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PrankDetailsDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type du prank', enum: client_1.prank_type_enum }),
    (0, class_validator_1.IsEnum)(client_1.prank_type_enum),
    __metadata("design:type", typeof (_a = typeof client_1.prank_type_enum !== "undefined" && client_1.prank_type_enum) === "function" ? _a : Object)
], PrankDetailsDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rareté du prank', enum: client_1.prank_rarity_enum }),
    (0, class_validator_1.IsEnum)(client_1.prank_rarity_enum),
    __metadata("design:type", typeof (_b = typeof client_1.prank_rarity_enum !== "undefined" && client_1.prank_rarity_enum) === "function" ? _b : Object)
], PrankDetailsDto.prototype, "rarity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Coût équivalent en jetons' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankDetailsDto.prototype, "defaultJetonCostEquivalent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "XP pour l'exécuteur" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankDetailsDto.prototype, "xpRewardExecutor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'XP pour la cible' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankDetailsDto.prototype, "xpRewardTarget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Coins pour l'exécuteur" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankDetailsDto.prototype, "coinsRewardExecutor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Coins pour la cible' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankDetailsDto.prototype, "coinsRewardTarget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nécessite une preuve' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PrankDetailsDto.prototype, "requiresProof", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Actif ou non' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PrankDetailsDto.prototype, "isActive", void 0);
class UserPrankItemDto {
    userPrankId;
    userId;
    prankId;
    quantity;
    obtainedAt;
    prank;
}
exports.UserPrankItemDto = UserPrankItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID de l'élément prank utilisateur" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserPrankItemDto.prototype, "userPrankId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID de l'utilisateur" }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserPrankItemDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du prank' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserPrankItemDto.prototype, "prankId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantité possédée' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UserPrankItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Date d'obtention" }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UserPrankItemDto.prototype, "obtainedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Détails du prank', type: PrankDetailsDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PrankDetailsDto),
    __metadata("design:type", PrankDetailsDto)
], UserPrankItemDto.prototype, "prank", void 0);
class PrankRarityStatsDto {
    count;
    totalQuantity;
}
exports.PrankRarityStatsDto = PrankRarityStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de pranks différents de cette rareté' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankRarityStatsDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantité totale de pranks de cette rareté' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankRarityStatsDto.prototype, "totalQuantity", void 0);
class PrankTypeStatsDto {
    count;
    totalQuantity;
}
exports.PrankTypeStatsDto = PrankTypeStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de pranks différents de ce type' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankTypeStatsDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantité totale de pranks de ce type' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PrankTypeStatsDto.prototype, "totalQuantity", void 0);
class UserPranksCollectionDto {
    totalPranks;
    pranksByRarity;
    pranksByType;
    allPranks;
}
exports.UserPranksCollectionDto = UserPranksCollectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre total de pranks différents' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserPranksCollectionDto.prototype, "totalPranks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pranks groupés par rareté',
        type: 'object',
        additionalProperties: {
            type: 'array',
            items: { $ref: '#/components/schemas/UserPrankItemDto' },
        },
    }),
    __metadata("design:type", Object)
], UserPranksCollectionDto.prototype, "pranksByRarity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pranks groupés par type',
        type: 'object',
        additionalProperties: {
            type: 'array',
            items: { $ref: '#/components/schemas/UserPrankItemDto' },
        },
    }),
    __metadata("design:type", Object)
], UserPranksCollectionDto.prototype, "pranksByType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tous les pranks', type: [UserPrankItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UserPrankItemDto),
    __metadata("design:type", Array)
], UserPranksCollectionDto.prototype, "allPranks", void 0);
class UserPranksStatsDto {
    totalPranks;
    totalQuantity;
    totalValue;
    pranksByRarity;
    pranksByType;
    completionPercentage;
}
exports.UserPranksStatsDto = UserPranksStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre total de pranks différents' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserPranksStatsDto.prototype, "totalPranks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantité totale de pranks' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserPranksStatsDto.prototype, "totalQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Valeur totale en jetons' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserPranksStatsDto.prototype, "totalValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Statistiques par rareté',
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/PrankRarityStatsDto' },
    }),
    __metadata("design:type", Object)
], UserPranksStatsDto.prototype, "pranksByRarity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Statistiques par type',
        type: 'object',
        additionalProperties: { $ref: '#/components/schemas/PrankTypeStatsDto' },
    }),
    __metadata("design:type", Object)
], UserPranksStatsDto.prototype, "pranksByType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Pourcentage de collection complète' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], UserPranksStatsDto.prototype, "completionPercentage", void 0);
class UserPrankFiltersDto {
    rarity;
    type;
    sortBy;
    sortOrder;
    limit;
    offset;
}
exports.UserPrankFiltersDto = UserPrankFiltersDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Filtrer par rareté',
        enum: client_1.prank_rarity_enum,
        isArray: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(client_1.prank_rarity_enum, { each: true }),
    __metadata("design:type", Array)
], UserPrankFiltersDto.prototype, "rarity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filtrer par type', enum: client_1.prank_type_enum, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(client_1.prank_type_enum, { each: true }),
    __metadata("design:type", Array)
], UserPrankFiltersDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Trier par',
        enum: ['rarity', 'type', 'quantity', 'obtainedAt', 'name'],
        default: 'obtainedAt',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['rarity', 'type', 'quantity', 'obtainedAt', 'name']),
    __metadata("design:type", String)
], UserPrankFiltersDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ordre de tri', enum: ['asc', 'desc'], default: 'desc' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['asc', 'desc']),
    __metadata("design:type", String)
], UserPrankFiltersDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Limite de résultats', default: 50 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], UserPrankFiltersDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Décalage pour pagination', default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UserPrankFiltersDto.prototype, "offset", void 0);
class AddPrankToCollectionDto {
    prankId;
    quantity = 1;
}
exports.AddPrankToCollectionDto = AddPrankToCollectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du prank à ajouter' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddPrankToCollectionDto.prototype, "prankId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantité à ajouter', default: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AddPrankToCollectionDto.prototype, "quantity", void 0);
class AddPrankToCollectionResultDto {
    success;
    item;
    isNew;
    error;
}
exports.AddPrankToCollectionResultDto = AddPrankToCollectionResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Succès de la opération' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddPrankToCollectionResultDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Élément ajouté', type: UserPrankItemDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UserPrankItemDto),
    __metadata("design:type", UserPrankItemDto)
], AddPrankToCollectionResultDto.prototype, "item", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Premier prank de ce type pour l'utilisateur" }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddPrankToCollectionResultDto.prototype, "isNew", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Message d'erreur" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddPrankToCollectionResultDto.prototype, "error", void 0);
class RemovePrankFromCollectionDto {
    prankId;
    quantity = 1;
}
exports.RemovePrankFromCollectionDto = RemovePrankFromCollectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du prank à retirer' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RemovePrankFromCollectionDto.prototype, "prankId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantité à retirer', default: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], RemovePrankFromCollectionDto.prototype, "quantity", void 0);
class RemovePrankFromCollectionResultDto {
    success;
    remainingQuantity;
    error;
}
exports.RemovePrankFromCollectionResultDto = RemovePrankFromCollectionResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Succès de la opération' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RemovePrankFromCollectionResultDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantité restante' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RemovePrankFromCollectionResultDto.prototype, "remainingQuantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Message d'erreur" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RemovePrankFromCollectionResultDto.prototype, "error", void 0);


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

/***/ "./libs/contracts/src/User/interfaces/user-inventory.interface.ts":
/*!************************************************************************!*\
  !*** ./libs/contracts/src/User/interfaces/user-inventory.interface.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/contracts/src/User/interfaces/user-pranks.interface.ts":
/*!*********************************************************************!*\
  !*** ./libs/contracts/src/User/interfaces/user-pranks.interface.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/contracts/src/User/interfaces/user.interface.ts":
/*!**************************************************************!*\
  !*** ./libs/contracts/src/User/interfaces/user.interface.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/contracts/src/index.ts":
/*!*************************************!*\
  !*** ./libs/contracts/src/index.ts ***!
  \*************************************/
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
__exportStar(__webpack_require__(/*! ./types/common.types */ "./libs/contracts/src/types/common.types.ts"), exports);
__exportStar(__webpack_require__(/*! ./User/dtos/user.dto */ "./libs/contracts/src/User/dtos/user.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./User/interfaces/user.interface */ "./libs/contracts/src/User/interfaces/user.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./User/dtos/user-inventory.dto */ "./libs/contracts/src/User/dtos/user-inventory.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./User/interfaces/user-inventory.interface */ "./libs/contracts/src/User/interfaces/user-inventory.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./User/dtos/user-pranks.dto */ "./libs/contracts/src/User/dtos/user-pranks.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./User/interfaces/user-pranks.interface */ "./libs/contracts/src/User/interfaces/user-pranks.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./Auth/dto/auth.dto */ "./libs/contracts/src/Auth/dto/auth.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./Auth/interfaces/auth.interface */ "./libs/contracts/src/Auth/interfaces/auth.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./Service/dtos/service.dto */ "./libs/contracts/src/Service/dtos/service.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./Service/interfaces/service.interface */ "./libs/contracts/src/Service/interfaces/service.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./Prank/dtos/prank.dto */ "./libs/contracts/src/Prank/dtos/prank.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./Prank/interfaces/prank.interface */ "./libs/contracts/src/Prank/interfaces/prank.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./Mission/dtos/mission.dto */ "./libs/contracts/src/Mission/dtos/mission.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./Mission/interfaces/mission.interface */ "./libs/contracts/src/Mission/interfaces/mission.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./Friendship/dtos/friendship.dto */ "./libs/contracts/src/Friendship/dtos/friendship.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./Friendship/interfaces/friendship.interface */ "./libs/contracts/src/Friendship/interfaces/friendship.interface.ts"), exports);
__exportStar(__webpack_require__(/*! ./PrankPack/dtos/prank-pack.dto */ "./libs/contracts/src/PrankPack/dtos/prank-pack.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./PrankPack/interfaces/prank-pack.interface */ "./libs/contracts/src/PrankPack/interfaces/prank-pack.interface.ts"), exports);


/***/ }),

/***/ "./libs/contracts/src/types/common.types.ts":
/*!**************************************************!*\
  !*** ./libs/contracts/src/types/common.types.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserMissionStatusEnum = exports.ServiceTypeEnum = exports.ServiceStatusEnum = exports.PrankRarityEnum = exports.PrankTypeEnum = exports.MissionTypeEnum = exports.FriendshipStatusEnum = exports.ExecutedPrankStatusEnum = void 0;
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
var PrankRarityEnum;
(function (PrankRarityEnum) {
    PrankRarityEnum["COMMON"] = "common";
    PrankRarityEnum["RARE"] = "rare";
    PrankRarityEnum["EXTREME"] = "extreme";
})(PrankRarityEnum || (exports.PrankRarityEnum = PrankRarityEnum = {}));
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

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

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