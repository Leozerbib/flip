import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, from, firstValueFrom } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { IUserResponse } from '@app/contracts/User/interfaces/user.interface';
import { ICurrentUser } from '@app/contracts/Auth/interfaces/auth.interface';

/**
 * Intercepteur qui enrichit request.user avec les données complètes de l'utilisateur
 * depuis le microservice User
 */
@Injectable()
export class UserEnrichmentInterceptor implements NestInterceptor {
  constructor(@Inject('USER_SERVICE') private readonly userService: ClientProxy) {}

  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log('🔍 User Enrichment Interceptor', request.user);
    // Si pas d'utilisateur dans la requête, continuer normalement
    if (!request.user?.id) {
      return next.handle();
    }

    const userId = request.user.id;

    // Récupérer l'utilisateur complet depuis le microservice User
    return from(
      firstValueFrom(this.userService.send<IUserResponse>({ cmd: 'find_user_by_id' }, userId))
    ).pipe(
      switchMap(user => {
        if (user) {
          // Enrichir request.user avec les données complètes
          const enrichedUser: ICurrentUser = {
            id: user.user_id.toString(),
            // Conserver les données de base du token
            ...(request.user ?? {}),
            // Ajouter les données enrichies depuis la base de données
            username: user.username,
            level: user.level,
            xp_points: user.xp_points,
            game_coins: user.game_coins,
            profile_picture_url: user.profile_picture_url,
          };
          
          request.user = enrichedUser;
          console.log('✅ User enriched:', enrichedUser);
        }
        
        return next.handle();
      }),
      catchError(error => {
        // En cas d'erreur, log et continuer avec les données de base
        console.error("Erreur lors de l'enrichissement de l'utilisateur:", error);
        return next.handle();
      })
    );
  }
}
