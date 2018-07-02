defmodule Glass.Repo.Migrations.CreateSources do
  use Ecto.Migration

  def change do
    create table(:sources) do
      add :name, :string
      add :branch_id, references(:branches, on_delete: :nothing)

      timestamps()
    end

    create index(:sources, [:branch_id])
  end
end
