#!/usr/bin/env bash

RED='\033[0;31m'
NC='\033[0m' # No Color

getDeployKey () {
  if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
    echo -e "${RED}The travis ecrypted key var is not available to builds triggered by pull requests.  Aborting.${NC}"
    exit 0
  fi
  # Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
  ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
  ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
  echo "Checking Travis ENV VAR: ${ENCRYPTED_KEY_VAR}..."
  ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
  echo "Checking Travis ENV VAR: ${ENCRYPTED_IV_VAR}..."
  ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
  openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d
  chmod 600 deploy_key
  eval `ssh-agent -s`
  ssh-add deploy_key
}

if ["$TRAVIS_REPO_SLUG" != "priley86/patternfly-react" -o "$TRAVIS_BRANCH" != "master"]; then
  exit 0;
fi

npm run build-storybook
cd .out
git config --global user.email $COMMIT_AUTHOR_EMAIL
git config --global user.name "patternfly-build"
git init
git add .
git commit -m "Deploy Storybook to GitHub Pages"

cd ..
getDeployKey
git push --force --quiet https://github.com/priley86/patternfly-react.git master:gh-pages

