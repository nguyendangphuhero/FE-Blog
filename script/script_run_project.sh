echo test-project
npm test

HAS_ERRORS=$?

if [[ "$HAS_ERRORS" == "0" ]]; then
  npm run build
  npm start
else
  echo Test fail
  exit 1
fi
