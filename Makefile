start-local:
	@npm run start-local

start-prod: swagger build 
	@npm run start-prod

swagger:
	@npm run swagger

build:
	@npm run build