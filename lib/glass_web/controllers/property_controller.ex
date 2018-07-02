defmodule GlassWeb.PropertyController do
  use GlassWeb, :controller

  alias Glass.Events
  alias Glass.Events.Property

  action_fallback(GlassWeb.FallbackController)

  def index(conn, _params) do
    properties = Events.list_properties()
    render(conn, "index.json", properties: properties)
  end

  def create(conn, %{"property" => property_params}) do
    with {:ok, %Property{} = property} <- Events.create_property(property_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", property_path(conn, :show, property))
      |> render("show.json", property: property)
    end
  end

  def show(conn, %{"id" => id}) do
    property = Events.get_property!(id)
    render(conn, "show.json", property: property)
  end

  def update(conn, %{"id" => id, "property" => property_params}) do
    property = Events.get_property!(id)

    with {:ok, %Property{} = property} <- Events.update_property(property, property_params) do
      render(conn, "show.json", property: property)
    end
  end

  def delete(conn, %{"id" => id}) do
    property = Events.get_property!(id)

    with {:ok, %Property{}} <- Events.delete_property(property) do
      send_resp(conn, :no_content, "")
    end
  end
end
