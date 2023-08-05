/**
 * toggle USE_VITE_DEV_SERVER environment variable based on which npm script is running
 * */
import { readFileSync, writeFileSync} from "fs";
import { EOL} from "os";

function setEnvValue(key, value) {
	// read file from hdd & split if from a linebreak to an array
	const ENV_VARS = readFileSync("./.env", "utf8").split(EOL);

	// find the env we want based on the key
	const target = ENV_VARS.indexOf(
		ENV_VARS.find((line) => {
			return line.match(new RegExp(key));
		}) ?? ''
	);

	// replace the key/value with the new value
	ENV_VARS.splice(target, 1, `${key}=${value}`);

	// write everything back to the file system
	writeFileSync("./.env", ENV_VARS.join(EOL));
}

if (process.argv.length > 2) {
	const enable = process.argv[2] === "1" ? true : false;
	setEnvValue("USE_VITE_DEV_SERVER", enable);
}