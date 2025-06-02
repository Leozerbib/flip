import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, StrategyOptions } from 'passport-google-oauth20';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GlobalConfigService } from '@app/config';

/**
 * Strategy Google OAuth pour l'API Gateway
 * Délègue la validation vers l'Auth Service via TCP
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    private readonly globalConfig: GlobalConfigService
  ) {
    const googleConfig = globalConfig.google;
    const options: StrategyOptions = {
      clientID: googleConfig.clientId,
      clientSecret: googleConfig.clientSecret,
      callbackURL: googleConfig.callbackUrl,
      scope: ['email', 'profile'],
    };

    // Debug temporaire pour diagnostiquer le problème
    console.log('🔍 Google OAuth Configuration:', {
      clientID: options.clientID,
      callbackURL: options.callbackURL,
      hasClientSecret: !!options.clientSecret,
      scope: options.scope,
    });

    super(options);
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
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

      // Valider l'utilisateur Google via l'Auth Service
      const user = await firstValueFrom(
        this.authClient.send({ cmd: 'validate_google_user' }, googleUser)
      );

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
