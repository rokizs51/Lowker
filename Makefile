.PHONY
db-run : 
	docker run --name lowker -e POSTGRES_USER=root -e POSTGRES_PASSWORD=admin123 -e POSTGRES_DB=lowker -p 5432:5432 -d postgres