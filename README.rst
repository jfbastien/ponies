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
read. The `speaker notes`_ may be helpful in understanding what each slide is
about. The main objectives of this presentation are:

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

.. _`speaker notes`:

Speaker Notes
=============

Here are my speaker notes.

0. Intro slide

 * Introduce self

1. Portable—Fast—Secure

 * Quick introduction to NaCl and PNaCl
 * UNIX-like operating system syscalls exposed to the untrusted code, works on
   Windows/OSX/Linux
 * LLVM-based bitcode, but stable. See `bitcode reference manual`_ and `contents of PNaCl
   bitcode files`_
 * Works on x86-32, x86-64, ARM and MIPS
 * Concurrency and parallelism

  - SIMD
  - Threads: pthread and C++11
  - C++11 atomics
  - Futex

 * GLES
 * C++14 support (from a very recent version of LLVM)

2. Upcoming features

 * GLES3
 * Dynamic linking

  - Currently only static linking
  - Builds must LTO, this is slow
  - Hard to do small updates for applications
  - Slow translation speed
  - Can share cached code
  - Allows loading code while running

 * glibc support in LLVM (currently only newlib)
 * Better socket support

  - WebSockets insufficient for what developers do
  - Must respect web's security model

 * Other languages

 - Go
 - Rust
 - MSIL
 - Haskell
 - …

3. Demo simple applications picked from `PNaCl demos`_

 * Showcase SIMD and threads
 * Multi-touch events (use a Chromebook Pixel 2 for the demos)
 * GLES

4. In-browser development environemnt demo

 * bash
 * ``ls``
 * ``touch``
 * ``echo``
 * ``cat`` a file that contains an ASCII cat
 * Python

  - Write a fibonacci function

   - Show it working on a small number
   - Show it being sad on a large number, but being interruptible with CTRL+C

  - Show ``import datetime`` and ``datetime.datetime.now()`` and what such a
    simple program actually involves

 * Step back a bit, and explain how the development environemnt works

  - JavaScript is our μkernel
  - Show ``./jseval -e 'alert(1+1)'``
  - Explain process creation through ``embed`` tag creation
  - Explain pipe emulation through ``postMessage``
  - Explain how the HTML5 filesystem works, how a standard-based filesystem
    could work similarly, how other filesystems can be used with ``mount`` such
    as Google Drive or Dropbox

 * Show ``git clone https://github.com/jfbastien/papers.git``

  - Usage of sockets
  - Usage of SSL, and certificate verification

 * We need to go deeper

  - ``cd demo1``
  - ``vim Makefile``
  - ``make -j4``
  - ``./hello.pexe``
  - ``make fire``

 * And now for something completely different

  - ``emacs`` and write a C++ fibonacci program which uses ``cstdint``
  - ``clang fib.cc -o fib.ll -emit-llvm -S -O2``
  - clang errors out because ``cstdint`` is a C++11 header
  - ``clang fib.cc -o fib.ll -emit-llvm -S -O2 -std=c++14``
  - Show emacs with ``llvm-mode`` by opening ``fib.ll``
  - ``llc -march=js -filetype=asm fib.ll -o fib.js``
  - Crowd goes wild

 * By the way, I've been serving this entire demo from the installed Chrome app
   using ``python -m SimpleHTTPServer``, from the git repo of this presentation
   cloned into the app's storage, on a Chromebook Pixel 2

5. Security

 * Chrome's and the web's security model
 * NaCl sandboxing

  - Process sandboxing: seccomp-bpf on Linux, other on OSX/Windows
  - Software Fault Isolation sandboxing of untrusted code

 * PNaCl

  - NaCl is an implementation detail
  - Can target different sandbox, stricter if desired, use specific ISA features
  - LLVM used to translate ``pexe`` → ``nexe``
  - LLVM translator is sandboxed
  - Extra translation level makes it harder to generate a specific ``nexe``

6. Attack surfaces

 * Translator
 * Translated code

  - Attacker controlled

 * Still need to break out of NaCl's SFI sandbox and the OS sandbox
 * Harden

  - LLVM
  - The code LLVM generates
  - Can't break developer's code!
  - Discuss ILP32
  - Discuss extra CFI implemented by Peter Collingbourne in LLVM to protect
    virtual and non-virtual calls, and can also do devirtualization

7. Randomization

 * Explain ROP
 * Explain how code hiding combines with randomization
 * Randomizing function order, basic block, and inserting basic blocks isn't as
   useful as randomizing register allocation instruction selection and
   scheduling
 * Discuss cost on performance, debuggability and bug reproducing
 * Discuss blind ROP

8. Fuzzing

 * Fuzzing the translator allows us to ensure it's harder to get the translator
   to emit arbitrary ``nexe`` from a malicious ``pexe``
 * Start fuzzing from the front (bitcode reader) and work our way backwards to
   IR creation, backend optimization, and code generation
 * Random bit flip fuzzing found ~6 bugs, but the format isn't byte-aligned so
   small perturbances entirely change the rest of the file
 * Our next step will be format-aware fuzzing, first on the bitcode format
   itself (abbreviations and records) and then the SSA representation of the IR
 * Discuss afl and libFuzzer, code coverage information, and how libFuzzer
   doesn't like memory leaks (which we're fixing in LLVM's bitcode reader
   because its error path leaks)

9. NaCl is included in Chrome's Vulnerability Reward Program

 * Only reported vulnerability on stable NaCl was CVE-2015-0565, exploited and
   reported by the NaCl team, to disable ``clflush`` to prevent the easiest way
   to rowhammer_, this is a hardware bug which is nominally not even fixable!

10. Discuss how the development environment demo could also work in JavaScript,
    so it also works in other browsers

 * Shared memory was prototyped in V8 by `Nick Bray`_ ~1 year ago, Mozilla has
   an implementation of it, and wrote a `SharedArrayBuffer specification`_,
   based on sequentially consistent atomics and futex
 * `SIMD.js`_ coming along well
 * How would processes work?

  - CTRL+C
  - Address space

 * How would security be enhanced?

.. _`bitcode reference manual`: https://developer.chrome.com/native-client/reference/pnacl-bitcode-abi
.. _`contents of PNaCl bitcode files`: https://developer.chrome.com/native-client/reference/pnacl-bitcode-manual
.. _`PNaCl demos`: https://gonativeclient.appspot.com/demo
.. _rowhammer: http://googleprojectzero.blogspot.co.uk/2015/03/exploiting-dram-rowhammer-bug-to-gain.html
.. _`Nick Bray`: https://www.youtube.com/watch?v=-xNZYr40QOk
.. _`SharedArrayBuffer specification`: https://docs.google.com/document/d/1NDGA_gZJ7M7w1Bh8S0AoDyEqwDdRh4uSoTPSNn77PFk
.. _`SIMD.js`: https://github.com/johnmccutchan/ecmascript_simd

Tentative Additions to the Presentation
=======================================

Things I may want to add to the talk, from questions and discussions after the
talk:

 * Just-In-Time compilation, especially for hosting V8. I'd thought about adding
   a demo of the ``d8`` shell running the JavaScript code generated by ``llc``.
 * Running Chrome inside of this.
 * I should demo X, people were interested in seeing it.
