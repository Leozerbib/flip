/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/user/src/friendship.controller.ts":
/*!************************************************!*\
  !*** ./apps/user/src/friendship.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendshipController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const friendship_service_1 = __webpack_require__(/*! ./friendship.service */ "./apps/user/src/friendship.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
const common_types_1 = __webpack_require__(/*! @app/contracts/types/common.types */ "./libs/contracts/src/types/common.types.ts");
let FriendshipController = class FriendshipController {
    friendshipService;
    logger;
    exceptionThrower;
    constructor(friendshipService, logger, exceptionThrower) {
        this.friendshipService = friendshipService;
        this.logger = logger;
        this.exceptionThrower = exceptionThrower;
        this.logger.setContext('Friendship.controller');
    }
    async createFriendshipRequest(payload) {
        this.logger.info('Création demande amitié (microservice)', {
            userId: payload.userId.toString(),
            targetId: payload.createFriendshipDto.user_two_id,
        });
        try {
            return await this.friendshipService.createFriendshipRequest(payload.userId, payload.createFriendshipDto);
        }
        catch (error) {
            this.logger.error('Erreur création demande amitié (microservice)', error.message);
            throw error;
        }
    }
    async acceptFriendshipRequest(payload) {
        this.logger.info('Acceptation demande amitié (microservice)', {
            userId: payload.userId.toString(),
            friendshipId: payload.acceptFriendshipDto.friendship_id,
        });
        try {
            return await this.friendshipService.acceptFriendshipRequest(payload.userId, payload.acceptFriendshipDto);
        }
        catch (error) {
            this.logger.error('Erreur acceptation demande amitié (microservice)', error.message);
            throw error;
        }
    }
    async declineFriendshipRequest(payload) {
        this.logger.info('Refus demande amitié (microservice)', {
            userId: payload.userId.toString(),
            friendshipId: payload.declineFriendshipDto.friendship_id,
        });
        try {
            return await this.friendshipService.declineFriendshipRequest(payload.userId, payload.declineFriendshipDto);
        }
        catch (error) {
            this.logger.error('Erreur refus demande amitié (microservice)', error.message);
            throw error;
        }
    }
    async removeFriend(payload) {
        this.logger.info('Suppression ami (microservice)', {
            userId: payload.userId.toString(),
            friendId: payload.friendId,
        });
        try {
            return await this.friendshipService.removeFriend(payload.userId, payload.friendId);
        }
        catch (error) {
            this.logger.error('Erreur suppression ami (microservice)', error.message);
            throw error;
        }
    }
    async blockUser(payload) {
        this.logger.info('Blocage utilisateur (microservice)', {
            userId: payload.userId.toString(),
            targetId: payload.blockUserDto.user_id,
        });
        try {
            return await this.friendshipService.blockUser(payload.userId, payload.blockUserDto);
        }
        catch (error) {
            this.logger.error('Erreur blocage utilisateur (microservice)', error.message);
            throw error;
        }
    }
    async unblockUser(payload) {
        this.logger.info('Déblocage utilisateur (microservice)', {
            userId: payload.userId.toString(),
            targetId: payload.unblockUserDto.user_id,
        });
        try {
            return await this.friendshipService.unblockUser(payload.userId, payload.unblockUserDto);
        }
        catch (error) {
            this.logger.error('Erreur déblocage utilisateur (microservice)', error.message);
            throw error;
        }
    }
    async getUserFriends(payload) {
        this.logger.info('Récupération amis utilisateur (microservice)', {
            userId: payload.userId.toString(),
            page: payload.page,
            limit: payload.limit,
        });
        try {
            const friends = await this.friendshipService.getUserFriends(payload.userId, payload.page ?? 1, payload.limit ?? 20);
            console.log('friends', friends);
            return friends;
        }
        catch (error) {
            this.logger.error('Erreur récupération amis (microservice)', error.message);
            throw error;
        }
    }
    async getReceivedFriendshipRequests(payload) {
        this.logger.info('Récupération demandes reçues (microservice)', {
            userId: payload.userId.toString(),
            page: payload.page,
            limit: payload.limit,
        });
        try {
            return await this.friendshipService.getReceivedFriendshipRequests(payload.userId, payload.page ?? 1, payload.limit ?? 20);
        }
        catch (error) {
            this.logger.error('Erreur récupération demandes reçues (microservice)', error.message);
            throw error;
        }
    }
    async getSentFriendshipRequests(payload) {
        this.logger.info('Récupération demandes envoyées (microservice)', {
            userId: payload.userId.toString(),
            page: payload.page,
            limit: payload.limit,
        });
        try {
            return await this.friendshipService.getSentFriendshipRequests(payload.userId, payload.page ?? 1, payload.limit ?? 20);
        }
        catch (error) {
            this.logger.error('Erreur récupération demandes envoyées (microservice)', error.message);
            throw error;
        }
    }
    async getFriendshipStats(userId) {
        this.logger.info('Récupération stats amitié (microservice)', { userId: userId.toString() });
        try {
            return await this.friendshipService.getFriendshipStats(userId);
        }
        catch (error) {
            this.logger.error('Erreur récupération stats amitié (microservice)', error.message);
            throw error;
        }
    }
    async getFriendshipStatus(payload) {
        this.logger.info('Vérification statut amitié (microservice)', {
            userId: payload.userId.toString(),
            otherUserId: payload.otherUserId.toString(),
        });
        try {
            const friendship = await this.friendshipService['findExistingFriendship'](payload.userId, payload.otherUserId);
            if (!friendship) {
                return { status: null };
            }
            return {
                status: friendship.status,
                friendship_id: friendship.friendship_id,
            };
        }
        catch (error) {
            this.logger.error('Erreur vérification statut amitié (microservice)', error.message);
            throw error;
        }
    }
    async areFriends(payload) {
        this.logger.info('Vérification amitié (microservice)', {
            userId: payload.userId.toString(),
            otherUserId: payload.otherUserId.toString(),
        });
        try {
            const friendship = await this.friendshipService['findExistingFriendship'](payload.userId, payload.otherUserId);
            const areFriends = friendship?.status === common_types_1.FriendshipStatusEnum.ACCEPTED;
            return {
                areFriends,
                friendship_id: areFriends ? friendship?.friendship_id : undefined,
            };
        }
        catch (error) {
            this.logger.error('Erreur vérification amitié (microservice)', error.message);
            throw error;
        }
    }
    async getMutualFriends(payload) {
        this.logger.info('Récupération amis en commun (microservice)', {
            userId: payload.userId.toString(),
            otherUserId: payload.otherUserId.toString(),
        });
        try {
            const [userFriends, otherUserFriends] = await Promise.all([
                this.friendshipService.getUserFriends(payload.userId, 1, 1000),
                this.friendshipService.getUserFriends(payload.otherUserId, 1, 1000),
            ]);
            const mutualFriends = userFriends.filter(friend => otherUserFriends.some(otherFriend => otherFriend.user_id === friend.user_id));
            this.logger.info('Amis en commun trouvés', {
                userId: payload.userId.toString(),
                otherUserId: payload.otherUserId.toString(),
                mutualCount: mutualFriends.length,
            });
            return mutualFriends;
        }
        catch (error) {
            this.logger.error('Erreur récupération amis en commun (microservice)', error.message);
            throw error;
        }
    }
    async getFriendshipSuggestions(payload) {
        this.logger.info('Récupération suggestions amitié (microservice)', {
            userId: payload.userId.toString(),
            limit: payload.limit,
        });
        try {
            const userFriends = await this.friendshipService.getUserFriends(payload.userId, 1, 100);
            const suggestions = [];
            const seenUserIds = new Set([payload.userId]);
            userFriends.forEach(friend => seenUserIds.add(friend.user_id));
            for (const friend of userFriends.slice(0, 10)) {
                const friendOfFriend = await this.friendshipService.getUserFriends(friend.user_id, 1, 20);
                friendOfFriend.forEach(fof => {
                    if (!seenUserIds.has(fof.user_id) && suggestions.length < (payload.limit ?? 10)) {
                        suggestions.push({
                            ...fof,
                            mutual_friends_count: 1,
                        });
                        seenUserIds.add(fof.user_id);
                    }
                });
            }
            this.logger.info('Suggestions amitié générées', {
                userId: payload.userId.toString(),
                suggestionsCount: suggestions.length,
            });
            return suggestions.slice(0, payload.limit ?? 10);
        }
        catch (error) {
            this.logger.error('Erreur génération suggestions (microservice)', error.message);
            return [];
        }
    }
};
exports.FriendshipController = FriendshipController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_friendship_request' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], FriendshipController.prototype, "createFriendshipRequest", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'accept_friendship_request' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], FriendshipController.prototype, "acceptFriendshipRequest", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'decline_friendship_request' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], FriendshipController.prototype, "declineFriendshipRequest", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'remove_friend' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], FriendshipController.prototype, "removeFriend", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'block_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], FriendshipController.prototype, "blockUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'unblock_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], FriendshipController.prototype, "unblockUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_user_friends' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], FriendshipController.prototype, "getUserFriends", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_received_friendship_requests' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], FriendshipController.prototype, "getReceivedFriendshipRequests", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_sent_friendship_requests' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], FriendshipController.prototype, "getSentFriendshipRequests", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_friendship_stats' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], FriendshipController.prototype, "getFriendshipStats", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_friendship_status' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], FriendshipController.prototype, "getFriendshipStatus", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'are_friends' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], FriendshipController.prototype, "areFriends", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_mutual_friends' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], FriendshipController.prototype, "getMutualFriends", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_friendship_suggestions' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], FriendshipController.prototype, "getFriendshipSuggestions", null);
exports.FriendshipController = FriendshipController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof friendship_service_1.FriendshipService !== "undefined" && friendship_service_1.FriendshipService) === "function" ? _a : Object, typeof (_b = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _b : Object, typeof (_c = typeof exceptions_1.ExceptionThrower !== "undefined" && exceptions_1.ExceptionThrower) === "function" ? _c : Object])
], FriendshipController);


