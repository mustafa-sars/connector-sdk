.PHONY: compile_schema
compile_schema:
	yarn run ajv compile -s messages_schema.json
