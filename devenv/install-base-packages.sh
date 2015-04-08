#!/bin/bash
# Copyright (c) 2014 The Native Client Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

# This is for bash on NaCl. Note that you cannot use external commands
# until the installation is completed. Also, you cannot use features
# which nacl_io does not support yet (e.g., pipes and sub-shells).

InstallBasePackages() {
  # Core packages.
  local default_packages="\
    -i coreutils \
    -i curl \
    -i git \
    -i make \
    -i nano \
    -i python \
    -i grep \
    -i vim"

  local have_gcc=0
  if [[ "${NACL_ARCH}" == "i686" || "${NACL_ARCH}" == "x86_64" ]]; then
    default_packages+=" \
  -i emacs \
  -i mingn.base \
  -i mingn.lib"
    have_gcc=1
  fi

  # Check for updates on some packages.
  package ${default_packages[@]} $@

  if [ "${have_gcc}" == 0 ]; then
    echo "WARNING: \
emacs and gcc not yet available for your platform (coming soon)."
  fi
}

InstallBasePackages $@
