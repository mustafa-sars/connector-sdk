.PHONY: build
build:
	yarn build

.PHONY: clean
clean:
	rm -rf lib

.PHONY: compile_schema
compile_schema:
	yarn run ajv compile -s messages_schema.json

.PHONY: test
test:
	yarn test
