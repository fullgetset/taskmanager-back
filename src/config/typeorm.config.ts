import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.getOrThrow<string>('POSTGRES_HOST'),
  port: Number(configService.getOrThrow<string>('POSTGRES_PORT')),
  username: configService.getOrThrow<string>('POSTGRES_USER'),
  password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
  database: configService.getOrThrow<string>('POSTGRES_DATABASE'),
  autoLoadEntities: true, // автоматически загружать все сущности
  synchronize: true, // автосинхранизация в разработке. Динамическое обновление данных
});
