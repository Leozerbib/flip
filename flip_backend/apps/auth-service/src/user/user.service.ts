import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'libs/contracts/src/User/dtos/user.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly userClient: ClientProxy) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Déléguer la création d'utilisateur au user-service
    const user = await firstValueFrom(this.userClient.send({ cmd: 'create_user' }, createUserDto));
    return user;
  }

  public async findUserByEmail(email: string) {
    try {
      const user = await firstValueFrom(this.userClient.send({ cmd: 'find_user_by_email' }, email));
      return user;
    } catch {
      return null;
    }
  }

  public async findUserById(id: string) {
    try {
      const user = await firstValueFrom(this.userClient.send({ cmd: 'find_user_by_id' }, id));
      return user;
    } catch {
      throw new NotFoundException('Utilisateur non trouvé');
    }
  }

  public async validateUser(email: string, password: string) {
    try {
      const response = await firstValueFrom(
        this.userClient.send({ cmd: 'validate_user' }, { email, password })
      );

      if (response.valid) {
        return response.user;
      }
      return null;
    } catch {
      return null;
    }
  }
}
