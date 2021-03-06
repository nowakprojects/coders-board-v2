import { PublicCommand } from '@coders-board-library/public-messages';
import { ExternalCommandSender } from '../../application/external-command-sender/external-command-sender';
import { CommandBus } from '@nestjs/cqrs';

export class NestJsExternalCommandSender implements ExternalCommandSender {
  constructor(private readonly commandBus: CommandBus) {}

  send<T extends PublicCommand>(command: T) {
    return this.commandBus.execute<T>(command);
  }
}
