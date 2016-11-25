# Stories-JS

Next iteration of the stories project.


## Usage

To set up the development environment, first install node.js. Then run `npm install` in the project root to install the required node packages.

Then to start the application, run `npm start`. Later on we can use [Electron-packager](https://github.com/electron-userland/electron-packager) to create self-contained apps.


## Development

To keep code consistent, it is helpful to make use of the EditorConfig file and ESLint (corresponding VSCode packages: 'EditorConfig for VS Code', 'ESLint').
To use the debugger in VS Code and run the app from within VS Code, install the extension 'Debugger for Chrome' and launch the app from the debugger view. For ease of use, assign keyboard bindings to actions under `workbench.action.debug.*`, e.g. `cmd-r` and `cmd-.` to mimic XCode. See <http://electron.rocks/debugging-electron-in-vs-code-revised> for more information. Note that on Windows, the electron binary mentioned in `.vscode/launch.json` is actually called `electron.cmd`.

A style guide which seems very sensible (for the most part at least): https://github.com/elierotenberg/coding-styles/blob/master/es6.md
