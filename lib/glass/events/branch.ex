defmodule Glass.Events.Branch do
  use Ecto.Schema
  import Ecto.Changeset

  schema "branches" do
    field(:name, :string)
    has_many(:sources, Glass.Events.Source, foreign_key: :branch_id)
    timestamps()
  end

  @doc false
  def changeset(branch, attrs) do
    branch
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
