defmodule Glass.Repo.Migrations.CreateProperties do
  use Ecto.Migration

  def change do
    create table(:properties) do
      add :name, :string
      add :event_id, references(:events, on_delete: :nothing)
      add :valid_from, :naive_datetime
      add :valid_until, :naive_datetime
      add :is_current_version, :boolean
      add :description, :string
      add :type, :string
      add :is_personal, :boolean
      add :is_mandatory, :boolean

      timestamps()
    end

    create index(:properties, [:event_id])
  end
end
