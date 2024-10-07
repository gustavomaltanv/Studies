# Sparse-Checkout

Testing the command `sparse-checkout` from git

## Used commands:

Activating the `sparse-checkout`

```bash
git clone --no-checkout https://github.com/gustavomaltanv/Studies.git

cd Studies
git sparse-checkout init --cone
git sparse-checkout set Python
```
Checking the branch:
```bash
# checking first if are up to date
git pull origin master 

# checking the branch
git branch
```
Getting the archives from the directory that you want
```bash
# checkout the master
git checkout master
```