/***/ }),

/***/ "./apps/user/src/friendship.service.ts":
/*!*********************************************!*\
  !*** ./apps/user/src/friendship.service.ts ***!
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendshipService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma/prisma.service */ "./apps/user/src/prisma/prisma.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
const common_types_1 = __webpack_require__(/*! @app/contracts/types/common.types */ "./libs/contracts/src/types/common.types.ts");
let FriendshipService = class FriendshipService {
    prisma;
    logger;
    exceptionThrower;
    constructor(prisma, logger, exceptionThrower) {
        this.prisma = prisma;
        this.logger = logger;
        this.exceptionThrower = exceptionThrower;
        this.logger.setContext('Friendship.service');
    }
    async createFriendshipRequest(requesterId, createFriendshipDto) {
        this.logger.info('Création demande amitié', {
            requesterId: requesterId.toString(),
            targetId: createFriendshipDto.user_two_id.toString(),
        });
        if (parseInt(requesterId.toString()) === parseInt(createFriendshipDto.user_two_id.toString())) {
            this.exceptionThrower.throwValidation('Vous ne pouvez pas vous ajouter en ami', [
                {
                    field: 'user_two_id',
                    value: createFriendshipDto.user_two_id,
                    constraints: ['Cannot add yourself as friend'],
                },
            ]);
        }
        await this.validateUsersExist([requesterId, createFriendshipDto.user_two_id]);
        const existingFriendship = await this.findExistingFriendship(parseInt(requesterId.toString()), parseInt(createFriendshipDto.user_two_id.toString()));
        if (existingFriendship) {
            switch (existingFriendship.status) {
                case common_types_1.FriendshipStatusEnum.PENDING:
                    this.exceptionThrower.throwBusinessRule('Une demande est déjà en attente', 'FRIENDSHIP_REQUEST_PENDING');
                    break;
                case common_types_1.FriendshipStatusEnum.ACCEPTED:
                    this.exceptionThrower.throwBusinessRule('Vous êtes déjà amis', 'ALREADY_FRIENDS');
                    break;
                case common_types_1.FriendshipStatusEnum.BLOCKED:
                    this.exceptionThrower.throwBusinessRule('Cette relation est bloquée', 'FRIENDSHIP_BLOCKED');
                    break;
                case common_types_1.FriendshipStatusEnum.DECLINED:
                    await this.deleteFriendship(existingFriendship.friendship_id);
                    break;
            }
        }
        try {
            const [userOneId, userTwoId] = [requesterId, createFriendshipDto.user_two_id].sort((a, b) => a - b);
            const friendship = await this.prisma.friendships.create({
                data: {
                    user_one_id: parseInt(userOneId.toString()),
                    user_two_id: parseInt(userTwoId.toString()),
                    action_user_id: parseInt(requesterId.toString()),
                    status: common_types_1.FriendshipStatusEnum.PENDING,
                },
            });
            this.logger.info('Demande amitié créée avec succès', {
                friendshipId: friendship.friendship_id.toString(),
                requesterId: requesterId.toString(),
                targetId: createFriendshipDto.user_two_id.toString(),
            });
            return friendship;
        }
        catch (error) {
            this.logger.error('Erreur création demande amitié', error.message);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'create_friendship_request',
                originalError: error.message,
            });
        }
    }
    async acceptFriendshipRequest(userId, acceptFriendshipDto) {
        this.logger.info('Acceptation demande amitié', {
            userId: userId.toString(),
            friendshipId: acceptFriendshipDto.friendship_id.toString(),
        });
        const friendship = await this.findFriendshipById(acceptFriendshipDto.friendship_id);
        if (!friendship) {
            this.exceptionThrower.throwRecordNotFound("Demande d'amitié non trouvée");
        }
        if (friendship.user_one_id !== parseInt(userId.toString()) &&
            friendship.user_two_id !== parseInt(userId.toString())) {
            this.exceptionThrower.throwForbidden("Vous n'êtes pas autorisé à accepter cette demande");
        }
        if (friendship.action_user_id === parseInt(userId.toString())) {
            this.exceptionThrower.throwBusinessRule('Vous ne pouvez pas accepter votre propre demande', 'CANNOT_ACCEPT_OWN_REQUEST');
        }
        if (friendship.status !== common_types_1.FriendshipStatusEnum.PENDING) {
            this.exceptionThrower.throwBusinessRule("Cette demande n'est plus en attente", 'REQUEST_NOT_PENDING');
        }
        try {
            const updatedFriendship = await this.prisma.friendships.update({
                where: { friendship_id: parseInt(acceptFriendshipDto.friendship_id.toString()) },
                data: {
                    status: common_types_1.FriendshipStatusEnum.ACCEPTED,
                    accepted_at: new Date(),
                    updated_at: new Date(),
                },
            });
            this.logger.info('Demande amitié acceptée avec succès', {
                friendshipId: acceptFriendshipDto.friendship_id.toString(),
                userId: userId.toString(),
            });
            return updatedFriendship;
        }
        catch (error) {
            this.logger.error('Erreur acceptation demande amitié', error.message);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'accept_friendship_request',
                originalError: error.message,
            });
        }
    }
    async declineFriendshipRequest(userId, declineFriendshipDto) {
        this.logger.info('Refus demande amitié', {
            userId: userId.toString(),
            friendshipId: declineFriendshipDto.friendship_id.toString(),
        });
        const friendship = await this.findFriendshipById(declineFriendshipDto.friendship_id);
        if (!friendship) {
            this.exceptionThrower.throwRecordNotFound("Demande d'amitié non trouvée");
        }
        if (friendship.user_one_id !== parseInt(userId.toString()) &&
            friendship.user_two_id !== parseInt(userId.toString())) {
            this.exceptionThrower.throwForbidden("Vous n'êtes pas autorisé à refuser cette demande");
        }
        if (friendship.action_user_id === parseInt(userId.toString())) {
            this.exceptionThrower.throwBusinessRule('Vous ne pouvez pas refuser votre propre demande', 'CANNOT_DECLINE_OWN_REQUEST');
        }
        if (friendship.status !== common_types_1.FriendshipStatusEnum.PENDING) {
            this.exceptionThrower.throwBusinessRule("Cette demande n'est plus en attente", 'REQUEST_NOT_PENDING');
        }
        try {
            await this.prisma.friendships.update({
                where: { friendship_id: parseInt(declineFriendshipDto.friendship_id.toString()) },
                data: {
                    status: common_types_1.FriendshipStatusEnum.DECLINED,
                    updated_at: new Date(),
                },
            });
            this.logger.info('Demande amitié refusée avec succès', {
                friendshipId: declineFriendshipDto.friendship_id.toString(),
                userId: userId.toString(),
            });
            return { message: "Demande d'amitié refusée" };
        }
        catch (error) {
            this.logger.error('Erreur refus demande amitié', error.message);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'decline_friendship_request',
                originalError: error.message,
            });
        }
    }
    async blockUser(userId, blockUserDto) {
        this.logger.info('Blocage utilisateur', {
            userId: userId.toString(),
            targetId: blockUserDto.user_id.toString(),
        });
        if (parseInt(userId.toString()) === parseInt(blockUserDto.user_id.toString())) {
            this.exceptionThrower.throwValidation('Vous ne pouvez pas vous bloquer vous-même', [
                {
                    field: 'user_id',
                    value: blockUserDto.user_id,
                    constraints: ['Cannot block yourself'],
                },
            ]);
        }
        await this.validateUsersExist([userId, blockUserDto.user_id]);
        const existingFriendship = await this.findExistingFriendship(userId, blockUserDto.user_id);
        try {
            if (existingFriendship) {
                const updatedFriendship = await this.prisma.friendships.update({
                    where: { friendship_id: parseInt(existingFriendship.friendship_id.toString()) },
                    data: {
                        status: common_types_1.FriendshipStatusEnum.BLOCKED,
                        action_user_id: userId,
                        updated_at: new Date(),
                    },
                });
                return updatedFriendship;
            }
            else {
                const [userOneId, userTwoId] = [userId, blockUserDto.user_id].sort((a, b) => a - b);
                const newFriendship = await this.prisma.friendships.create({
                    data: {
                        user_one_id: parseInt(userOneId.toString()),
                        user_two_id: parseInt(userTwoId.toString()),
                        action_user_id: parseInt(userId.toString()),
                        status: common_types_1.FriendshipStatusEnum.BLOCKED,
                    },
                });
                return newFriendship;
            }
        }
        catch (error) {
            this.logger.error('Erreur blocage utilisateur', error.message);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'block_user',
                originalError: error.message,
            });
        }
    }
    async unblockUser(userId, unblockUserDto) {
        this.logger.info('Déblocage utilisateur', {
            userId: userId.toString(),
            targetId: unblockUserDto.user_id.toString(),
        });
        const friendship = await this.findExistingFriendship(userId, unblockUserDto.user_id);
        if (!friendship) {
            this.exceptionThrower.throwRecordNotFound('Relation non trouvée');
        }
        if (friendship.status !== common_types_1.FriendshipStatusEnum.BLOCKED) {
            this.exceptionThrower.throwBusinessRule("Cette relation n'est pas bloquée", 'RELATION_NOT_BLOCKED');
        }
        if (friendship.action_user_id !== parseInt(userId.toString())) {
            this.exceptionThrower.throwForbidden("Vous n'avez pas bloqué cet utilisateur");
        }
        try {
            await this.prisma.friendships.delete({
                where: { friendship_id: parseInt(friendship.friendship_id.toString()) },
            });
            this.logger.info('Utilisateur débloqué avec succès', {
                friendshipId: friendship.friendship_id.toString(),
                userId: userId.toString(),
            });
            return { message: 'Utilisateur débloqué avec succès' };
        }
        catch (error) {
            this.logger.error('Erreur déblocage utilisateur', error.message);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'unblock_user',
                originalError: error.message,
            });
        }
    }
    async removeFriend(userId, friendId) {
        this.logger.info('Suppression ami', {
            userId: userId.toString(),
            friendId: friendId.toString(),
        });
        const friendship = await this.findExistingFriendship(userId, friendId);
        if (!friendship) {
            this.exceptionThrower.throwRecordNotFound('Amitié non trouvée');
        }
        if (friendship.status !== common_types_1.FriendshipStatusEnum.ACCEPTED) {
            this.exceptionThrower.throwBusinessRule("Vous n'êtes pas amis avec cet utilisateur", 'NOT_FRIENDS');
        }
        try {
            await this.prisma.friendships.delete({
                where: { friendship_id: parseInt(friendship.friendship_id.toString()) },
            });
            this.logger.info('Ami supprimé avec succès', {
                friendshipId: friendship.friendship_id.toString(),
                userId: userId.toString(),
                friendId: friendId.toString(),
            });
            return { message: 'Ami supprimé avec succès' };
        }
        catch (error) {
            this.logger.error('Erreur suppression ami', error.message);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'remove_friend',
                originalError: error.message,
            });
        }
    }
    async getUserFriends(userId, page = 1, limit = 20) {
        this.logger.info('Récupération amis utilisateur', {
            userId: userId.toString(),
            page: page.toString(),
            limit: limit.toString(),
        });
        const offset = (page - 1) * limit;
        try {
            const friendships = await this.prisma.friendships.findMany({
                where: {
                    OR: [
                        { user_one_id: parseInt(userId.toString()) },
                        { user_two_id: parseInt(userId.toString()) },
                    ],
                    status: common_types_1.FriendshipStatusEnum.ACCEPTED,
                },
                include: {
                    users_friendships_user_one_idTousers: {
                        select: {
                            user_id: true,
                            username: true,
                            profile_picture_url: true,
                            level: true,
                            xp_points: true,
                            game_coins: true,
                        },
                    },
                    users_friendships_user_two_idTousers: {
                        select: {
                            user_id: true,
                            username: true,
                            profile_picture_url: true,
                            level: true,
                            xp_points: true,
                            game_coins: true,
                        },
                    },
                },
                skip: offset,
                take: limit,
            });
            if (friendships.length === 0) {
                return [];
            }
            return friendships.map(friendship => {
                const friend = friendship.user_one_id.toString() === userId.toString()
                    ? friendship.users_friendships_user_two_idTousers
                    : friendship.users_friendships_user_one_idTousers;
                return {
                    user_id: friend.user_id,
                    username: friend.username,
                    profile_picture_url: friend.profile_picture_url,
                    level: friend.level,
                    xp_points: friend.xp_points,
                    game_coins: friend.game_coins,
                    friendship_status: common_types_1.FriendshipStatusEnum.ACCEPTED,
                    friendship_since: friendship.accepted_at,
                };
            });
        }
        catch (error) {
            this.logger.error('Erreur récupération amis', error.message);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'get_user_friends',
                originalError: error.message,
            });
        }
    }
    async getReceivedFriendshipRequests(userId, page = 1, limit = 20) {
        this.logger.info('Récupération demandes amitié reçues', {
            userId: userId.toString(),
            page: page.toString(),
            limit: limit.toString(),
        });
        const offset = (page - 1) * limit;
        try {
            const friendships = await this.prisma.friendships.findMany({
                where: {
                    OR: [
                        {
                            user_two_id: parseInt(userId.toString()),
                            action_user_id: { not: parseInt(userId.toString()) },
                        },
                    ],
                    status: common_types_1.FriendshipStatusEnum.PENDING,
                },
                include: {
                    users_friendships_action_user_idTousers: {
                        select: {
                            user_id: true,
                            username: true,
                            profile_picture_url: true,
                            level: true,
                        },
                    },
                },
                orderBy: { requested_at: 'desc' },
                skip: offset,
                take: limit,
            });
            if (friendships.length === 0) {
                return [];
            }
            return friendships.map(friendship => ({
                friendship_id: friendship.friendship_id,
                requester: friendship.users_friendships_action_user_idTousers,
                requested_at: friendship.requested_at,
            }));
        }
        catch (error) {
            this.logger.error('Erreur récupération demandes reçues', error.message);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'get_received_requests',
                originalError: error.message,
            });
        }
    }
    async getSentFriendshipRequests(userId, page = 1, limit = 20) {
        this.logger.info('Récupération demandes amitié envoyées', {
            userId: userId.toString(),
            page: page.toString(),
            limit: limit.toString(),
        });
        const offset = (page - 1) * limit;
        try {
            const friendships = await this.prisma.friendships.findMany({
                where: {
                    action_user_id: parseInt(userId.toString()),
                    status: common_types_1.FriendshipStatusEnum.PENDING,
                },
                include: {
                    users_friendships_user_one_idTousers: {
                        select: {
                            user_id: true,
                            username: true,
                            profile_picture_url: true,
                            level: true,
                        },
                    },
                    users_friendships_user_two_idTousers: {
                        select: {
                            user_id: true,
                            username: true,
                            profile_picture_url: true,
                            level: true,
                        },
                    },
                },
                orderBy: { requested_at: 'desc' },
                skip: offset,
                take: limit,
            });
            if (friendships.length === 0) {
                return [];
            }
            return friendships.map(friendship => {
                const target = friendship.user_one_id.toString() === userId.toString()
                    ? friendship.users_friendships_user_two_idTousers
                    : friendship.users_friendships_user_one_idTousers;
                return {
                    friendship_id: friendship.friendship_id,
                    requester: target,
                    requested_at: friendship.requested_at,
                };
            });
        }
        catch (error) {
            this.logger.error('Erreur récupération demandes envoyées', error.message);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'get_sent_requests',
                originalError: error.message,
            });
        }
    }
    async getFriendshipStats(userId) {
        this.logger.info('Récupération stats amitié', { userId: userId.toString() });
        try {
            const [totalFriends, pendingSent, pendingReceived, blockedUsers] = await Promise.all([
                this.prisma.friendships.count({
                    where: {
                        OR: [
                            { user_one_id: parseInt(userId.toString()) },
                            { user_two_id: parseInt(userId.toString()) },
                        ],
                        status: common_types_1.FriendshipStatusEnum.ACCEPTED,
                    },
                }),
                this.prisma.friendships.count({
                    where: {
                        action_user_id: parseInt(userId.toString()),
                        status: common_types_1.FriendshipStatusEnum.PENDING,
                    },
                }),
                this.prisma.friendships.count({
                    where: {
                        OR: [
                            { user_one_id: parseInt(userId.toString()) },
                            { user_two_id: parseInt(userId.toString()) },
                        ],
                        status: common_types_1.FriendshipStatusEnum.PENDING,
                    },
                }),
                this.prisma.friendships.count({
                    where: {
                        action_user_id: parseInt(userId.toString()),
                        status: common_types_1.FriendshipStatusEnum.BLOCKED,
                    },
                }),
            ]);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const requestsToday = await this.prisma.friendships.count({
                where: {
                    action_user_id: parseInt(userId.toString()),
                    requested_at: { gte: today },
                },
            });
            return {
                total_friends: totalFriends,
                pending_requests_sent: pendingSent,
                pending_requests_received: pendingReceived,
                blocked_users: blockedUsers,
                mutual_friends_avg: 0,
                friendship_requests_today: requestsToday,
            };
        }
        catch (error) {
            this.logger.error('Erreur récupération stats amitié', error.message);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'get_friendship_stats',
                originalError: error.message,
            });
        }
    }
    async findFriendshipById(friendshipId) {
        try {
            const friendship = await this.prisma.friendships.findUnique({
                where: { friendship_id: parseInt(friendshipId.toString()) },
            });
            return friendship;
        }
        catch (error) {
            this.logger.error('Erreur recherche amitié par ID', error.message);
            return null;
        }
    }
    async findExistingFriendship(userId1, userId2) {
        try {
            const [userOneId, userTwoId] = [
                parseInt(userId1.toString()),
                parseInt(userId2.toString()),
            ].sort((a, b) => a - b);
            const friendship = await this.prisma.friendships.findFirst({
                where: {
                    OR: [
                        {
                            AND: [
                                { user_one_id: parseInt(userOneId.toString()) },
                                { user_two_id: parseInt(userTwoId.toString()) },
                            ],
                        },
                        {
                            AND: [
                                { user_one_id: parseInt(userTwoId.toString()) },
                                { user_two_id: parseInt(userOneId.toString()) },
                            ],
                        },
                    ],
                },
            });
            return friendship;
        }
        catch (error) {
            this.logger.error('Erreur recherche amitié existante', error.message);
            return null;
        }
    }
    async validateUsersExist(userIds) {
        for (const userId of userIds) {
            const user = await this.prisma.users.findUnique({
                where: { user_id: parseInt(userId.toString()) },
            });
            if (!user) {
                this.exceptionThrower.throwRecordNotFound(`Utilisateur avec l'ID ${userId} non trouvé`);
            }
        }
    }
    async deleteFriendship(friendshipId) {
        try {
            await this.prisma.friendships.delete({
                where: { friendship_id: parseInt(friendshipId.toString()) },
            });
        }
        catch (error) {
            this.logger.error('Erreur suppression amitié', error.message);
            throw error;
        }
    }
};
exports.FriendshipService = FriendshipService;
exports.FriendshipService = FriendshipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _b : Object, typeof (_c = typeof exceptions_1.ExceptionThrower !== "undefined" && exceptions_1.ExceptionThrower) === "function" ? _c : Object])
], FriendshipService);


