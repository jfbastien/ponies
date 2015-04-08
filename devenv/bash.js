/*
 * Copyright (c) 2013 The Native Client Authors. All rights reserved.
 * Use of this source code is governed by a BSD-style license that can be
 * found in the LICENSE file.
 */

NaClTerm.nmf = 'bash.nmf';
NaClTerm.argv = ['--init-file', '/mnt/http/bashrc'];
// TODO(bradnelson): Drop this hack once tar extraction first checks relative
// to the nexe.
NaClProcessManager.useNaClAltHttp = true;

function onInit() {
  // Request 1GB storage.
  navigator.webkitPersistentStorage.requestQuota(
      1024 * 1024 * 1024,
      NaClTerm.init,
      function() {
        console.log("Failed to allocate space!\n");
        // Start the terminal even if FS failed to init.
        NaClTerm.init();
      });
}

window.onload = function() {
  lib.init(function() {
    onInit();
  });
};

// Patch hterm to intercept Ctrl-Shift-N to create new windows.
hterm.Keyboard.KeyMap.prototype.onCtrlN_ = function(e, keyDef) {
  if (e.shiftKey) {
    chrome.runtime.sendMessage({'name': 'new_window'});
  }
  return '\x0e';
};
