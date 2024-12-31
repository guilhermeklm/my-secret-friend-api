start-local:
	@npm run start-local

build-prod: swagger build tests
	@npm run build-prod

start-prod:
	@npm run start-prod

swagger:
	@npm run swagger

build:
	@npm run build

unit-test:
	@npm run test:unit

e2e-test:
	@npm run test:e2e

tests: unit-test e2e-test
