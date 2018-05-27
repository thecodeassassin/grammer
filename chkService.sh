#!/bin/bash
status=$(curl -s --head -w %{http_code} http://api.lyrics.ovh/ -o /dev/null);
if [ $status != 000 ]; 
then echo "Up & Running"; 
else echo "Service Not Ok"; 
die () {
    rc=$1
    shift
    warn "$@"
    exit $rc
}
fi
