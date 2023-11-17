// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthController } from './controllers/auth/auth.controller';
// import { AuthService } from './services/auth/auth.service';

// @Module({
//   imports: [
//     JwtModule.register({
//       secret: 'your-secret-key',
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService],
// })
// export class AuthModule {}



// auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersController } from 'src/users/controllers/users/users.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersController], // Include UserRepository in the providers
})
export class AuthModule {}

