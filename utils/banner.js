import chalk from 'chalk';

export function printBanner() {
  const asciiBanner = `
.-----------------------------------------------------------.
|███████╗███╗   ██╗██████╗  ██████╗ ██████╗ ██████╗ ███████╗|
|██╔════╝████╗  ██║██╔══██╗██╔════╝██╔═══██╗██╔══██╗██╔════╝|
|█████╗  ██╔██╗ ██║██║  ██║██║     ██║   ██║██████╔╝█████╗  |
|██╔══╝  ██║╚██╗██║██║  ██║██║     ██║   ██║██╔══██╗██╔══╝  |
|███████╗██║ ╚████║██████╔╝╚██████╗╚██████╔╝██║  ██║███████╗|
|╚══════╝╚═╝  ╚═══╝╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝|
'-----------------------------------------------------------'
`;

  console.log(chalk.cyanBright(asciiBanner));
  console.log(chalk.green('SOMNIA TESTNET DEPLOY TOOLS & SEND NATIVE/ERC VIA SMART CONTRACT'));
  console.log(chalk.yellow('Telegram: https://t.me/e0303'));
  console.log(chalk.yellow('GitHub  : https://github.com/endijuan33'));
}