/***/ }),

/***/ "./apps/user/src/health/health.controller.ts":
/*!***************************************************!*\
  !*** ./apps/user/src/health/health.controller.ts ***!
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
        this.logger.setContext('Health.controller - User Service');
    }
    checkHealth() {
        this.logger.info('Health check requested');
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            service: 'user-service',
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'health' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], HealthController.prototype, "checkHealth", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [typeof (_a = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _a : Object])
], HealthController);


/***/ }),

/***/ "./apps/user/src/prisma/prisma.module.ts":
/*!***********************************************!*\
  !*** ./apps/user/src/prisma/prisma.module.ts ***!
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
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./apps/user/src/prisma/prisma.service.ts");
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

/***/ "./apps/user/src/prisma/prisma.service.ts":
/*!************************************************!*\
  !*** ./apps/user/src/prisma/prisma.service.ts ***!
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
        console.log('✅ Connexion à la base de données PostgreSQL établie (User Service)');
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

/***/ "./apps/user/src/user.controller.ts":
/*!******************************************!*\
  !*** ./apps/user/src/user.controller.ts ***!
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/user/src/user.service.ts");
const friendship_service_1 = __webpack_require__(/*! ./friendship.service */ "./apps/user/src/friendship.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const user_dto_1 = __webpack_require__(/*! @app/contracts/User/dtos/user.dto */ "./libs/contracts/src/User/dtos/user.dto.ts");
let UserController = class UserController {
    userService;
    friendshipService;
    logger;
    constructor(userService, friendshipService, logger) {
        this.userService = userService;
        this.friendshipService = friendshipService;
        this.logger = logger;
        this.logger.setContext('User.controller');
    }
    async createUser(createUserDto) {
        this.logger.info('Création utilisateur (microservice)', {
            email: createUserDto.email,
            username: createUserDto.username,
        });
        return this.userService.createUser(createUserDto);
    }
    async updateUser(payload) {
        this.logger.info('Mise à jour utilisateur (microservice)', { userId: payload.userId });
        return this.userService.updateUser(payload.userId, payload.updateUserDto);
    }
    async deleteUser(userId) {
        this.logger.info('Suppression utilisateur (microservice)', { userId });
        return this.userService.deleteUser(userId);
    }
    async findUserById(userId) {
        this.logger.info('Recherche utilisateur par ID (microservice)', { userId });
        return this.userService.findUserById(userId);
    }
    async findUserByEmail(email) {
        this.logger.info('Recherche utilisateur par email (microservice)', { email });
        return this.userService.findUserByEmail(email);
    }
    async findUserByUsername(username) {
        this.logger.info('Recherche utilisateur par username (microservice)', { username });
        return this.userService.findUserByUsername(username);
    }
    async getUserProfile(userId) {
        this.logger.info('Récupération profil utilisateur (microservice)', { userId });
        return this.userService.getUserProfile(userId);
    }
    async getUserStats(userId) {
        this.logger.info('Récupération stats utilisateur (microservice)', { userId });
        return this.userService.getUserStats(userId);
    }
    async validateUser(payload) {
        this.logger.info('Validation credentials utilisateur (microservice)', { email: payload.email });
        return this.userService.validateUser(payload.email, payload.password);
    }
    async addUserXP(payload) {
        this.logger.info('Ajout XP utilisateur (microservice)', {
            userId: payload.userId,
            xpAmount: payload.xpAmount,
        });
        return this.userService.addXP(payload.userId, payload.xpAmount);
    }
    async addUserCoins(payload) {
        this.logger.info('Ajout coins utilisateur (microservice)', {
            userId: payload.userId,
            coinAmount: payload.coinAmount,
        });
        return this.userService.addCoins(payload.userId, payload.coinAmount);
    }
    async searchUsers(payload) {
        this.logger.info('Recherche utilisateurs (microservice)', {
            searchTerm: payload.searchTerm,
            page: payload.page,
            limit: payload.limit,
            excludeUserId: payload.excludeUserId,
        });
        return this.userService.searchUsers(payload.searchTerm, payload.page, payload.limit, payload.excludeUserId);
    }
    async checkFriendshipStatus(payload) {
        this.logger.info('Vérification statut amitié (microservice)', {
            userId: payload.userId.toString(),
            otherUserId: payload.otherUserId.toString(),
        });
        const friendship = await this.friendshipService.findExistingFriendship(payload.userId, payload.otherUserId);
        return friendship ? friendship.status : null;
    }
};
exports.UserController = UserController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserController.prototype, "createUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_user_by_id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], UserController.prototype, "findUserById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_user_by_email' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UserController.prototype, "findUserByEmail", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'find_user_by_username' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UserController.prototype, "findUserByUsername", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_user_profile' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_user_stats' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], UserController.prototype, "getUserStats", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'validate_user' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], UserController.prototype, "validateUser", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'add_user_xp' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], UserController.prototype, "addUserXP", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'add_user_coins' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], UserController.prototype, "addUserCoins", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'search_users' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], UserController.prototype, "searchUsers", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'check_friendship_status' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], UserController.prototype, "checkFriendshipStatus", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof friendship_service_1.FriendshipService !== "undefined" && friendship_service_1.FriendshipService) === "function" ? _b : Object, typeof (_c = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _c : Object])
], UserController);


