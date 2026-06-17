// @ts-check

import { existsSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import pkg from './package.json' with { type: "json" };

/** @import {_CheckArgs,GitCloneToNewRepo} from './types.d.ts' */

/** @type {_CheckArgs} */
const _checkArgs=function(urlOfRepoToClone,nameForNewRepo,branchName){
  const myPrefix=pkg.name+': ';
  if(arguments.length<2) throw TypeError(`${myPrefix}not enough arguments`);
  if(arguments.length>3) throw TypeError(`${myPrefix}too many arguments`);
  ['urlOfRepoToClone','nameForNewRepo','branchName'].forEach((value,i)=>{
    if(i===arguments.length) return;
    if(typeof arguments[i]!=='string'||arguments[i]==='') throw TypeError(`${myPrefix}${value} must be a string`);
  })
  return true;
}

/** Check if Git is available
 * @type {()=>boolean}
 */
const _checkGit=function(){
  if(spawnSync('git',['--version']).pid) return true;
  const myPrefix=pkg.name+': ';
  throw ReferenceError(`${myPrefix}Could not call Git - check installation and / or PATH environment variable`);
}

/** Check if new repo to create already exists
 * @type {(namePath:string)=>boolean}
 */
const _checkNewRepoAlreadyExists=function(namePath){
  if(!existsSync(namePath)) return true;
  const myPrefix=pkg.name+': ';
  throw ReferenceError(`${myPrefix}Repo / directory "${namePath}" already exists`);
}

/** Check if repo to clone is reachable
 *  - NB: not necessarily "does not exist", may be no connection / rights etc.
 * @type {(url:string)=>boolean}
 */
const _checkRepoToClone=function(url){
  if(spawnSync('git',['ls-remote',url]).status===0) return true;
  const myPrefix=pkg.name+': ';
  throw ReferenceError(`${myPrefix}Repo "${url}" not reachable - you may check spelling / access rights / connectivity`);
}

/** Delete original .git
 * @type {(namePath:string)=>boolean}
 */
const _delOrgGit=function(namePath){
  const myPrefix=pkg.name+': ';
  if(!existsSync(namePath+'/.git')) throw Error(`${myPrefix}New repo "${namePath}" seems to have no ".git" dir - please check if cloning was interrupted`);
  try{
    rmSync(namePath+'/.git',{recursive:true});
  }
  catch(err){
    throw Error(`${myPrefix}Git tracking in new repo "${namePath}" could not be deleted - please check if new repo was corrupted`);
  }
  return true;
}

/** Do cloning
 * @type {GitCloneToNewRepo}
 */
const _doClone=function(urlOfRepoToClone,nameForNewRepo){
  if(spawnSync('git',['clone','--depth','1',urlOfRepoToClone,nameForNewRepo]).status===0) return true;
  const myPrefix=pkg.name+': ';
  throw Error(`${myPrefix}Cloning failed (reason unknown)`);
}

/** Init new repo
 * @type {(namePath:string,branchName:string)=>boolean}
 */
const _initNewGit=function(namePath,branchName){
  if(spawnSync('git',['init','-b',branchName],{cwd:namePath}).status===0) return true;
  const myPrefix=pkg.name+': ';
  throw Error(`${myPrefix}Initializing new repo failed (reason unknown)`);
}

/** @type {GitCloneToNewRepo} */
export const gitCloneToNewRepo=function(urlOfRepoToClone,nameForNewRepo,branchName='main'){
  _checkGit();
  _checkArgs(...arguments);
  _checkRepoToClone(urlOfRepoToClone);
  _checkNewRepoAlreadyExists(nameForNewRepo);
  _doClone(urlOfRepoToClone,nameForNewRepo);
  _delOrgGit(nameForNewRepo);
  _initNewGit(nameForNewRepo,branchName);
  return true;
}
