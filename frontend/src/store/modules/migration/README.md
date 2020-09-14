# Migration module

As in [#421](https://github.com/CodeForPoznan/pah-fm/issues/421#issuecomment-631524825) migration module is responsible of keeping the store synchronized with latest version of the app without losing any user data.

## Migration object

To accomplish that each migration is defined as an object with these properties:
- `id` - unique migration id. By this value it will check if migration is already applied.
- `previousMigration/previousVersion` - `id` of migration that must be applied before this migration.
- `mutator` - function that as an argument gets store object.
