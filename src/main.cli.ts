import {CliApplication, GenerateCommand, HelpCommand, VersionCommand} from './cli/index.js';
import {ImportCommand} from './cli/commands/import.command.js';

function bootstrap() {
  const cliApplication = new CliApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
