---
title: Ruby - rbenv
category: Python
order: 1
---
Ruby - rbenv

Install:
```
sudo apt install rbenv
```

Configure rbenv for profile:
```
rbenv init
```

Add to bashrc:
```
eval "$(rbenv init -)"
```


Install Ruby versions:
```
# list remote
rbenv install -l
# list local
rbenv install -L
# install version locally
rbenv install 3.1.2
```