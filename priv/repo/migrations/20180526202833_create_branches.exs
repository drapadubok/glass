defmodule Glass.Repo.Migrations.CreateBranches do
  use Ecto.Migration

  def change do
    create table(:branches) do
      add :name, :string

      timestamps()
    end

  end
end
