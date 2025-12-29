# UI (Atomic Design)

This folder is the start of a gradual move to **Atomic Design**.

- `atoms/`: smallest, reusable UI primitives (buttons, badges, icons, etc.)
- `molecules/`: small compositions of atoms (e.g. a labeled input)
- `organisms/`: bigger composed UI blocks (e.g. roadmap graph)
- `templates/`: page layouts (routes currently live in `app/routes/*`)

Keep this transition incremental: new components go here first; existing ones get migrated when touched.
