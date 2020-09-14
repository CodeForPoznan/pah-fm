#!/bin/sh

head=$(git rev-parse HEAD)

echo "{\"head\":\"$head\"}" > frontend/.gitHash.json
