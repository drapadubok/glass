defmodule Glass.Events do
  @moduledoc """
  The Events context.
  """

  import Ecto.Query, warn: false
  alias Glass.Repo

  alias Glass.Events.Branch
  require Logger

  @doc """
  Returns the list of branches.

  ## Examples

      iex> list_branches()
      [%Branch{}, ...]

  """
  def list_branches do
    Repo.all(Branch)
  end

  @doc """
  Gets a single branch.

  Raises `Ecto.NoResultsError` if the Branch does not exist.

  ## Examples

      iex> get_branch!(123)
      %Branch{}

      iex> get_branch!(456)
      ** (Ecto.NoResultsError)

  """
  def get_branch!(id), do: Repo.get!(Branch, id)
  def get_branch_by_name!(name), do: Repo.get_by(Branch, name: name)

  @doc """
  Creates a branch.

  ## Examples

      iex> create_branch(%{field: value})
      {:ok, %Branch{}}

      iex> create_branch(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_branch(attrs \\ %{}) do
    %Branch{}
    |> Branch.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a branch.

  ## Examples

      iex> update_branch(branch, %{field: new_value})
      {:ok, %Branch{}}

      iex> update_branch(branch, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_branch(%Branch{} = branch, attrs) do
    branch
    |> Branch.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Branch.

  ## Examples

      iex> delete_branch(branch)
      {:ok, %Branch{}}

      iex> delete_branch(branch)
      {:error, %Ecto.Changeset{}}

  """
  def delete_branch(%Branch{} = branch) do
    Repo.delete(branch)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking branch changes.

  ## Examples

      iex> change_branch(branch)
      %Ecto.Changeset{source: %Branch{}}

  """
  def change_branch(%Branch{} = branch) do
    Branch.changeset(branch, %{})
  end

  alias Glass.Events.Source

  @doc """
  Returns the list of sources.

  ## Examples

      iex> list_sources()
      [%Source{}, ...]

  """
  def list_sources do
    Repo.all(Source)
  end

  @doc """
  Gets a single source.

  Raises `Ecto.NoResultsError` if the Source does not exist.

  ## Examples

      iex> get_source!(123)
      %Source{}

      iex> get_source!(456)
      ** (Ecto.NoResultsError)

  """
  def get_source!(id), do: Repo.get!(Source, id)

  @doc """
  Creates a source.

  ## Examples

      iex> create_source(%{field: value})
      {:ok, %Source{}}

      iex> create_source(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_source(attrs \\ %{}) do
    %Source{}
    |> Source.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a source.

  ## Examples

      iex> update_source(source, %{field: new_value})
      {:ok, %Source{}}

      iex> update_source(source, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_source(%Source{} = source, attrs) do
    source
    |> Source.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Source.

  ## Examples

      iex> delete_source(source)
      {:ok, %Source{}}

      iex> delete_source(source)
      {:error, %Ecto.Changeset{}}

  """
  def delete_source(%Source{} = source) do
    Repo.delete(source)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking source changes.

  ## Examples

      iex> change_source(source)
      %Ecto.Changeset{source: %Source{}}

  """
  def change_source(%Source{} = source) do
    Source.changeset(source, %{})
  end

  alias Glass.Events.Event
  alias Glass.Events.Property

  @doc """
  Returns the list of events.

  ## Examples

      iex> list_events()
      [%Event{}, ...]

  """
  def list_events do
    Repo.all(Event)
  end

  @doc """
  Gets a single event.

  Raises `Ecto.NoResultsError` if the Event does not exist.

  ## Examples

      iex> get_event!(123)
      %Event{}

      iex> get_event!(456)
      ** (Ecto.NoResultsError)

  """
  def get_event!(id), do: Repo.get!(Event, id)

  @doc """
  Creates a event.

  ## Examples

      iex> create_event(%{field: value})
      {:ok, %Event{}}

      iex> create_event(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_event(attrs \\ %{}) do
    event = Event.changeset(%Event{}, attrs)
    properties = Enum.map(Map.get(attrs, :properties_input), &(Property.changeset(%Property{}, &1)))
    event_with_properties = Ecto.Changeset.put_assoc(event, :properties, properties)
    case Repo.insert(event_with_properties) do
        {:ok, event_with_properties} -> {:ok, %{id: event_with_properties.id}}
        {:error, changeset} -> {:error, changeset}
    end

    #%Event{}
    #|> Event.changeset(attrs)
    #|> Repo.insert()
  end

  @doc """
  Updates a event.

  ## Examples

      iex> update_event(event, %{field: new_value})
      {:ok, %Event{}}

      iex> update_event(event, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_event(%Event{} = event, attrs) do
    event
    |> Event.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Event.

  ## Examples

      iex> delete_event(event)
      {:ok, %Event{}}

      iex> delete_event(event)
      {:error, %Ecto.Changeset{}}

  """
  def delete_event(%Event{} = event) do
    Repo.delete(event)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking event changes.

  ## Examples

      iex> change_event(event)
      %Ecto.Changeset{source: %Event{}}

  """
  def change_event(%Event{} = event) do
    Event.changeset(event, %{})
  end

  @doc """
  Returns the list of properties.

  ## Examples

      iex> list_properties()
      [%Property{}, ...]

  """
  def list_properties do
    Repo.all(Property)
  end

  @doc """
  Gets a single property.

  Raises `Ecto.NoResultsError` if the Property does not exist.

  ## Examples

      iex> get_property!(123)
      %Property{}

      iex> get_property!(456)
      ** (Ecto.NoResultsError)

  """
  def get_property!(id), do: Repo.get!(Property, id)

  @doc """
  Creates a property.

  ## Examples

      iex> create_property(%{field: value})
      {:ok, %Property{}}

      iex> create_property(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_property(attrs \\ %{}) do
    %Property{}
    |> Property.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a property.

  ## Examples

      iex> update_property(property, %{field: new_value})
      {:ok, %Property{}}

      iex> update_property(property, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_property(%Property{} = property, attrs) do
    property
    |> Property.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Property.

  ## Examples

      iex> delete_property(property)
      {:ok, %Property{}}

      iex> delete_property(property)
      {:error, %Ecto.Changeset{}}

  """
  def delete_property(%Property{} = property) do
    Repo.delete(property)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking property changes.

  ## Examples

      iex> change_property(property)
      %Ecto.Changeset{source: %Property{}}

  """
  def change_property(%Property{} = property) do
    Property.changeset(property, %{})
  end
end
