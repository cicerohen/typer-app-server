import { SetMetadata } from "@nestjs/common";

export const UserRoles = (...roles: string[]) => SetMetadata("roles", roles);
