# Ludum Dare 50

Visit https://excaliburjs.com/ludum-50/ to play!

### Prequisites:

- NodeJS
- Git

### Local Dev

Updating your local copy with `git pull -r` to rebase your local commits on top of upstream, makes the `main` easy to follow and merges less cray.

1. Clone the repo

        git clone https://github.com/excaliburjs/ludum-50.git

2. Navigate into the root directory `ludum-50` in your favorite command line tool

3. Run the install to download the tools

        npm install

4. Run the following (only needed once or if the submodule is changed) commands to setup the git submodule

        git submodule init
        git submodule update

5. Build excalibur (takes a while the first time). This only needs to be re run if core excalibur changes.

        npm run build:excalibur

6. Build the project

        npm run build

7. Run the game locally with parcel

        npm start