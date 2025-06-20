import { TypeOrmModuleOptions } from '@nestjs/typeorm';


require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string | undefined {
    const value = this.env[key];
    if (!value && throwOnMissing &&  value === "undefined")
      throw new Error(`config error - missing env.${key}`);
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort = () => this.getValue('PORT', true)

  public isProduction = () => this.getValue('MODE', false) != 'DEV'

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: 5432,
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
        synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      
    };
  }
}

export const configService = new ConfigService(process.env)
.ensureValues(['POSTGRES_HOST','POSTGRES_PORT','POSTGRES_USER','POSTGRES_PASSWORD','POSTGRES_DATABASE']);