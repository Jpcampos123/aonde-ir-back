import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // const { authorization } = request.body.headers;
    const { authorization } = request.headers;

    try {
      const data = await this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );
      request.tokenPayload = data;

      //   request.user = await this.authService.findOne(data.id);
      return true;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: e.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(),
        },
      );
    }

    // try {
    //   const data: any = this.authService.checkToken(
    //     (request.authorization ?? '').split(' ')[1],
    //   );

    //   request.tokenPayload = data;

    //   request.user = this.authService.findOne(data.id);

    //   console.log(data.id);
    //   return true;
    // } catch (e) {
    //   return false;
    // }
  }
}
