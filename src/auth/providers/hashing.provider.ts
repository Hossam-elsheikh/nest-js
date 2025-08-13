import { Injectable } from '@nestjs/common';

/**
 * an abstract class is often used for something like a hashing-
 * provider because it helps define a contract for multiple possible hashing implementations without tying the app to a specific one.
 * If you hard-code bcrypt everywhere, replacing it later would be painful.
 */

@Injectable()
export abstract class HashingProvider {
  abstract hashPassword(data: string | Buffer): Promise<string>;
  abstract comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
}
