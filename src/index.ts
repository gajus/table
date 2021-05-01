// import chalk from 'chalk';
import {
  createStream,
} from './createStream';
import {
  getBorderCharacters,
} from './getBorderCharacters';
import {
  table,
} from './table';

export {
  table,
  createStream,
  getBorderCharacters,
};

// const data = [
//   [
//     chalk.bold('Spacecraft'),
//     chalk.bold('Launch Date'),
//     chalk.bold('Operator'),
//     chalk.bold('Outcome'),
//     chalk.bold('Remarks'),
//   ],
//   [
//     'Able I',
//     '17 August 1958',
//     'USAF',
//     chalk.white.bold.bgRed('Launch failure'),
//     'First attempted launch beyond Earth orbit; failed to orbit due to turbopump gearbox malfunction resulting in first stage explosion.[3] Reached apogee of 16 kilometres (9.9 mi)',
//   ],
//   [
//     'Luna 2',
//     '12 September 1959',
//     'OKB-1',
//     chalk.black.bgGreen('Successful'),
//     'Successful impact at 21:02 on 14 September 1959. First spacecraft to reach lunar surface',
//   ],
// ];
//
// console.log(table(data, {
//   border: getBorderCharacters('honeywell'),
//   columns: {
//     4: {
//       alignment: 'justify',
//       width: 20,
//       wrapWord: true,
//     },
//   },
//   header: {
//     alignment: 'center',
//     content: chalk.yellow('asdasdaxda\n sd asd asd asd asd\nas,djnaskjds'),
//   },
// }));

export * from './types/api';
