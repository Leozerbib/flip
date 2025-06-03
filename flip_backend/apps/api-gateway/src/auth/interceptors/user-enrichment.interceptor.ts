import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from 'libs/logger/src';

@Injectable()
export class UserEnrichmentInterceptor implements NestInterceptor {
  private readonly logger = new LoggerService();

  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {
    this.logger.setContext('USER_ENRICHMENT_INTERCEPTOR');
  }

  public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    // Si l'utilisateur est authentifié et que ses infos ne sont pas encore enrichies
    if (request.user?.id && !request.user.enriched) {
      try {
        // Récupérer les informations complètes depuis le microservice User
        const completeUser = await firstValueFrom(
          this.userClient.send({ cmd: 'find_user_by_id' }, request.user.id)
        );

        // Enrichir request.user avec les informations complètes
        request.user = {
          ...request.user,
          ...completeUser,
          enriched: true, // Marquer comme enrichi pour éviter les appels multiples
        };
      } catch (error) {
        this.logger.error("Erreur lors de l'enrichissement de l'utilisateur", error);
      }
    }

    return next.handle().pipe(
      tap(() => {
        // Optionnel : logging après exécution
      })
    );
  }
}