/***/ }),

/***/ "./apps/user/src/user.module.ts":
/*!**************************************!*\
  !*** ./apps/user/src/user.module.ts ***!
  \**************************************/
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
const user_controller_1 = __webpack_require__(/*! ./user.controller */ "./apps/user/src/user.controller.ts");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/user/src/user.service.ts");
const friendship_controller_1 = __webpack_require__(/*! ./friendship.controller */ "./apps/user/src/friendship.controller.ts");
const friendship_service_1 = __webpack_require__(/*! ./friendship.service */ "./apps/user/src/friendship.service.ts");
const health_controller_1 = __webpack_require__(/*! ./health/health.controller */ "./apps/user/src/health/health.controller.ts");
const prisma_module_1 = __webpack_require__(/*! ./prisma/prisma.module */ "./apps/user/src/prisma/prisma.module.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const config_1 = __webpack_require__(/*! @app/config */ "./libs/config/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.GlobalConfigModule, src_1.LoggerModule, prisma_module_1.PrismaModule, exceptions_1.ExceptionsModule],
        controllers: [user_controller_1.UserController, friendship_controller_1.FriendshipController, health_controller_1.HealthController],
        providers: [user_service_1.UserService, friendship_service_1.FriendshipService],
        exports: [user_service_1.UserService, friendship_service_1.FriendshipService],
    })
], UserModule);


