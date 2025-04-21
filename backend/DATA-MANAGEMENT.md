# Database Management Tools

This project includes several tools to help manage the MongoDB database for products and categories.

## Overview of Tools

1. **seedData.js** - Seeds the database with initial data ONLY if it's empty
2. **seedSarees.js** - Seeds the database with saree products and categories
3. **backupData.js** - Creates a backup of all categories and products
4. **restoreData.js** - Restores data from a backup
5. **clearDatabase.js** - Manually clears all products and categories (with confirmation)

## How to Use

### Seeding the Database

To seed the database with initial data ONLY if it's empty:

```bash
npm run seed
```

This will only add the default products and categories if there are none in the database already.

### Adding Saree Products

To add saree products and categories to the database:

```bash
npm run seed-sarees
```

This will add saree products and categories if they don't already exist, without affecting your other products.

### Backing Up Data

Before deploying or making major changes, back up your data:

```bash
npm run backup
```

This creates JSON backup files in the `backup/` directory with timestamps.

### Restoring Data

To restore from a backup:

```bash
npm run restore
```

Follow the interactive prompts to select which backup files to restore.

### Clearing the Database

To manually clear all products and categories:

```bash
npm run clear-db
```

This will prompt for confirmation before deleting anything.

## Important Notes

- The backup directory is not included in Git (it's in .gitignore)
- Always back up your data before pushing changes or deploying
- Seed data will only be added when the database is empty
- The saree seed script only adds saree data if it doesn't already exist

## Workflow for Updates

When updating your deployed application:

1. Run `npm run backup` on your production server before updating
2. Push your changes to GitHub
3. Deploy the updates
4. If needed, restore data using `npm run restore`
5. To add saree products without affecting existing data, run `npm run seed-sarees`

This prevents the default seed data from overwriting your actual product data. 