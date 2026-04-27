/**
 * Deploy current folder as a nodejs project to cloud
 *
 * @param ignoreFilePath - Path to the .ignore file
 * @returns Promise containing deployment result with public URL and metadata
 *
 * @example
 * ```typescript
 * const result = await deploySkill('/path/to/.ignore');
 * if (result.success) {
 *   console.log('Deployed to:', result.url);
 *   console.log('Project metadata:', result.metadata);
 * } else {
 *   console.error('Deployment failed:', result.error);
 * }
 * ```
 */
interface ExtraParams {
    node: string;
    outdir: string;
}
export declare function deploy(ignoreFilePath: string, extraParam: ExtraParams): Promise<{
    success: boolean;
    status: string;
    url?: string;
    message: string;
    log?: string;
    audit?: string;
}>;
export {};
//# sourceMappingURL=deploy.d.ts.map