/***/ }),

/***/ "./apps/user/src/user.service.ts":
/*!***************************************!*\
  !*** ./apps/user/src/user.service.ts ***!
  \***************************************/
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
exports.UserService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma/prisma.service */ "./apps/user/src/prisma/prisma.service.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
const exceptions_1 = __webpack_require__(/*! @app/exceptions */ "./libs/exceptions/src/index.ts");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const friendship_service_1 = __webpack_require__(/*! ./friendship.service */ "./apps/user/src/friendship.service.ts");
let UserService = class UserService {
    prisma;
    logger;
    exceptionThrower;
    friendshipService;
    constructor(prisma, logger, exceptionThrower, friendshipService) {
        this.prisma = prisma;
        this.logger = logger;
        this.exceptionThrower = exceptionThrower;
        this.friendshipService = friendshipService;
        this.logger.setContext('User.service');
    }
    async createUser(createUserDto) {
        this.logger.info("Création d'un nouvel utilisateur", {
            email: createUserDto.email,
            username: createUserDto.username,
        });
        const existingUserByEmail = await this.findUserByEmail(createUserDto.email);
        if (existingUserByEmail) {
            this.exceptionThrower.throwDuplicateEntry('Un utilisateur avec cet email existe déjà');
        }
        const existingUserByUsername = await this.findUserByUsername(createUserDto.username);
        if (existingUserByUsername) {
            this.exceptionThrower.throwDuplicateEntry("Ce nom d'utilisateur est déjà pris");
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
        try {
            const user = await this.prisma.users.create({
                data: {
                    username: createUserDto.username,
                    email: createUserDto.email,
                    password_hash: hashedPassword,
                    profile_picture_url: createUserDto.profile_picture_url,
                    level: 1,
                    xp_points: 0,
                    game_coins: 100,
                },
            });
            this.logger.info('Utilisateur créé avec succès', { userId: user.user_id.toString() });
            return this.formatUserResponse(user);
        }
        catch (error) {
            this.logger.error("Erreur lors de la création de l'utilisateur", error.message);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'create_user',
                originalError: error.message,
            });
        }
    }
    async updateUser(userId, updateUserDto) {
        this.logger.info('Mise à jour utilisateur', { userId });
        const user = await this.findUserById(userId);
        if (!user) {
            this.exceptionThrower.throwRecordNotFound('Utilisateur non trouvé');
        }
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            const existingUser = await this.findUserByEmail(updateUserDto.email);
            if (existingUser && existingUser.user_id.toString() !== userId) {
                this.exceptionThrower.throwDuplicateEntry('Cet email est déjà utilisé');
            }
        }
        if (updateUserDto.username && updateUserDto.username !== user.username) {
            const existingUser = await this.findUserByUsername(updateUserDto.username);
            if (existingUser && existingUser.user_id.toString() !== userId) {
                this.exceptionThrower.throwDuplicateEntry("Ce nom d'utilisateur est déjà pris");
            }
        }
        try {
            const updatedUser = await this.prisma.users.update({
                where: { user_id: parseInt(userId) },
                data: {
                    ...updateUserDto,
                },
            });
            this.logger.info('Utilisateur mis à jour avec succès', { userId });
            return this.formatUserResponse(updatedUser);
        }
        catch (error) {
            this.logger.error('Erreur lors de la mise à jour', error.message);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'update_user',
                originalError: error.message,
            });
        }
    }
    async deleteUser(userId) {
        this.logger.info('Suppression utilisateur', { userId });
        const user = await this.findUserById(userId);
        if (!user) {
            this.exceptionThrower.throwRecordNotFound('Utilisateur non trouvé');
        }
        try {
            await this.prisma.users.delete({
                where: { user_id: parseInt(userId) },
            });
            this.logger.info('Utilisateur supprimé avec succès', { userId });
            return { message: 'Utilisateur supprimé avec succès' };
        }
        catch (error) {
            this.logger.error('Erreur lors de la suppression', error.message);
            this.exceptionThrower.throwDatabaseQuery({
                operation: 'delete_user',
                originalError: error.message,
            });
        }
    }
    async searchUsers(searchTerm, page = 1, limit = 20, excludeUserId) {
        this.logger.info('Recherche utilisateurs', { searchTerm, page, limit, excludeUserId });
        const cleanTerm = this.normalizeSearchTerm(searchTerm);
        if (!cleanTerm || cleanTerm.length < 1) {
            return { users: [], total: 0, hasMore: false };
        }
        const offset = (page - 1) * limit;
        try {
            const searchQueries = this.generateSearchQueries(cleanTerm);
            const whereConditions = {
                AND: [
                    ...(excludeUserId ? [{ user_id: { not: parseInt(excludeUserId) } }] : []),
                    {
                        OR: [
                            { username: { equals: cleanTerm, mode: 'insensitive' } },
                            { username: { startsWith: cleanTerm, mode: 'insensitive' } },
                            { username: { contains: cleanTerm, mode: 'insensitive' } },
                            { email: { contains: cleanTerm, mode: 'insensitive' } },
                            ...searchQueries.map(query => ({
                                username: { contains: query, mode: 'insensitive' },
                            })),
                        ],
                    },
                ],
            };
            const total = await this.prisma.users.count({ where: whereConditions });
            if (total === 0) {
                return { users: [], total: 0, hasMore: false };
            }
            const users = await this.prisma.users.findMany({
                where: whereConditions,
                select: {
                    user_id: true,
                    username: true,
                    email: true,
                    profile_picture_url: true,
                    level: true,
                    xp_points: true,
                    game_coins: true,
                    created_at: true,
                    updated_at: true,
                },
                orderBy: [
                    {
                        username: 'asc',
                    },
                ],
                skip: offset,
                take: limit,
            });
            const formattedUsers = users.map(user => this.formatUserResponse(user));
            await Promise.all(formattedUsers.map(async (user) => {
                const friendship = await this.friendshipService.findExistingFriendship(parseInt(user.user_id.toString()), parseInt(excludeUserId ?? '0'));
                user.friendship_status = friendship?.status ?? null;
            }));
            const hasMore = offset + users.length < total;
            this.logger.info('Recherche terminée', {
                resultsCount: users.length,
                total,
                hasMore,
                searchTerm: cleanTerm,
            });
            return {
                users: formattedUsers,
                total,
                hasMore,
            };
        }
        catch (error) {
            this.logger.error('Erreur lors de la recherche', error.message);
            return { users: [], total: 0, hasMore: false };
        }
    }
    normalizeSearchTerm(term) {
        return term
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '')
            .substring(0, 50);
    }
    generateSearchQueries(cleanTerm) {
        const queries = [];
        if (cleanTerm.length < 2) {
            return queries;
        }
        const commonTypos = {
            a: ['e', 'à', 'á'],
            e: ['a', 'é', 'è', 'ê'],
            i: ['y', 'í', 'î'],
            o: ['u', 'ó', 'ô'],
            u: ['o', 'ú', 'ù'],
            c: ['k', 'ç'],
            k: ['c', 'q'],
            s: ['z', 'ç'],
            z: ['s'],
            ph: ['f'],
            f: ['ph'],
        };
        for (const [original, replacements] of Object.entries(commonTypos)) {
            if (cleanTerm.includes(original)) {
                for (const replacement of replacements) {
                    const variant = cleanTerm.replace(new RegExp(original, 'g'), replacement);
                    if (variant !== cleanTerm && variant.length >= 2) {
                        queries.push(variant);
                    }
                }
            }
        }
        for (let i = 0; i < cleanTerm.length - 1; i++) {
            if (cleanTerm[i] !== cleanTerm[i + 1]) {
                const chars = cleanTerm.split('');
                [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
                const transposed = chars.join('');
                queries.push(transposed);
            }
        }
        return queries.slice(0, 5);
    }
    async findUserById(userId) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { user_id: parseInt(userId) },
            });
            return user;
        }
        catch (error) {
            this.logger.error('Erreur lors de la recherche par ID', error.message);
            return null;
        }
    }
    async findUserByEmail(email) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { email },
            });
            return user;
        }
        catch (error) {
            this.logger.error('Erreur lors de la recherche par email', error.message);
            return null;
        }
    }
    async findUserByUsername(username) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { username },
            });
            return user;
        }
        catch (error) {
            this.logger.error('Erreur lors de la recherche par username', error.message);
            return null;
        }
    }
    async getUserProfile(userId) {
        this.logger.info('Récupération du profil utilisateur', { userId });
        const user = await this.findUserById(userId);
        if (!user) {
            this.exceptionThrower.throwRecordNotFound('Utilisateur non trouvé');
        }
        return {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            profile_picture_url: user.profile_picture_url,
            level: user.level,
            xp_points: user.xp_points,
            game_coins: user.game_coins,
            createdAt: user.createdAt,
        };
    }
    async getUserStats(userId) {
        this.logger.info('Récupération des statistiques utilisateur', { userId });
        const user = await this.findUserById(userId);
        if (!user) {
            this.exceptionThrower.throwRecordNotFound('Utilisateur non trouvé');
        }
        return {
            user_id: user.user_id,
            level: user.level,
            xp_points: user.xp_points,
            game_coins: user.game_coins,
            services_provided: 0,
            services_received: 0,
            pranks_executed: 0,
            pranks_received: 0,
            missions_completed: 0,
            friends_count: 0,
        };
    }
    async validateUser(email, password) {
        this.logger.info('Validation des credentials utilisateur', { email });
        const user = await this.findUserByEmail(email);
        if (!user) {
            return {
                valid: false,
                error: 'Utilisateur non trouvé',
            };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return {
                valid: false,
                error: 'Mot de passe incorrect',
            };
        }
        return {
            valid: true,
            user: this.formatUserResponse(user),
        };
    }
    async addXP(userId, xpAmount) {
        this.logger.info("Ajout d'XP", { userId, xpAmount });
        const user = await this.findUserById(userId);
        if (!user) {
            this.exceptionThrower.throwRecordNotFound('Utilisateur non trouvé');
        }
        const newXP = user.xp_points + xpAmount;
        const newLevel = this.calculateLevel(newXP);
        const updatedUser = await this.prisma.users.update({
            where: { user_id: parseInt(userId) },
            data: {
                xp_points: newXP,
                level: newLevel,
            },
        });
        this.logger.info('XP ajouté avec succès', { userId, newXP, newLevel });
        return this.formatUserResponse(updatedUser);
    }
    async addCoins(userId, coinAmount) {
        this.logger.info('Ajout de coins', { userId, coinAmount });
        const user = await this.findUserById(userId);
        if (!user) {
            this.exceptionThrower.throwRecordNotFound('Utilisateur non trouvé');
        }
        const updatedUser = await this.prisma.users.update({
            where: { user_id: parseInt(userId) },
            data: {
                game_coins: user.game_coins + coinAmount,
            },
        });
        this.logger.info('Coins ajoutés avec succès', { userId, newTotal: updatedUser.game_coins });
        return this.formatUserResponse(updatedUser);
    }
    formatUserResponse(user) {
        return {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            profile_picture_url: user.profile_picture_url,
            level: user.level,
            xp_points: user.xp_points,
            game_coins: user.game_coins,
            createdAt: user.created_at ?? user.createdAt,
            updatedAt: user.updated_at ?? user.updatedAt,
            friendship_status: user.friendship_status ?? null,
        };
    }
    calculateLevel(xp) {
        return Math.floor(Math.sqrt(xp / 100)) + 1;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof src_1.LoggerService !== "undefined" && src_1.LoggerService) === "function" ? _b : Object, typeof (_c = typeof exceptions_1.ExceptionThrower !== "undefined" && exceptions_1.ExceptionThrower) === "function" ? _c : Object, typeof (_d = typeof friendship_service_1.FriendshipService !== "undefined" && friendship_service_1.FriendshipService) === "function" ? _d : Object])
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

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

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
/*!*******************************!*\
  !*** ./apps/user/src/main.ts ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const user_module_1 = __webpack_require__(/*! ./user.module */ "./apps/user/src/user.module.ts");
const src_1 = __webpack_require__(/*! libs/logger/src */ "./libs/logger/src/index.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(user_module_1.UserModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: process.env.USER_SERVICE_HOST ?? 'localhost',
            port: parseInt(process.env.USER_SERVICE_PORT ?? '4003'),
        },
    });
    const logger = app.get(src_1.LoggerService);
    logger.setContext('User.main');
    await app.listen();
    logger.info(`🌐 User Service is running on port ${process.env.USER_SERVICE_PORT ?? '4003'}`);
}
bootstrap().catch(error => {
    console.error('❌ Erreur lors du démarrage du User Service:', error);
    process.exit(1);
});

})();

/******/ })()
;