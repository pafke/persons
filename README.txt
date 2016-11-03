STEPS REQUIRED TO RUN THIS PROJECT:

	Development:
	1. Open the command line interface(CLI) of your choice in this folder
	2. Type "npm install" to install the project dependencies
	3. To run this project in development mode type "npm run dev" in the CLI.
	4. Open your browser and browse to your localhost on port 3333 i.e.: http://localhost:3333/
	5. If your port 3333 is allready in use, change the devserver property port in the file webpack.config.js and re-run "npm run dev"
	6. Changes made to the react source files in the folder "src" will autorefresh in the browser when working in development mode

	Production:
	1. Open the command line interface(CLI) of your choice in this folder
	2. Type "npm run build" to create the file "bundle.js" and the minified css
	3. Move the contents of the folder build to the webserver of your choice to deploy