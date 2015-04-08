#!/bin/bash
# Copyright (c) 2014 The Native Client Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

# This is for bash on NaCl. Note that you cannot use external commands
# until the installation is completed. Also, you cannot use features
# which nacl_io does not support yet (e.g., pipes and sub-shells).

# Setup environment once to get location of fixed things like coreutils.
source /mnt/http/setup-environment

/mnt/http/install-base-packages.sh

# Setup environment again, to rescan the packages added.
source /mnt/http/setup-environment

cd ${HOME}

if [ -e ${HOME}/.bashrc ]; then
  source ${HOME}/.bashrc
fi
