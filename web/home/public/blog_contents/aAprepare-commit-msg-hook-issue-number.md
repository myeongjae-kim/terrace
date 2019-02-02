
```sh
#!/bin/sh
#
# Automatically add branch name and branch description to every commit message except merge commit.
# https://stackoverflow.com/a/18739064
#

COMMIT_EDITMSG=$1

addBranchNumber() {
  NAME=$(git branch | grep '*' | sed 's/* //') 
	ISSUE_NUMBER=`echo $NAME | cut -d '-' -f1`
  DESCRIPTION=$(git config branch."$NAME".description)
  echo "[#$ISSUE_NUMBER] $(cat $COMMIT_EDITMSG)" > $COMMIT_EDITMSG
  if [ -n "$DESCRIPTION" ] 
  then
     echo "" >> $COMMIT_EDITMSG
     echo $DESCRIPTION >> $COMMIT_EDITMSG
  fi 
}

MERGE=$(cat $COMMIT_EDITMSG|grep -i 'merge'|wc -l)

if [ $MERGE -eq 0 ] ; then
  addBranchNumber
fi
```