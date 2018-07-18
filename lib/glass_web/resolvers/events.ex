defmodule GlassWeb.Resolvers.Events do
  require Logger

  def all_branches(_args, %{context: %{current_user: %{id: id}}}) do
    {:ok, Glass.Events.list_branches()}
  end

  def all_branches(_args, _info) do
    {:error, "Not Authorized"}
  end

  def all_sources(_args, _info) do
    {:ok, Glass.Events.list_sources()}
  end

  def all_events(_args, _info) do
    {:ok, Glass.Events.list_events()}
  end

  def all_properties(_args, _info) do
    {:ok, Glass.Events.list_properties()}
  end

  def find_branch(_parent, %{name: name}, _resolution) do
    case Glass.Events.get_branch_by_name!(name) do
      nil ->
        {:error, "Branch #{name} not found"}

      branch ->
        {:ok, branch}
    end
  end

  def create_branch(_root, args, _info) do
    case Glass.Events.create_branch(args) do
      {:ok, branch} ->
        {:ok, branch}

      _error ->
        {:error, "could not create branch"}
    end
  end

  def create_source(_root, args, _info) do
    case Glass.Events.create_branch(args) do
      {:ok, branch} ->
        {:ok, branch}

      _error ->
        {:error, "could not create branch"}
    end
  end

  def create_event(_root, args, _info) do
    Logger.info("#{inspect(args)}")
    case Glass.Events.create_event(args) do
      {:ok, event} ->
        {:ok, event}

      _error ->
        {:error, "could not create event"}
    end
  end
end
