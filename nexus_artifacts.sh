#!/bin/bash
if [ "$1" = true ]; then
  sed -i 's/shouldGenerateArtifacts: false,/shouldGenerateArtifacts: true,/' src/schema.ts
else
  sed -i 's/shouldGenerateArtifacts: true,/shouldGenerateArtifacts: false,/' src/schema.ts
fi