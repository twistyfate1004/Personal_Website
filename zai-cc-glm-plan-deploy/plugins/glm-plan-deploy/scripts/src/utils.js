"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDeploySettings = exports.resetDeploySettings = exports.isInvalidProjectIdError = exports.updateDeploySettings = exports.getPackageVersion = void 0;
exports.zipFiles = zipFiles;
exports.handleUncaughtError = handleUncaughtError;
const fs_1 = require("fs");
const path_1 = require("path");
const crypto_1 = require("crypto");
const archiver_1 = __importDefault(require("archiver"));
const settingsFile = '.zai/deploy/settings.json';
const getPackageVersion = () => {
    try {
        return JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), 'package.json'), 'utf-8'));
    }
    catch (error) {
        console.debug('Error reading package.json:', error);
    }
};
exports.getPackageVersion = getPackageVersion;
const updateDeploySettings = (newSettings) => {
    try {
        (0, fs_1.mkdirSync)((0, path_1.join)(process.cwd(), (0, path_1.dirname)(settingsFile)), { recursive: true });
        const settingsString = JSON.stringify(newSettings);
        (0, fs_1.writeFileSync)((0, path_1.join)(process.cwd(), settingsFile), settingsString, 'utf-8');
    }
    catch (error) {
        console.error(`Error writing ${settingsFile}:`, error);
    }
};
exports.updateDeploySettings = updateDeploySettings;
const isInvalidProjectIdError = (error) => {
    if (error instanceof AggregateError) {
        if (error.errors[0]?.code === 1220
            && (error.errors[0]?.msg === 'Invalid projectId' || error.errors[0]?.msg === 'Project disabled')) {
            return true;
        }
    }
    return false;
};
exports.isInvalidProjectIdError = isInvalidProjectIdError;
const resetDeploySettings = (deploySettings) => {
    delete deploySettings.projectId;
    delete deploySettings.projectName;
    delete deploySettings.deployments;
    delete deploySettings.env;
    delete deploySettings.envHash;
};
exports.resetDeploySettings = resetDeploySettings;
const loadDeploySettings = () => {
    try {
        const projectName = (0, path_1.basename)(process.cwd());
        const settingsPath = (0, path_1.join)(process.cwd(), settingsFile);
        let deploySettings;
        try {
            deploySettings = JSON.parse((0, fs_1.readFileSync)(settingsPath, 'utf-8'));
        }
        catch (error) {
            console.log(`${settingsFile} not found, creating a new one.`);
        }
        if (!deploySettings) {
            deploySettings = { projectName };
        }
        if (projectName !== deploySettings.projectName) {
            // Reset project
            delete deploySettings.projectId;
            deploySettings.projectName = projectName;
        }
        if (!deploySettings.projectId) {
            delete deploySettings.deployments;
            delete deploySettings.env;
            delete deploySettings.envHash;
        }
        const env = (deploySettings.env || []).map((key) => ({ key }));
        let envLines = '';
        try {
            const envPath = (0, path_1.join)(process.cwd(), '.env');
            envLines = (0, fs_1.readFileSync)(envPath, 'utf-8');
        }
        catch (error) {
            console.log('Could not read .env file');
        }
        if (envLines) {
            envLines.split('\n').forEach(line => {
                const [key, value] = line.split('=', 2);
                if (key && key.trim()) {
                    const p = env.find(pair => pair.key === key.trim());
                    if (p) {
                        p.value = value.trim();
                    }
                    else {
                        env.push({ key: key.trim(), value: value.trim() });
                    }
                    console.info(`read env: ${key.trim()}=***}`);
                }
            });
            const envHash = MD5(envLines);
            if (deploySettings.envHash !== envHash) {
                deploySettings.envHash = envHash;
                deploySettings.env = env.map(item => item.key);
            }
        }
        (0, exports.updateDeploySettings)(deploySettings);
        return { deploySettings, env };
    }
    catch (error) {
        console.error(`Error loading ${settingsFile}:`, error);
    }
};
exports.loadDeploySettings = loadDeploySettings;
async function zipFiles(targetFile, files) {
    return new Promise((resolve, reject) => {
        // Create a file to stream archive data to
        const output = (0, fs_1.createWriteStream)(targetFile);
        const archive = (0, archiver_1.default)('zip', {
            zlib: { level: 9 } // Sets the compression level
        });
        // Listen for all archive data to be written
        output.on('close', () => {
            resolve(new File([(0, fs_1.readFileSync)(targetFile)], (0, path_1.basename)(targetFile), { type: 'application/zip' }));
        });
        // Handle warnings and errors
        archive.on('warning', (err) => {
            if (err.code === 'ENOENT') {
                console.warn('Archive warning:', err);
            }
            else {
                reject(err);
            }
        });
        archive.on('error', (err) => {
            reject(err);
        });
        // Pipe archive data to the file
        archive.pipe(output);
        // Add files to the archive with relative paths
        for (const filePath of files) {
            if ((0, fs_1.existsSync)(filePath)) {
                // Use the relative path from the current working directory
                const relativePath = (0, path_1.relative)(process.cwd(), filePath);
                console.log(`Archiving: ${filePath} -> ${relativePath}`);
                archive.file(filePath, { name: relativePath });
            }
            else {
                console.warn(`File not found: ${filePath}`);
            }
        }
        // Finalize the archive
        archive.finalize();
    });
}
/**
 * Error handling wrapper for consistent error responses
 */
function handleUncaughtError(error) {
    const errorMessage = error?.message || 'Unknown error occurred';
    return {
        success: false,
        status: 'Error',
        message: errorMessage
    };
}
function MD5(envLines) {
    return (0, crypto_1.createHash)('md5').update(envLines).digest('hex');
}
//# sourceMappingURL=utils.js.map