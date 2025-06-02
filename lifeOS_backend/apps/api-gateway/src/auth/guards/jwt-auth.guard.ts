import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ITokenValidationResponse } from '@app/contracts/Auth/interfaces/auth.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Token d'authentification manquant");
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const validation = await firstValueFrom(
        this.authClient.send<ITokenValidationResponse>({ cmd: 'validate_token' }, token)
      );

      if (!validation.valid || !validation.user) {
        throw new UnauthorizedException(validation.error ?? 'Token invalide');
      }

      // Ajouter l'utilisateur à la requête
      request.user = validation.user;
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Erreur de validation du token');
    }
  }
}
