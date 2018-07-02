defmodule Glass.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events) do
      add :name, :string
      add :source_id, references(:sources, on_delete: :nothing)
      add :valid_from, :naive_datetime
      add :valid_until, :naive_datetime
      add :is_current_version, :boolean
      add :description, :string
      add :owner, :string
      add :deleted, :boolean, default: false

      timestamps()
    end

    create index(:events, [:source_id])
  end
end
