db-run : 
	docker run --name lowker -e POSTGRES_USER=root -e POSTGRES_PASSWORD=admin123 -e POSTGRES_DB=lowker -p 5432:5432 -d postgres

generate-migration:
	npx typeorm-ts-node-commonjs migration:generate ./src/migrations/$(MIGRATION) -d ./src/data-source.ts

run-migration:
	npx typeorm-ts-node-commonjs migration:run -d ./src/data-source.ts 

.PHONY: db-run generate-migration run-migration
