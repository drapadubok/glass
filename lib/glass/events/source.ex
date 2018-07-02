defmodule Glass.Events.Source do
  use Ecto.Schema
  import Ecto.Changeset

  schema "sources" do
    field(:name, :string)
    has_many(:events, Glass.Events.Event, foreign_key: :source_id)
    belongs_to(:branches, Glass.Events.Branch, foreign_key: :branch_id)
    timestamps()
  end

  @doc false
  def changeset(source, attrs) do
    source
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
