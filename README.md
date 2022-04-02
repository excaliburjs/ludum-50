# Ludum Dare 50

Visit https://excaliburjs.com/ludum-50/ to play!

## Prequisites

- NodeJS 16.x
- Git

## Local Development

Updating your local copy with `git pull -r` to rebase your local commits on top of upstream, makes the `main` easy to follow and merges less difficult.

1. Clone the repo

        git clone https://github.com/excaliburjs/ludum-50.git

2. Navigate into the root directory `ludum-50` in your favorite command line tool

3. Run the install to download the tools:

        npm install

4. Run the following (only needed once or if the submodule is changed) commands to setup the git submodule:

        git submodule init
        git submodule update

5. Build excalibur (takes a while the first time). This only needs to be re run if core excalibur changes.

        npm run build:excalibur

6. Build the project:

        npm run build

7. Run the game locally with parcel:

        npm start

8. Make your changes, commit directly to the 'main' branch, update your local copy with `git pull -r`, and then push to the remote repository.

### Debugging tools

We have excalibur dev-tools running by default. It shows up in the top right corner of the browser tab.

### Debugging hotkeys

- Pressing `p` on the keyboard will toggle pause/resume of the game.
- Pressing `;` will toggle excalibur debug mode (this won't update unless game is running). This can also be toggled at the top of the excalibur dev-tools window.
