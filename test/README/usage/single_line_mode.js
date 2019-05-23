import {
  table
} from '../../../src';
import expectTable from './expectTable';

describe('README.md usage/', () => {
  it('single_line_mode', () => {
    const data = [
      ['-rw-r--r--', '1', 'pandorym', 'staff', '1529', 'May 23 11:25', 'LICENSE'],
      ['-rw-r--r--', '1', 'pandorym', 'staff', '16327', 'May 23 11:58', 'README.md'],
      ['drwxr-xr-x', '76', 'pandorym', 'staff', '2432', 'May 23 12:02', 'dist'],
      ['drwxr-xr-x', '634', 'pandorym', 'staff', '20288', 'May 23 11:54', 'node_modules'],
      ['-rw-r--r--', '1,', 'pandorym', 'staff', '525688', 'May 23 11:52', 'package-lock.json'],
      ['-rw-r--r--@', '1', 'pandorym', 'staff', '2440', 'May 23 11:25', 'package.json'],
      ['drwxr-xr-x', '27', 'pandorym', 'staff', '864', 'May 23 11:25', 'src'],
      ['drwxr-xr-x', '20', 'pandorym', 'staff', '640', 'May 23 11:25', 'test']
    ];

    const config = {
      singleLine: true
    };

    const output = table(data, config);

    // console.log(output);

    /* eslint-disable no-restricted-syntax */
    expectTable(output, `
╔═════════════╤═════╤══════════╤═══════╤════════╤══════════════╤═══════════════════╗
║ -rw-r--r--  │ 1   │ pandorym │ staff │ 1529   │ May 23 11:25 │ LICENSE           ║
║ -rw-r--r--  │ 1   │ pandorym │ staff │ 16327  │ May 23 11:58 │ README.md         ║
║ drwxr-xr-x  │ 76  │ pandorym │ staff │ 2432   │ May 23 12:02 │ dist              ║
║ drwxr-xr-x  │ 634 │ pandorym │ staff │ 20288  │ May 23 11:54 │ node_modules      ║
║ -rw-r--r--  │ 1,  │ pandorym │ staff │ 525688 │ May 23 11:52 │ package-lock.json ║
║ -rw-r--r--@ │ 1   │ pandorym │ staff │ 2440   │ May 23 11:25 │ package.json      ║
║ drwxr-xr-x  │ 27  │ pandorym │ staff │ 864    │ May 23 11:25 │ src               ║
║ drwxr-xr-x  │ 20  │ pandorym │ staff │ 640    │ May 23 11:25 │ test              ║
╚═════════════╧═════╧══════════╧═══════╧════════╧══════════════╧═══════════════════╝
        `);
    /* eslint-enable no-restricted-syntax */
  });
});
