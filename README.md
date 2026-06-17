###### npm-package

# Clone Git repo to new one

Clone Git repo to new one with no connections to the original

The new repo will have an empty history and no remotes, everything else will be as in the original. Note that only the default branch (if more than one exists) will be cloned.

*[hh lohmann &lt;hh.lohmann@gmail.com&gt;](mailto:hh.lohmann@gmail.com?subject=git-clone-to-new-repo)*

<!-- see https://hh-lohmann.github.io/github-readme-pages-switch -->
<p align="center" id="github_readme_pages_switch" style="display:none;">
  <b><i>This page may be displayed more optimal in its
  <a href="https://hh-lohmann.github.io/git-clone-to-new-repo">GitHub Pages view</a>
  </i></b>
</p>


## Synopsis

```js
  import { gitCloneToNewRepo } from 'git-clone-to-new-repo'

  gitCloneToNewRepo( urlOfRepoToClone, nameForNewRepo )

  gitCloneToNewRepo( urlOfRepoToClone, nameForNewRepo, branchName )
```


## Parameters

### urlOfRepoToClone
URL of the repo to clone

### nameForNewRepo
Name / path for repo to create

### branchName
Optional: Name for branch with which new repo is created
  * Default: 'main'


## Returns

  * `true` on success, `false` else


## Examples

```js
  gitCloneToNewRepo(
    'https://github.com/acme-com/solve-all-problems',
    'my-super-solver'
  )

  gitCloneToNewRepo(
    'https://github.com/acme-com/postpone-hard-problems',
    '/home/joedoe/backlog/hard-problems'
  )

  gitCloneToNewRepo(
    'https://github.com/acme-com/soft-problems',
    'my-guaranteed-solver',
    'dev-branch'
  )
```


## Installation

Pick for your preferred package manager:

```shell
  npm i git-clone-to-new-repo
```

```shell
  pnpm i git-clone-to-new-repo
```

```shell
  bun i git-clone-to-new-repo
```

```shell
  # For Yarn you should double check docs for your and / or
  # current Yarn version, newer versions do not treat `i package_name`
  # as an alias for `add ...` and exclude global installations
  yarn add git-clone-to-new-repo
```


## Details

  * The new repo will be initialized, but without any commit. This allows you to further refine the new repo by deleting or changing files copied from the original repo in advance.

  * Unlike [degit](https://github.com/Rich-Harris/degit) not meant for automation, therefore far simpler and sometimes faster

  * Cloning is done with "--depth 1" to clone only the current state. Note that this may only have for large repos an effect on the size of what is downloaded since in very small repos the Git tracking may consume more space than the tracked files. Note also that the actual size the new repo will be that after deleting the former Git tracking.


## Source Code

  * GitHub: <https://github.com/hh-lohmann/git-clone-to-new-repo>


## License

  * See LICENSE file included here and in [Source Code](#source-code)

