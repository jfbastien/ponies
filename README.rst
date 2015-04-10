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

.. TODO Add details on how to run the demo.
