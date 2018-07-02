defmodule GlassWeb.SourceController do
  use GlassWeb, :controller

  alias Glass.Events
  alias Glass.Events.Source

  action_fallback(GlassWeb.FallbackController)

  def index(conn, _params) do
    sources = Events.list_sources()
    render(conn, "index.json", sources: sources)
  end

  def create(conn, %{"source" => source_params}) do
    with {:ok, %Source{} = source} <- Events.create_source(source_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", source_path(conn, :show, source))
      |> render("show.json", source: source)
    end
  end

  def show(conn, %{"id" => id}) do
    source = Events.get_source!(id)
    render(conn, "show.json", source: source)
  end

  def update(conn, %{"id" => id, "source" => source_params}) do
    source = Events.get_source!(id)

    with {:ok, %Source{} = source} <- Events.update_source(source, source_params) do
      render(conn, "show.json", source: source)
    end
  end

  def delete(conn, %{"id" => id}) do
    source = Events.get_source!(id)

    with {:ok, %Source{}} <- Events.delete_source(source) do
      send_resp(conn, :no_content, "")
    end
  end
end
