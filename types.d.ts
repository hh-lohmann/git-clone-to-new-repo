/** Check given arguments for gitCloneToNewRepo
 *  - Signature = gitCloneToNewRepo except arg types and optionality (for testing)
 */
export type _CheckArgs=(urlOfRepoToClone?:any,nameForNewRepo?:any,branchName?:any)=>boolean;

/** Clone repo to new one with no connections to the original
 *  - New repo will have an empty history and no remotes, everything
 *    else will be as in the original
 * @example gitCloneToNewRepo('https://github.com/x-y/z','myRepo')
 * @param urlOfRepoToClone - URL of the repo to clone
 * @param nameForNewRepo - Name / path for repo to create
 * @param [branchName] - Optional: Branch name for new repo, default: 'main'
 * @returns `true` on success, `false` else
 */
export type GitCloneToNewRepo=(urlOfRepoToClone:string,nameForNewRepo:string,branchName?:string)=>boolean;
export const gitCloneToNewRepo:GitCloneToNewRepo;
