#!/bin/bash

# Install extra goodies.
#
# Run this from *outside* the devenv, in the git repo for this presentation:
# (cd devenv && wget http://gsdview.appspot.com/nacltools/pnacl_exp1/x86_64.zip)
#
# Then, inside the presentation's devenv accept the storage quota request.
# Run this script with:
# /mnt/http/install.sh
#
# This script is a bit sill because the http mount can list the directory's
# content at the moment.

echo "Installing extras:"

echo "  tooling"
cd /tmp
unzip /mnt/http/x86_64.zip
cd ~/
cp /mnt/http/.bashrc ~/

echo "  fire demo"
mkdir ~/fire
cp /mnt/http/fire.cc ~/fire/
cp /mnt/http/Makefile ~/fire/

echo "  emacs"
cp /mnt/http/.emacs ~/
mkdir ~/.emacs.d
cp /mnt/http/.emacs.d/ ~/.emacs.d/
cp /mnt/http/.emacs.d/cmake-mode.el ~/.emacs.d/
cp /mnt/http/.emacs.d/color-theme-solarized.el ~/.emacs.d/
cp /mnt/http/.emacs.d/solarized-dark-theme.el ~/.emacs.d/
cp /mnt/http/.emacs.d/solarized-light-theme.el ~/.emacs.d/
cp /mnt/http/.emacs.d/color-theme-solarized-pkg.el ~/.emacs.d/
cp /mnt/http/.emacs.d/llvm-mode.el ~/.emacs.d/
cp /mnt/http/.emacs.d/solarized-definitions.el ~/.emacs.d/
cp /mnt/http/.emacs.d/tablegen-mode.el ~/.emacs.d/

echo "Done with installation."
