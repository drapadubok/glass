defmodule Glass.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field(:name, :string)
    field(:valid_from, :naive_datetime)
    field(:valid_until, :naive_datetime)
    field(:is_current_version, :boolean)
    field(:description, :string)
    field(:owner, :string)
    field(:deleted, :boolean, default: false)

    has_many(:properties, Glass.Events.Property, foreign_key: :event_id)
    belongs_to(:sources, Glass.Events.Source, foreign_key: :source_id)
    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
