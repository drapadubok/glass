defmodule GlassWeb.Schema.EventTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Ecto, repo: Glass.Repo

  @desc "A branch"
  object :branch do
    field(:id, :id)
    field(:name, :string)
    field(:sources, list_of(:source), resolve: assoc(:sources))
  end

  @desc "A source"
  object :source do
    field(:id, :id)
    field(:branch_id, :id)
    field(:name, :string)
    field(:events, list_of(:event), resolve: assoc(:events))
  end

  @desc "An event"
  object :event do
    field(:id, :id)
    field(:source_id, :id)
    field(:name, :string)
    field(:valid_from, :naive_datetime)
    field(:valid_until, :naive_datetime)
    field(:is_current_version, :boolean)
    field(:description, :string)
    field(:owner, :string)
    field(:deleted, :boolean)
    field(:properties, list_of(:property), resolve: assoc(:properties))
  end

  input_object :event_input do
    field(:source_id, :id)
    field(:name, :string)
    field(:valid_from, :naive_datetime)
    field(:valid_until, :naive_datetime)
    field(:is_current_version, :boolean)
    field(:description, :string)
    field(:owner, :string)
    field(:deleted, :boolean)
    field(:properties_input, list_of(:property_input))
  end

  @desc "A property"
  object :property do
    field(:id, :id)
    field(:event_id, :id)
    field(:name, :string)
    field(:valid_from, :naive_datetime)
    field(:valid_until, :naive_datetime)
    field(:is_current_version, :boolean)
    field(:description, :string)
    field(:type, :string)
    field(:is_personal, :boolean)
    field(:is_mandatory, :boolean)
  end

  input_object :property_input do
    field(:event_id, :id)
    field(:name, :string)
    field(:valid_from, :naive_datetime)
    field(:valid_until, :naive_datetime)
    field(:is_current_version, :boolean)
    field(:description, :string)
    field(:type, :string)
    field(:is_personal, :boolean)
    field(:is_mandatory, :boolean)
  end
end
