#!/bin/bash
cd /home/kavia/workspace/code-generation/motivated-to-do-21614-21648/todo_frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

