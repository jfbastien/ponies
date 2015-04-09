(add-to-list 'load-path "~/.emacs.d/")

(custom-set-variables
 '(column-number-mode t)
 '(inhibit-startup-screen t)
 '(show-paren-mode t)
 '(tool-bar-mode nil))

(load-theme 'solarized-dark t)

(set-face-background 'default "black")

(require 'llvm-mode)
(require 'tablegen-mode)

(require 'cmake-mode)
(setq auto-mode-alist
      (append '(("CMakeLists\\.txt\\'" . cmake-mode)
                ("\\.cmake\\'" . cmake-mode))
              auto-mode-alist))

(tool-bar-mode 0)
(scroll-bar-mode -1)
(line-number-mode 1)
(column-number-mode 1)
(global-hl-line-mode 1) ;; Highlight current line.
(show-paren-mode 1)

(setq-default fill-column 80)
(setq-default auto-fill-mode 1)
(setq-default truncate-lines 1)
(setq-default require-final-newline t)
(setq-default next-line-add-newlines nil)
(setq-default confirm-kill-emacs 'yes-or-no-p)
