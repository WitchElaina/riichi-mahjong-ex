import { loadPyodide } from 'pyodide';

const getPyInstance = async () => {
  console.time('loadPyodide');
  const pyodide = await loadPyodide();
  await pyodide.loadPackage('micropip');
  await pyodide.runPythonAsync(`
    import micropip
    await micropip.install('mahjong') 
  `);
  console.timeEnd('loadPyodide');
  return pyodide;
};

export class PyRunner {
  pyodide: any;
  constructor() {
    this.pyodide = null;
  }
  async run(code: string) {
    if (!this.pyodide) {
      this.pyodide = await getPyInstance();
    }
    return this.pyodide.runPythonAsync(code);
  }
}
