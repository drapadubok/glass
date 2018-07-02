defmodule Glass.Events.Property do
  use Ecto.Schema
  import Ecto.Changeset

  schema "properties" do
    field(:name, :string)
    field(:valid_from, :naive_datetime)
    field(:valid_until, :naive_datetime)
    field(:is_current_version, :boolean)
    field(:description, :string)
    field(:type, :string)
    field(:is_personal, :boolean)
    field(:is_mandatory, :boolean)

    belongs_to(:events, Glass.Events.Event, foreign_key: :event_id)
    timestamps()
  end

  @doc false
  def changeset(property, attrs) do
    property
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
