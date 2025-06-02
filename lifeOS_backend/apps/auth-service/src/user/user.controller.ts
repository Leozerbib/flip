import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from 'libs/contracts/src/User/dtos/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Message Patterns pour les microservices uniquement
  @MessagePattern({ cmd: 'create_user' })
  public async createUser(@Payload() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @MessagePattern({ cmd: 'find_user_by_email' })
  public async findUserByEmail(@Payload() email: string) {
    return this.userService.findUserByEmail(email);
  }

  @MessagePattern({ cmd: 'find_user_by_id' })
  public async findUserById(@Payload() id: string) {
    return this.userService.findUserById(id);
  }

  @MessagePattern({ cmd: 'validate_user' })
  public async validateUser(@Payload() payload: { email: string; password: string }) {
    return this.userService.validateUser(payload.email, payload.password);
  }

  @MessagePattern({ cmd: 'get_user_profile' })
  public async getUserProfile(@Payload() userId: string) {
    return this.userService.findUserById(userId);
  }
}
