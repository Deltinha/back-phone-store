-- endereço com tipos provisórios por enquanto
CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"last_name" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"cep" varchar(8) NOT NULL,
	"state" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"neighborhood" TEXT NOT NULL,
	"street" TEXT NOT NULL,
	"address_number" INTEGER NOT NULL,
	"complement" TEXT,
	"cpf" TEXT NOT NULL UNIQUE,
	"phone_number" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" TEXT NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
);

CREATE TABLE "products" (
	"id" serial NOT NULL,
	"description" TEXT,
	"value" integer NOT NULL,
	CONSTRAINT "products_pk" PRIMARY KEY ("id")
);

CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"type" TEXT NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")

);

CREATE TABLE "product_category" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "product_category_pk" PRIMARY KEY ("id")

);

CREATE TABLE "purchases" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"value" integer NOT NULL,
	CONSTRAINT "purchases_pk" PRIMARY KEY ("id")

);

CREATE TABLE "product_purchase" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"purchase_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"value" integer NOT NULL,
	CONSTRAINT "product_purchase_pk" PRIMARY KEY ("id")

);

CREATE TABLE "product_image" (
	"id" serial NOT NULL,
	"url" TEXT NOT NULL,
	"product_id" integer NOT NULL,
	"perspective" TEXT NOT NULL,
	CONSTRAINT "product_image_pk" PRIMARY KEY ("id")

);

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "product_category" ADD CONSTRAINT "product_category_fk0" FOREIGN KEY ("product_id") REFERENCES "products"("id");

ALTER TABLE "product_category" ADD CONSTRAINT "product_category_fk1" FOREIGN KEY ("category_id") REFERENCES "categories"("id");

ALTER TABLE "purchases" ADD CONSTRAINT "purchases_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "product_purchase" ADD CONSTRAINT "product_purchase_fk0" FOREIGN KEY ("product_id") REFERENCES "products"("id");

ALTER TABLE "product_purchase" ADD CONSTRAINT "product_purchase_fk1" FOREIGN KEY ("purchase_id") REFERENCES "purchases"("id");

ALTER TABLE "product_image" ADD CONSTRAINT "product_image_fk0" FOREIGN KEY ("product_id") REFERENCES "products"("id");
