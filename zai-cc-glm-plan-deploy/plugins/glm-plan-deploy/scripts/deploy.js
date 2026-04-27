"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy = deploy;
const path_1 = require("path");
const filterFiles_1 = require("./src/filterFiles");
const fs_1 = require("fs");
const utils_1 = require("./src/utils");
const service_1 = require("./src/service");
async function deploy(ignoreFilePath, extraParam) {
    try {
        // 1. find or create .deploy/settings.json, if package.json is not found, return error
        console.info('Load settings...');
        const { deploySettings, env } = await (0, utils_1.loadDeploySettings)();
        const { node, outdir } = extraParam;
        if (deploySettings.area) {
            console.info('Area: ', deploySettings.area);
        }
        console.log('Deploy settings:', deploySettings);
        console.log('Environment variables:', env);
        // 2. zip folder
        console.info('Filter and zip src files...');
        const localFolder = process.cwd();
        const files = await (0, filterFiles_1.filterDirectoryFiles)(localFolder, ignoreFilePath, !!outdir ? [outdir] : []);
        console.log(`Filtered files count: ${files.length}`);
        // zip the files
        const tmpDir = (0, path_1.join)(localFolder, '.tmp');
        if (!(0, fs_1.existsSync)(tmpDir)) {
            (0, fs_1.mkdirSync)(tmpDir, { recursive: true });
        }
        // Create temporary zip file path
        const tmpZipFn = (0, path_1.join)(tmpDir, `${Date.now()}_upload.zip`);
        const file = await (0, utils_1.zipFiles)(tmpZipFn, files);
        // 3. upload and deploy
        let projectId = null;
        let deployId = null;
        let area = 'overseas';
        try {
            console.info('Start to upload file...');
            const uploadParams = await (0, service_1.getUploadParamsForDeploy)(deploySettings.projectId);
            area = uploadParams.area;
            if (area) {
                console.info('Project Area:', area);
            }
            await (0, service_1.putObjectForDeploy)(uploadParams.presignedUploadUrl, file);
            console.info('Start to deploy...');
            let deployParams = {
                projectId: deploySettings.projectId,
                path: uploadParams.path,
                env,
                extraParams: {}
            };
            if (!!outdir) {
                deployParams.extraParams.outputDir = outdir;
            }
            if (!!node) {
                deployParams.extraParams.nodejs = node;
            }
            const deploymentResult = await (0, service_1.deployProject)(deployParams);
            projectId = deploymentResult.projectId;
            deployId = deploymentResult.deployId;
            console.info(`Deploy completed: ProjectId=${projectId}, DeployId=${deployId}`);
        }
        catch (error) {
            if ((0, utils_1.isInvalidProjectIdError)(error)) {
                // reset deploy settings
                (0, utils_1.resetDeploySettings)(deploySettings);
                // save deploy settings
                await (0, utils_1.updateDeploySettings)(deploySettings);
            }
            return (0, utils_1.handleUncaughtError)(error);
        }
        finally {
            (0, fs_1.rmSync)(tmpZipFn);
        }
        if (projectId !== deploySettings.projectId) {
            deploySettings.projectId = projectId;
        }
        deploySettings.area = area;
        deploySettings.deployments = deploySettings.deployments || [];
        deploySettings.deployments.unshift({
            deployId: deployId,
            date: new Date().toISOString()
        });
        // save deploy settings
        await (0, utils_1.updateDeploySettings)(deploySettings);
        // 4. loop to get deployment result
        let status = null;
        while (true) {
            status = await (0, service_1.getDeployStatus)(deploySettings.projectId, deployId);
            if (['Success', 'Failed'].includes(status.status)) {
                break;
            }
            console.info(`Deployment status: ${status.status}, waiting...`);
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
        if (status.status === 'Success') {
            return {
                success: true,
                status: status.status,
                url: status.result?.previewUrl || '',
                message: status.result?.message || ''
            };
        }
        else {
            return {
                success: false,
                status: status.status,
                message: `${status.result?.message || ''}`,
                log: status.result?.deployLog,
                audit: status.result?.auditDetail
            };
        }
    }
    catch (error) {
        return (0, utils_1.handleUncaughtError)(error);
    }
}
//# sourceMappingURL=deploy.js.map