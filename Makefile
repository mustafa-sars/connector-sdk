.PHONY: compile_schema
compile_schema:
	yarn run ajv compile -s messages_schema.json

.PHONY: build
build:
	yarn build

.PHONY: test
test:
	yarn test
