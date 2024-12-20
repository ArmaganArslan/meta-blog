-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

INSERT INTO "Category" (id, name, "updatedAt") 
VALUES 
    ('technology', 'Technology', CURRENT_TIMESTAMP),
    ('development', 'Development', CURRENT_TIMESTAMP),
    ('design', 'Design', CURRENT_TIMESTAMP),
    ('blockchain', 'Blockchain', CURRENT_TIMESTAMP),
    ('programming', 'Programming', CURRENT_TIMESTAMP),
    ('cloud', 'Cloud', CURRENT_TIMESTAMP),
    ('devops', 'DevOps', CURRENT_TIMESTAMP),
    ('ai', 'AI', CURRENT_TIMESTAMP);

ALTER TABLE "Post" ADD COLUMN "categoryId" TEXT;

UPDATE "Post" SET "categoryId" = 'technology' WHERE category = 'Technology';
UPDATE "Post" SET "categoryId" = 'development' WHERE category = 'Development';
UPDATE "Post" SET "categoryId" = 'design' WHERE category = 'Design';
UPDATE "Post" SET "categoryId" = 'blockchain' WHERE category = 'Blockchain';
UPDATE "Post" SET "categoryId" = 'programming' WHERE category = 'Programming';
UPDATE "Post" SET "categoryId" = 'cloud' WHERE category = 'Cloud';
UPDATE "Post" SET "categoryId" = 'devops' WHERE category = 'DevOps';
UPDATE "Post" SET "categoryId" = 'ai' WHERE category = 'AI';

ALTER TABLE "Post" ALTER COLUMN "categoryId" SET NOT NULL;

ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" 
FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Post" DROP COLUMN "category";