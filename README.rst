==============
C++ on the Web
==============
-------------------------------------------
Ponies for developers without pwn'ing users
-------------------------------------------

:author: JF Bastien

Abstract
========

Delivering a program through a web browser really shouldn't force it to be
slower than executing it directly on your OS. Similarly, doing so shouldn't
force you to rewrite programs that target venerable, cornerstone native
programming APIs—modern C++ STL, OpenGL, files and processes—nor should it
forbid you from taking advantage of C++'s concurrency and parallelism in order
to meet programming challenges like resource-constrained devices,
battery-starved devices, and high performance code. Oh, and the browser should
keep users secure from malicious sites.

In this presentation we'll showcase some resource-intensive applications that
have been compiled for the LLVM-based PNaCl platform and, unsurprisingly, worked
just like native code. These include a full development environment, complete
with LLVM and your favorite build system and editor, all in an architecture- and
OS-agnostic packaging. Then, we'll describe how LLVM is used to deliver native
code on the web securely, so developers get their C++ ponies and users don't get
pwn'd. We'll also touch on the fuzzing, code randomization and sandboxing that
keep 1B+ users safe.

Details
=======

The main presentation was built using Polymer_ and is scarce in text: I usually
try to entertain my audience rather than lose their attention while they
read. The main objectives of this presentation are:

- Introduce native code on the web, discussing PNaCl_ and Emscripten_.
- Showcase some of what's been possible for a while.
- Showcase a shiny new in-browser development environment.
- Discuss how that development environment works.
- Discuss How users are kept safe while developers get the ponies listed above.
- Open up some future evolution, and hopes for standardization.

This is a pretty bleeding-edge demo, works only in a recent Chrome version, and
there's a bit of smoke and mirrors in getting it to look as amazing today as it
does when I demo it. The main intent is to showcase what's possible today, and
what will be possible in the near future.

Some of the smoke includes running with ``chrome://flags/#enable-nacl`` until
glibc and dynamic linking work fully in PNaCl, as well as starting Chrome with
``--allow-nacl-socket-api=localhost`` until sockets are exposed beyond
WebSockets in a way that respects permissions and the usual security model (or,
as a shortcut, through an extension).

The in-browser development environment is available under naclports_ as devenv_.

.. _Polymer: https://www.polymer-project.org
.. _PNaCl: http://gonacl.com
.. _Emscripten: http://emscripten.org
.. _naclports: https://code.google.com/p/naclports/wiki/PortList
.. _devenv: https://chromium.googlesource.com/external/naclports/+/master/ports/devenv
