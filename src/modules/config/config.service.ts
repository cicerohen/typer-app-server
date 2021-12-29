import { Injectable } from "@nestjs/common";
import { ConfigService as NestJSConfigService } from "@nestjs/config";

@Injectable()
export class ConfigService extends NestJSConfigService {}
